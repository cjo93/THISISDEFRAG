import { requireDashboardAuth } from '../../middleware/dashboard-auth';
import { db } from '../../../src/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { generateApiKey, hashKey } from '../../lib/stripe';

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const user = await requireDashboardAuth(req);
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // Generate Key
        const apiKey = generateApiKey();
        const keyHash = hashKey(apiKey);

        // Default Pro tier for manual creation in dashboard (or infer from user plan)
        // Ideally we'd look up the user's subscription first.
        const tier = 'pro';

        const docRef = await addDoc(collection(db, 'api_keys'), {
            user_id: user.uid,
            key_hash: keyHash,
            tier,
            is_active: true,
            created_at: serverTimestamp(),
            usage_count: 0,
            rate_limit_monthly: 50000,
            endpoints: ['seda', 'telemetry', 'orbit'],
            label: req.body.label || 'New Key'
        });

        // Return Plain Key ONCE
        return res.status(201).json({
            key_id: docRef.id,
            api_key: apiKey,
            tier,
            message: 'Store this key safely. It will not be shown again.'
        });

    } catch (error) {
        console.error('Create Key Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
