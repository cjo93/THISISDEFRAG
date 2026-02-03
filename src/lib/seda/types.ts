/**
 * SEDA (Safety-Enhanced Dynamic Assessment) Types
 * 
 * PROTECTED FILE: Do not modify without explicit ticket.
 * See .agent/ALIGNMENT_GUARDRAIL_v1.1.md Amendment 4.
 */

export type SEDATier = 'full' | 'mild' | 'heavy' | 'grounding';

export interface SEDAScore {
    value: number;        // 0-100
    tier: SEDATier;
    timestamp: number;
    source: 'computed' | 'cached' | 'default';
}

export interface SEDABehavior {
    score: number;
    tier: SEDATier;
    allowed: {
        fullAnalysis: boolean;      // 61-75+
        mildConstraints: boolean;   // 46-60
        heavyConstraints: boolean;  // 30-45
        groundingOnly: boolean;     // ≤30
    };
    actions: {
        throttleIntensity: number;  // 0-1 multiplier for content depth
        showWarnings: boolean;      // Display safety warnings
        blockEsoteric: boolean;     // Block deep interpretive content
        forceSomatic: boolean;      // Force grounding protocols only
    };
}

export interface SEDAAuditEntry {
    timestamp: number;
    userIdHash: string;     // Never store PII
    score: number;
    tier: SEDATier;
    actionTaken: 'allow' | 'constrain' | 'block' | 'ground';
    flowType: 'echo' | 'orbit' | 'signal' | 'api';
    // Note: Never log narrative content in audit trail
}

export interface SEDAGateResult {
    passed: boolean;
    score: SEDAScore;
    behavior: SEDABehavior;
    blockedReason?: string;
}
