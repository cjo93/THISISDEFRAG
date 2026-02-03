import { KNOWLEDGE_BASE } from '../data/knowledge_base';

interface InversionRequest {
    current_feeling: string; // User input, e.g., "I feel stuck"
    active_gates: number[];  // From User Profile
}

interface InversionResponse {
    shadow_identified: string;
    gate_source: number;
    gift_target: string;
    actionable_step: string;
}

export class InversionEngine {

    public processInversion(request: InversionRequest): InversionResponse {
        // 1. Semantic Match: Map "feeling" to "Shadow Keywords" in Knowledge Base
        const matchedGate = this.findGateByShadowKeyword(request.current_feeling, request.active_gates);

        if (!matchedGate) {
            return this.genericBypassProtocol();
        }

        // 2. Extract Protocol
        const protocol = matchedGate.inversion_protocol;

        return {
            shadow_identified: matchedGate.frequencies.shadow,
            gate_source: matchedGate.id,
            gift_target: matchedGate.frequencies.gift,
            actionable_step: `PROTOCOL: When you feel ${protocol.trigger}, do not engage. Instead, ${protocol.pivot}. This will activate ${protocol.resolution}.`
        };
    }

    private findGateByShadowKeyword(feeling: string, userGates: number[]): any {
        // Logic: Iterate through user's active gates in KNOWLEDGE_BASE
        // Return the gate where 'shadow' description semantically matches 'feeling'
        // Uses simple NLP or keyword matching

        // Simple mock implementation for now since we only have gates 1 and 2
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
