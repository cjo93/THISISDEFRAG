
import * as Astronomy from 'astronomy-engine';

export interface Vector3D {
    x: number;
    y: number;
    z: number;
}

export interface StateVector {
    position: Vector3D;
    // velocity: Vector3D; // Removed: Not reliably available in HelioVector result
    time: Date;
}

export const PLANETS = [
    'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'
] as const;

export type PlanetName = typeof PLANETS[number];

/**
 * Calculates the Heliocentric State Vector (Position & Velocity) for a planet at a given time.
 * Uses VSOP87 / astronomy-engine for high precision deterministic calculation.
 */
export function getPlanetStateVector(planet: PlanetName, date: Date | string): StateVector {
    const d = new Date(date);
    const body = Astronomy.Body[planet];

    if (!body) {
        throw new Error(`Invalid planet name: ${planet}`);
    }

    // Calculate Heliocentric coordinates (J2000)
    const vector = Astronomy.HelioVector(body, d);

    return {
        position: {
            x: vector.x,
            y: vector.y,
            z: vector.z
        },
        time: d
    };
}

/**
 * Generates a deterministic "Relationship Signature" based on planetary geometry
 * between two distinct points in time (birth times).
 */
export function calculateRelationalGeometry(dateA: Date | string, dateB: Date | string) {
    const t1 = new Date(dateA);
    const t2 = new Date(dateB);

    // Example: Angle between Mars(A) and Venus(B)
    const marsA = Astronomy.HelioVector(Astronomy.Body.Mars, t1);
    const venusB = Astronomy.HelioVector(Astronomy.Body.Venus, t2);

    // Simple dot product for angular difference (normalized)
    const magA = Math.sqrt(marsA.x ** 2 + marsA.y ** 2 + marsA.z ** 2);
    const magB = Math.sqrt(venusB.x ** 2 + venusB.y ** 2 + venusB.z ** 2);

    const dot = (marsA.x * venusB.x + marsA.y * venusB.y + marsA.z * venusB.z);
    const angleRad = Math.acos(dot / (magA * magB));
    const angleDeg = angleRad * (180 / Math.PI);

    return {
        mars_venus_angle: angleDeg,
        resonance_score: Math.abs(Math.cos(angleRad)), // 0-1 score
        vector_a: marsA,
        vector_b: venusB
    };
}

/**
 * Returns the Zodiac sign for a given Ecliptic Longitude (degrees).
 */
export function getZodiacSign(longitude: number): string {
    const signs = [
        'Aries', 'Taurus', 'Gemini', 'Cancer',
        'Leo', 'Virgo', 'Libra', 'Scorpio',
        'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];
    // Longitude 0 = Aries. Each sign is 30 degrees.
    const index = Math.floor(longitude / 30) % 12;
    return signs[index];
}

/**
 * Calculates the Zodiac sign of a celestial body at a given time.
 * Uses Geocentric Ecliptic Longitude.
 */
export function getPlanetSign(planet: PlanetName | 'Sun' | 'Moon', date: Date | string): string {
    const d = new Date(date);
    const body = Astronomy.Body[planet];

    if (!body) throw new Error(`Invalid body: ${planet}`);

    // Get Geocentric Vector (Equatorial J2000)
    // GeoVector(Body, Time, Aberration) - defaulting Aberration to true
    const vector = Astronomy.GeoVector(body, d, true);

    // Convert to Ecliptic coordinates
    const ecliptic = Astronomy.Ecliptic(vector);
    return getZodiacSign(ecliptic.elon);
}

export function getElement(sign: string): 'Fire' | 'Earth' | 'Air' | 'Water' {
    const fire = ['Aries', 'Leo', 'Sagittarius'];
    const earth = ['Taurus', 'Virgo', 'Capricorn'];
    const air = ['Gemini', 'Libra', 'Aquarius'];
    const water = ['Cancer', 'Scorpio', 'Pisces'];

    if (fire.includes(sign)) return 'Fire';
    if (earth.includes(sign)) return 'Earth';
    if (air.includes(sign)) return 'Air';
    if (water.includes(sign)) return 'Water';
    return 'Air'; // Default
}
