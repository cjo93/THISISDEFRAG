import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { AlertTriangle } from 'lucide-react';

const LegalClinical: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-8 max-w-4xl mx-auto">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8">
            <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="text-amber-600" />
                <h1 className="text-2xl font-bold text-amber-900">Clinical & Safety Disclaimer</h1>
            </div>
            <p className="text-amber-800">
                Please read this carefully before using the platform.
            </p>
        </div>

        <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">1. Not Medical Advice</h2>
            <p className="mb-4">
                DEFRAG is NOT a medical device, mental health service, or suicide prevention tool.
                The "SEDA Score" and "Band" are mathematical abstractions of stress, not clinical diagnoses.
            </p>
        </section>

        <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">2. Crisis Protocol</h2>
            <p className="mb-4">
                If you or someone you know is in immediate danger, has a medical emergency, or is having suicidal thoughts,
                please call 911 or your local emergency number immediately.
            </p>
        </section>

        <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">3. User Responsibility</h2>
            <p className="mb-4">
                By using this API/Platform, you acknowledge that you are responsible for your own well-being.
                Developers integrating SEDA must implement the Grounding Protocol when <code className="bg-gray-100 px-1">clinical_crisis</code> is detected.
            </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default LegalClinical;
