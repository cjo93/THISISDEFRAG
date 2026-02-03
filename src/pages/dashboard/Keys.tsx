import React, { useEffect, useState } from 'react';
import { authenticatedFetch } from '../../lib/api-client';
import toast from 'react-hot-toast';

export default function Keys() {
    const [keys, setKeys] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [newKey, setNewKey] = useState<string | null>(null);

    useEffect(() => {
        loadKeys();
    }, []);

    const loadKeys = async () => {
        try {
            const data = await authenticatedFetch('/api-v2/dashboard/keys');
            setKeys(data.keys);
        } catch (error) {
            toast.error('Failed to load keys');
        } finally {
            setLoading(false);
        }
    };

    const createKey = async () => {
        setCreating(true);
        try {
            const data = await authenticatedFetch('/api-v2/dashboard/keys/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ label: 'New Dashboard Key' })
            });
            setNewKey(data.api_key);
            toast.success('Key created! Copy it now.');
            loadKeys(); // Refresh list
        } catch (error) {
            toast.error('Failed to create key');
        } finally {
            setCreating(false);
        }
    };

    const revokeKey = async (keyId: string) => {
        if (!confirm('Are you sure? This action cannot be undone.')) return;
        try {
            await authenticatedFetch('/api-v2/dashboard/keys/revoke', {
                method: 'POST',
                body: JSON.stringify({ key_id: keyId })
            });
            toast.success('Key revoked');
            loadKeys();
        } catch (error) {
            toast.error('Failed to revoke key');
        }
    };

    if (loading) return <div className="p-12 text-white">Loading...</div>;

    return (
        <div className="p-12 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-light">API Keys</h1>
                <button
                    onClick={createKey}
                    disabled={creating}
                    className="bg-cyan-500 text-black px-6 py-3 rounded uppercase tracking-widest font-bold text-sm hover:bg-cyan-400 transition disabled:opacity-50"
                >
                    {creating ? 'Generating...' : '+ Generate Key'}
                </button>
            </div>

            {newKey && (
                <div className="mb-8 p-6 bg-green-900/20 border border-green-500/50 rounded-xl">
                    <h3 className="text-green-500 font-bold mb-2 uppercase tracking-widest text-xs">New Key Generated</h3>
                    <div className="flex items-center gap-4">
                        <code className="flex-1 bg-black p-4 rounded text-green-400 font-mono text-sm break-all">
                            {newKey}
                        </code>
                        <button
                            onClick={() => { navigator.clipboard.writeText(newKey); toast.success('Copied'); }}
                            className="text-white/40 hover:text-white text-xs uppercase"
                        >
                            Copy
                        </button>
                    </div>
                    <p className="text-white/40 text-xs mt-4">
                        Please save this key immediately. It will not be shown again.
                    </p>
                </div>
            )}

            <div className="space-y-4">
                {keys.map(key => (
                    <div key={key.key_id} className={`p-6 bg-white/5 border ${key.is_active ? 'border-white/10' : 'border-red-900/30 bg-red-900/5'} rounded-xl flex items-center justify-between`}>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <div className="font-mono text-white text-lg">{key.key_hint}</div>
                                {!key.is_active && <span className="text-[10px] bg-red-500/20 text-red-500 px-2 py-0.5 rounded uppercase">Revoked</span>}
                                {key.is_active && <span className="text-[10px] bg-green-500/20 text-green-500 px-2 py-0.5 rounded uppercase">Active</span>}
                            </div>
                            <div className="text-white/40 text-xs font-mono">
                                Created: {new Date(key.created_at).toLocaleDateString()} • Tier: {key.tier}
                            </div>
                        </div>
                        <div>
                            {key.is_active && (
                                <button
                                    onClick={() => revokeKey(key.key_id)}
                                    className="text-red-500/50 hover:text-red-500 text-xs uppercase tracking-widest border border-red-500/20 px-4 py-2 rounded hover:bg-red-500/10 transition"
                                >
                                    Revoke
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {keys.length === 0 && (
                    <div className="text-center py-20 text-white/20 font-mono">
                        No API keys found. Generate one to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
