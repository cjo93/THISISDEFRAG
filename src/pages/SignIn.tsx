import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

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
      setMessage('Please enter your email address.');
      return;
    }

    setStatus('loading');

    try {
      const { sendSignInLinkToEmail } = await import('firebase/auth');
      const { auth } = await import('../lib/firebase');

      const actionCodeSettings = {
        // URL you want to redirect back to after email link is clicked
        url: `${window.location.origin}/signin/verify`,
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);

      // Save the email locally so we can complete sign-in on the verify page
      window.localStorage.setItem('emailForSignIn', email);

      setStatus('success');
      setMessage(`We've sent a sign-in link to ${email}. Check your inbox and click the link to continue.`);

    } catch (error: any) {
      console.error('Sign-in error:', error);
      setStatus('error');

      if (error.code === 'auth/invalid-email') {
        setMessage('Please enter a valid email address.');
      } else if (error.code === 'auth/missing-android-pkg-name') {
        setMessage('Configuration error. Please contact support.');
      } else {
        setMessage(error.message || 'Failed to send sign-in link. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-80 -right-80 h-[800px] w-[800px] rounded-full blur-[200px] opacity-[0.08] bg-white" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full blur-[150px] opacity-[0.04] bg-white" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:60px_60px]" />
      </div>

      <Header />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-light text-white mb-4 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-white/50 text-lg">
              Enter your email to access your manual
            </p>
          </div>

          {/* Form Card */}
          <div className="glass-box border border-white/10 rounded-2xl p-8">

            {status === 'success' ? (
              <div className="text-center py-6">
                <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-medium text-white mb-3">Check Your Email</h2>
                <p className="text-white/60 mb-6">{message}</p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setEmail('');
                  }}
                  className="text-white hover:text-gray-300 text-sm tracking-wide transition-colors"
                >
                  BACK Try a different email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs tracking-[0.2em] text-white/40 uppercase mb-3">
                    Email or Session ID
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/20 transition-all text-lg"
                    disabled={status === 'loading'}
                  />
                  <p className="mt-2 text-xs text-white/30">
                    We'll check our records for your manual.
                  </p>
                </div>

                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                    <p className="text-red-400 text-sm">{message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-white hover:bg-white disabled:bg-white/50 disabled:cursor-not-allowed text-black font-semibold py-4 rounded-xl transition-all duration-300 text-lg tracking-wide"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Locating...
                    </span>
                  ) : (
                    'Access Manual'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Help text */}
          <div className="mt-8 text-center">
            <p className="text-white/40 text-sm">
              Don't have a manual yet?{' '}
              <Link to="/start" className="text-white hover:text-gray-300 transition-colors">
                Create one now
              </Link>
            </p>
          </div>

          {/* Support */}
          <div className="mt-6 text-center">
            <p className="text-white/30 text-xs">
              Need help?{' '}
              <a href="mailto:info@defrag.app" className="text-white/50 hover:text-white transition-colors">
                Contact support
              </a>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
