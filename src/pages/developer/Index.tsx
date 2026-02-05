import React from 'react';
import DocLayout from '../../components/layout/DocLayout';
import { Link } from 'react-router-dom';

const DeveloperIndex: React.FC = () => {
  return (
    <DocLayout>
      <div className="border-b border-gray-200 pb-8 mb-8">
        <h1 className="text-4xl font-bold mb-4">Defrag Developer Platform</h1>
        <p className="text-xl text-gray-600">
          Build higher-order agents with the physics of human behavior.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link to="/docs/getting-started" className="block group">
            <div className="p-6 border border-gray-200 rounded-lg hover:border-black transition-colors">
                <h3 className="font-bold text-lg mb-2 group-hover:underline">Quick Start</h3>
                <p className="text-gray-600 text-sm">Get your API key and run your first simulation in minutes.</p>
            </div>
        </Link>

        <Link to="/developer/guides" className="block group">
            <div className="p-6 border border-gray-200 rounded-lg hover:border-black transition-colors">
                <h3 className="font-bold text-lg mb-2 group-hover:underline">Integration Guides</h3>
                <p className="text-gray-600 text-sm">Best practices for connecting SEDA to LLM agents.</p>
            </div>
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">System Status</h2>
        <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-full inline-flex text-sm font-bold">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            All Systems Nominal
        </div>
      </div>
    </DocLayout>
  );
};
export default DeveloperIndex;
