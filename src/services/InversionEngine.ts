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

export class InversionEngine {

    // ... (Existing processInversion method remains) ...

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

    // --- RELATIONAL AUDIT LOGIC ---

    public performRelationalAudit(system: RelationalSystem): AuditResult {
        let voltage = 0;
        const fusionPoints: string[] = [];
        const triangles: string[] = [];
        const protocols: string[] = [];

        // 1. Calculate Fusion & Voltage
        system.relational_vectors.forEach(vector => {
            if (vector.tension_level === 'High') voltage += 20;
            if (vector.tension_level === 'Medium') voltage += 10;

            if (vector.tension_level === 'High' && vector.frequency === 'Daily') {
                fusionPoints.push(`${vector.from} <--> ${vector.to} (Anxious Fusion)`);
                voltage += 15; // Extra penalty for daily high tension
            }
        });

        // Cap Voltage
        voltage = Math.min(100, voltage);

        // 2. Identify Triangles (Simple 3-node loop check)
        // For MVP: Identifying patterns where A->B is High and B->C is High
        // In a real graph, we'd do a cycle check.
        // Mocking sophisticated detection for now based on vectors provided.
        if (system.nodes.length >= 3) {
            // If primary node has > 2 high tension vectors, it's a likely triangle pivot
            const highTensionVectors = system.relational_vectors.filter(v => v.from === system.system_metadata.primary_node_id && v.tension_level === 'High');
            if (highTensionVectors.length >= 2) {
                const target1 = system.nodes.find(n => n.id === highTensionVectors[0].to)?.role || 'Node B';
                const target2 = system.nodes.find(n => n.id === highTensionVectors[1].to)?.role || 'Node C';
                triangles.push(`Verified Triangle: You are carrying tension between ${target1} and ${target2}.`);
            }
        }

        // 3. Generate Protocol
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
            is_premium_locked: true // Default to locked for detailed view
        };
    }

    private findGateByShadowKeyword(feeling: string, userGates: number[]): any {
        for (const gateId of userGates) {
            const gate = (KNOWLEDGE_BASE.HEXAGRAM_MATRIX.DATA as any)[gateId];
            if (gate && feeling.toLowerCase().includes(gate.frequencies.shadow.toLowerCase())) {
                return gate;
            }
        }
        return null;
    }

    private genericBypassProtocol(): InversionResponse {
        return {
            shadow_identified: "General Friction",
            gate_source: 0,
            gift_target: "Neutrality",
            actionable_step: "MECHANICAL BYPASS: Engage 'Grey Rock' protocol. Provide no data. Observe the system without participating."
        };
    }
}

export const inversionEngineInstance = new InversionEngine();
