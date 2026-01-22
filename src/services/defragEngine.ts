import { UnitData, FrictionAlert } from '../types';

/**
 * DEFRAG ENGINE v2.0 - Production Grade Ephemeris Calculator
 * Interfaces with JPL/NASA HORIZONS API for real planetary positions
 */

// Zodiac degree boundaries (0-360 ecliptic longitude)
const ZODIAC_BOUNDARIES = [
  { sign: 'Aries', start: 0, end: 30 },
  { sign: 'Taurus', start: 30, end: 60 },
  { sign: 'Gemini', start: 60, end: 90 },
  { sign: 'Cancer', start: 90, end: 120 },
  { sign: 'Leo', start: 120, end: 150 },
  { sign: 'Virgo', start: 150, end: 180 },
  { sign: 'Libra', start: 180, end: 210 },
  { sign: 'Scorpio', start: 210, end: 240 },
  { sign: 'Sagittarius', start: 240, end: 270 },
  { sign: 'Capricorn', start: 270, end: 300 },
  { sign: 'Aquarius', start: 300, end: 330 },
  { sign: 'Pisces', start: 330, end: 360 }
];

// JPL HORIZONS body codes
const HORIZONS_BODIES = {
  SUN: '10',
  MOON: '301',
  MERCURY: '199',
  VENUS: '299',
  MARS: '499',
  JUPITER: '599',
  SATURN: '699'
};

// Fire/Air = Kinetic (Doer), Earth/Water = Static (Guide)
const KINETIC_SIGNS = ['Aries', 'Leo', 'Sagittarius', 'Gemini', 'Libra', 'Aquarius'];

interface PlanetaryPosition {
  body: string;
  longitude: number;
  sign: string;
  degree: number;
}

interface HorizonsResponse {
  result: string;
}

/**
 * Convert ecliptic longitude (0-360) to zodiac sign
 */
const longitudeToSign = (longitude: number): { sign: string; degree: number } => {
  const normalizedLong = ((longitude % 360) + 360) % 360;
  for (const boundary of ZODIAC_BOUNDARIES) {
    if (normalizedLong >= boundary.start && normalizedLong < boundary.end) {
      return { 
        sign: boundary.sign, 
        degree: Math.floor(normalizedLong - boundary.start) 
      };
    }
  }
  return { sign: 'Aries', degree: 0 };
};

/**
 * Parse JPL HORIZONS ephemeris response for ecliptic longitude
 */
const parseHorizonsResponse = (response: string, bodyName: string): PlanetaryPosition | null => {
  try {
    const soeIndex = response.indexOf('$$SOE');
    const eoeIndex = response.indexOf('$$EOE');
    
    if (soeIndex === -1 || eoeIndex === -1) {
      console.error(`[DEFRAG] HORIZONS parse error: markers not found for ${bodyName}`);
      return null;
    }
    
    const dataSection = response.substring(soeIndex + 5, eoeIndex).trim();
    const lines = dataSection.split('\n').filter(l => l.trim());
    
    if (lines.length === 0) return null;
    
    const dataLine = lines[0];
    const values = dataLine.trim().split(/\s+/);
    
    let longitude = 0;
    for (const val of values) {
      const num = parseFloat(val);
      if (!isNaN(num) && num >= 0 && num < 360) {
        longitude = num;
        break;
      }
    }
    
    const { sign, degree } = longitudeToSign(longitude);
    
    return {
      body: bodyName,
      longitude,
      sign,
      degree
    };
  } catch (error) {
    console.error(`[DEFRAG] Parse error for ${bodyName}:`, error);
    return null;
  }
};

/**
 * Fetch planetary position from JPL HORIZONS API
 */
const fetchPlanetaryPosition = async (
  bodyCode: string,
  bodyName: string,
  date: string,
  time: string
): Promise<PlanetaryPosition | null> => {
  try {
    const startTime = `${date} ${time}`;
    const endDate = new Date(`${date}T${time}`);
    endDate.setMinutes(endDate.getMinutes() + 1);
    const stopTime = `${endDate.toISOString().split('T')[0]} ${endDate.toTimeString().slice(0, 5)}`;
    
    const params = new URLSearchParams({
      format: 'json',
      COMMAND: `'${bodyCode}'`,
      OBJ_DATA: 'NO',
      MAKE_EPHEM: 'YES',
      EPHEM_TYPE: 'OBSERVER',
      CENTER: "'500@399'",
      START_TIME: `'${startTime}'`,
      STOP_TIME: `'${stopTime}'`,
      STEP_SIZE: "'1 m'",
      QUANTITIES: "'31'",
      CSV_FORMAT: 'NO'
    });
    
    const response = await fetch(
      `https://ssd.jpl.nasa.gov/api/horizons.api?${params.toString()}`
    );
    
    if (!response.ok) {
      throw new Error(`HORIZONS API returned ${response.status}`);
    }
    
    const data: HorizonsResponse = await response.json();
    return parseHorizonsResponse(data.result, bodyName);
    
  } catch (error) {
    console.error(`[DEFRAG] HORIZONS fetch error for ${bodyName}:`, error);
    return null;
  }
};

/**
 * Fallback calculation using astronomical algorithms when API is unavailable
 */
const calculateSunPositionFallback = (date: string, time: string): PlanetaryPosition => {
  const dt = new Date(`${date}T${time}:00Z`);
  const jd = dt.getTime() / 86400000 + 2440587.5;
  const T = (jd - 2451545.0) / 36525;
  
  let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  L0 = ((L0 % 360) + 360) % 360;
  
  let M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  M = ((M % 360) + 360) % 360;
  const Mrad = M * Math.PI / 180;
  
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad)
          + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
          + 0.000289 * Math.sin(3 * Mrad);
  
  let sunLong = L0 + C;
  sunLong = ((sunLong % 360) + 360) % 360;
  
  const { sign, degree } = longitudeToSign(sunLong);
  
  return {
    body: 'SUN',
    longitude: sunLong,
    sign,
    degree
  };
};

const calculateMarsPositionFallback = (date: string, time: string): PlanetaryPosition => {
  const dt = new Date(`${date}T${time}:00Z`);
  const jd = dt.getTime() / 86400000 + 2440587.5;
  const T = (jd - 2451545.0) / 36525;
  
  let L = 355.45332 + 19140.30268 * T + 0.00000261 * T * T;
  L = ((L % 360) + 360) % 360;
  
  const { sign, degree } = longitudeToSign(L);
  
  return {
    body: 'MARS',
    longitude: L,
    sign,
    degree
  };
};

export interface NatalChart {
  sun: PlanetaryPosition;
  mars: PlanetaryPosition;
  calculatedAt: string;
  source: 'HORIZONS' | 'FALLBACK';
}

/**
 * Calculate natal chart positions for given birth data
 */
export const calculateNatalChart = async (
  birthDate: string,
  birthTime: string
): Promise<NatalChart> => {
  const [sunResult, marsResult] = await Promise.all([
    fetchPlanetaryPosition(HORIZONS_BODIES.SUN, 'SUN', birthDate, birthTime),
    fetchPlanetaryPosition(HORIZONS_BODIES.MARS, 'MARS', birthDate, birthTime)
  ]);
  
  if (sunResult && marsResult) {
    return {
      sun: sunResult,
      mars: marsResult,
      calculatedAt: new Date().toISOString(),
      source: 'HORIZONS'
    };
  }
  
  console.warn('[DEFRAG] HORIZONS unavailable, using fallback algorithms');
  return {
    sun: calculateSunPositionFallback(birthDate, birthTime),
    mars: calculateMarsPositionFallback(birthDate, birthTime),
    calculatedAt: new Date().toISOString(),
    source: 'FALLBACK'
  };
};

/**
 * Main entry point: Calculate mechanical profile from birth coordinates
 */
export const calculateMechanics = async (
  name: string,
  birthDate: string,
  birthTime: string,
  location: string
): Promise<UnitData> => {
  const chart = await calculateNatalChart(birthDate, birthTime);
  
  const marsSign = chart.mars.sign;
  const sunSign = chart.sun.sign;
  const isKinetic = KINETIC_SIGNS.includes(marsSign);
  
  const profile = isKinetic ? {
    os_type: "THE DOER (Kinetic Generator)",
    fuel: "KINETIC MOTION",
    warning: "SYSTEM OVERHEATS WHEN IDLE.",
    script: "Give them a task. Do not ask them to sit still.",
    coreProcessor: `Mars in ${marsSign}`,
    operatingMode: "Active Engagement",
    energyType: "Kinetic"
  } : {
    os_type: "THE GUIDE (Projector)",
    fuel: "QUIET OBSERVATION",
    warning: "SYSTEM SHUTS DOWN IN NOISE.",
    script: "Ask for their input. Do not force them to work.",
    coreProcessor: `Mars in ${marsSign}`,
    operatingMode: "Receptive Processing",
    energyType: "Static"
  };

  return {
    id: Math.random().toString(36).substr(2, 9),
    name,
    birthDate,
    birthTime,
    location,
    model: profile.os_type,
    fuel: profile.fuel,
    warning: profile.warning,
    os_type: profile.os_type,
    script: profile.script,
    mars_sign: marsSign,
    sun_sign: sunSign,
    drive: profile.fuel,
    coreProcessor: profile.coreProcessor,
    operatingMode: profile.operatingMode,
    energyType: profile.energyType
  };
};

/**
 * Calculate current transit aspects for friction forecasting
 */
export const calculateCurrentTransits = async (): Promise<{
  mars: PlanetaryPosition;
  sun: PlanetaryPosition;
}> => {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().slice(0, 5);
  
  const chart = await calculateNatalChart(date, time);
  return { mars: chart.mars, sun: chart.sun };
};

/**
 * Check for hard aspects between transit and natal positions
 */
const checkAspects = (transitLong: number, natalLong: number): string[] => {
  const aspects: string[] = [];
  const diff = Math.abs(transitLong - natalLong);
  const normalizedDiff = Math.min(diff, 360 - diff);
  
  const orb = 8;
  
  if (normalizedDiff <= orb || normalizedDiff >= 360 - orb) {
    aspects.push('CONJUNCTION');
  } else if (Math.abs(normalizedDiff - 90) <= orb) {
    aspects.push('SQUARE');
  } else if (Math.abs(normalizedDiff - 180) <= orb) {
    aspects.push('OPPOSITION');
  }
  
  return aspects;
};

/**
 * Generate friction forecast based on real transits vs natal positions
 */
export const getFrictionForecast = async (unit: UnitData | null): Promise<FrictionAlert[]> => {
  if (!unit || !unit.mars_sign || !unit.sun_sign) {
    return [{ level: "🟢 NOMINAL", alert: "SYSTEM CLEAR", desc: "No unit data detected." }];
  }
  
  try {
    const transits = await calculateCurrentTransits();
    const alerts: FrictionAlert[] = [];
    
    const natalMars = ZODIAC_BOUNDARIES.find(z => z.sign === unit.mars_sign);
    const natalSun = ZODIAC_BOUNDARIES.find(z => z.sign === unit.sun_sign);
    
    if (natalMars) {
      const marsAspects = checkAspects(transits.mars.longitude, natalMars.start + 15);
      if (marsAspects.includes('SQUARE') || marsAspects.includes('OPPOSITION')) {
        alerts.push({
          level: "🔴 CRITICAL",
          alert: "KINETIC OVERLOAD",
          desc: `Transit Mars ${marsAspects[0]} natal Mars. Physical agitation spike detected. Voltage exceeds safe limits.`
        });
      }
    }
    
    if (natalSun) {
      const sunMarsAspects = checkAspects(transits.mars.longitude, natalSun.start + 15);
      if (sunMarsAspects.includes('SQUARE') || sunMarsAspects.includes('OPPOSITION')) {
        alerts.push({
          level: "🟠 SIGNAL LAG",
          alert: "CORE FRICTION",
          desc: `Transit Mars ${sunMarsAspects[0]} natal Sun. Identity circuits under pressure. Expect reactivity.`
        });
      }
    }
    
    if (alerts.length === 0) {
      alerts.push({
        level: "🟢 NOMINAL",
        alert: "SYSTEM CLEAR",
        desc: "Planetary harmonics in alignment with natal hardware. Engagement protocols are safe."
      });
    }
    
    return alerts;
    
  } catch (error) {
    console.error('[DEFRAG] Friction forecast error:', error);
    return [{
      level: "🟡 LOW VOLTAGE",
      alert: "SENSOR OFFLINE",
      desc: "Atmospheric sensors temporarily unavailable. Proceed with standard caution protocols."
    }];
  }
};
