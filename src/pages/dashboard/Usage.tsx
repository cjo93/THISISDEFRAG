import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_DATA = [
  { name: 'Mon', calls: 40 },
  { name: 'Tue', calls: 30 },
  { name: 'Wed', calls: 20 },
  { name: 'Thu', calls: 27 },
  { name: 'Fri', calls: 18 },
  { name: 'Sat', calls: 23 },
  { name: 'Sun', calls: 34 },
];

const DashboardUsage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-8">Usage Analytics</h1>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h3 className="font-bold mb-6">API Calls (Last 7 Days)</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                        <YAxis tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                        <Tooltip
                            cursor={{fill: '#f3f4f6'}}
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                        />
                        <Bar dataKey="calls" fill="#000000" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-bold mb-4">Endpoints by Volume</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="font-mono text-gray-600">POST /v1/seda/audit</span>
                        <span className="font-bold">1,240</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-gray-800 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="font-mono text-gray-600">POST /v1/telemetry/vector</span>
                        <span className="font-bold">850</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-gray-800 h-2 rounded-full" style={{width: '45%'}}></div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-bold mb-4">Error Rate</h3>
                <div className="flex items-center justify-center h-40">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-green-600">0.02%</div>
                        <div className="text-sm text-gray-500 mt-2">Global Error Rate</div>
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default DashboardUsage;
