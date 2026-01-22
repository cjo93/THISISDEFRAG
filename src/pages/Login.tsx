import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store username in localStorage for now
    localStorage.setItem('defrag_user', username);
    navigate('/start');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute -top-80 -left-80 h-[700px] w-[700px] rounded-full blur-[200px] opacity-[0.12] bg-orange-500" />

      {/* Top bar */}
      <header className="relative z-10">
        <nav className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-orange-500/90 flex items-center justify-center font-black text-black">
              D
            </div>
            <div className="tracking-[0.22em] text-sm font-semibold">DEFRAG</div>
          </Link>
        </nav>
      </header>

      {/* Main */}
      <main className="relative z-10 flex items-center justify-center px-6 pt-10 pb-20">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            {/* Tabs */}
            <div className="flex border-b border-white/10 mb-8">
              <button
                onClick={() => setIsCreating(false)}
                className={`pb-3 px-4 text-xs tracking-[0.18em] transition ${
                  !isCreating
                    ? 'text-white border-b-2 border-orange-500'
                    : 'text-white/50 hover:text-white/70'
                }`}
              >
                LOG IN
              </button>
              <button
                onClick={() => setIsCreating(true)}
                className={`pb-3 px-4 text-xs tracking-[0.18em] transition ${
                  isCreating
                    ? 'text-white border-b-2 border-orange-500'
                    : 'text-white/50 hover:text-white/70'
                }`}
              >
                CREATE ACCOUNT
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.28em] text-white/50">
                  {isCreating ? 'EMAIL ADDRESS' : 'EMAIL OR USERNAME'}
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm focus:border-orange-500/50 outline-none transition placeholder:text-white/30"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.28em] text-white/50">PASSWORD</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm focus:border-orange-500/50 outline-none transition placeholder:text-white/30"
                />
              </div>

              {isCreating && (
                <div className="space-y-2">
                  <label className="text-[10px] tracking-[0.28em] text-white/50">CONFIRM PASSWORD</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm focus:border-orange-500/50 outline-none transition placeholder:text-white/30"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full h-12 bg-white text-black font-semibold tracking-[0.18em] text-xs hover:bg-white/90 transition"
              >
                {isCreating ? 'CREATE ACCOUNT' : 'CONTINUE'}
              </button>
            </form>

            {!isCreating && (
              <div className="mt-6 text-center">
                <a href="#" className="text-xs text-orange-200/70 hover:text-orange-200 transition">
                  Forgot password?
                </a>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-white/50">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </main>
    </div>
  );
}
