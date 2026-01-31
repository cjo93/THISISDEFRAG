import React from 'react';
import { Link } from 'react-router-dom';

const DocLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-black text-white">
            {/* Sidebar Placeholder */}
            <aside className="w-64 border-r border-white/10 hidden md:block">
                <div className="p-6">
                    <Link to="/docs" className="text-xl font-bold tracking-widest">DOCS</Link>
                </div>
                <nav className="p-4 space-y-1">
                    <Link to="/docs/getting-started" className="block px-3 py-2 text-white/60 hover:text-white">Getting Started</Link>
                    <Link to="/docs/api-reference" className="block px-3 py-2 text-white/60 hover:text-white">API Reference</Link>
                    <Link to="/docs/authentication" className="block px-3 py-2 text-white/60 hover:text-white">Authentication</Link>
                    <Link to="/docs/sdks" className="block px-3 py-2 text-white/60 hover:text-white">SDKs</Link>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <main className="flex-1 p-8 md:p-12 max-w-4xl mx-auto w-full prose prose-invert">
                    {children}
                </main>
                <footer className="p-8 border-t border-white/10 text-center text-white/40 text-sm">
                    DEFRAG Developer Documentation
                </footer>
            </div>
        </div>
    );
};

export default DocLayout;
