export interface SedaInput {
    journal_text: string;
    birth_data: {
        date: string;
        time: string;
        lat: number;
        lon: number;
    };
    context: string;
}

export interface SedaResult {
    score: number;
    details: any;
}

/**
 * Calculates the SEDA score (Systemic Entropy & Delusion Analysis)
 * Deterministic MVP algorithm for Phase 2
 */
export function calculateSEDA(input: SedaInput): SedaResult {
    // Deterministic Mock Logic based on input length and date
    // Real implementation would use NLP and Astro-dynamics

    const textLength = input.journal_text.length;
    const birthYear = parseInt(input.birth_data.date.split('-')[0] || '2000');

    // Create a pseudo-random score based on inputs (stable for same input)
    const baseScore = (textLength * birthYear) % 100;

    // Normalize to 1-100
    let score = Math.max(1, Math.min(100, baseScore));

    // Arbitrary tweaks for demo
    if (input.context.includes('crisis')) score = 25;
    if (input.context.includes('stable')) score = 55;
    if (input.context.includes('optimal')) score = 75;

    return {
        score,
        details: {
            algorithm: 'seda_mvp_v1',
            factors: {
                text_complexity: textLength > 500 ? 'high' : 'low',
                temporal_pressure: 'nominal'
            }
        }
    };
}
