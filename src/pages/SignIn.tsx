
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import { ArrowRight, Mail, Terminal, ShieldCheck } from 'lucide-react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Auto-fill owner email if requested
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prefillOwner = params.get('owner') === 'true';

    if (prefillOwner) {
      setEmail('info@defrag.app');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setMessage('Identification required.');
      return;
    }

    setStatus('loading');

    try {
      const { sendSignInLinkToEmail } = await import('firebase/auth');
      const { auth } = await import('../lib/firebase');

      const actionCodeSettings = {
        url: `${window.location.origin}/signin/verify`,
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);

      window.localStorage.setItem('emailForSignIn', email);

      setStatus('success');
      setMessage(`Command link dispatched to ${email}. Check your inbox to authorize session.`);

    } catch (error: any) {
      console.error('Sign-in error:', error);
      setStatus('error');

      if (error.code === 'auth/invalid-email') {
        setMessage('Invalid identification format.');
      } else {
        setMessage(error.message || 'Dispatch failure. Retry link request.');
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white selection:bg-white/10 font-mono">
      <Header />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-8">
        <div className="w-full max-w-2xl space-y-20 animate-fade-in">

          {/* Header */}
          <div className="text-center space-y-8 flex flex-col items-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 border border-white/10 bg-white/[0.03] text-white/40 text-[10px] tracking-[0.4em] uppercase rounded-full italic transition-all duration-700">
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse" />
              Access_Protocol_v2
            </div>
            <h1 className="text-6xl sm:text-8xl font-light tracking-tighter uppercase italic text-white leading-none">
              Initialize_Access
            </h1>
            <p className="text-xl sm:text-2xl text-white/30 italic font-light max-w-xl mx-auto">
              Secure identification required to access your relational operating manual.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/[0.01] border border-white/5 rounded-[64px] p-16 sm:p-24 relative overflow-hidden group">

            {status === 'success' ? (
              <div className="text-center space-y-12 py-8 scale-in">
                <div className="h-24 w-24 rounded-full bg-white text-black flex items-center justify-center mx-auto shadow-2xl">
                  <ShieldCheck size={40} strokeWidth={1} />
                </div>
                <div className="space-y-6">
                  <h2 className="text-3xl font-light text-white uppercase italic tracking-tighter">Command_Dispatched</h2>
                  <p className="text-white/30 text-lg italic pr-4">{message}</p>
                </div>
                <button
                  onClick={() => { setStatus('idle'); setEmail(''); }}
                  className="text-white/40 hover:text-white text-[10px] tracking-[0.5em] uppercase italic transition-all duration-700 border-b border-white/10 pb-1"
                >
                  Request_New_Node
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-16 relative z-10">
                <div className="space-y-8">
                  <label className="block text-[10px] tracking-[0.6em] text-white/20 uppercase italic mb-4 ml-4">
                    Authorized_Email_Target
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="IDENTIFY_TARGET@SYSTEM.COM"
                    className="w-full bg-transparent border-b border-white/10 px-4 py-8 text-white placeholder:text-white/10 focus:outline-none focus:border-white transition-all text-2xl font-light italic tracking-tight"
                    disabled={status === 'loading'}
                  />
                  <div className="flex items-center gap-6 text-[9px] text-white/10 italic tracking-widest uppercase ml-4">
                    <Terminal size={12} />
                    Waiting_for_identification_input...
                  </div>
                </div>

                {status === 'error' && (
                  <div className="bg-slate-500/5 border border-slate-500/10 rounded-3xl px-8 py-6 flex items-center gap-4 text-slate-500 text-[10px] tracking-[0.4em] uppercase italic animate-shake">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full h-24 bg-white text-black font-bold rounded-none transition-all duration-700 hover:bg-slate-200 disabled:bg-white/10 disabled:text-white/10 disabled:cursor-not-allowed text-[10px] tracking-[0.5em] uppercase shadow-2xl flex items-center justify-center gap-4"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="h-4 w-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      Synchronizing...
                    </>
                  ) : (
                    <>
                      Authorize_Session
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Backdrop Detail */}
            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white/[0.01] to-transparent pointer-events-none" />
          </div>

          {/* Footer Links */}
          <div className="flex flex-col items-center gap-10 pt-10">
            <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase italic">
              No system record? {' '}
              <Link to="/start" className="text-white hover:text-white/70 transition-colors border-b border-white/10 pb-1">
                Initialize_New_Manual
              </Link>
            </p>
            <div className="h-px w-20 bg-white/5" />
            <a href="mailto:info@defrag.app" className="text-white/10 hover:text-white transition-colors text-[9px] tracking-[0.6em] uppercase italic">
              Request_Technical_Support
            </a>
          </div>

        </div>
      </main>

      {/* Background Detail */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white/[0.01] rounded-full blur-[200px] pointer-events-none" />
    </div>
  );
}
