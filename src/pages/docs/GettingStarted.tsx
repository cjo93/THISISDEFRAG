import React from 'react';
import DocLayout from '../../components/docs/DocLayout';

const GettingStarted: React.FC = () => {
    return (
        <DocLayout>
            <h1>Getting Started</h1>
            <p className="text-xl text-white/60 mb-8">This guide will help you set up DEFRAG and make your first API call.</p>

            <section className="mb-12">
                <h2>Prerequisites</h2>
                <ul className="list-disc pl-6 space-y-2 text-white/80">
                    <li>Node.js 14+ or Python 3.8+</li>
                    <li>DEFRAG account (free signup)</li>
                    <li>API key from Dashboard</li>
                </ul>
            </section>

            <section className="mb-12">
                <h2>Installation</h2>
                <p className="mb-4 text-white/80">Choose your language and install the SDK:</p>
                <div className="bg-white/5 p-4 rounded-lg font-mono text-sm border border-white/10 text-cyan-400">
                    npm install @defrag/sdk
                </div>
            </section>

            <section className="mb-12">
                <h2>Your First Request</h2>
                <p className="mb-4 text-white/80">Authenticate and query the SEDA engine:</p>
                <div className="bg-white/5 p-4 rounded-lg font-mono text-sm border border-white/10 text-white/80">
                    <span className="text-purple-400">const</span> defrag = require(<span className="text-green-400">'@defrag/sdk'</span>);<br />
                    <span className="text-purple-400">const</span> client = <span className="text-purple-400">new</span> defrag.Client(<span className="text-green-400">'YOUR_API_KEY'</span>);<br /><br />

                    <span className="text-purple-400">const</span> result = <span className="text-purple-400">await</span> client.seda.audit({'{\n  "journal_text": "System Check"\n}'});<br />
                    console.log(result);
                </div>
            </section>

            <section>
                <h2>Next Steps</h2>
                <div className="flex gap-4 mt-6">
                    <a href="/docs/api-reference" className="px-6 py-3 bg-white text-black font-bold rounded hover:bg-white/90 transition">API Reference</a>
                    <a href="/dashboard" className="px-6 py-3 border border-white/20 rounded hover:border-white transition">Get API Key</a>
                </div>
            </section>
        </DocLayout>
    );
};

export default GettingStarted;
