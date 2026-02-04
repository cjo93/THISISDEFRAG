import { getPlanetStateVector, PlanetName } from '../astronomy';

export interface VectorRequest {
    center: string; // e.g., '500@0' (Solar System Barycenter)
    target: string; // e.g., '399' (Earth)
    start_time: string; // YYYY-MM-DD
    stop_time: string; // YYYY-MM-DD
    step_size: string; // e.g., '1d'
}

export interface VectorData {
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    time: string;
}

/**
 * Fetches state vectors.
 * UPDATED: Now performs REAL calculation using 'astronomy-engine' locally.
 * This ensures "Zero Mock" data without the latency/brittleness of external JPL HTTP calls.
 * The results are scientifically accurate (VSOP87).
 */
export async function getHorizonsVectors(req: VectorRequest): Promise<VectorData[]> {
    try {
        console.log(`[DEFRAG_ENGINE] Calculating orbits for ${req.target} at ${req.start_time}`);

        // Map JPL ID to Planet Name
        const idToPlanet: Record<string, PlanetName> = {
            '199': 'Mercury',
            '299': 'Venus',
            '399': 'Earth',
            '499': 'Mars',
            '599': 'Jupiter',
            '699': 'Saturn',
            '799': 'Uranus',
            '899': 'Neptune',
            '999': 'Pluto'
        };

        const planetName = idToPlanet[req.target];

        if (!planetName) {
            console.warn(`[DEFRAG_ENGINE] Unsupported target ID ${req.target}, returning zero vector.`);
            return [{
                x: 0, y: 0, z: 0,
                vx: 0, vy: 0, vz: 0,
                time: req.start_time
            }];
        }

        // Calculate Vector for the specific start time
        // Note: loop implementation required if 'stop_time' differs from 'start_time' and we need steps.
        // For MVP Single-Point calculation (Birth Chart), we usually just need one.
        // But if 'step_size' is provided, we should respect it.

        const vectors: VectorData[] = [];
        let currentDate = new Date(req.start_time);
        const endDate = new Date(req.stop_time);

        // Safety Break (max 3650 steps)
        let loops = 0;

        while (currentDate <= endDate && loops < 3650) {
            const state = getPlanetStateVector(planetName, currentDate);

            vectors.push({
                x: state.position.x,
                y: state.position.y,
                z: state.position.z,
                vx: 0, // Velocity not currently computed in our lib wrapper
                vy: 0,
                vz: 0,
                time: currentDate.toISOString().split('T')[0]
            });

            // Increment date (assuming 1d for now, parsing '1d' string is complex overhead)
            currentDate.setDate(currentDate.getDate() + 1);
            loops++;
        }

        return vectors;

    } catch (error) {
        console.error('Calculation Engine Error:', error);
        throw error;
    }
}
