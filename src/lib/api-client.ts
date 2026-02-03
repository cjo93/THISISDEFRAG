import { auth } from './firebase'; // Import auth from firebase config (assumed relative path)

// This helper fetches the current user's ID token and attaches it to requests
export async function authenticatedFetch(url: string, options: RequestInit = {}) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('User not authenticated');
    }

    const token = await user.getIdToken();

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const response = await fetch(url, {
        ...options,
        headers
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    return response.json();
}
