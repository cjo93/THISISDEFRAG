import { requireDashboardAuth } from '../../middleware/dashboard-auth';
import { db } from '../../../src/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const user = await requireDashboardAuth(req);
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // 1. Get User's Keys
        const keysQ = query(collection(db, 'api_keys'), where('user_id', '==', user.uid));
        const keysSnapshot = await getDocs(keysQ);
        const keyIds = keysSnapshot.docs.map(doc => doc.id);
        const activeKeysCount = keysSnapshot.docs.filter(doc => doc.data().is_active).length;

        // 2. Fetch Aggregated Usage (Mocked for now, or query api_audit_logs if aggregates not ready)
        // Querying raw logs is expensive, so we'd typically use a 'usage_daily' collection.
        // For MVP, we'll return the 'usage_count' from the key documents which is a total.

        let totalUsage = 0;
        let limit = 0;

        keysSnapshot.docs.forEach(doc => {
            const data = doc.data();
            totalUsage += (data.usage_count || 0);
            limit += (data.rate_limit_monthly || 0);
        });

        // Mock usage history for charts (In prod, fetch from 'usage_daily')
        const usageHistory = Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
            calls: Math.floor(Math.random() * (totalUsage / 30)) // Fake distribution
        }));

        return res.status(200).json({
            activeKeys: activeKeysCount,
            monthlyUsage: totalUsage,
            usageLimit: limit,
            tierName: keysSnapshot.docs[0]?.data()?.tier || 'Free', // Inferred
            usageHistory,
            renewalDate: '2026-03-01' // Mock
        });

    } catch (error) {
        console.error('Stats Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
