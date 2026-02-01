/**
 * SEDA Threshold Behaviors
 * 
 * PROTECTED FILE: Do not modify without explicit ticket.
 * See .agent/ALIGNMENT_GUARDRAIL_v1.1.md Amendment 4.
 * 
 * These thresholds encode safety-first behavior, not just copy guidelines.
 * SEDA first, content second — this is hard law.
 */

import { SEDABehavior, SEDAScore, SEDATier, SEDAGateResult } from './types';

// Threshold boundaries (non-negotiable)
export const SEDA_THRESHOLDS = {
    FULL_ACCESS: 61,      // 61-100: Full analysis allowed
    MILD_CONSTRAINT: 46,  // 46-60: Throttle intensity, emphasize integration
    HEAVY_CONSTRAINT: 30, // 30-45: Heavy constraint, explicit warnings
    GROUNDING_ONLY: 0,    // 0-29: Graceful degradation, somatic only
} as const;

/**
 * Determine SEDA tier from score
 */
export function getSEDATier(score: number): SEDATier {
    if (score >= SEDA_THRESHOLDS.FULL_ACCESS) return 'full';
    if (score >= SEDA_THRESHOLDS.MILD_CONSTRAINT) return 'mild';
    if (score >= SEDA_THRESHOLDS.HEAVY_CONSTRAINT) return 'heavy';
    return 'grounding';
}

/**
 * Get behavioral configuration for a SEDA score
 * This is the authoritative behavior encoding — not copy, but action.
 */
export function getSEDABehavior(score: number): SEDABehavior {
    const tier = getSEDATier(score);

    const baseBehavior: SEDABehavior = {
        score,
        tier,
        allowed: {
            fullAnalysis: false,
            mildConstraints: false,
            heavyConstraints: false,
            groundingOnly: false,
        },
        actions: {
            throttleIntensity: 0,
            showWarnings: false,
            blockEsoteric: false,
            forceSomatic: false,
        },
    };

    switch (tier) {
        case 'full':
            return {
                ...baseBehavior,
                allowed: { ...baseBehavior.allowed, fullAnalysis: true },
                actions: {
                    throttleIntensity: 1.0,
                    showWarnings: false,
                    blockEsoteric: false,
                    forceSomatic: false,
                },
            };

        case 'mild':
            return {
                ...baseBehavior,
                allowed: { ...baseBehavior.allowed, mildConstraints: true },
                actions: {
                    throttleIntensity: 0.7,
                    showWarnings: false,
                    blockEsoteric: false,
                    forceSomatic: false,
                },
            };

        case 'heavy':
            return {
                ...baseBehavior,
                allowed: { ...baseBehavior.allowed, heavyConstraints: true },
                actions: {
                    throttleIntensity: 0.3,
                    showWarnings: true,
                    blockEsoteric: true,
                    forceSomatic: false,
                },
            };

        case 'grounding':
        default:
            return {
                ...baseBehavior,
                allowed: { ...baseBehavior.allowed, groundingOnly: true },
                actions: {
                    throttleIntensity: 0,
                    showWarnings: true,
                    blockEsoteric: true,
                    forceSomatic: true,
                },
            };
    }
}

/**
 * SEDA Gate - First call in every high-impact flow
 * Returns whether the flow should proceed and with what constraints
 */
export function sedaGate(score: SEDAScore): SEDAGateResult {
    const behavior = getSEDABehavior(score.value);

    // Graceful degradation blocks all esoteric content
    if (behavior.tier === 'grounding') {
        return {
            passed: true, // Flow continues, but only grounding content
            score,
            behavior,
            blockedReason: 'Safety score requires grounding protocols only. Esoteric content blocked.',
        };
    }

    return {
        passed: true,
        score,
        behavior,
    };
}

/**
 * Get grounding content for graceful degradation
 * When score ≤ 30, this is the ONLY content shown
 */
export function getGroundingContent(): {
    title: string;
    items: string[];
    disclaimer: string;
} {
    return {
        title: 'Stabilization Protocols',
        items: [
            'Ensure 7-9 hours of sleep tonight',
            'Hydrate: 8 glasses of water minimum',
            'Reduce stimulants (caffeine, news, social media)',
            'Ground physically: walk outside for 15 minutes',
            'Delay major decisions for 48 hours',
        ],
        disclaimer: 'Deep analysis is temporarily unavailable. These protocols help restore baseline stability.',
    };
}
