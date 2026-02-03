import React from 'react';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

/**
 * Trust Microcopy Components
 * 
 * These components display the positioning and safety statements
 * required by ALIGNMENT_GUARDRAIL_v1.1.md Amendment 5.
 */

/**
 * Infrastructure positioning statement
 * "We are infrastructure, not a personality app."
 */
export function InfrastructureStatement() {
    return (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/60 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            We are infrastructure, not a personality app.
        </div>
    );
}

/**
 * Stance statement
 * "No Astrology, Astrology. No Psychology, Psychology. Just mechanics."
 */
export function StanceStatement() {
    return (
        <p className="text-white/40 text-sm font-mono tracking-wide">
            No Astrology, Astrology. No Psychology, Psychology. <span className="text-white/60">Just mechanics.</span>
        </p>
    );
}

/**
 * Safety Standard Explainer (Compact)
 */
export function SafetyStandardExplainer({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
    if (variant === 'compact') {
        return (
            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
                <Shield size={18} className="text-white mt-0.5 flex-shrink-0" />
                <p className="text-xs text-white/50 leading-relaxed">
                    Every output passes <span className="text-gray-300 font-mono">SEDA</span> safety scoring.
                    At ≤30, we stop analysis and show grounding protocols only.
                    This override is non-negotiable.
                </p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl space-y-4">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5">
                    <Shield size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-light text-white">Safety Standard</h3>
            </div>

            <p className="text-white/50 text-sm leading-relaxed">
                Every DEFRAG output passes <span className="text-gray-300 font-mono">SEDA</span> (Safety-Enhanced Dynamic Assessment) before reaching you.
            </p>

            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                    <CheckCircle size={14} className="text-green-500" />
                    <span className="text-white/60">61–100: Full analysis available</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <CheckCircle size={14} className="text-yellow-500" />
                    <span className="text-white/60">46–60: Mild constraints applied</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle size={14} className="text-white" />
                    <span className="text-white/60">30–45: Heavy constraints + warnings</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle size={14} className="text-red-500" />
                    <span className="text-white/60">≤30: Grounding protocols only (esoteric content blocked)</span>
                </div>
            </div>

            <p className="text-white/30 text-xs font-mono pt-2 border-t border-white/5">
                This override is non-negotiable. SEDA first, content second.
            </p>
        </div>
    );
}

/**
 * Cost of Error Examples
 */
interface CostOfErrorProps {
    audience: 'family' | 'team' | 'platform';
}

const COST_DATA = {
    family: {
        cost: '$15,000–$30,000',
        item: 'average divorce',
        solution: 'ORBIT mapping',
        price: '$39',
    },
    team: {
        cost: '50–200% of annual salary',
        item: 'replacing one bad hire',
        solution: 'ORBIT mapping',
        price: '$39',
    },
    platform: {
        cost: '$1M+',
        item: 'one malpractice suit',
        solution: 'SEDA gating',
        price: '$99/month',
    },
};

export function CostOfError({ audience }: CostOfErrorProps) {
    const data = COST_DATA[audience];

    return (
        <div className="p-4 bg-gradient-to-r from-white/5 to-transparent border-l-2 border-white/20">
            <p className="text-white/70 text-sm">
                The {data.item} costs <span className="text-gray-300 font-bold">{data.cost}</span>.
            </p>
            <p className="text-white/50 text-xs mt-1">
                {data.solution} is <span className="text-white/70">{data.price}</span>.
            </p>
        </div>
    );
}

/**
 * Combined trust block for landing pages
 */
export function TrustBlock() {
    return (
        <div className="space-y-6">
            <InfrastructureStatement />
            <SafetyStandardExplainer variant="compact" />
            <StanceStatement />
        </div>
    );
}
