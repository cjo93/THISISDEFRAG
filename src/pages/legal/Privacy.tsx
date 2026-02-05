import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const LegalPrivacy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4 text-sm text-gray-500">Version 2026-01</p>

        <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">1. Data Collection</h2>
            <p className="mb-4">
                We collect:
            </p>
            <ul className="list-disc pl-6 space-y-2">
                <li>Birth data (Date, Time, Location) for orbital calculation.</li>
                <li>Email address for account management.</li>
                <li>Usage telemetry (API calls, latency).</li>
            </ul>
        </section>

        <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">2. Third Party Processors</h2>
            <p className="mb-4">
                We use the following sub-processors:
            </p>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Firebase:</strong> Auth & Database.</li>
                <li><strong>Stripe:</strong> Payment processing.</li>
                <li><strong>Resend:</strong> Transactional email.</li>
            </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default LegalPrivacy;
