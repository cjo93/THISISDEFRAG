
import { calculateMechanics } from '../src/services/defragEngine';

async function runSimulation() {
    console.log('--- DEFRAG ENGINE SIMULATION ---\n');

    const cases = [
        { name: 'Subject A (NY)', date: '1993-07-26', time: '09:00', place: 'New York, NY' },
        { name: 'Subject B (Tokyo)', date: '1993-07-26', time: '21:00', place: 'Tokyo, Japan' },
        { name: 'Subject C (London)', date: '1999-12-31', time: '23:59', place: 'London, UK' }
    ];

    for (const c of cases) {
        try {
            const result = await calculateMechanics(c.name, c.date, c.time, c.place);
            console.log(`\nAnalyzing: ${c.name}`);
            console.log(`Input: ${c.date} @ ${c.time} in ${c.place}`);
            console.log(`[OUTPUT]`);
            console.log(`  Sun Sign: ${result.sun_sign}`);
            console.log(`  Mars Sign: ${result.mars_sign}`);
            console.log(`  Designation: ${result.model}`); // e.g., GENERATOR, REFLECTOR
            console.log(`  Operating Mode: ${result.operatingMode}`);
        } catch (e) {
            console.error(`Failed to calc ${c.name}:`, e);
        }
    }
}

runSimulation();
