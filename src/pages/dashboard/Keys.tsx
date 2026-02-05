import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { api } from '../../lib/api-client';
import { Trash2, Copy, Plus, AlertCircle } from 'lucide-react';

const DashboardKeys: React.FC = () => {
  const [keys, setKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newKey, setNewKey] = useState<{key: string, label: string} | null>(null);

  const fetchKeys = async () => {
    try {
      const data = await api.dashboard.getKeys();
      setKeys(data.keys || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const handleCreateKey = async () => {
    const label = prompt("Enter a label for this key (e.g. 'Production App')");
    if (!label) return;

    setCreating(true);
    try {
      const result = await api.dashboard.createKey(label);
      setNewKey(result);
      await fetchKeys();
    } catch (e) {
      alert("Failed to create key");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteKey = async (keyId: string) => {
    if (!confirm("Are you sure you want to revoke this key? This action cannot be undone.")) return;
    try {
      await api.dashboard.deleteKey(keyId);
      await fetchKeys();
    } catch (e) {
      alert("Failed to delete key");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">API Keys</h1>
          <button
            onClick={handleCreateKey}
            disabled={creating}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded text-sm font-bold hover:bg-gray-800 disabled:opacity-50"
          >
            <Plus size={16} />
            {creating ? 'Creating...' : 'Create New Key'}
          </button>
        </div>

        {newKey && (
          <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-green-600 mt-1" size={20} />
              <div className="flex-1">
                <h3 className="font-bold text-green-900 mb-2">Key Created Successfully</h3>
                <p className="text-sm text-green-800 mb-4">
                  Please copy this key now. It will never be shown again.
                </p>
                <div className="flex items-center gap-2 bg-white p-3 rounded border border-green-200 font-mono text-sm break-all">
                  {newKey.key}
                  <button
                    onClick={() => navigator.clipboard.writeText(newKey.key)}
                    className="ml-auto text-gray-500 hover:text-black p-1"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
              <button onClick={() => setNewKey(null)} className="text-green-800 hover:underline text-sm">Close</button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Label</th>
                <th className="px-6 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Key Hint</th>
                <th className="px-6 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Created</th>
                <th className="px-6 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs">Last Used</th>
                <th className="px-6 py-3 font-semibold text-gray-600 uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading keys...</td></tr>
              ) : keys.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No API keys found. Create one to get started.</td></tr>
              ) : (
                keys.map((key) => (
                  <tr key={key.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{key.label}</td>
                    <td className="px-6 py-4 font-mono text-gray-500">...{key.keyHint}</td>
                    <td className="px-6 py-4 text-gray-500">{new Date(key.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-gray-500">{key.lastUsedAt ? new Date(key.lastUsedAt).toLocaleDateString() : 'Never'}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteKey(key.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Revoke Key"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default DashboardKeys;
