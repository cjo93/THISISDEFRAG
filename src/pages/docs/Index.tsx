import React from 'react';
import { Link } from 'react-router-dom';

const DocsIndex: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-20">
            <section className="text-center mb-20">
                <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tighter">Documentation</h1>
                <p className="text-xl text-white/40 max-w-2xl mx-auto mb-10">
                    This is the core manual for developers. It helps you build safety barriers into your autonomous agents. It does this by providing standard implementation patterns for our API.
                </p>
                <div className="max-w-xl mx-auto relative">
                    <input
                        type="text"
                        placeholder="Search API reference, guides..."
                        className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition"
                    />
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <Link to="/docs/getting-started" className="p-8 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition group">
                    <h3 className="text-xl mb-3 group-hover:text-cyan-400 transition">Getting Started</h3>
                    <p className="text-white/40 text-sm">Set up your environment and make your first API call in minutes.</p>
                </Link>
                <Link to="/docs/api-reference" className="p-8 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition group">
                    <h3 className="text-xl mb-3 group-hover:text-cyan-400 transition">API Reference</h3>
                    <p className="text-white/40 text-sm">Complete endpoint documentation with examples and schemas.</p>
                </Link>
                <Link to="/docs/authentication" className="p-8 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition group">
                    <h3 className="text-xl mb-3 group-hover:text-cyan-400 transition">Authentication</h3>
                    <p className="text-white/40 text-sm">Secure API key management and request signing.</p>
                </Link>
                <Link to="/docs/sdks" className="p-8 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition group">
                    <h3 className="text-xl mb-3 group-hover:text-cyan-400 transition">SDKs</h3>
                    <p className="text-white/40 text-sm">Official libraries for Node, Python, and Go.</p>
                </Link>
                <Link to="/docs/code-examples" className="p-8 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition group">
                    <h3 className="text-xl mb-3 group-hover:text-cyan-400 transition">Code Examples</h3>
                    <p className="text-white/40 text-sm">Copy-paste ready recipes for common use cases.</p>
                </Link>
                <Link to="/docs/faqs" className="p-8 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition group">
                    <h3 className="text-xl mb-3 group-hover:text-cyan-400 transition">FAQs</h3>
                    <p className="text-white/40 text-sm">Troubleshooting and common support questions.</p>
                </Link>
            </section>
        </div>
    );
};

export default DocsIndex;
