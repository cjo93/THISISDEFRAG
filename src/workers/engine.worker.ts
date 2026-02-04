
import * as Astronomy from 'astronomy-engine';
import { UnitData, BirthData, ChartData, DefragUserProfile } from '../types';
import { KNOWLEDGE_BASE } from '../data/knowledge_base';

// Simple zodiac Calculator
const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

function getSign(longitude: number): string {
  // Longitude is 0..360
  let lng = longitude % 360;
  if (lng < 0) lng += 360;
  const index = Math.floor(lng / 30);
  return ZODIAC_SIGNS[index % 12];
}

// Designation Logic (Human Design Proxy based on Sun/Mars angle)
function calculateDesignation(sunLong: number, marsLong: number): string {
  // Phase difference
  let diff = Math.abs(sunLong - marsLong) % 360;
  if (diff > 180) diff = 360 - diff; // minimal arc

  if (diff < 45) return "THE ARCHITECT (Manifestor)";
  if (diff < 135) return "THE DOER (Generator)";
  if (diff < 225) return "THE GUIDE (Projector)";
  return "THE MIRROR (Reflector)";
}

// Core Physics & Mechanics Engine
// Ported from Defrag/HumanDesign Colab logic
// Uses astronomy-engine (JPL/NASA algorithms equivalent)

// 1. GATE MAPPING CONSTANTS
const GATE_OFFSET = 359.84375; // Gate 41 starts here
const GATE_ARC = 360 / 64; // 5.625 degrees per gate

// Helper: Normalize degrees 0..360
function normalize(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

// Helper: Convert Ecliptic Longitude to Gate
function getGate(longitude: number): number {
  // Shift so 0 is start of Gate 41
  const shifted = normalize(longitude - GATE_OFFSET);
  // 0-indexed gate (0..63)
  const index = Math.floor(shifted / GATE_ARC);
  // Gate 41 is index 0. Sequence is circular.
  // The wheel order starts at 41.
  // Following Colab logic: "return ((41 - 1 + gate_index) % 64) + 1"
  // This Math implies: Index 0 -> Gate 41. Index 1 -> Gate 42. (Sequential mapping)
  return ((40 + index) % 64) + 1;
}

// Helper: Calc Design Date (Sun is 88 degrees prior)
function calculateDesignDate(birthDate: Date, natalSunLong: number): Date {
  const targetLong = normalize(natalSunLong - 88.0);
  // Start guess: birth - 88 days
  let time = new Date(birthDate.getTime() - (88 * 24 * 60 * 60 * 1000));

  for (let i = 0; i < 5; i++) {
    const sunPos = Astronomy.SunPosition(time);
    const currentLong = sunPos.elon;
    let diff = normalize(targetLong - currentLong);
    if (diff > 180) diff -= 360; // shortest path
    const daysShift = diff / 0.9856;
    time = new Date(time.getTime() + (daysShift * 24 * 60 * 60 * 1000));
    if (Math.abs(diff) < 0.0001) break;
  }
  return time;
}

// --- NEW DEFRAG ENGINE LOGIC ---

export class DefragEngine {

  // 1. CALCULATE PLANETARY POSITIONS (Using Astronomy Engine)
  private calculatePlanets(data: BirthData, isDesign: boolean): Record<string, number> {
    const timestamp = isDesign
      ? this.getDesignDate(new Date(data.date + 'T' + data.time))
      : new Date(`${data.date}T${data.time}`);

    const planets: Record<string, number> = {};

    // Sun
    planets['Sun'] = Astronomy.SunPosition(timestamp).elon;
    // Earth (Helio Earth is meaningless here, we want Geocentric output? No, HD Earth is Sun + 180)
    planets['Earth'] = normalize(planets['Sun'] + 180);

    // Moon
    const moonVec = Astronomy.GeoVector(Astronomy.Body.Moon, timestamp, true);
    planets['Moon'] = Astronomy.Ecliptic(moonVec).elon;

    // Inner Planets
    [Astronomy.Body.Mercury, Astronomy.Body.Venus, Astronomy.Body.Mars, Astronomy.Body.Jupiter, Astronomy.Body.Saturn].forEach(body => {
      const vec = Astronomy.GeoVector(body, timestamp, true);
      planets[body] = Astronomy.Ecliptic(vec).elon;
    });

    return planets;
  }

  private getDesignDate(date: Date): Date {
    const pSunPos = Astronomy.SunPosition(date);
    return calculateDesignDate(date, pSunPos.elon);
  }

  // 2. MAP LONGITUDE TO GATE (Already implemented as getGate helper)
  private mapToGateData(longitude: number): { gate: number, line: number } {
    const gate = getGate(longitude);
    // Line calculation: 6 lines per gate
    // GATE_ARC = 5.625 deg. Line Arc = 0.9375 deg.
    // Normalized offset within the gate:
    const shifted = normalize(longitude - GATE_OFFSET);
    const gateStart = Math.floor(shifted / GATE_ARC) * GATE_ARC;
    const offsetInGate = shifted - gateStart;
    const line = Math.floor(offsetInGate / (GATE_ARC / 6)) + 1;

    return { gate, line };
  }

  // 3. GENERATE FULL PROFILE
  public generateProfile(user: BirthData): DefragUserProfile {
    const designPlanets = this.calculatePlanets(user, true);
    const personalityPlanets = this.calculatePlanets(user, false);

    const designGates = Object.values(designPlanets).map(p => this.mapToGateData(p).gate);
    const personalityGates = Object.values(personalityPlanets).map(p => this.mapToGateData(p).gate);

    return {
      uuid: `u_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      charts: {
        design: this.processChart(designGates),
        personality: this.processChart(personalityGates),
        integrated: this.processChart([...designGates, ...personalityGates])
      },
      vectors: this.calculateVectors([...designGates, ...personalityGates]),
      penta_contribution: this.analyzePentaContribution([...designGates, ...personalityGates])
    };
  }

  private processChart(gates: number[]): ChartData {
    // Mock chart processing - would calculate channels and centers
    // For now returning basic gate list
    return {
      gates: [...new Set(gates)], // dedup
      channels: [],
      centers: {}
    };
  }

  // 4. PENTA (GROUP) DYNAMICS LOGIC
  private analyzePentaContribution(gates: number[]): string[] {
    const contributions: string[] = [];
    const ZONES = KNOWLEDGE_BASE.PENTA_MATRIX.ZONES as Record<string, { gates: number[] }>;

    for (const [zoneName, zoneData] of Object.entries(ZONES)) {
      // Check if user has BOTH gates for a Penta Channel
      // Example: Gate 15 AND Gate 5 for "FLOW"
      const hasChannel = zoneData.gates.every(g => gates.includes(g));
      if (hasChannel) {
        contributions.push(zoneName);
      }
    }
    return contributions;
  }

  // 5. RELATIONAL VECTOR PHYSICS (3D Coordinates)
  private calculateVectors(gates: number[]): { resilience: number, autonomy: number, connectivity: number } {
    // X-Axis (Resilience): Based on Defined Centers count
    // Y-Axis (Autonomy): Based on Authority Type weight
    // Z-Axis (Connectivity): Based on Split Definition (Single vs. Split vs. Quad)

    // ...implementation of weights from 'DEFRAG Integrated Engine Spec'...
    // Returning theoretical defaults
    return { resilience: 0.8, autonomy: 0.5, connectivity: -0.2 };
  }
}

// Internal worker function
const calculateMechanics = async (
  name: string,
  birthDate: string,
  birthTime: string,
  birthPlace: string
): Promise<UnitData> => {
  // 1. Time Setup
  const dateStr = `${birthDate}T${birthTime}:00`;
  let date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    console.warn("Invalid date, defaulting to now");
    date = new Date();
  }

  // 2. Personality (Natal) Calculations - Geocentric
  const pSunPos = Astronomy.SunPosition(date);
  // For Mars, we need GeoVector + Ecliptic
  const pMarsVec = Astronomy.GeoVector(Astronomy.Body.Mars, date, true);
  const pMarsPos = Astronomy.Ecliptic(pMarsVec);

  const pSunLong = pSunPos.elon;
  const pMarsLong = pMarsPos.elon;

  const sunSign = getSign(pSunLong);
  const marsSign = getSign(pMarsLong);
  const sunGateOnly = getGate(pSunLong);

  // 3. Design (Unconscious) Calculations - 88 Solar degrees prior
  const designDate = calculateDesignDate(date, pSunLong);

  // 4. Designation Logic
  const designation = calculateDesignation(pSunLong, pMarsLong);

  return {
    id: `u_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name,
    birthDate,
    birthTime,
    location: birthPlace,
    model: designation,
    sun_sign: sunSign,
    mars_sign: marsSign,
    os_type: 'Biocarbon V.8',
    operatingMode: 'Nominal',
    energyType: 'Solar/Kinetic',
    warning: 'None detected'
  };
};

const engine = new DefragEngine();

// Message Handler
self.onmessage = async (e) => {
  const { type, payload, id } = e.data;

  try {
    if (type === 'CALCULATE_MECHANICS') {
      const { name, birthDate, birthTime, birthPlace } = payload;
      const result = await calculateMechanics(name, birthDate, birthTime, birthPlace);
      self.postMessage({ type: 'CALCULATE_MECHANICS_SUCCESS', payload: result, id });
    } else if (type === 'GENERATE_PROFILE') {
      const { birthData } = payload;
      const result = engine.generateProfile(birthData);
      self.postMessage({ type: 'GENERATE_PROFILE_SUCCESS', payload: result, id });
    }
  } catch (error: any) {
    self.postMessage({ type: 'ERROR', payload: error.message, id });
  }
};
