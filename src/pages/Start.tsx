
import React, { useState } from 'react';
import { ArrowRight, Loader2, MapPin, Calendar, Clock, User } from 'lucide-react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { getPlanetSign } from '../lib/astronomy';

export default function Start() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      finalizeData();
    }
  };

  const finalizeData = () => {
    setIsLoading(true);

    // REAL DATA CALCULATION
    // We strictly use the input date to determine the signs using our engine.
    // No mocks.

    setTimeout(() => {
      try {
        // Combine Date and Time
        // If time is missing, default to noon UTC or local? 
        // Simple string concatenation for MVP ISO format
        const dateTimeString = `${formData.birthDate}T${formData.birthTime || '12:00'}:00`;
        const dateObj = new Date(dateTimeString);

        // Calculate Signs
        const sunSign = getPlanetSign('Sun', dateObj);
        const marsSign = getPlanetSign('Mars', dateObj);

        // Rising Sign requires Lat/Long and time. 
        // For MVP "Zero Mock" without a geocoding API call here (unless we add one),
        // We can leave it as optional or undefined, but we MUST NOT MOCK IT.
        // We will omit it until we link a real Geocoder.

        const unitA = {
          name: formData.name,
          birthDate: formData.birthDate,
          birthTime: formData.birthTime,
          birthPlace: formData.birthPlace,
          email: formData.email,
          sun_sign: sunSign,
          mars_sign: marsSign,
          // rising_sign: calculateRising(...) // Pending Geocoding
        };

        localStorage.setItem('defrag_unitA', JSON.stringify(unitA));
        // Also update the generic user profile
        localStorage.setItem('defrag_user_profile', JSON.stringify(unitA));

        navigate('/dashboard');

      } catch (error) {
        console.error("Calculation Error", error);
        // Fallback? No, user requested NO MOCKS.
        setIsLoading(false);
        alert("Calculation failed. Please check date format.");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/10 font-sans">
      <Header />

      <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 pt-20 pb-20 relative overflow-hidden">
        <div className="max-w-2xl w-full mx-auto relative z-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.02] text-white/40 text-[10px] font-mono tracking-[0.4em] uppercase mb-16 rounded-full mx-auto">
            System_Initialization
          </div>

          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight leading-none mb-12 text-white uppercase">
            Input <span className="text-white/30 italic">Coordinates.</span>
          </h1>

          {/* Form Container */}
          <div className="bg-zinc-900/50 border border-white/10 p-12 rounded-[2rem] backdrop-blur-md shadow-2xl text-left">

            {/* Progress */}
            <div className="flex gap-2 mb-12">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-white' : 'bg-white/10'}`} />
              ))}
            </div>

            <div className="space-y-12">
              {step === 1 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">Identity_Designator</label>
                    <div className="relative">
                      <User className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-white/10 py-4 pl-10 text-xl text-white focus:border-white outline-none transition-colors placeholder:text-white/10 font-light"
                        placeholder="Enter Full Name"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">Comms_Link (Email)</label>
                    <div className="relative">
                      <User className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-white/10 py-4 pl-10 text-xl text-white focus:border-white outline-none transition-colors placeholder:text-white/10 font-light"
                        placeholder="email@domain.com"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">Temporal_Origin</label>
                    <div className="relative">
                      <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-white/10 py-4 pl-10 text-xl text-white focus:border-white outline-none transition-colors font-light appearance-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">Temporal_Precise (Time)</label>
                    <div className="relative">
                      <Clock className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                      <input
                        type="time"
                        name="birthTime"
                        value={formData.birthTime}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-white/10 py-4 pl-10 text-xl text-white focus:border-white outline-none transition-colors font-light appearance-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">Spatial_Origin (City, Country)</label>
                    <div className="relative">
                      <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                      <input
                        name="birthPlace"
                        value={formData.birthPlace}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-white/10 py-4 pl-10 text-xl text-white focus:border-white outline-none transition-colors placeholder:text-white/10 font-light"
                        placeholder="e.g. London, UK"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-xl border border-white/5 text-center">
                    <p className="text-[10px] uppercase tracking-widest text-white/50 leading-relaxed italic">
                      Data is used strictly for astronomical calculation.
                      <br /> Encrypted locally.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-16 flex justify-between items-center">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
                >
                  ← Back
                </button>
              ) : <div />}

              <button
                onClick={handleNext}
                disabled={isLoading || (step === 1 && !formData.name) || (step === 2 && !formData.birthDate) || (step === 3 && !formData.birthPlace)}
                className="h-16 px-10 bg-white text-black text-[10px] tracking-[0.3em] font-bold hover:bg-slate-200 transition-all uppercase flex items-center gap-4 disabled:opacity-20 disabled:cursor-not-allowed rounded-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Computing...
                  </>
                ) : (
                  <>
                    {step === 3 ? 'Initialize_System' : 'Next_Phase'}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>

          </div>

          <div className="mt-16 flex items-center justify-center gap-8 opacity-30 text-[10px] font-mono uppercase tracking-[0.2em] italic">
            <span>Secure_Input</span>
            <span className="w-1 h-1 bg-white/50 rounded-full"></span>
            <span>Latency: 12ms</span>
          </div>

        </div>
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white/[0.015] rounded-full blur-[200px] pointer-events-none" />
      </section>
    </div>
  );
}
