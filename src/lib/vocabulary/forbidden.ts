/**
 * DEFRAG Vocabulary Lock
 * 
 * PROTECTED FILE: Do not modify without explicit ticket.
 * See .agent/ALIGNMENT_GUARDRAIL_v1.1.md Amendment 2.
 * 
 * This enforces the moat vocabulary across all user-facing content.
 */

/**
 * Terms that MUST NOT appear in user-facing content (hard block)
 */
export const FORBIDDEN_TERMS = [
    // Mystical framing
    'energy',
    'vibes',
    'cosmic',
    'manifest',
    'destiny',
    'universe',
    'spiritual',
    'chakra',
    'aura',
    'higher self',
    'twin flame',
    'soul mate',
    'soulmate',
    'karmic',
    'karma',
    'awakening',
    'ascension',
    'divine',
    'sacred',

    // Clinical diagnosis
    'bpd',
    'npd',
    'trauma',
    'disorder',
    'diagnosis',
    'mental illness',
    'pathology',
    'broken',
    'damaged',
    'healed',
    'fixed',
    'cured',
    'treatment plan',
    'therapy',
    'therapeutic',
] as const;

/**
 * Terms that trigger review warning (not hard block)
 */
export const WARNING_TERMS = [
    'personality',      // Use "design specification"
    'compatible',       // Use "coherent" or "low friction"
    'compatibility',    // Use "coherence"
    'harmony',          // Use "coherence"
    'healing',          // Use "stabilization"
    'journey',          // Use "process" or "integration"
    'growth',           // Use "development" or "adaptation"
    'transformation',   // Use "recalibration"
    'alignment',        // Careful: OK in technical contexts, not spiritual
] as const;

/**
 * Required vocabulary mappings
 * When the left term is used, it should be replaced with the right term
 */
export const VOCABULARY_MAP: Record<string, string> = {
    'personality type': 'design specification',
    'personality': 'design',
    'compatible': 'coherent',
    'compatibility': 'coherence',
    'harmony': 'coherence',
    'chart data': 'Human OS JSON Object',
    'birth chart': 'design specification',
    'natal chart': 'design specification',
    'transits': 'Environmental Pressure',
    'transit': 'Environmental Pressure',
    'inner planets': 'Biological Pressure',
    'outer planets': 'Environmental Pressure',
    'relationship reading': 'Relational Geometry map',
    'compatibility score': 'friction coefficient',
    'synastry': 'Relational Geometry',
    'composite chart': 'system map',
    'astrology': 'behavioral mechanics',
    'astrological': 'mechanical',
    'horoscope': 'pressure forecast',
    'zodiac sign': 'gate position',
};

/**
<<<<<<< HEAD
=======
 * Optimization: Pre-compile regex and map for faster lookup
 */
const FORBIDDEN_REGEX = new RegExp(
    FORBIDDEN_TERMS.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
    'gi'
);

const FORBIDDEN_TERM_MAP = new Map<string, string>();
FORBIDDEN_TERMS.forEach(term => FORBIDDEN_TERM_MAP.set(term.toLowerCase(), term));

/**
>>>>>>> origin/main
 * Check text for forbidden terms
 * Returns array of violations found
 */
export function checkForbiddenTerms(text: string): string[] {
<<<<<<< HEAD
    const lowerText = text.toLowerCase();
    return FORBIDDEN_TERMS.filter(term => lowerText.includes(term.toLowerCase()));
=======
    const matches = text.match(FORBIDDEN_REGEX);
    if (!matches) return [];

    const violations = new Set<string>();
    for (const match of matches) {
        const term = FORBIDDEN_TERM_MAP.get(match.toLowerCase());
        if (term) violations.add(term);
    }
    return Array.from(violations);
>>>>>>> origin/main
}

/**
 * Check text for warning terms
 * Returns array of terms that need review
 */
export function checkWarningTerms(text: string): string[] {
    const lowerText = text.toLowerCase();
    return WARNING_TERMS.filter(term => lowerText.includes(term.toLowerCase()));
}

/**
 * Suggest vocabulary replacements for a text
 */
export function suggestReplacements(text: string): { original: string; suggested: string }[] {
    const suggestions: { original: string; suggested: string }[] = [];
    const lowerText = text.toLowerCase();

    for (const [original, suggested] of Object.entries(VOCABULARY_MAP)) {
        if (lowerText.includes(original.toLowerCase())) {
            suggestions.push({ original, suggested });
        }
    }

    return suggestions;
}

/**
 * Lint result for vocabulary checking
 */
export interface VocabularyLintResult {
    passed: boolean;
    forbidden: string[];
    warnings: string[];
    suggestions: { original: string; suggested: string }[];
}

/**
 * Full vocabulary lint check
 */
export function lintVocabulary(text: string): VocabularyLintResult {
    const forbidden = checkForbiddenTerms(text);
    const warnings = checkWarningTerms(text);
    const suggestions = suggestReplacements(text);

    return {
        passed: forbidden.length === 0,
        forbidden,
        warnings,
        suggestions,
    };
}
