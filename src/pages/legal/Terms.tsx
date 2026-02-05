import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const LegalTerms: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-4 text-sm text-gray-500">Version 2026-01</p>

        <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">1. Service Description</h2>
            <p className="mb-4">
                DEFRAG is a computational platform that models human behavior using orbital mechanics and gene keys.
                It is provided "as is" for informational and self-exploration purposes only.
            </p>
        </section>

        <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">2. Acceptable Use</h2>
            <p className="mb-4">
                You agree NOT to use this platform for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
                <li>Emergency services or crisis intervention.</li>
                <li>Medical diagnosis or treatment planning.</li>
                <li>Psychological assessment for employment or insurance.</li>
            </ul>
        </section>

        <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">3. Liability & Indemnity</h2>
            <p className="mb-4">
                DEFRAG Labs Inc. is not liable for decisions made based on system outputs. SEDA scores are heuristics, not facts.
            </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default LegalTerms;
