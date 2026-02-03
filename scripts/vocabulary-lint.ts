#!/usr/bin/env node

/**
 * DEFRAG Vocabulary Linter
 * 
 * CI gate that blocks deploys when forbidden vocabulary appears in user-facing surfaces.
 * Run: npx ts-node scripts/vocabulary-lint.ts
 * 
 * Exit codes:
 *   0 = Pass (no forbidden terms)
 *   1 = Fail (forbidden terms found)
 *   2 = Warnings only (review recommended)
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

// Forbidden terms (hard block)
const FORBIDDEN_TERMS = [
    'energy', 'vibes', 'cosmic', 'manifest', 'destiny', 'universe',
    'spiritual', 'chakra', 'aura', 'higher self', 'twin flame',
    'soul mate', 'soulmate', 'karmic', 'karma', 'awakening',
    'ascension', 'divine', 'sacred',
    'bpd', 'npd', 'trauma', 'disorder', 'diagnosis', 'mental illness',
    'pathology', 'broken', 'damaged', 'healed', 'fixed', 'cured',
    'treatment plan', 'therapy', 'therapeutic'
];

// Warning terms (review required)
const WARNING_TERMS = [
    'personality', 'compatible', 'compatibility', 'harmony',
    'healing', 'journey', 'growth', 'transformation', 'alignment'
];

// Directories to scan (user-facing)
const SCAN_DIRS = [
    'src/pages/**/*.tsx',
    'src/components/**/*.tsx',
    'public/**/*.html'
];

// Directories to exclude
const EXCLUDE_PATTERNS = [
    '**/node_modules/**',
    '**/*.test.*',
    '**/*.spec.*',
    '**/lib/vocabulary/**', // Don't lint the linter
    '**/.agent/**'          // Internal docs
];

interface LintViolation {
    file: string;
    line: number;
    term: string;
    type: 'forbidden' | 'warning';
    context: string;
}

async function lintFile(filePath: string): Promise<LintViolation[]> {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const violations: LintViolation[] = [];

    lines.forEach((line, index) => {
        const lowerLine = line.toLowerCase();

        // Check forbidden terms
        for (const term of FORBIDDEN_TERMS) {
            if (lowerLine.includes(term.toLowerCase())) {
                violations.push({
                    file: filePath,
                    line: index + 1,
                    term,
                    type: 'forbidden',
                    context: line.trim().substring(0, 80)
                });
            }
        }

        // Check warning terms
        for (const term of WARNING_TERMS) {
            if (lowerLine.includes(term.toLowerCase())) {
                violations.push({
                    file: filePath,
                    line: index + 1,
                    term,
                    type: 'warning',
                    context: line.trim().substring(0, 80)
                });
            }
        }
    });

    return violations;
}

async function main() {
    console.log('🔍 DEFRAG Vocabulary Linter\n');
    console.log('Scanning user-facing files for forbidden vocabulary...\n');

    let allFiles: string[] = [];

    for (const pattern of SCAN_DIRS) {
        const files = await glob(pattern, {
            ignore: EXCLUDE_PATTERNS,
            cwd: process.cwd()
        });
        allFiles = [...allFiles, ...files];
    }

    console.log(`Found ${allFiles.length} files to scan.\n`);

    const allViolations: LintViolation[] = [];

    for (const file of allFiles) {
        const violations = await lintFile(file);
        allViolations.push(...violations);
    }

    const forbidden = allViolations.filter(v => v.type === 'forbidden');
    const warnings = allViolations.filter(v => v.type === 'warning');

    // Report forbidden terms
    if (forbidden.length > 0) {
        console.log('❌ FORBIDDEN TERMS FOUND:\n');
        for (const v of forbidden) {
            console.log(`  ${v.file}:${v.line}`);
            console.log(`    Term: "${v.term}"`);
            console.log(`    Context: ${v.context}\n`);
        }
    }

    // Report warnings
    if (warnings.length > 0) {
        console.log('⚠️  WARNING TERMS (review recommended):\n');
        for (const v of warnings) {
            console.log(`  ${v.file}:${v.line}`);
            console.log(`    Term: "${v.term}"`);
            console.log(`    Context: ${v.context}\n`);
        }
    }

    // Summary
    console.log('─'.repeat(50));
    console.log(`\n📊 Summary:`);
    console.log(`   Files scanned: ${allFiles.length}`);
    console.log(`   Forbidden terms: ${forbidden.length}`);
    console.log(`   Warning terms: ${warnings.length}\n`);

    if (forbidden.length > 0) {
        console.log('❌ LINT FAILED: Remove forbidden terms before deploying.\n');
        process.exit(1);
    } else if (warnings.length > 0) {
        console.log('⚠️  LINT PASSED with warnings. Review before deploying.\n');
        process.exit(2);
    } else {
        console.log('✅ LINT PASSED: No vocabulary violations found.\n');
        process.exit(0);
    }
}

main().catch(err => {
    console.error('Lint error:', err);
    process.exit(1);
});
