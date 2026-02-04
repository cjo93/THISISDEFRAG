import { KNOWLEDGE_BASE } from '../data/knowledge_base';

// --- RELATIONAL INVERSION ENGINE TYPES ---

export interface InversionRequest {
    current_feeling: string; // User input, e.g., "I feel stuck"
    active_gates: number[];  // From User Profile
}

export interface InversionResponse {
    shadow_identified: string;
    gate_source: number;
    gift_target: string;
    actionable_step: string;
}

export interface RelationalNode {
    id: string;
    role: string;
    status: 'Active' | 'Cut-off' | 'Estranged';
    birth_data?: { date: string; time?: string; location?: string; };
    design_type?: string;
    authority?: string;
}

export interface RelationalVector {
    from: string;
    to: string;
    type: 'Direct' | 'Fusion' | 'Cut-off' | 'Projection';
    tension_level: 'Low' | 'Medium' | 'High';
    frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Rarely';
}

export interface RelationalSystem {
    system_metadata: {
        group_name: string;
        primary_node_id: string;
        analysis_date: string;
    };
    nodes: RelationalNode[];
    relational_vectors: RelationalVector[];
}

export interface AuditResult {
    system_voltage: number; // 0-100%
    fusion_points: string[];
    triangles: string[];
    action_protocol: string[];
    is_premium_locked: boolean;
}


const SHADOW_GATES = [
    { gate: 21, shadow: "Control", gift: "Authority" },
    { gate: 31, shadow: "Arrogance", gift: "Leadership" },
    { gate: 38, shadow: "Struggle", gift: "Perseverance" },
    { gate: 58, shadow: "Dissatisfaction", gift: "Vitality" },
    { gate: 19, shadow: "Dependency", gift: "Sensitivity" }
];

export interface ShadowInversionResult {
    identified_pattern: string;
    systemic_tension: number;
    corrective_frequency: string;
    action_protocol: string[];
    is_locked: boolean;
}

export class InversionEngine {

    // ... (Existing methods) ...

    public performShadowInversion(inputText: string): ShadowInversionResult {
        // 1. Analyze Input against Shadows
        const lowerInput = inputText.toLowerCase();
        let matchedGate = SHADOW_GATES.find(g => lowerInput.includes(g.shadow.toLowerCase()));

        // Fallback logic if no exact match (simple sentiment association or default)
        if (!matchedGate) {
            // Check for related keywords (Expansion for specific demo words)
            if (lowerInput.includes("micromanage") || lowerInput.includes("boss")) matchedGate = SHADOW_GATES.find(g => g.gate === 21); // Control
            else if (lowerInput.includes("know all") || lowerInput.includes("better than")) matchedGate = SHADOW_GATES.find(g => g.gate === 31); // Arrogance
            else if (lowerInput.includes("fight") || lowerInput.includes("hard")) matchedGate = SHADOW_GATES.find(g => g.gate === 38); // Struggle
            else if (lowerInput.includes("unhappy") || lowerInput.includes("joy")) matchedGate = SHADOW_GATES.find(g => g.gate === 58); // Dissatisfaction
            else if (lowerInput.includes("need") || lowerInput.includes("cling")) matchedGate = SHADOW_GATES.find(g => g.gate === 19); // Dependency
        }

        // Default if absolute fail
        if (!matchedGate) matchedGate = SHADOW_GATES[0]; // Default to Control for demo

        // 2. Generate Protocol (Mechanical Steps)
        const protocols = [
            `Stop communication about the issue for 24 hours.`,
            `Write down the objective goal: "${matchedGate.gift}".`,
            `State the goal to the other person without mentioning emotions.`
        ];

        return {
            identified_pattern: `${matchedGate.shadow} (Gate ${matchedGate.gate})`,
            systemic_tension: Math.floor(Math.random() * 30) + 70, // Mock tension 70-100 for dramatic effect
            corrective_frequency: matchedGate.gift,
            action_protocol: protocols,
            is_locked: true
        };
    }

    // Existing methods below...
    public processInversion(request: InversionRequest): InversionResponse {
        const matchedGate = this.findGateByShadowKeyword(request.current_feeling, request.active_gates);
        if (!matchedGate) return this.genericBypassProtocol();

        const protocol = matchedGate.inversion_protocol;
        return {
            shadow_identified: matchedGate.frequencies.shadow,
            gate_source: matchedGate.id,
            gift_target: matchedGate.frequencies.gift,
            actionable_step: `PROTOCOL: When you feel ${protocol.trigger}, do not engage. Instead, ${protocol.pivot}. This will activate ${protocol.resolution}.`
        };
    }

    public performRelationalAudit(system: RelationalSystem): AuditResult {
        // ... (Keep existing implementation)
        let voltage = 0;
        const fusionPoints: string[] = [];
        const triangles: string[] = [];
        const protocols: string[] = [];

        system.relational_vectors.forEach(vector => {
            if (vector.tension_level === 'High') voltage += 20;
            if (vector.tension_level === 'Medium') voltage += 10;

            if (vector.tension_level === 'High' && vector.frequency === 'Daily') {
                fusionPoints.push(`${vector.from} <--> ${vector.to} (Anxious Fusion)`);
                voltage += 15;
            }
        });
        voltage = Math.min(100, voltage);

        if (system.nodes.length >= 3) {
            const highTensionVectors = system.relational_vectors.filter(v => v.from === system.system_metadata.primary_node_id && v.tension_level === 'High');
            if (highTensionVectors.length >= 2) {
                const target1 = system.nodes.find(n => n.id === highTensionVectors[0].to)?.role || 'Node B';
                const target2 = system.nodes.find(n => n.id === highTensionVectors[1].to)?.role || 'Node C';
                triangles.push(`Verified Triangle: You are carrying tension between ${target1} and ${target2}.`);
            }
        }

        if (voltage > 60) {
            protocols.push("DETRIANGULATE: Communicate directly with each member. Do not relay messages.");
            protocols.push("NEUTRALIZE: Engage 'Grey Rock' method for High Tension vectors.");
        } else {
            protocols.push("MAINTAIN: System is relatively stable. Monitor daily frequency.");
        }

        return {
            system_voltage: voltage,
            fusion_points: fusionPoints,
            triangles: triangles,
            action_protocol: protocols,
            is_premium_locked: true
        };
    }

    private findGateByShadowKeyword(feeling: string, userGates: number[]): any {
        // ... (Keep existing)
        for (const gateId of userGates) {
            const gate = (KNOWLEDGE_BASE.HEXAGRAM_MATRIX.DATA as any)[gateId];
            if (gate && feeling.toLowerCase().includes(gate.frequencies.shadow.toLowerCase())) {
                return gate;
            }
        }
        return null;
    }

    private genericBypassProtocol(): InversionResponse {
        // ... (Keep existing)
        return {
            shadow_identified: "General Friction",
            gate_source: 0,
            gift_target: "Neutrality",
            actionable_step: "MECHANICAL BYPASS: Engage 'Grey Rock' protocol. Provide no data. Observe the system without participating."
        };
    }
}

export const inversionEngineInstance = new InversionEngine();
