import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { api } from '../../lib/api-client';
import { useAuth } from '../../lib/auth-context';

const DashboardIndex: React.FC = () => {
  const { userData } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await api.dashboard.getStats();
        setStats(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider">
            {userData?.role || 'Consumer'}
          </span>
        </div>

        {loading ? (
          <div>Loading system metrics...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Current Plan</h3>
              <p className="text-2xl font-bold capitalize">{stats?.plan || 'Free'}</p>
              <Link to="/dashboard/billing" className="text-sm text-blue-600 hover:underline mt-2 block">Manage Subscription</Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Monthly Usage</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{stats?.currentUsage?.toLocaleString() || 0}</span>
                <span className="text-gray-400">/ {stats?.usageLimit?.toLocaleString() || 1000}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
                <div
                  className="bg-black h-1.5 rounded-full"
                  style={{ width: `${Math.min(((stats?.currentUsage || 0) / (stats?.usageLimit || 1)) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">API Keys</h3>
              <p className="text-sm text-gray-600 mb-4">Manage access tokens for your applications.</p>
              <Link to="/dashboard/keys" className="bg-black text-white px-4 py-2 rounded text-sm font-bold hover:bg-gray-800 inline-block">
                Manage Keys
              </Link>
            </div>
          </div>
        )}

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
             <p className="text-gray-500 text-sm">No recent activity detected.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default DashboardIndex;
