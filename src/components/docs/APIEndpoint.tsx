import React from 'react';

const APIEndpoint: React.FC<{
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    description: string,
    auth?: string
}> = ({ method, path, description, auth }) => {
    const methodColors = {
        GET: 'bg-blue-500/20 text-blue-400',
        POST: 'bg-green-500/20 text-green-400',
        PUT: 'bg-white/20 text-gray-300',
        DELETE: 'bg-red-500/20 text-red-400'
    };

    return (
        <div className="my-6 border border-white/10 rounded-lg overflow-hidden">
            <div className="flex items-center p-3 bg-white/5 border-b border-white/10 font-mono text-sm">
                <span className={`px-2 py-1 rounded text-xs font-bold mr-3 ${methodColors[method]}`}>{method}</span>
                <span className="flex-1 text-white/80">{path}</span>
                {auth && <span className="text-[10px] uppercase tracking-widest text-white/40 border border-white/10 px-2 py-0.5 rounded">Auth: {auth}</span>}
            </div>
            <div className="p-4 bg-black/50 text-white/60 text-sm">
                {description}
            </div>
        </div>
    );
};

export default APIEndpoint;
