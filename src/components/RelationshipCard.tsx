import React from 'react';
import { Link } from 'react-router-dom';

interface RelationshipCardProps {
    id: string;
    name: string;
    sunSign?: string;
    marsSign?: string;
    relationshipType?: 'partner' | 'family' | 'friend' | 'colleague';
    compatibilityScore?: number;
    isUnlocked?: boolean;
    lastAccessed?: string;
}

/**
 * DEFRAG // Relationship Card
 * Compact card for relationship manual quick access
 */
export default function RelationshipCard({
    id,
    name,
    sunSign = 'Unknown',
    marsSign = 'Unknown',
    relationshipType = 'friend',
    compatibilityScore,
    isUnlocked = false,
    lastAccessed,
}: RelationshipCardProps) {
    const initial = name.charAt(0).toUpperCase();

    const typeColors = {
        partner: 'from-pink-500/20 to-rose-500/10 border-pink-500/30',
        family: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30',
        friend: 'from-green-500/20 to-emerald-500/10 border-green-500/30',
        colleague: 'from-purple-500/20 to-violet-500/10 border-purple-500/30',
    };

    const typeIcons = {
        partner: '💕',
        family: '🏠',
        friend: '✨',
        colleague: '💼',
    };

    return (
        <Link
            to="/manual"
            className="glass-box rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all group relative overflow-hidden block"
        >
            {/* Status badge */}
            <div className="absolute top-3 right-3">
                <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded ${isUnlocked
                        ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                        : 'bg-white/5 border border-white/20 text-gray-300'
                    }`}>
                    {isUnlocked ? 'UNLOCKED' : 'PREVIEW'}
                </span>
            </div>

            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${typeColors[relationshipType]} border flex items-center justify-center flex-shrink-0`}>
                    <span className="text-lg font-light text-white/80">{initial}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs">{typeIcons[relationshipType]}</span>
                        <h3 className="text-base font-medium truncate group-hover:text-white transition-colors">
                            {name}
                        </h3>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-white/40 tracking-wider uppercase">
                        <span>☀️ {sunSign}</span>
                        <span>♂ {marsSign}</span>
                    </div>
                </div>

                {/* Compatibility gauge */}
                {compatibilityScore !== undefined && (
                    <div className="flex-shrink-0 text-center">
                        <div className="text-lg font-mono text-gray-300">{compatibilityScore}%</div>
                        <div className="text-[8px] uppercase tracking-widest text-white/30">sync</div>
                    </div>
                )}
            </div>

            {/* Hover arrow */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                <span className="text-gray-300">→</span>
            </div>
        </Link>
    );
}
