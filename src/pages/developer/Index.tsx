import React from 'react';
import { ArrowRight, Code, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DeveloperIndex() {
    return (
        <div className="space-y-12">
            {/* Hero */}
            <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                    v2.0 API LIVE
                </div>
                <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight">
                    Build with <span className="text-orange-500">Human Intelligence</span>
                </h1>
                <p className="text-xl text-white/50 max-w-2xl leading-relaxed">
                    Integrate DEFRAG's proprietary behavioral engine into your application.
                    Bank-grade security, sub-100ms latency, and NASA-precision data.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    <Link to="/docs/getting-started" className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold tracking-wide rounded hover:bg-white/90 transition text-sm uppercase">
                        Get API Keys <ArrowRight size={16} />
                    </Link>
                    <Link to="/docs/api-reference" className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white border border-white/10 font-medium tracking-wide rounded hover:bg-white/10 transition text-sm uppercase">
                        Read Docs
                    </Link>
                </div>
            </div>

            {/* Quick Stats / Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatusCard icon={<Zap size={20} />} label="System Status" value="Operational" color="text-green-400" />
                <StatusCard icon={<Shield size={20} />} label="Security Level" value="SOC2 Type II" color="text-blue-400" />
                <StatusCard icon={<Code size={20} />} label="Latest Version" value="v2.0.0" color="text-orange-400" />
            </div>

            {/* Featured Resources */}
            <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <ResourceCard
                    title="Quick Start Guide"
                    desc="Integration in under 5 minutes. Python, Node, and Go examples."
                    link="/docs/getting-started"
                />
                <ResourceCard
                    title="Safety Gating (SEDA)"
                    desc="Implementing the SEDA Firewall for compliant clinical boundaries."
                    link="/developer/guides"
                />
            </div>
        </div>
    );
}

function StatusCard({ icon, label, value, color }: any) {
    return (
        <div className="p-6 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-white/5 ${color}`}>{icon}</div>
            <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-1">{label}</p>
                <p className={`font-mono text-lg font-bold ${color}`}>{value}</p>
            </div>
        </div>
    );
}

function ResourceCard({ title, desc, link }: any) {
    return (
        <Link to={link} className="group p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-orange-500/30 transition-all">
            <h3 className="text-xl font-light text-white mb-2 group-hover:text-orange-400 transition-colors">{title}</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-4">{desc}</p>
            <div className="flex items-center gap-2 text-xs font-mono text-white/30 group-hover:text-white transition-colors">
                READ ARTICLE <ArrowRight size={12} />
            </div>
        </Link>
    );
}
