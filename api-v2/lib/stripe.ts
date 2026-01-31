import Stripe from 'stripe';
import crypto from 'crypto';
import { db } from '../../src/lib/firebase';
import { doc, increment, updateDoc } from 'firebase/firestore';

// Initialize Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16',
    typescript: true,
});

/**
 * Hash an API key for secure storage using SHA-256
 */
export function hashKey(key: string): string {
    return crypto.createHash('sha256').update(key).digest('hex');
}

/**
 * Generate a new random API key with standard prefix
 */
export function generateApiKey(): string {
    return 'sk_live_' + crypto.randomBytes(24).toString('hex');
}

/**
 * Increments the usage count for a given API key ID
 */
export async function incrementUsageCount(keyId: string): Promise<void> {
    try {
        const keyRef = doc(db, 'api_keys', keyId);
        await updateDoc(keyRef, {
            usage_count: increment(1),
            last_used: new Date()
        });
    } catch (error) {
        console.error(`Failed to increment usage for key ${keyId}:`, error);
    }
}
