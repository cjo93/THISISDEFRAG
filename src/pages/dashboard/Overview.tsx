import React from 'react';
import { Link } from 'react-router-dom';

export default function Overview() {
  return (
    <div className="flex flex-col h-full p-6 justify-center max-w-md mx-auto animate-fade-in min-h-[60vh]">

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-serif italic text-white mb-3">Defrag.</h1>
        <p className="text-gray-400 text-sm">
          Behavioral intelligence for you and your people.
        </p>
      </div>

      <div className="space-y-4">

        {/* ECHO -> MY PROFILE */}
        <Link to="/echo" className="block bg-[#0f0f0f] border border-white/10 p-5 rounded hover:bg-[#1a1a1a] transition-colors group">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium text-white group-hover:text-white/90">1. My Profile</h2>
          </div>
          <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
             Your personal operating manual. See your strengths and stress triggers.
          </p>
        </Link>

        {/* ORBIT -> RELATIONSHIPS */}
        <Link to="/relational" className="block bg-[#0f0f0f] border border-white/10 p-5 rounded hover:bg-[#1a1a1a] transition-colors group">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium text-white group-hover:text-white/90">2. Relationships</h2>
          </div>
          <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
            Compare manuals. See where you clash and how to connect.
          </p>
        </Link>

        {/* SIGNAL -> REAL-TIME HELP */}
        <Link to="/signal" className="block bg-[#0f0f0f] border border-white/10 p-5 rounded hover:bg-[#1a1a1a] transition-colors group">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium text-white group-hover:text-white/90">3. Real-Time Help</h2>
          </div>
          <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
            Stressed right now? Get an immediate answer for a specific problem.
          </p>
        </Link>

      </div>
    </div>
  );
}
