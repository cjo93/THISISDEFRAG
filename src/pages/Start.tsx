import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Owner emails that bypass payment
const OWNER_EMAILS = ['info@defrag.app', 'chadowen93@gmail.com'];

interface BirthData {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  email?: string;
}

export default function Start() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'you' | 'them'>('you');
  const [isAnimating, setIsAnimating] = useState(false);
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
    if (step === 'you') {
      setStep('them');
    } else {
      // Save data
      localStorage.setItem('defrag_unitA', JSON.stringify(userData));
      localStorage.setItem('defrag_unitB', JSON.stringify(partnerData));
      
      // Owner bypass - skip payment
      if (isOwner) {
        localStorage.setItem('defrag_payment_verified', 'true');
        localStorage.setItem('defrag_owner_bypass', 'true');
        navigate('/manual');
      } else {
        navigate('/checkout');
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-80 -right-80 h-[800px] w-[800px] rounded-full blur-[200px] opacity-[0.12] bg-orange-500 transition-all duration-1000"
          style={{ transform: step === 'them' ? 'translate(-100px, 100px)' : 'translate(0, 0)' }}
        />
        <div 
          className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full blur-[150px] opacity-[0.06] bg-orange-400 transition-all duration-1000"
          style={{ transform: step === 'them' ? 'translate(50px, -50px)' : 'translate(0, 0)' }}
        />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:60px_60px]" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/5 safe-top">
        <nav className="mx-auto max-w-6xl px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-orange-500 flex items-center justify-center font-black text-black text-base sm:text-lg group-hover:scale-105 transition-transform">
              D
            </div>
            <span className="tracking-[0.2em] sm:tracking-[0.25em] text-sm font-medium text-white/90">DEFRAG</span>
          </Link>

          {/* Progress indicator */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className={`h-2 w-8 sm:h-2.5 sm:w-10 rounded-full transition-all duration-500 ${step === 'you' ? 'bg-orange-500' : 'bg-orange-500/40'}`} />
              <div className={`h-2 w-8 sm:h-2.5 sm:w-10 rounded-full transition-all duration-500 ${step === 'them' ? 'bg-orange-500' : 'bg-white/10'}`} />
            </div>
            <span className="text-xs tracking-[0.2em] text-white/40 ml-2 hidden sm:block">
              {step === 'you' ? '1/2' : '2/2'}
            </span>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="relative z-10 flex items-center justify-center px-6 pt-8 pb-20">
        <div className="w-full max-w-lg">
          {/* Header with animation */}
          <div 
            className={`text-center mb-10 transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-orange-500/50" />
              <span className="text-xs tracking-[0.4em] text-orange-400 font-medium">
                {step === 'you' ? 'STEP 1' : 'STEP 2'}
              </span>
              <span className="h-px w-8 bg-orange-500/50" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-4">
              {step === 'you' ? 'About You' : 'About Them'}
            </h1>
            <p className="text-base text-white/60 max-w-sm mx-auto leading-relaxed">
              {step === 'you'
                ? 'We\'ll use this to create your personalized manual.'
                : 'The person you want to understand better.'}
            </p>
          </div>

          {/* Form Card */}
          <div 
            className={`rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm p-8 shadow-2xl shadow-black/50 transition-all duration-300 ${isAnimating ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}
          >
            <form onSubmit={handleNext} className="space-y-6">
              {/* Email field - only on step 1 */}
              {step === 'you' && (
                <div className="space-y-2">
                  <label className="text-xs tracking-[0.25em] text-white/50 flex items-center gap-2">
                    EMAIL
                    {isOwner && (
                      <span className="text-[10px] tracking-normal text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
                        ✓ OWNER ACCESS
                      </span>
                    )}
                  </label>
                  <input
                    type="email"
                    required
                    value={userData.email || ''}
                    onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3.5 text-base focus:border-orange-500/50 focus:bg-black/80 outline-none transition-all placeholder:text-white/25"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs tracking-[0.25em] text-white/50">
                  {step === 'you' ? 'YOUR NAME' : 'THEIR NAME'}
                </label>
                <input
                  type="text"
                  required
                  value={currentData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder={step === 'you' ? 'Your first name' : 'Their first name'}
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3.5 text-base focus:border-orange-500/50 focus:bg-black/80 outline-none transition-all placeholder:text-white/25"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs tracking-[0.25em] text-white/50">DATE OF BIRTH</label>
                <input
                  type="date"
                  required
                  value={currentData.birthDate}
                  onChange={(e) => handleChange('birthDate', e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3.5 text-base focus:border-orange-500/50 focus:bg-black/80 outline-none transition-all text-white [color-scheme:dark]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs tracking-[0.25em] text-white/50">
                    TIME <span className="text-white/30 tracking-normal">(opt.)</span>
                  </label>
                  <input
                    type="time"
                    value={currentData.birthTime}
                    onChange={(e) => handleChange('birthTime', e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3.5 text-base focus:border-orange-500/50 focus:bg-black/80 outline-none transition-all text-white [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-[0.25em] text-white/50">
                    LOCATION <span className="text-white/30 tracking-normal">(opt.)</span>
                  </label>
                  <input
                    type="text"
                    value={currentData.birthPlace}
                    onChange={(e) => handleChange('birthPlace', e.target.value)}
                    placeholder="City"
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3.5 text-base focus:border-orange-500/50 focus:bg-black/80 outline-none transition-all placeholder:text-white/25"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                {step === 'them' && (
                  <button
                    type="button"
                    onClick={() => setStep('you')}
                    className="flex-1 h-14 border border-white/15 text-white/70 tracking-[0.15em] text-sm rounded-lg hover:border-white/30 hover:text-white hover:bg-white/[0.02] transition-all"
                  >
                    ← BACK
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 h-14 bg-white text-black font-semibold tracking-[0.12em] text-sm rounded-lg hover:bg-orange-500 hover:text-white transition-all shadow-lg shadow-white/10 hover:shadow-orange-500/20"
                >
                  {step === 'you' ? 'CONTINUE →' : isOwner ? 'GENERATE (FREE)' : 'CHECKOUT →'}
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
            <div className="h-1 w-1 rounded-full bg-orange-500" />
            <div className="h-1 w-1 rounded-full bg-white" />
            <div className="h-1 w-1 rounded-full bg-orange-500" />
          </div>
        </div>
      </main>
    </div>
  );
}
