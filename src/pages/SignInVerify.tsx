
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { ShieldCheck, ShieldAlert, Terminal, Activity } from 'lucide-react';
import Header from '../components/Header';

export default function SignInVerify() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [message, setMessage] = useState('Verifying_Access_Credentials...');

    useEffect(() => {
        const verifySignIn = async () => {
            try {
                if (!isSignInWithEmailLink(auth, window.location.href)) {
                    setStatus('error');
                    setMessage('Invalid verification node. Request new link.');
                    return;
                }

                let email = window.localStorage.getItem('emailForSignIn');

                if (!email) {
                    email = window.prompt('Identification required. Please confirm email:');
                }

                if (!email) {
                    setStatus('error');
                    setMessage('Identification required for session authorization.');
                    return;
                }

                await signInWithEmailLink(auth, email, window.location.href);

                try {
                    const { migrateLocalStorageToFirestore } = await import('../services/userService');
                    if (auth.currentUser) {
                        await migrateLocalStorageToFirestore(auth.currentUser.uid);
                    }
                } catch (migrationError) {
                    console.error('Data migration warning:', migrationError);
                }

                window.localStorage.removeItem('emailForSignIn');

                setStatus('success');
                setMessage('Identification confirmed. Initializing_Session...');

                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);

            } catch (error: any) {
                console.error('Sign-in verification error:', error);
                setStatus('error');
                setMessage(error.message || 'Verification failure. Retry authorization request.');
            }
        };

        verifySignIn();
    }, [navigate]);

    useEffect(() => {
        if (user && status === 'success') {
            navigate('/dashboard');
        }
    }, [user, status, navigate]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-black text-white selection:bg-white/10 font-mono">
            <Header />

            {/* Main Content */}
            <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-8">
                <div className="w-full max-w-2xl space-y-20 animate-fade-in">

                    {/* Status Card */}
                    <div className="bg-white/[0.01] border border-white/5 rounded-[64px] p-16 sm:p-24 relative overflow-hidden group">

                        {status === 'verifying' && (
                            <div className="text-center space-y-12 py-8">
                                <div className="h-24 w-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto shadow-2xl">
                                    <div className="h-10 w-10 border-2 border-white/10 border-t-white rounded-full animate-spin" />
                                </div>
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-light text-white uppercase italic tracking-tighter">Synchronizing_Node</h2>
                                    <p className="text-white/30 text-lg italic pr-4">{message}</p>
                                </div>
                            </div>
                        )}

                        {status === 'success' && (
                            <div className="text-center space-y-12 py-8 scale-in">
                                <div className="h-24 w-24 rounded-full bg-white text-black flex items-center justify-center mx-auto shadow-2xl">
                                    <ShieldCheck size={40} strokeWidth={1} />
                                </div>
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-light text-white uppercase italic tracking-tighter">Access_Authorized</h2>
                                    <p className="text-white/30 text-lg italic pr-4">{message}</p>
                                </div>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="text-center space-y-12 py-8">
                                <div className="h-24 w-24 rounded-full bg-red-500/5 border border-red-500/10 flex items-center justify-center mx-auto shadow-2xl">
                                    <ShieldAlert size={40} strokeWidth={1} className="text-red-500" />
                                </div>
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-light text-red-500 uppercase italic tracking-tighter">Authorization_Failure</h2>
                                    <p className="text-white/30 text-lg italic pr-4">{message}</p>
                                </div>
                                <button
                                    onClick={() => navigate('/signin')}
                                    className="h-20 px-12 bg-white text-black font-bold rounded-full transition-all duration-700 hover:bg-slate-200 text-[10px] tracking-[0.5em] uppercase shadow-2xl"
                                >
                                    Retry_Link_Dispatch
                                </button>
                            </div>
                        )}

                    </div>

                    {/* Footer Support */}
                    <div className="text-center pt-10">
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
