
import * as Astronomy from 'astronomy-engine';
import { UnitData } from '../types';

// Simple zodiac Calculator
const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

function getSign(longitude: number): string {
  // Longitude is 0..360
  // Normalize just in case
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
  // If we assume standard numerical order 1..64 is NOT the wheel order, we need a map.
  // BUT the Colab logic: "gate_index = int(...); return ((41 - 1 + gate_index) % 64) + 1"
  // This implies the gates are ordered sequentially by ID starting from 41?
  // Standard HD Wheel: 41, 19, 13, 49... NOT sequential 41, 42, 43.
  // HOWEVER, I will follow the Colab's python logic EXACTLY as extracted:
  // "return ((41 - 1 + gate_index) % 64) + 1"
  // This Math implies: Index 0 -> Gate 41. Index 1 -> Gate 42.
  // This is a SEQUENTIAL mapping (41, 42, 43...).
  // Standard Human Design is NOT sequential. It's the I-Ching/Rave Mandala (41, 19, 13...).
  // Notes: If the Colab uses sequential mapping, it's a specific "Defrag" variant or a simplified model.
  // PROCEEDING WITH EXTRACTED LOGIC:
  return ((40 + index) % 64) + 1;
}

// Helper: Calc Design Date (Sun is 88 degrees prior)
function calculateDesignDate(birthDate: Date, natalSunLong: number): Date {
  const targetLong = normalize(natalSunLong - 88.0);

  // Design date is approx 88-92 days before birth.
  // We scan backwards.
  // Start guess: birth - 88 days
  let time = new Date(birthDate.getTime() - (88 * 24 * 60 * 60 * 1000));

  // Refine with simple iterative approach (Newton's method preferred but simple steps work for v1)
  // We need Sun(time).lon == targetLong

  for (let i = 0; i < 5; i++) { // 5 iterations is plenty for seconds-level precision
    const sunPos = Astronomy.SunPosition(time);
    const currentLong = sunPos.elon;
    let diff = normalize(targetLong - currentLong);
    if (diff > 180) diff -= 360; // shortest path

    // Sun moves approx 1 degree per day (approx 0.04 deg per hour)
    // adjustment in days = diff / 0.9856
    const daysShift = diff / 0.9856;

    time = new Date(time.getTime() + (daysShift * 24 * 60 * 60 * 1000));

    if (Math.abs(diff) < 0.0001) break; // Precision reached
  }

  return time;
}

export const calculateMechanics = async (
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
  const dSunPos = Astronomy.SunPosition(designDate);
  const dMarsVec = Astronomy.GeoVector(Astronomy.Body.Mars, designDate, true);
  const dMarsPos = Astronomy.Ecliptic(dMarsVec);

  const dSunLong = dSunPos.elon;
  const dMarsLong = dMarsPos.elon;

  // 4. Designation Logic (Placeholder for full channel map)
  // Using the simplistic Sun-Mars Phase angle for now as extracted previously
  // or retaining the visual "Mirror/Guide/Doer/Architect" logic.
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

    // Extended Data (Optional, but useful for logs/debugging)
    // designDate: designDate.toISOString(),
    // pSunGate: sunGateOnly,

    // Retaining V1 flavor text
    os_type: 'Biocarbon V.8',
    operatingMode: 'Nominal',
    energyType: 'Solar/Kinetic',
    warning: 'None detected'
  };
};
