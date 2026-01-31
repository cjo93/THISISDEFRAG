import { hashKey } from '../lib/stripe';
import { db } from '../../src/lib/firebase';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';

export type ApiKeyData = {
    key_id: string; // Changed from id to key_id to match Audit Log usage
    key_hash: string;
    user_id: string;
    tier: 'free' | 'pro' | 'enterprise';
    is_active: boolean;
    rate_limit_monthly: number | null;
    monthly_usage: number;
    endpoints: string[];
    expires_at?: any;
};

/**
 * Validates an API key from the request headers or query params
 */
export async function validateApiKey(req: any): Promise<ApiKeyData | null> {
    // 1. Extract key
    let apiKey = req.headers.authorization?.replace('Bearer ', '');
    if (!apiKey) {
        apiKey = typeof req.query.api_key === 'string' ? req.query.api_key : undefined;
    }

    if (!apiKey || !apiKey.startsWith('sk_live_')) {
        return null;
    }

    // 2. Hash key
    const keyHash = hashKey(apiKey);

    // 3. Lookup in Firestore
    try {
        const q = query(collection(db, 'api_keys'), where('key_hash', '==', keyHash), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        const doc = querySnapshot.docs[0];
        const data = doc.data();

        // Ensure key_id matches doc id
        return {
            key_id: doc.id,
            key_hash: data.key_hash,
            user_id: data.user_id,
            tier: data.tier,
            is_active: data.is_active,
            rate_limit_monthly: data.rate_limit_monthly,
            monthly_usage: data.usage_count || 0,
            endpoints: data.endpoints || [],
            expires_at: data.expires_at
        };

    } catch (error) {
        console.error('Auth validation error:', error);
        return null;
    }
}

export async function isEndpointAllowed(keyData: ApiKeyData, endpoint: string): Promise<boolean> {
    if (keyData.endpoints.includes('*')) return true;
    return keyData.endpoints.includes(endpoint);
}
