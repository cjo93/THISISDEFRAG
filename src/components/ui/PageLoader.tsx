import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <div className="min-h-[50vh] w-full flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        {/* Simple spinning ring */}
        <div className="w-8 h-8 border-2 border-zinc-800 border-t-white rounded-full animate-spin" />
        <span className="text-zinc-500 text-xs tracking-[0.2em] uppercase animate-pulse">
          Loading
        </span>
      </div>
    </div>
  );
};

export default PageLoader;
