
import React from 'react';
import { ArrowRight, Code, Shield, Zap, Lock, Mail, Terminal, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const useIsDevPilot = () => {
    const user = JSON.parse(localStorage.getItem('defrag_user') || '{}');
    return user.isDevPilot === true || user.email === 'chadowen93@gmail.com' || user.email === 'info@defrag.app';
};

export default function DeveloperIndex() {
    const isDevPilot = useIsDevPilot();
    if (isDevPilot) return <FullDevDashboard />;
    return <ComingSoonView />;
}

// Minimal "Coming Soon" view for non-pilot users
function ComingSoonView() {
    return (
        <div className="space-y-24 animate-fade-in">
            {/* Header */}
            <div className="space-y-10">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/30 text-[10px] font-mono tracking-[0.3em] uppercase">
                    <Lock size={12} className="text-orange-500/50" />
                    Private Integration Testing
                </div>
                <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-[1.1]">
                    Build with <br />
                    <span className="text-orange-500">Human Intelligence.</span>
                </h1>
                <p className="text-xl text-white/50 max-w-2xl leading-loose font-light">
                    DEFRAG's proprietary behavioral engine is currently in closed alpha. We're collaborating with a small group of infrastructure partners to stabilize the core API.
                </p>
            </div>

            {/* Feature Modules */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-10 rounded-[32px] bg-white/[0.01] border border-white/5 hover:border-orange-500/20 transition-all duration-500 group">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                            <Shield size={20} />
                        </div>
                        <h2 className="text-2xl font-light text-white tracking-tight">SEDA Safety Scores</h2>
                    </div>
                    <p className="text-white/40 leading-relaxed font-light">
                        Real-time clinical safety gating for AI outputs and user context. Implement hard boundaries for autonomous systems.
                    </p>
                </div>

                <div className="p-10 rounded-[32px] bg-white/[0.01] border border-white/5 hover:border-orange-500/20 transition-all duration-500 group">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                            <Activity size={20} />
                        </div>
                        <h2 className="text-2xl font-light text-white tracking-tight">Pressure Telemetry</h2>
                    </div>
                    <p className="text-white/40 leading-relaxed font-light">
                        NASA JPL precision orbital telemetry for environmental pressure analysis. Map collective anxiety vectors at scale.
                    </p>
                </div>
            </div>

            {/* Pricing / Access Card */}
            <div className="p-10 sm:p-16 rounded-[40px] bg-gradient-to-br from-white/[0.02] to-transparent border border-white/10 relative overflow-hidden group">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
                    <div>
                        <div className="text-[10px] font-mono tracking-[0.4em] text-orange-400 uppercase mb-4">Initial Offering</div>
                        <h3 className="text-3xl font-light text-white mb-6">Builder Alpha</h3>
                        <div className="flex items-baseline gap-2 text-4xl font-light text-white mb-8">
                            $99 <span className="text-lg text-white/20">/ month</span>
                        </div>
                        <p className="text-white/40 text-sm font-light max-w-sm">
                            Includes 5,000 monthly audit calls, priority SEDA support, and core Relational Geometry modules.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 shrink-0">
                        <a
                            href="mailto:help@defrag.app?subject=Developer%20API%20Access%20Request"
                            className="h-16 px-12 flex items-center justify-center bg-white text-black font-bold tracking-[0.2em] rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 text-xs shadow-xl group/btn"
                        >
                            REQUEST ACCESS <ArrowRight size={16} className="ml-3 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                        <Link
                            to="/signin"
                            className="h-16 px-12 flex items-center justify-center bg-white/5 text-white border border-white/10 font-bold tracking-[0.2em] rounded-full hover:bg-white/[0.08] transition-all duration-300 text-xs"
                        >
                            SIGN IN (INVITED)
                        </Link>
                    </div>
                </div>
                {/* Background glow */}
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-500/[0.03] rounded-full blur-[100px] pointer-events-none group-hover:bg-orange-500/[0.05] transition-colors" />
            </div>

            <p className="text-center text-white/20 text-[10px] font-mono tracking-[0.5em] uppercase">
                LATENCY 24MS • SOCKETS ACTIVE • CLUSTER OK
            </p>
        </div>
    );
}

// Full dashboard for dev pilots only
function FullDevDashboard() {
    return (
        <div className="space-y-16 animate-fade-in">
            {/* Hero */}
            <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-mono tracking-[0.3em] uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                    Dev Pilot Active
                </div>
                <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-tight">
                    API <span className="text-orange-500">Dashboard</span>
                </h1>
                <p className="text-xl text-white/50 max-w-2xl leading-loose font-light">
                    Your integration keys are active. Sub-100ms latency confirmed across all regional clusters.
                </p>
                <div className="flex flex-wrap gap-6 pt-4">
                    <Link to="/docs/getting-started" className="h-14 px-10 flex items-center justify-center bg-white text-black font-bold tracking-[0.2em] rounded-full hover:bg-orange-500 hover:text-white transition-all text-[10px] uppercase shadow-xl group">
                        Get API Keys <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/docs/api-reference" className="h-14 px-10 flex items-center justify-center bg-white/5 text-white border border-white/10 font-bold tracking-[0.2em] rounded-full hover:bg-white/10 transition-all text-[10px] uppercase">
                        Read Docs
                    </Link>
                </div>
            </div>

            {/* Quick Stats / Status — Refined Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatusCard icon={<Zap size={18} />} label="Cluster Status" value="Stable" color="text-green-400" />
                <StatusCard icon={<Shield size={18} />} label="Security" value="SOC2 Ready" color="text-blue-400" />
                <StatusCard icon={<Terminal size={18} />} label="Engine Version" value="v2.4.0-rc" color="text-orange-400" />
            </div>

            {/* Featured Resources */}
            <div className="pt-16 border-t border-white/5">
                <div className="grid md:grid-cols-2 gap-8">
                    <ResourceCard
                        title="Quick Start Guide"
                        desc="Deployment in under 5 minutes. Support for Python, Node, and Rust."
                        link="/docs/getting-started"
                    />
                    <ResourceCard
                        title="Safety Gating (SEDA)"
                        desc="Implementing the SEDA Firewall for compliant clinical boundaries."
                        link="/developer/guides"
                    />
                </div>
            </div>
        </div>
    );
}

function StatusCard({ icon, label, value, color }: any) {
    return (
        <div className="p-8 rounded-[32px] bg-white/[0.01] border border-white/5 flex items-center gap-6 hover:bg-white/[0.03] transition-colors group">
            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>{icon}</div>
            <div>
                <p className="text-[9px] text-white/20 font-mono tracking-[0.3em] uppercase mb-1">{label}</p>
                <p className={`font-mono text-lg font-black tracking-tight ${color}`}>{value}</p>
            </div>
        </div>
    );
}

function ResourceCard({ title, desc, link }: any) {
    return (
        <Link to={link} className="group p-10 rounded-[32px] border border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent hover:border-orange-500/20 transition-all duration-500">
            <h3 className="text-2xl font-light text-white mb-4 group-hover:text-orange-400 transition-colors uppercase tracking-tight">{title}</h3>
            <p className="text-white/40 text-base leading-relaxed font-light mb-8">{desc}</p>
            <div className="flex items-center gap-3 text-[10px] font-mono font-bold tracking-[0.3em] text-white/20 group-hover:text-white transition-colors">
                READ MODULE <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
    );
}
