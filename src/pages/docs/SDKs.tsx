import React from 'react';
import DocLayout from '../../components/docs/DocLayout';

const SDKs: React.FC = () => {
    return (
        <DocLayout>
            <h1>SDKs</h1>
            <p className="text-xl text-white/60 mb-8">Accelerate development with our official libraries.</p>

            <div className="grid gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                    <h3 className="text-xl font-bold mb-2 text-yellow-400">JavaScript / TypeScript</h3>
                    <p className="text-white/60 text-sm mb-4">For Node.js 14+ and modern browsers (via proxy).</p>
                    <div className="bg-black p-3 rounded font-mono text-xs border border-white/10">npm install @defrag/sdk</div>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                    <h3 className="text-xl font-bold mb-2 text-blue-400">Python</h3>
                    <p className="text-white/60 text-sm mb-4">Sync and Async support. Python 3.8+.</p>
                    <div className="bg-black p-3 rounded font-mono text-xs border border-white/10">pip install defrag-sdk</div>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                    <h3 className="text-xl font-bold mb-2 text-cyan-400">Go</h3>
                    <p className="text-white/60 text-sm mb-4">Idiomatic Go client.</p>
                    <div className="bg-black p-3 rounded font-mono text-xs border border-white/10">go get github.com/defrag/sdk-go</div>
                </div>
            </div>
        </DocLayout>
    );
};

export default SDKs;
