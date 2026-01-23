import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';
import RelationshipCard from '../components/RelationshipCard';

interface UserProfile {
    name: string;
    email: string;
    birthDate: string;
    birthTime?: string;
    birthPlace?: string;
    sun_sign?: string;
    mars_sign?: string;
    rising_sign?: string;
}

interface RelationshipData {
    id: string;
    name: string;
    birthDate: string;
    birthTime?: string;
    birthPlace?: string;
    sun_sign?: string;
    mars_sign?: string;
    relationshipType: 'partner' | 'family' | 'friend' | 'colleague';
    compatibilityScore?: number;
    isUnlocked: boolean;
    createdAt: string;
}

/**
 * DEFRAG // Mission Control Dashboard
 * Central hub for user identity and relationship management
 */
export default function Dashboard() {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [relationships, setRelationships] = useState<RelationshipData[]>([]);
    const [hasPayment, setHasPayment] = useState(false);

    useEffect(() => {
        // Load user profile (stored at signup)
        const storedUser = localStorage.getItem('defrag_user_profile');
        const storedUnitA = localStorage.getItem('defrag_unitA');
        const storedUnitB = localStorage.getItem('defrag_unitB');
        const payment = localStorage.getItem('defrag_payment_verified') === 'true';

        setHasPayment(payment);

        // Try new format first, fall back to legacy
        if (storedUser) {
            setUserProfile(JSON.parse(storedUser));
        } else if (storedUnitA) {
            // Legacy format migration
            const unitA = JSON.parse(storedUnitA);
            setUserProfile({
                name: unitA.name || 'User',
                email: unitA.email || '',
                birthDate: unitA.birthDate || '',
                birthTime: unitA.birthTime,
                birthPlace: unitA.birthPlace,
                sun_sign: unitA.sun_sign,
                mars_sign: unitA.mars_sign,
            });
        }

        // Load relationships
        const storedRelationships = localStorage.getItem('defrag_relationships');
        if (storedRelationships) {
            setRelationships(JSON.parse(storedRelationships));
        } else if (storedUnitB) {
            // Legacy: convert unitB to relationship format
            const unitB = JSON.parse(storedUnitB);
            if (unitB.name) {
                setRelationships([{
                    id: 'legacy-1',
                    name: unitB.name,
                    birthDate: unitB.birthDate,
                    birthTime: unitB.birthTime,
                    birthPlace: unitB.birthPlace,
                    sun_sign: unitB.sun_sign,
                    mars_sign: unitB.mars_sign,
                    relationshipType: 'partner',
                    isUnlocked: payment,
                    createdAt: new Date().toISOString(),
                }]);
            }
        }
    }, []);

    // Generate archetype based on sun sign
    const getArchetype = (sunSign?: string): string => {
        const archetypes: Record<string, string> = {
            'Aries': 'The Initiator',
            'Taurus': 'The Stabilizer',
            'Gemini': 'The Connector',
            'Cancer': 'The Nurturer',
            'Leo': 'The Performer',
            'Virgo': 'The Analyst',
            'Libra': 'The Harmonizer',
            'Scorpio': 'The Transformer',
            'Sagittarius': 'The Explorer',
            'Capricorn': 'The Architect',
            'Aquarius': 'The Innovator',
            'Pisces': 'The Dreamer',
        };
        return archetypes[sunSign || ''] || 'The Operator';
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-orange-500/20">
            {/* Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.015] z-[9999] bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noiseFilter%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.65%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

            {/* Ambient background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[150px]" />
                <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-orange-400/5 rounded-full blur-[120px]" />
            </div>

            <Header />

            <main className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20">

                {/* Welcome Header */}
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <h1 className="text-4xl font-light tracking-tight mb-2">Mission Control</h1>
                        <p className="text-white/40 text-sm tracking-widest uppercase">
                            Dashboard // v1.3.0
                        </p>
                    </div>
                    <Link
                        to="/start"
                        className="bg-white text-black px-6 py-3 rounded-lg text-xs font-bold tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-lg shadow-white/5"
                    >
                        + ADD PERSON
                    </Link>
                </div>

                {/* Your Profile Card */}
                {userProfile ? (
                    <div className="mb-12">
                        <h2 className="text-xs tracking-[0.3em] text-white/30 uppercase mb-4">Your Profile</h2>
                        <ProfileCard
                            name={userProfile.name}
                            sunSign={userProfile.sun_sign}
                            marsSign={userProfile.mars_sign}
                            risingSign={userProfile.rising_sign}
                            archetype={getArchetype(userProfile.sun_sign)}
                        />
                    </div>
                ) : (
                    <div className="mb-12 glass-box rounded-2xl p-8 border border-dashed border-white/10 text-center">
                        <p className="text-white/40 mb-4">Set up your profile to unlock personalized insights</p>
                        <Link
                            to="/start"
                            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg text-xs font-bold tracking-widest hover:bg-orange-400 transition-all"
                        >
                            INITIALIZE PROFILE
                        </Link>
                    </div>
                )}

                {/* Relationship Manuals */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xs tracking-[0.3em] text-white/30 uppercase">Your Manuals</h2>
                        <span className="text-[10px] text-white/20 font-mono">{relationships.length} mapped</span>
                    </div>

                    {relationships.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {relationships.map((rel) => (
                                <RelationshipCard
                                    key={rel.id}
                                    id={rel.id}
                                    name={rel.name}
                                    sunSign={rel.sun_sign}
                                    marsSign={rel.mars_sign}
                                    relationshipType={rel.relationshipType}
                                    compatibilityScore={rel.compatibilityScore}
                                    isUnlocked={rel.isUnlocked}
                                />
                            ))}

                            {/* Add new card */}
                            <Link
                                to="/start"
                                className="glass-box rounded-xl p-5 border border-dashed border-white/10 hover:border-orange-500/30 transition-all flex items-center justify-center gap-3 text-white/40 hover:text-orange-400 min-h-[100px]"
                            >
                                <span className="text-2xl">+</span>
                                <span className="text-xs tracking-widest uppercase">Add Person</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl">
                            <div className="text-4xl mb-4 opacity-30">🔗</div>
                            <p className="text-white/30 text-sm mb-6">No relationship manuals generated yet.</p>
                            <Link
                                to="/start"
                                className="text-orange-500 hover:text-orange-400 text-sm underline underline-offset-4"
                            >
                                Map your first relationship
                            </Link>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid sm:grid-cols-3 gap-4">
                    <Link
                        to="/how-it-works"
                        className="glass-box p-6 rounded-xl border border-white/5 hover:border-white/10 transition-all group"
                    >
                        <div className="text-2xl mb-3 opacity-50 group-hover:opacity-100 transition-opacity">📖</div>
                        <h3 className="text-sm font-medium mb-1">How It Works</h3>
                        <p className="text-[11px] text-white/40">Learn the methodology</p>
                    </Link>

                    <Link
                        to="/about"
                        className="glass-box p-6 rounded-xl border border-white/5 hover:border-white/10 transition-all group"
                    >
                        <div className="text-2xl mb-3 opacity-50 group-hover:opacity-100 transition-opacity">🧬</div>
                        <h3 className="text-sm font-medium mb-1">About DEFRAG</h3>
                        <p className="text-[11px] text-white/40">The science behind it</p>
                    </Link>

                    <a
                        href="mailto:info@defrag.app"
                        className="glass-box p-6 rounded-xl border border-white/5 hover:border-white/10 transition-all group"
                    >
                        <div className="text-2xl mb-3 opacity-50 group-hover:opacity-100 transition-opacity">💬</div>
                        <h3 className="text-sm font-medium mb-1">Get Support</h3>
                        <p className="text-[11px] text-white/40">Questions? We're here</p>
                    </a>
                </div>

                {/* Footer note */}
                <div className="mt-16 text-center">
                    <p className="text-[10px] text-white/20 tracking-widest uppercase">
                        Your data is encrypted • Never shared • Stored locally
                    </p>
                </div>

            </main>
        </div>
    );
}
