import React from 'react';
import { Download, FileJson, Palette, Package, ExternalLink } from 'lucide-react';

export default function DeveloperResources() {
    const resources = [
        {
            icon: <Package size={24} />,
            title: "JavaScript/TypeScript SDK",
            description: "Official DEFRAG SDK for Node.js, React, and browser environments.",
            action: "npm install @defrag/sdk",
            type: "npm"
        },
        {
            icon: <Package size={24} />,
            title: "Python SDK",
            description: "Full-featured Python library for backend integrations.",
            action: "pip install defrag-sdk",
            type: "pip"
        },
        {
            icon: <FileJson size={24} />,
            title: "Postman Collection",
            description: "Pre-configured API requests for testing and development.",
            action: "Download Collection",
            type: "download"
        },
        {
            icon: <FileJson size={24} />,
            title: "OpenAPI Specification",
            description: "Complete API schema for code generation and documentation.",
            action: "View Spec",
            type: "link"
        }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-light text-white mb-2">Resources</h1>
                <p className="text-white/50">SDKs, Postman collections, and developer assets.</p>
            </div>

            {/* SDK & Tools */}
            <div>
                <h2 className="text-lg font-medium text-white mb-4">SDKs & Tools</h2>
                <div className="grid gap-4">
                    {resources.map((resource, index) => (
                        <div
                            key={index}
                            className="p-5 bg-white/5 border border-white/10 rounded-xl flex items-center gap-4"
                        >
                            <div className="p-3 bg-white/5 text-white/60 rounded-lg">
                                {resource.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-medium mb-1">{resource.title}</h3>
                                <p className="text-white/40 text-sm">{resource.description}</p>
                            </div>
                            <code className="px-3 py-2 bg-black/50 text-orange-400 text-sm rounded font-mono">
                                {resource.action}
                            </code>
                        </div>
                    ))}
                </div>
            </div>

            {/* Brand Assets */}
            <div>
                <h2 className="text-lg font-medium text-white mb-4">Brand Assets</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                        <Palette size={24} className="text-white/40 mb-3" />
                        <h3 className="text-white font-medium mb-1">Logo Kit</h3>
                        <p className="text-white/40 text-sm mb-3">SVG, PNG logos in all variations.</p>
                        <button className="text-orange-400 text-sm font-medium hover:underline flex items-center gap-1">
                            <Download size={14} /> Download Kit
                        </button>
                    </div>
                    <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                        <Palette size={24} className="text-white/40 mb-3" />
                        <h3 className="text-white font-medium mb-1">Color System</h3>
                        <p className="text-white/40 text-sm mb-3">Brand colors, gradients, and usage.</p>
                        <div className="flex gap-2">
                            <div className="w-6 h-6 rounded bg-orange-500" title="#f97316"></div>
                            <div className="w-6 h-6 rounded bg-black border border-white/20" title="#000000"></div>
                            <div className="w-6 h-6 rounded bg-white" title="#ffffff"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* API Status */}
            <div className="p-5 bg-green-500/5 border border-green-500/20 rounded-xl flex items-center gap-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                    <span className="text-white font-medium">All Systems Operational</span>
                    <p className="text-white/40 text-sm">API uptime: 99.9% over the last 90 days</p>
                </div>
                <a href="https://status.defrag.app" target="_blank" rel="noopener noreferrer" className="text-green-400 text-sm flex items-center gap-1 hover:underline">
                    Status Page <ExternalLink size={14} />
                </a>
            </div>
        </div>
    );
}
