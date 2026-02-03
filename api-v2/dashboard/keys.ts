import { requireDashboardAuth } from '../../middleware/dashboard-auth';
import { db } from '../../../src/lib/firebase'; // Use client SDK for querying if Admin SDK not fully set, or switch to Admin SDK
// For Serverless, Admin SDK is preferred for permissions, but we can use passing a token if needed.
// Given strict setup, I'll assume we use the DB reference available (Client or Admin).
// Ideally Admin SDK. I'll stick to 'firebase-admin' patterns if available, else Client with rules.
// Let's use the Client SDK imported from src/lib/firebase for consistency with existing APIs, 
// relying on the Auth Middleware to gate access, but we might need "Admin" privileges to list keys if Rules allow owner access.

import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';

export default async function handler(req: any, res: any) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // 1. Auth Gate
    const user = await requireDashboardAuth(req);
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        // 2. Query Keys for User
        const keysRef = collection(db, 'api_keys');
        const q = query(
            keysRef,
            where('user_id', '==', user.uid),
            orderBy('created_at', 'desc')
        );

        const snapshot = await getDocs(q);

        // 3. Transform Data
        const keys = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                key_id: doc.id,
                // Don't return full hash/key
                key_hint: data.key_hash ? `...${data.key_hash.substr(-4)}` : '****',
                tier: data.tier,
                is_active: data.is_active,
                created_at: data.created_at instanceof Timestamp ? data.created_at.toDate() : data.created_at,
                usage_count: data.usage_count || 0,
                rate_limit: data.rate_limit_monthly
            };
        });

        return res.status(200).json({ keys });

    } catch (error) {
        console.error('Keys List Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
