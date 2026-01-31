import { requireDashboardAuth } from '../../middleware/dashboard-auth';
import { db } from '../../../src/lib/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const user = await requireDashboardAuth(req);
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { key_id } = req.body;
    if (!key_id) {
        return res.status(400).json({ error: 'Missing key_id' });
    }

    try {
        const keyRef = doc(db, 'api_keys', key_id);
        const keySnap = await getDoc(keyRef);

        if (!keySnap.exists()) {
            return res.status(404).json({ error: 'Key not found' });
        }

        if (keySnap.data().user_id !== user.uid) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        await updateDoc(keyRef, {
            is_active: false
        });

        return res.status(200).json({ success: true, message: 'Key revoked' });

    } catch (error) {
        console.error('Revoke Key Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
