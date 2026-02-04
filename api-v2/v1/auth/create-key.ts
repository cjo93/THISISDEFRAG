import { generateApiKey, hashKey } from '../../lib/stripe';
import { db } from '../../../src/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { requireDashboardAuth } from '../../middleware/dashboard-auth';

// POST /api-v2/v1/auth/create-key
export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Secure this endpoint with Session Auth
    const user = await requireDashboardAuth(req);

    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Use the authenticated user's ID
    const user_id = user.uid;
    const { tier = 'free' } = req.body;

    if (!user_id) {
        return res.status(400).json({ error: 'Missing user_id from token' });
    }

    try {
        // 1. Generate Key
        const apiKey = generateApiKey();
        const keyHash = hashKey(apiKey);

        // 2. Prepare Metadata
        const keyData = {
            key_hash: keyHash,
            user_id,
            tier,
            is_active: true,
            created_at: serverTimestamp(),
            usage_count: 0,
            rate_limit_monthly: tier === 'free' ? 1000 : (tier === 'pro' ? 50000 : null),
            endpoints: tier === 'free' ? ['telemetry'] : (tier === 'pro' ? ['seda', 'telemetry', 'orbit'] : ['*'])
        };

        // 3. Store in Firestore
        const docRef = await addDoc(collection(db, 'api_keys'), keyData);

        // 4. Return PLAIN key (Once)
        return res.status(200).json({
            key_id: docRef.id,
            api_key: apiKey, // The only time this is revealed
            tier,
            message: "Store this key safely. It will not be shown again."
        });

    } catch (error) {
        console.error('Create Key Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
