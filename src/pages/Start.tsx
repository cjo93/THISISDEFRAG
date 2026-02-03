
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { trackEvent, AnalyticsEvents, ConversionFunnel, setUserProperty } from '../lib/analytics';
import { Shield, User, Users, Calendar, Clock, MapPin, ArrowRight, CheckCircle } from 'lucide-react';

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
    why: "To save your manual and secure your cloud node",
    how: "AES-256 encrypted. Strictly used for manual delivery and secure access.",
    Icon: Shield
  },
  name: {
    why: "Personalizes your behavioral manual",
    how: "Localized to your instance. Never visible to third parties.",
    Icon: User
  },
  birthDate: {
    why: "Calculates orbital telemetry baseline",
    how: "Essential for accurate natal chart mapping.",
    Icon: Calendar
  },
  birthTime: {
    why: "Unlocks sub-degree precision",
    how: "Determines rising sign & house configurations.",
    Icon: Clock
  },
  birthPlace: {
    why: "Synchronizes location-based vectors",
    how: "Refines timing accuracy for topocentric data.",
    Icon: MapPin
  }
};

export default function Start() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'you' | 'them'>('you');
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

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
    ConversionFunnel.step2_start();
  }, []);

  const currentData = step === 'you' ? userData : partnerData;
  const setCurrentData = step === 'you' ? setUserData : setPartnerData;

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
    trackEvent(AnalyticsEvents.START_FORM_COMPLETE, { step });

    if (step === 'you') {
      setStep('them');
      if (userData.email) setUserProperty('email_provided', 'true');
    } else {
      localStorage.setItem('defrag_unitA', JSON.stringify(userData));
      localStorage.setItem('defrag_unitB', JSON.stringify(partnerData));
      trackEvent('start_phase_complete');

      if (isOwner) {
        localStorage.setItem('defrag_payment_verified', 'true');
        localStorage.setItem('defrag_owner_bypass', 'true');
      }
      navigate('/analysis');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30 overflow-x-hidden">
      <Header />

      <main className="pt-32 pb-20 px-6 flex flex-col items-center">
        <div className="w-full max-w-2xl">

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-4 mb-20">
            <div className={`h-1 flex-1 rounded-full transition-all duration-700 ${step === 'you' ? 'bg-orange-500' : 'bg-white/20'}`} />
            <div className={`h-1 flex-1 rounded-full transition-all duration-700 ${step === 'them' ? 'bg-orange-500' : 'bg-white/20'}`} />
          </div>

          <div className={`transition-all duration-500 transform ${isAnimating ? 'opacity-0 translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>

            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 bg-white/[0.03] text-orange-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-8 rounded-full">
                {step === 'you' ? 'Initialize Baseline' : 'Relational Mapping'}
              </div>
              <h1 className="text-4xl sm:text-6xl font-light tracking-tight mb-6">
                {step === 'you' ? 'Enter your parameters' : 'Enter their parameters'}
              </h1>
              <p className="text-white/40 text-lg sm:text-xl font-light max-w-sm mx-auto">
                {step === 'you' ? 'Establish your core behavioral design.' : 'Define the target node for interaction mapping.'}
              </p>
            </div>

            <div className="p-10 sm:p-16 rounded-[40px] border border-white/10 bg-white/[0.01] shadow-2xl relative overflow-hidden group">
              <form onSubmit={handleNext} className="space-y-10 relative z-10">

                {/* Email Field (Step 1 Only) */}
                {step === 'you' && (
                  <div className="space-y-4">
                    <label className="text-[10px] tracking-[0.3em] font-mono text-white/30 uppercase flex items-center justify-between">
                      System Email
                      <Shield size={12} className="text-orange-500" />
                    </label>
                    <input
                      type="email"
                      required
                      value={userData.email || ''}
                      onChange={(e) => setUserData(p => ({ ...p, email: e.target.value }))}
                      placeholder="node@network.com"
                      className="w-full bg-transparent border-b border-white/10 py-4 text-2xl font-light focus:border-orange-500 outline-none transition-colors placeholder:text-white/10"
                    />
                  </div>
                )}

                {/* Name Field */}
                <div className="space-y-4">
                  <label className="text-[10px] tracking-[0.3em] font-mono text-white/30 uppercase flex items-center justify-between">
                    Design Name
                    <User size={12} className="text-orange-500" />
                  </label>
                  <input
                    type="text"
                    required
                    value={currentData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder={step === 'you' ? "Your name" : "Their name"}
                    className="w-full bg-transparent border-b border-white/10 py-4 text-2xl font-light focus:border-orange-500 outline-none transition-colors placeholder:text-white/10"
                  />
                </div>

                {/* Date and Time Grid */}
                <div className="grid sm:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="text-[10px] tracking-[0.3em] font-mono text-white/30 uppercase flex items-center justify-between">
                      Epoch (Date)
                      <Calendar size={12} className="text-orange-500" />
                    </label>
                    <input
                      type="date"
                      required
                      value={currentData.birthDate}
                      onChange={(e) => handleChange('birthDate', e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-light focus:border-orange-500 outline-none transition-colors [color-scheme:dark]"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] tracking-[0.3em] font-mono text-white/30 uppercase flex items-center justify-between">
                      Temporal Offset (Time)
                      <Clock size={12} className="text-orange-500" />
                    </label>
                    <input
                      type="time"
                      value={currentData.birthTime}
                      onChange={(e) => handleChange('birthTime', e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-light focus:border-orange-500 outline-none transition-colors [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <label className="text-[10px] tracking-[0.3em] font-mono text-white/30 uppercase flex items-center justify-between">
                    Coordinates (City)
                    <MapPin size={12} className="text-orange-500" />
                  </label>
                  <input
                    type="text"
                    value={currentData.birthPlace}
                    onChange={(e) => handleChange('birthPlace', e.target.value)}
                    placeholder="City of Birth"
                    className="w-full bg-transparent border-b border-white/10 py-4 text-2xl font-light focus:border-orange-500 outline-none transition-colors placeholder:text-white/10"
                  />
                </div>

                <div className="flex gap-6 pt-10">
                  {step === 'them' && (
                    <button
                      type="button"
                      onClick={() => setStep('you')}
                      className="h-16 px-10 border border-white/10 text-white/40 tracking-[0.2em] text-xs font-bold rounded-full hover:bg-white/5 transition-all"
                    >
                      BACK
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-1 h-16 bg-white text-black font-bold tracking-[0.2em] text-xs rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-xl shadow-white/5 group"
                  >
                    {step === 'you' ? 'CONTINUE' : 'INITIALIZE SYSTEM'}
                    <ArrowRight size={16} className="inline ml-3 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>

              {/* Background detail */}
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
            </div>

            <p className="mt-12 text-center text-[10px] font-mono tracking-[0.4em] text-white/20 uppercase">
              NASA JPL Topocentric Precision • 2026 DEFRAG
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
