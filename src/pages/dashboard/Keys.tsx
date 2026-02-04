
import React, { useEffect, useState } from 'react';
import { authenticatedFetch } from '../../lib/api-client';
import toast from 'react-hot-toast';
import { Terminal, Copy, Trash2, Key, Info, Zap } from 'lucide-react';

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
            toast.error('Load failed');
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
                body: JSON.stringify({ label: 'System Access Key' })
            });
            setNewKey(data.api_key);
            toast.success('Node established');
            loadKeys();
        } catch (error) {
            toast.error('Deployment failed');
        } finally {
            setCreating(false);
        }
    };

    const revokeKey = async (keyId: string) => {
        if (!confirm('De-commission this node? This action is non-reversible.')) return;
        try {
            await authenticatedFetch('/api-v2/dashboard/keys/revoke', {
                method: 'POST',
                body: JSON.stringify({ key_id: keyId })
            });
            toast.success('Node de-commissioned');
            loadKeys();
        } catch (error) {
            toast.error('Action failed');
        }
    };

    if (loading) return (
        <div className="p-20 flex flex-col items-center justify-center animate-pulse">
            <Terminal size={40} className="text-white/5 mb-8" />
            <div className="text-[10px] font-mono tracking-[0.5em] text-white/10 uppercase italic">Retrieving_Nodes...</div>
        </div>
    );

    return (
        <div className="p-20 max-w-7xl mx-auto space-y-24 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-12">
                <div className="space-y-4">
                    <h1 className="text-5xl font-light text-white tracking-tighter uppercase italic">Access_Nodes</h1>
                    <p className="text-lg text-white/30 font-light italic max-w-xl">Provision and manage high-precision API credentials for your integration.</p>
                </div>
                <button
                    onClick={createKey}
                    disabled={creating}
                    className="h-16 px-10 bg-white text-black text-[10px] font-bold tracking-[0.4em] rounded-full hover:bg-slate-200 transition-all duration-700 disabled:opacity-50 uppercase shadow-2xl"
                >
                    {creating ? 'Generating_Node...' : '+ Establish_Node'}
                </button>
            </div>

            {newKey && (
                <div className="p-10 bg-white/[0.03] border border-white/20 rounded-[40px] relative overflow-hidden group animate-fade-in">
                    <div className="flex items-center gap-4 mb-8">
                        <Zap size={16} className="text-white animate-pulse" />
                        <h3 className="text-white text-[10px] font-mono tracking-[0.5em] uppercase italic">Credential_Established</h3>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                        <code className="flex-1 bg-black/50 border border-white/5 p-6 rounded-2xl text-white font-mono text-sm break-all leading-relaxed shadow-inner">
                            {newKey}
                        </code>
                        <button
                            onClick={() => { navigator.clipboard.writeText(newKey); toast.success('Node copied'); }}
                            className="h-16 w-full sm:w-auto px-10 border border-white/10 text-white/40 text-[10px] font-bold tracking-[0.4em] rounded-full hover:bg-white/10 hover:text-white transition-all uppercase flex items-center justify-center gap-3"
                        >
                            <Copy size={14} />
                            Copy
                        </button>
                    </div>
                    <div className="mt-8 flex items-center gap-4 text-white/20 text-[9px] font-mono tracking-[0.3em] uppercase italic">
                        <Info size={12} />
                        Save this immediately. It will be encrypted and hidden after this session.
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
                </div>
            )}

            <div className="space-y-6">
                {keys.map(key => (
                    <div key={key.key_id} className={`p-10 rounded-[48px] border transition-all duration-700 bg-white/[0.01] hover:bg-white/[0.03] ${key.is_active ? 'border-white/5' : 'border-red-900/10 grayscale opacity-40'} flex flex-col sm:flex-row sm:items-center justify-between gap-12 group`}>
                        <div className="flex gap-10 items-center">
                            <div className={`w-12 h-12 rounded-xl border border-white/5 flex items-center justify-center ${key.is_active ? 'text-white/20 bg-white/5' : 'text-red-900/40 bg-red-900/5'}`}>
                                <Key size={20} strokeWidth={1} />
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-6">
                                    <div className="font-mono text-white text-xl tracking-tighter">{key.key_hint}</div>
                                    <span className={`text-[9px] px-3 py-1 rounded-full font-mono tracking-widest uppercase italic border ${key.is_active ? 'bg-white/5 text-white/40 border-white/10' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                                        {key.is_active ? 'Node_Active' : 'Decommissioned'}
                                    </span>
                                </div>
                                <div className="text-white/20 text-[10px] font-mono tracking-[0.4em] uppercase italic">
                                    Sync: {new Date(key.created_at).toLocaleDateString()} • Tier: {key.tier}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {key.is_active && (
                                <button
                                    onClick={() => revokeKey(key.key_id)}
                                    className="h-12 px-8 border border-white/5 text-white/10 text-[10px] font-bold tracking-[0.4em] rounded-full hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all duration-700 flex items-center gap-3 uppercase shadow-xl"
                                >
                                    <Trash2 size={14} />
                                    Revoke
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {keys.length === 0 && (
                    <div className="p-32 rounded-[64px] border border-white/[0.02] border-dashed text-center space-y-6 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-white/[0.02] flex items-center justify-center text-white/10 mb-4">
                            <Terminal size={32} strokeWidth={1} />
                        </div>
                        <div className="text-white/10 text-[10px] font-mono tracking-[0.8em] uppercase italic">No_Nodes_Connected</div>
                        <p className="text-white/5 text-sm font-light italic">Establish your first access node to begin integration.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
