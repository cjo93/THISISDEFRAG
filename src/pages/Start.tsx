import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2, MapPin, Calendar, Clock, User, Terminal } from 'lucide-react';
import Header from '../components/layout/Header';
import { useNavigate } from 'react-router-dom';
import { getPlanetSign } from '../lib/astronomy';
import LivingBackground from '../components/visuals/LivingBackground';

export default function Start() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    email: ''
  });

  // Boot Sequence Simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setBootSequence(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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

    setTimeout(() => {
      try {
        const dateTimeString = `${formData.birthDate}T${formData.birthTime || '12:00'}:00`;
        const dateObj = new Date(dateTimeString);

        const sunSign = getPlanetSign('Sun', dateObj);
        const marsSign = getPlanetSign('Mars', dateObj);

        const unitA = {
          name: formData.name,
          birthDate: formData.birthDate,
          birthTime: formData.birthTime,
          birthPlace: formData.birthPlace,
          email: formData.email,
          sun_sign: sunSign,
          mars_sign: marsSign,
        };

        localStorage.setItem('defrag_unitA', JSON.stringify(unitA));
        localStorage.setItem('defrag_user_profile', JSON.stringify(unitA));

        navigate('/dashboard');

      } catch (error) {
        console.error("Calculation Error", error);
        setIsLoading(false);
        alert("Calculation failed. Please check date format.");
      }
    }, 1200);
  };

  if (bootSequence) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white font-mono">
        <div className="w-64 space-y-2">
          <div className="h-1 w-full bg-zinc-900 overflow-hidden relative">
            <div className="absolute inset-0 bg-white animate-[grid-move_2s_linear_infinite]" style={{ width: '100%' }} />
          </div>
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/50">
            <span>Initializing Core</span>
            <span className="animate-pulse">...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/10 font-sans">
      <Header />

      {/* Dynamic Background */}
      <LivingBackground />

      <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 pt-20 pb-20 relative overflow-hidden">
        <div className="max-w-2xl w-full mx-auto relative z-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-black/40 backdrop-blur-md text-white/40 text-[10px] font-mono tracking-[0.4em] uppercase mb-12 rounded-full mx-auto animate-fade-in">
            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-pulse" />
            System_Initialization
          </div>

          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight leading-none mb-12 text-white uppercase animate-fade-in" style={{ animationDelay: '0.1s' }}>
            The Missing <span className="text-white/30 italic">Manual.</span>
          </h1>

          {/* Form Container */}
          <div className="bg-zinc-900/40 border border-white/10 p-8 sm:p-12 rounded-[2rem] backdrop-blur-xl shadow-2xl text-left relative overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>

            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/20 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20 rounded-br-2xl" />

            {/* Segmented Progress */}
            <div className="flex gap-1 mb-12">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-sm transition-all duration-500 border border-white/5 ${
                    step >= i
                      ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                      : 'bg-transparent'
                  }`}
                />
              ))}
            </div>

            <div className="space-y-12 min-h-[300px]">
              {step === 1 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 block font-bold group-focus-within:text-white transition-colors">Name</label>
                    <div className="relative flex items-center">
                      <User className="absolute left-0 text-white/20 transition-colors group-focus-within:text-slate-500" size={20} />
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-white/10 py-4 pl-10 text-xl text-white focus:border-slate-500 outline-none transition-all placeholder:text-white/10 font-mono"
                        placeholder="ENTER_FULL_NAME"
                        autoFocus
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block font-bold group-focus-within:text-white transition-colors">Email</label>
                    <div className="relative flex items-center">
                      <Terminal className="absolute left-0 text-white/20 transition-colors group-focus-within:text-slate-500" size={20} />
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-white/10 py-4 pl-10 text-xl text-white focus:border-slate-500 outline-none transition-all placeholder:text-white/10 font-mono"
                        placeholder="EMAIL@DOMAIN.COM"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 block font-bold group-focus-within:text-white transition-colors">Birth Date</label>
                    <div className="relative flex items-center">
                      <Calendar className="absolute left-0 text-white/20 transition-colors group-focus-within:text-slate-500" size={20} />
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-white/10 py-4 pl-10 text-xl text-white focus:border-slate-500 outline-none transition-all font-mono appearance-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 block font-bold group-focus-within:text-white transition-colors">Birth Time</label>
                    <div className="relative flex items-center">
                      <Clock className="absolute left-0 text-white/20 transition-colors group-focus-within:text-slate-500" size={20} />
                      <input
                        type="time"
                        name="birthTime"
                        value={formData.birthTime}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-white/10 py-4 pl-10 text-xl text-white focus:border-slate-500 outline-none transition-all font-mono appearance-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="space-y-2 group">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 block font-bold group-focus-within:text-white transition-colors">Location</label>
                    <div className="relative flex items-center">
                      <MapPin className="absolute left-0 text-white/20 transition-colors group-focus-within:text-slate-500" size={20} />
                      <input
                        name="birthPlace"
                        value={formData.birthPlace}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-white/10 py-4 pl-10 text-xl text-white focus:border-slate-500 outline-none transition-all placeholder:text-white/10 font-mono"
                        placeholder="CITY, COUNTRY"
                        autoFocus
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="p-6 bg-white/[0.03] rounded-sm border border-dashed border-white/10 text-center animate-pulse">
                    <p className="text-[10px] uppercase tracking-widest text-white/50 leading-relaxed font-mono">
                      Encryption Active // <br/> Data used strictly for calculation.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-16 flex justify-between items-center border-t border-white/5 pt-8">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors flex items-center gap-2"
                >
                  <ArrowRight className="rotate-180" size={12} /> Back
                </button>
              ) : <div />}

              <button
                onClick={handleNext}
                disabled={isLoading || (step === 1 && !formData.name) || (step === 2 && !formData.birthDate) || (step === 3 && !formData.birthPlace)}
                className="h-14 px-8 bg-white text-black text-[10px] tracking-[0.3em] font-bold hover:bg-zinc-200 transition-all uppercase flex items-center gap-4 disabled:opacity-20 disabled:cursor-not-allowed rounded-sm group shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Computing...
                  </>
                ) : (
                  <>
                    {step === 3 ? 'View Manual' : 'Next'}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

          </div>

          <div className="mt-16 flex items-center justify-center gap-8 opacity-30 text-[10px] font-mono uppercase tracking-[0.2em] italic">
            <span className="animate-flicker">Secure_Input</span>
            <span className="w-1 h-1 bg-white/50 rounded-full"></span>
            <span>Latency: 12ms</span>
          </div>

        </div>
      </section>
    </div>
  );
}
