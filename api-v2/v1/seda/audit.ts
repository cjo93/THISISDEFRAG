import { validateApiKey, ApiKeyData } from '../../middleware/auth';
import { logAuditEvent } from '../../middleware/logging';
import { calculateSEDA } from '../../../src/lib/seda/calculator';
import { incrementUsageCount } from '../../lib/stripe';
import crypto from 'crypto';

interface SedaRequest {
    journal_text?: string;
    birth_data: {
        date: string; // YYYY-MM-DD
        time: string; // HH:MM
        lat: number;
        lon: number;
    };
    context?: string;
}

interface SedaResponse {
    request_id: string;
    timestamp: string;
    seda_score: number;
    band: 'optimal' | 'stable' | 'caution' | 'crisis';
    mode: 'full' | 'throttled' | 'grounding';
    threshold_details: {
        score_range: string;
        label: string;
        action: string;
    };
    safety_action_taken: string;
    audit_logged: boolean;
    input_hash: string;
}

async function generateRequestId(): Promise<string> {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function hashInput(input: string): string {
    return crypto.createHash('sha256').update(input).digest('hex');
}

function mapScoreToBand(score: number): 'optimal' | 'stable' | 'caution' | 'crisis' {
    if (score >= 61) return 'optimal';
    if (score >= 46) return 'stable';
    if (score >= 30) return 'caution';
    return 'crisis';
}

function getThresholdDetails(band: string): SedaResponse['threshold_details'] {
    const thresholds: Record<string, SedaResponse['threshold_details']> = {
        optimal: {
            score_range: '61–75',
            label: 'Optimal',
            action: 'Full esoteric analysis available. User is integrated and coherent.'
        },
        stable: {
            score_range: '46–60',
            label: 'Stable',
            action: 'Moderate integration. Focus on somatic support and reality testing.'
        },
        caution: {
            score_range: '30–45',
            label: 'Caution',
            action: 'Dual diagnosis risk. Reduce esoteric output by 70%. Prioritize grounding.'
        },
        crisis: {
            score_range: '<30',
            label: 'Clinical Crisis',
            action: 'Stop esoteric analysis. Shift to somatic grounding protocols immediately.'
        }
    };
    return thresholds[band] || thresholds.crisis;
}

export default async function handler(req: any, res: any) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // 1. Validate API key
        const keyData = await validateApiKey(req);

        if (!keyData) {
            return res.status(401).json({
                error: 'Invalid or missing API key',
                code: 'INVALID_API_KEY'
            });
        }

        if (!keyData.is_active) {
            logAuditEvent(keyData.key_id, 'seda_audit', 'REJECTED', {
                reason: 'KEY_INACTIVE'
            });
            return res.status(403).json({
                error: 'API key is no longer active',
                code: 'KEY_INACTIVE'
            });
        }

        // 2. Check rate limit
        if (keyData.rate_limit_monthly && keyData.monthly_usage >= keyData.rate_limit_monthly) {
            logAuditEvent(keyData.key_id, 'seda_audit', 'REJECTED', {
                reason: 'RATE_LIMIT_EXCEEDED',
                current_usage: keyData.monthly_usage,
                limit: keyData.rate_limit_monthly
            });
            return res.status(429).json({
                error: 'Monthly API limit exceeded',
                code: 'RATE_LIMIT_EXCEEDED',
                current_usage: keyData.monthly_usage,
                limit: keyData.rate_limit_monthly
            });
        }

        // 3. Validate request body
        const body: SedaRequest = req.body;

        // Loosely validate birth_data
        if (!body?.birth_data) {
            return res.status(400).json({
                error: 'Missing required birth_data',
                code: 'INVALID_REQUEST'
            });
        }

        // 4. Calculate SEDA score (deterministic, no LLM)
        const inputString = JSON.stringify(body);
        const inputHash = hashInput(inputString);

        const sedaResult = calculateSEDA({
            journal_text: body.journal_text || '',
            birth_data: body.birth_data,
            context: body.context || ''
        });

        const band = mapScoreToBand(sedaResult.score);
        const thresholdDetails = getThresholdDetails(band);

        // 5. Build response
        const requestId = await generateRequestId();
        const timestamp = new Date().toISOString();

        const response: SedaResponse = {
            request_id: requestId,
            timestamp,
            seda_score: sedaResult.score,
            band,
            mode: band === 'crisis' ? 'grounding' : band === 'caution' ? 'throttled' : 'full',
            threshold_details: thresholdDetails,
            safety_action_taken:
                band === 'crisis' ? 'escalate_to_grounding' :
                    band === 'caution' ? 'throttle_content' :
                        'allow_full_analysis',
            audit_logged: true,
            input_hash: inputHash
        };

        // 6. Log audit event
        logAuditEvent(keyData.key_id, 'seda_audit', 'SUCCESS', {
            seda_score: sedaResult.score,
            band,
            action: response.safety_action_taken
        });

        // 7. Increment usage counter
        await incrementUsageCount(keyData.key_id);

        // 8. Return response
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('X-Request-ID', requestId);
        res.setHeader('X-SEDA-Score', sedaResult.score.toString());
        res.setHeader('X-SEDA-Band', band);

        return res.status(200).json(response);

    } catch (error) {
        console.error('SEDA Audit Error:', error);

        // Try to log even if we failed
        logAuditEvent('unknown', 'seda_audit', 'ERROR', {
            error: error instanceof Error ? error.message : String(error)
        });

        return res.status(500).json({
            error: 'Internal server error',
            code: 'INTERNAL_ERROR',
            request_id: `err_${Date.now()}`
        });
    }
}
