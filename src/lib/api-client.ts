import { auth } from './firebase';

const API_BASE = '/api'; // In dev this might need proxy, in prod it's same domain Vercel functions

async function getAuthHeaders() {
  const user = auth.currentUser;
  if (!user) return {};
  const token = await user.getIdToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export const api = {
  dashboard: {
    getKeys: async () => {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API_BASE}/dashboard/keys`, { headers });
      if (!res.ok) throw new Error('Failed to fetch keys');
      return res.json();
    },
    createKey: async (label: string) => {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API_BASE}/dashboard/keys-create`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ label }),
      });
      if (!res.ok) throw new Error('Failed to create key');
      return res.json();
    },
    deleteKey: async (keyId: string) => {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API_BASE}/dashboard/keys-delete?keyId=${keyId}`, {
        method: 'DELETE',
        headers,
      });
      if (!res.ok) throw new Error('Failed to delete key');
      return res.json();
    },
    getStats: async () => {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API_BASE}/dashboard/stats`, { headers });
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    }
  }
};
