import { validateApiKey } from '../../middleware/auth';
import { logAuditEvent } from '../../middleware/logging';
import { incrementUsageCount } from '../../lib/stripe';
import { getHorizonsVectors } from '../../../src/lib/nasa/horizons';

// POST /api-v2/v1/telemetry/vectors
export default async function handler(req: any, res: any) {
    // CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // 1. Auth & Rate Limit
        const keyData = await validateApiKey(req);
        if (!keyData) return res.status(401).json({ error: 'Unauthorized' });

        // Check Tier Access (Telemetry is free, but check limits)
        if (keyData.rate_limit_monthly && keyData.monthly_usage >= keyData.rate_limit_monthly) {
            return res.status(429).json({ error: 'Rate limit exceeded' });
        }

        // 2. Validate Request
        const { target, date } = req.body;
        if (!target || !date) {
            return res.status(400).json({ error: 'Missing target or date' });
        }

        // 3. Fetch Data
        // Default to Earth (399) from Solar System Barycenter (500@0)
        // Date format YYYY-MM-DD
        const vectors = await getHorizonsVectors({
            target: target,
            center: '500@0',
            start_time: date,
            stop_time: new Date(new Date(date).getTime() + 86400000).toISOString().split('T')[0], // +1 day
            step_size: '1d'
        });

        // 4. Log & Count
        incrementUsageCount(keyData.key_id);
        logAuditEvent(keyData.key_id, 'telemetry_vectors', 'SUCCESS', { target, date });

        // 5. Respond
        return res.status(200).json({
            meta: {
                source: 'NASA JPL Horizons',
                timestamp: new Date().toISOString()
            },
            vectors
        });

    } catch (error) {
        console.error('Telemetry Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
