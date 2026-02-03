import React from 'react';
import { Link } from 'react-router-dom';

const DocsIndex: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-20">
            <section className="text-center mb-20 pt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyan-500/50 text-cyan-400 text-[10px] font-mono tracking-widest uppercase mb-6 rounded bg-cyan-500/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    Developer Resources
                </div>
                <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight text-white">
                    Build with <span className="text-cyan-400">Cognitive Middleware</span>
                </h1>
                <p className="text-xl text-white/50 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                    Integrate NASA-grade telemetry and SEDA safety gating into your platform.
                    The definitive guide to implementing the Safety-Enhanced Dynamic Assessment protocol.
                </p>
                <div className="max-w-xl mx-auto relative">
                    <input
                        type="text"
                        placeholder="Search API reference, protocols..."
                        className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition font-mono text-sm"
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
