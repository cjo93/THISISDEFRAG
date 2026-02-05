import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const DocLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Header />
      <div className="flex flex-1">
        <aside className="w-64 border-r border-gray-200 p-6 hidden md:block bg-gray-50">
          <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-500">Documentation</h3>
          <nav className="space-y-1">
            <Link to="/docs/getting-started" className="block py-1 hover:text-black">Getting Started</Link>
            <Link to="/docs/api-reference" className="block py-1 hover:text-black">API Reference</Link>
            <Link to="/docs/authentication" className="block py-1 hover:text-black">Authentication</Link>
            <Link to="/docs/sdks" className="block py-1 hover:text-black">SDKs</Link>
          </nav>
        </aside>
        <main className="flex-1 p-8 max-w-4xl mx-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
export default DocLayout;
