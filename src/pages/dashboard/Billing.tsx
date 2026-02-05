import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { CreditCard, Check } from 'lucide-react';

const DashboardBilling: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 p-8 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-2">Billing & Plans</h1>
        <p className="text-gray-600 mb-8">Manage your subscription and payment methods.</p>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-lg font-bold">Current Plan: Free Tier</h3>
                    <p className="text-sm text-gray-500">Perfect for prototyping and hobby projects.</p>
                </div>
                <span className="bg-gray-100 text-gray-800 text-xs font-bold px-3 py-1 rounded-full uppercase">Active</span>
            </div>

            <button className="bg-black text-white px-6 py-2 rounded font-bold hover:bg-gray-800">
                Upgrade to Pro
            </button>
        </div>

        <h3 className="font-bold mb-6 text-xl">Available Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 opacity-50">
                 <h4 className="font-bold text-lg mb-2">Free</h4>
                 <div className="text-2xl font-bold mb-4">-bash <span className="text-sm font-normal text-gray-500">/mo</span></div>
                 <ul className="space-y-3 text-sm text-gray-600 mb-6">
                    <li className="flex gap-2"><Check size={16} /> 1,000 calls/month</li>
                    <li className="flex gap-2"><Check size={16} /> 3 Active Keys</li>
                    <li className="flex gap-2"><Check size={16} /> Community Support</li>
                 </ul>
                 <button disabled className="w-full border border-gray-300 py-2 rounded font-bold text-gray-400">Current Plan</button>
             </div>

             <div className="bg-white p-6 rounded-lg shadow-sm border border-black relative overflow-hidden">
                 <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-3 py-1 rounded-bl">RECOMMENDED</div>
                 <h4 className="font-bold text-lg mb-2">Pro</h4>
                 <div className="text-2xl font-bold mb-4">9 <span className="text-sm font-normal text-gray-500">/mo</span></div>
                  <ul className="space-y-3 text-sm text-gray-600 mb-6">
                    <li className="flex gap-2 text-black"><Check size={16} /> 50,000 calls/month</li>
                    <li className="flex gap-2 text-black"><Check size={16} /> Unlimited Keys</li>
                    <li className="flex gap-2 text-black"><Check size={16} /> Email Support</li>
                    <li className="flex gap-2 text-black"><Check size={16} /> Commercial License</li>
                 </ul>
                 <button className="w-full bg-black text-white py-2 rounded font-bold hover:bg-gray-800">Upgrade</button>
             </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default DashboardBilling;
