
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Shield, Lock, Eye, Database, Globe, UserCheck } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white selection:bg-white/10 font-mono italic">
      <Header />

      <main className="relative z-10 px-8 pt-56 pb-32">
        <div className="mx-auto max-w-5xl space-y-32">

          <div className="text-center space-y-12 flex flex-col items-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 border border-white/10 bg-white/[0.03] text-white/40 text-[10px] tracking-[0.4em] uppercase rounded-full shadow-2xl">
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse" />
              Privacy_Protocol_Enabled
            </div>
            <h1 className="text-6xl sm:text-8xl font-light tracking-tighter uppercase text-white leading-none">
              Data_ <span className="text-white/40 italic">Custody.</span>
            </h1>
            <p className="text-[10px] tracking-[0.4em] text-white/20 uppercase italic pb-4">Last Updated: January 23, 2026</p>
          </div>

          <div className="p-16 rounded-[80px] border border-white/5 bg-white/[0.01] shadow-2xl relative overflow-hidden group">
            <div className="space-y-24 text-white/40 leading-relaxed max-w-3xl mx-auto relative z-10">

              {/* Introduction */}
              <section className="space-y-8">
                <h2 className="text-2xl font-light text-white uppercase italic tracking-tighter flex items-center gap-6">
                  <Shield size={24} strokeWidth={1} className="text-white/20" />
                  1. Privacy_Commitment
                </h2>
                <p className="text-xl font-light italic leading-relaxed pr-8">
                  DEFRAG ("we," "our," or "us") is dedicated to the encryption and protection of your personal telemetry. This protocol outlines our data custody standards at defrag.app.
                </p>
              </section>

              {/* Information We Collect */}
              <section className="space-y-8">
                <h2 className="text-2xl font-light text-white uppercase italic tracking-tighter flex items-center gap-6">
                  <Database size={24} strokeWidth={1} className="text-white/20" />
                  2. Telemetry_Collection
                </h2>
                <div className="space-y-6">
                  <p className="text-xl font-light italic leading-relaxed pr-8">We capture precise node parameters solely for relational modeling:</p>
                  <ul className="space-y-4 text-lg italic font-light border-l border-white/5 pl-8">
                    <li><span className="text-white/60">Node_ID:</span> Email and identity credentials.</li>
                    <li><span className="text-white/60">Birth_Vectors:</span> Temporal and spatial coordinates for ephemeris sync.</li>
                    <li><span className="text-white/60">Access_Data:</span> Interaction logs and system usage telemetry.</li>
                  </ul>
                </div>
              </section>

              {/* Data Security */}
              <section className="space-y-8">
                <h2 className="text-2xl font-light text-white uppercase italic tracking-tighter flex items-center gap-6">
                  <Lock size={24} strokeWidth={1} className="text-white/20" />
                  3. Encryption_Standards
                </h2>
                <p className="text-xl font-light italic leading-relaxed pr-8">
                  All telemetry is encrypted in transit and at rest using top-tier cloud architecture. We utilize Stripe for transaction processing; we do not store sensitive payment credentials on DEFRAG nodes.
                </p>
              </section>

              {/* Your Rights */}
              <section className="space-y-8">
                <h2 className="text-2xl font-light text-white uppercase italic tracking-tighter flex items-center gap-6">
                  <UserCheck size={24} strokeWidth={1} className="text-white/20" />
                  4. Your_Rights
                </h2>
                <p className="text-xl font-light italic leading-relaxed pr-8">
                  You maintain full disclosure rights over your data. Request access, correction, or permanent node deletion via our primary privacy relay.
                </p>
              </section>

              {/* Contact */}
              <section className="space-y-12 pt-20 border-t border-white/5">
                <h2 className="text-2xl font-light text-white uppercase italic tracking-tighter">Privacy_Relay</h2>
                <div className="grid sm:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <div className="text-[10px] tracking-[0.4em] text-white/20 uppercase italic">Privacy_Officer</div>
                    <div className="text-xl text-white italic">privacy@defrag.app</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[10px] tracking-[0.4em] text-white/20 uppercase italic">Information_Access</div>
                    <div className="text-xl text-white italic">info@defrag.app</div>
                  </div>
                </div>
              </section>

            </div>
            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white/[0.01] to-transparent pointer-events-none" />
          </div>

          <div className="flex justify-center pt-20">
            <Link
              to="/"
              className="h-20 px-16 inline-flex items-center justify-center bg-white text-black text-[10px] tracking-[0.5em] font-bold hover:bg-slate-200 transition-all duration-700 rounded-none uppercase shadow-2xl italic"
            >
              Back_To_Root
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      {/* Background Detail */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white/[0.015] rounded-full blur-[200px] pointer-events-none z-0" />
    </div>
  );
}
