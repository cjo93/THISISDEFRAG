import { db } from '../../src/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function logAuditEvent(
    keyId: string,
    endpoint: string,
    status: 'SUCCESS' | 'REJECTED' | 'ERROR',
    metadata: Record<string, any> = {}
): Promise<void> {
    try {
        // Fire and forget logging
        addDoc(collection(db, 'api_audit_logs'), {
            key_id: keyId,
            endpoint,
            status,
            timestamp: new Date(),
            metadata,
            // ip_address: metadata.ip || 'unknown' // IP often hard to get reliably in serverless without req context
        }).catch(err => console.error('Audit logging async error:', err));

    } catch (error) {
        console.error('Audit logging failed:', error);
        // Don't throw; logging failures shouldn't break the API
    }
}
