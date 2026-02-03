import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { trackEvent, AnalyticsEvents, ConversionFunnel, setUserProperty } from '../lib/analytics';

// Owner emails that bypass payment
const OWNER_EMAILS = ['info@defrag.app', 'chadowen93@gmail.com'];

interface BirthData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  email?: string;
}

// Field explanations for guided onboarding
const FIELD_INFO = {
  email: {
    why: "To save your manual and send you access",
    how: "Encrypted, never shared. Used only for account access and manual delivery.",
    icon: "🔒"
  },
  name: {
    why: "Personalizes your manual for better insights",
    how: "Used privately in your manual. Not visible to others.",
    icon: "👤"
  },
  birthDate: {
    why: "Essential for accurate astrological mapping",
    how: "Calculates your natal chart positions. Stored encrypted.",
    icon: "📅"
  },
  birthTime: {
    why: "Unlocks precise personality architecture",
    how: "Determines rising sign & house placements. Optional but highly recommended.",
    icon: "⏰"
  },
  birthPlace: {
    why: "Refines timing & location-based calculations",
    how: "Used for chart accuracy. Stored securely, never shared publicly.",
    icon: "📍"
  }
};

export default function Start() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'you' | 'them'>('you');
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Check if owner email for pre-fill
  const isOwnerEmail = (email: string) => OWNER_EMAILS.includes(email?.toLowerCase().trim());

  const [userData, setUserData] = useState<BirthData>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    email: '',
  });
  const [partnerData, setPartnerData] = useState<BirthData>({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
  });

  // Auto-fill owner data on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prefillOwner = params.get('owner') === 'true';

    if (prefillOwner) {
      setUserData({
        name: 'Chad',
        birthDate: '1993-07-26',
        birthTime: '20:00',
        birthPlace: 'Upland, California',
        email: 'info@defrag.app',
      });
    }

    // Track step 2 of funnel
    ConversionFunnel.step2_start();
  }, []);

  const currentData = step === 'you' ? userData : partnerData;
  const setCurrentData = step === 'you' ? setUserData : setPartnerData;

  // Animation on step change
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [step]);

  const handleChange = (field: keyof BirthData, value: string) => {
    setCurrentData((prev) => ({ ...prev, [field]: value }));
  };

  const isOwner = OWNER_EMAILS.includes(userData.email?.toLowerCase().trim() || '');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    // Track form completion for current step
    trackEvent(AnalyticsEvents.START_FORM_COMPLETE, { step });

    if (step === 'you') {
      setStep('them');
      // Set user email prop if available
      if (userData.email) {
        setUserProperty('email_provided', 'true');
      }
    } else {
      // Save data
      localStorage.setItem('defrag_unitA', JSON.stringify(userData));
      localStorage.setItem('defrag_unitB', JSON.stringify(partnerData));

      // Track completion of start phase
      trackEvent('start_phase_complete');

      // ALWAYS go to analysis first for the premium "processing" feel
      if (isOwner) {
        localStorage.setItem('defrag_payment_verified', 'true');
        localStorage.setItem('defrag_owner_bypass', 'true');
      }
      navigate('/analysis');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] z-[9999] bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noiseFilter%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.65%22_numOctaves=%223%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-80 -right-80 h-[800px] w-[800px] rounded-full blur-[200px] opacity-[0.12] bg-white transition-all duration-1000"
          style={{ transform: step === 'them' ? 'translate(-100px, 100px)' : 'translate(0, 0)' }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full blur-[150px] opacity-[0.06] bg-white transition-all duration-1000"
          style={{ transform: step === 'them' ? 'translate(50px, -50px)' : 'translate(0, 0)' }}
        />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:60px_60px]" />
      </div>

      <Header />

      {/* Main */}
      <main className="relative z-10 flex items-center justify-center px-6 pt-8 pb-20">
        <div className="w-full max-w-lg">
          {/* Header with animation */}
          <div
            className={`text-center mb-10 transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-white/50" />
              <span className="text-xs tracking-[0.4em] text-gray-300 font-medium">
                {step === 'you' ? 'STEP 01' : 'STEP 02'}
              </span>
              <span className="h-px w-8 bg-white/50" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-4">
              {step === 'you' ? 'Initialize Profile' : 'Partner Profile'}
            </h1>
            <p className="text-base text-white/60 max-w-sm mx-auto leading-relaxed">
              {step === 'you'
                ? 'Begin by establishing your operating baseline.'
                : 'Input the parameters for the person you want to decode.'}
            </p>
          </div>

          {/* Form Card */}
          <div
            className={`glass-box rounded-2xl p-8 shadow-2xl shadow-black/50 transition-all duration-300 ${isAnimating ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}
          >
            <form onSubmit={handleNext} className="space-y-6">
              {/* Email field - only on step 1 */}
              {step === 'you' && (
                <div className="space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <label className="text-xs tracking-[0.25em] text-white/50 flex items-center gap-2 uppercase">
                      Email {FIELD_INFO.email.icon}
                      {isOwner && (
                        <span className="text-[9px] tracking-wider text-gray-300 bg-white/10 px-2 py-0.5 rounded border border-white/20 font-mono">
                          DEV MODE • BYPASS ENABLED
                        </span>
                      )}
                    </label>
                    <button
                      type="button"
                      onClick={() => setActiveTooltip(activeTooltip === 'email' ? null : 'email')}
                      className="text-gray-300/60 hover:text-gray-300 transition-colors text-xs"
                    >
                      {activeTooltip === 'email' ? '✕' : 'ⓘ'}
                    </button>
                  </div>
                  {activeTooltip === 'email' && (
                    <div className="bg-white/10 border border-white/30 rounded-lg p-3 text-xs space-y-2 animate-[fadeIn_0.2s_ease-out]">
                      <div>
                        <span className="text-gray-300 font-semibold">Why we need this:</span>
                        <p className="text-white/70 mt-1">{FIELD_INFO.email.why}</p>
                      </div>
                      <div>
                        <span className="text-gray-300 font-semibold">How it's protected:</span>
                        <p className="text-white/70 mt-1">{FIELD_INFO.email.how}</p>
                      </div>
                    </div>
                  )}
                  <input
                    type="email"
                    required
                    value={userData.email || ''}
                    onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3.5 text-base focus:border-white/50 focus:bg-black/80 outline-none transition-all placeholder:text-white/25"
                  />
                  {isOwner && (
                    <p className="text-[10px] text-gray-300/60 font-mono mt-1">
                      Secure dev access • Full system with payment bypass
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2 relative">
                <div className="flex items-center justify-between">
                  <label className="text-xs tracking-[0.25em] text-white/50 uppercase">
                    {step === 'you' ? 'YOUR NAME' : 'THEIR NAME'} {FIELD_INFO.name.icon}
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveTooltip(activeTooltip === 'name' ? null : 'name')}
                    className="text-gray-300/60 hover:text-gray-300 transition-colors text-xs"
                  >
                    {activeTooltip === 'name' ? '✕' : 'ⓘ'}
                  </button>
                </div>
                {activeTooltip === 'name' && (
                  <div className="bg-white/10 border border-white/30 rounded-lg p-3 text-xs space-y-2 animate-[fadeIn_0.2s_ease-out]">
                    <div>
                      <span className="text-gray-300 font-semibold">Why we need this:</span>
                      <p className="text-white/70 mt-1">{FIELD_INFO.name.why}</p>
                    </div>
                    <div>
                      <span className="text-gray-300 font-semibold">How it's protected:</span>
                      <p className="text-white/70 mt-1">{FIELD_INFO.name.how}</p>
                    </div>
                  </div>
                )}
                <input
                  type="text"
                  required
                  value={currentData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder={step === 'you' ? 'Your first name' : 'Their first name'}
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3.5 text-base focus:border-white/50 focus:bg-black/80 outline-none transition-all placeholder:text-white/25"
                />
              </div>

              <div className="space-y-2 relative">
                <div className="flex items-center justify-between">
                  <label className="text-xs tracking-[0.25em] text-white/50 uppercase">DATE OF BIRTH {FIELD_INFO.birthDate.icon}</label>
                  <button
                    type="button"
                    onClick={() => setActiveTooltip(activeTooltip === 'birthDate' ? null : 'birthDate')}
                    className="text-gray-300/60 hover:text-gray-300 transition-colors text-xs"
                  >
                    {activeTooltip === 'birthDate' ? '✕' : 'ⓘ'}
                  </button>
                </div>
                {activeTooltip === 'birthDate' && (
                  <div className="bg-white/10 border border-white/30 rounded-lg p-3 text-xs space-y-2 animate-[fadeIn_0.2s_ease-out]">
                    <div>
                      <span className="text-gray-300 font-semibold">Why we need this:</span>
                      <p className="text-white/70 mt-1">{FIELD_INFO.birthDate.why}</p>
                    </div>
                    <div>
                      <span className="text-gray-300 font-semibold">How it's protected:</span>
                      <p className="text-white/70 mt-1">{FIELD_INFO.birthDate.how}</p>
                    </div>
                  </div>
                )}
                <input
                  type="date"
                  required
                  value={currentData.birthDate}
                  onChange={(e) => handleChange('birthDate', e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3.5 text-base focus:border-white/50 focus:bg-black/80 outline-none transition-all text-white [color-scheme:dark]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <label className="text-xs tracking-[0.25em] text-white/50 uppercase text-[10px] sm:text-xs">
                      TIME {FIELD_INFO.birthTime.icon}
                    </label>
                    <button
                      type="button"
                      onClick={() => setActiveTooltip(activeTooltip === 'birthTime' ? null : 'birthTime')}
                      className="text-gray-300/60 hover:text-gray-300 transition-colors text-xs"
                    >
                      {activeTooltip === 'birthTime' ? '✕' : 'ⓘ'}
                    </button>
                  </div>
                  {activeTooltip === 'birthTime' && (
                    <div className="absolute z-50 top-full mt-2 left-0 right-0 bg-white/10 border border-white/30 rounded-lg p-3 text-xs space-y-2 animate-[fadeIn_0.2s_ease-out] shadow-2xl">
                      <div>
                        <span className="text-gray-300 font-semibold">Why we need this:</span>
                        <p className="text-white/70 mt-1">{FIELD_INFO.birthTime.why}</p>
                      </div>
                      <div>
                        <span className="text-gray-300 font-semibold">How it's protected:</span>
                        <p className="text-white/70 mt-1">{FIELD_INFO.birthTime.how}</p>
                      </div>
                    </div>
                  )}
                  <input
                    type="time"
                    value={currentData.birthTime}
                    onChange={(e) => handleChange('birthTime', e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3.5 text-base focus:border-white/50 focus:bg-black/80 outline-none transition-all text-white [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <label className="text-xs tracking-[0.25em] text-white/50 uppercase text-[10px] sm:text-xs">
                      LOCATION {FIELD_INFO.birthPlace.icon}
                    </label>
                    <button
                      type="button"
                      onClick={() => setActiveTooltip(activeTooltip === 'birthPlace' ? null : 'birthPlace')}
                      className="text-gray-300/60 hover:text-gray-300 transition-colors text-xs"
                    >
                      {activeTooltip === 'birthPlace' ? '✕' : 'ⓘ'}
                    </button>
                  </div>
                  {activeTooltip === 'birthPlace' && (
                    <div className="absolute z-50 top-full mt-2 left-0 right-0 bg-white/10 border border-white/30 rounded-lg p-3 text-xs space-y-2 animate-[fadeIn_0.2s_ease-out] shadow-2xl">
                      <div>
                        <span className="text-gray-300 font-semibold">Why we need this:</span>
                        <p className="text-white/70 mt-1">{FIELD_INFO.birthPlace.why}</p>
                      </div>
                      <div>
                        <span className="text-gray-300 font-semibold">How it's protected:</span>
                        <p className="text-white/70 mt-1">{FIELD_INFO.birthPlace.how}</p>
                      </div>
                    </div>
                  )}
                  <input
                    type="text"
                    value={currentData.birthPlace}
                    onChange={(e) => handleChange('birthPlace', e.target.value)}
                    placeholder="City"
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3.5 text-base focus:border-white/50 focus:bg-black/80 outline-none transition-all placeholder:text-white/25"
                  />
                </div>
              </div>

              {/* TOS Agreement */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  required
                  id="tos"
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-black text-white focus:ring-white/50 transition-all cursor-pointer"
                />
                <label htmlFor="tos" className="text-xs leading-relaxed text-white/40 cursor-pointer select-none">
                  I agree to the <Link to="/terms" className="text-white/80 hover:text-gray-300 underline decoration-white/20">Terms of Service</Link> and <Link to="/privacy" className="text-white/80 hover:text-gray-300 underline decoration-white/20">Privacy Policy</Link>. This tool provides technical behavioral mapping, not medical or clinical diagnosis.
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                {step === 'them' && (
                  <button
                    type="button"
                    onClick={() => setStep('you')}
                    className="flex-1 h-14 border border-white/15 text-white/70 tracking-[0.15em] text-sm rounded-lg hover:border-white/30 hover:text-white hover:bg-white/[0.02] transition-all"
                  >
                    BACK
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 h-14 bg-white text-black font-semibold tracking-[0.12em] text-sm rounded-lg hover:bg-gray-100 hover:text-black transition-all shadow-lg shadow-white/10 hover:shadow-white/20"
                >
                  {step === 'you' ? 'CONTINUE' : isOwner ? 'GENERATE (FREE)' : 'CHECKOUT'}
                </button>
              </div>
            </form>
          </div>

          {/* Footer note */}
          <p className="mt-8 text-center text-sm text-white/40">
            Your data is encrypted and never shared.
          </p>

          {/* Visual flourish */}
          <div className="mt-12 flex justify-center gap-4 opacity-20">
            <div className="h-1 w-1 rounded-full bg-white" />
            <div className="h-1 w-1 rounded-full bg-white" />
            <div className="h-1 w-1 rounded-full bg-white" />
          </div>
        </div>
      </main>
    </div>
  );
}
