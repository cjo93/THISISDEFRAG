import React from 'react';
import { ArrowRight, Code, Shield, Zap, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Check if user has dev pilot access (internal flag)
// This would normally come from your auth context/user profile
const useIsDevPilot = () => {
    // For now, check localStorage or a similar mechanism
    // In production, this should come from user.isDevPilot in your auth system
    const user = JSON.parse(localStorage.getItem('defrag_user') || '{}');
    return user.isDevPilot === true || user.email === 'chadowen93@gmail.com' || user.email === 'info@defrag.app';
};

export default function DeveloperIndex() {
    const isDevPilot = useIsDevPilot();

    // Show full dev dashboard only for dev pilots
    if (isDevPilot) {
        return <FullDevDashboard />;
    }

    // Show restricted "coming soon" view for everyone else
    return <ComingSoonView />;
}

// Minimal "Coming Soon" view for non-pilot users
function ComingSoonView() {
    return (
        <div className="max-w-5xl mx-auto space-y-16 md:space-y-24 px-6">
            {/* Header */}
            <div className="pt-20 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/40 font-mono text-xs font-semibold letter-spacing-widest text-orange-300 uppercase">
                    <Lock size={12} />
                    PRIVATE TESTING
                </div>
                <div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-6">
                        Developer <span className="bg-gradient-to-br from-white to-orange-400 bg-clip-text text-transparent">API</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-white/60 max-w-2xl">
                        We're testing this with a small group. If you've been invited, sign in and check your dashboard.
                    </p>
                </div>
            </div>

            {/* What This Will Do */}
            <div className="p-8 rounded-xl border border-white/8 bg-white/[0.03] backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-2xl lg:text-3xl font-semibold text-white">What this will do</h2>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/40 font-mono text-xs font-semibold letter-spacing-widest text-orange-300 uppercase">Coming Soon</span>
                </div>

                <ul className="space-y-6 text-white/60">
                    <li className="flex items-start gap-4">
                        <span className="text-orange-400 mt-0.5 text-xl flex-shrink-0">◆</span>
                        <div>
                            <strong className="text-white/90 block mb-1">SEDA Safety Scores</strong>
                            <span className="text-white/50">Real-time clinical safety gating for AI outputs and user content.</span>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <span className="text-orange-400 mt-0.5 text-xl flex-shrink-0">◆</span>
                        <div>
                            <strong className="text-white/90 block mb-1">Pressure Mapping</strong>
                            <span className="text-white/50">NASA JPL precision orbital telemetry for environmental pressure analysis.</span>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <span className="text-orange-400 mt-0.5 text-xl flex-shrink-0">◆</span>
                        <div>
                            <strong className="text-white/90 block mb-1">Relational Geometry</strong>
                            <span className="text-white/50">Multi-person system mapping for teams and families.</span>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Testing Phase Info */}
            <div className="p-8 rounded-xl border border-orange-500/30 bg-orange-500/10">
                <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 flex-shrink-0">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-3">Builder (testing)</h3>
                        <p className="text-white/60 leading-relaxed mb-4">
                            Up to 5,000 calls a month while we're in testing. Includes safety scores, pressure scores, and basic group mapping.
                        </p>
                        <p className="text-orange-400 font-mono text-sm font-semibold">From $99 / month</p>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
                <a
                    href="mailto:help@defrag.app?subject=Developer%20API%20Access%20Request"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-orange-500 text-black font-bold text-sm tracking-wider uppercase rounded-full hover:bg-orange-400 transition-all duration-300"
                >
                    Request Access <ArrowRight size={16} />
                </a>
                <Link
                    to="/signin"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white/15 text-white font-semibold text-sm tracking-wider uppercase rounded-full hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                >
                    Sign In (Invited Users)
                </Link>
            </div>

            {/* Note */}
            <p className="text-white/30 text-xs font-mono">
                If you need access for a real project, contact support and we'll discuss your use case.
            </p>
        </div>
    );
}

// Full dashboard for dev pilots only
function FullDevDashboard() {
    return (
        <div className="space-y-12">
            {/* Hero */}
            <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                    DEV PILOT ACCESS
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
