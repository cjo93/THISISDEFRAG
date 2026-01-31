import { adminAuth } from '@/src/lib/firebase/admin';

export async function requireDashboardAuth(req: any) {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) return null;

        // Use admin SDK to verify token (securely on server)
        // Note: User needs to ensure Firebase Admin is initialized in src/lib/firebase/admin
        const decodedToken = await adminAuth.verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        console.error('Dashboard Auth Error:', error);
        return null;
    }
}
