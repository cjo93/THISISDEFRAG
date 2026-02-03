import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function SignInVerify() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [message, setMessage] = useState('Verifying your sign-in link...');

    useEffect(() => {
        const verifySignIn = async () => {
            try {
                // Check if this is a valid sign-in link
                if (!isSignInWithEmailLink(auth, window.location.href)) {
                    setStatus('error');
                    setMessage('Invalid sign-in link. Please request a new one.');
                    return;
                }

                // Get the email from localStorage (set when user requested the link)
                let email = window.localStorage.getItem('emailForSignIn');

                if (!email) {
                    // If missing, prompt the user to provide their email
                    email = window.prompt('Please provide your email for confirmation');
                }

                if (!email) {
                    setStatus('error');
                    setMessage('Email is required to complete sign-in.');
                    return;
                }

                // Complete the sign-in
                await signInWithEmailLink(auth, email, window.location.href);

                // Migrate data from localStorage to Firestore
                try {
                    const { migrateLocalStorageToFirestore } = await import('../services/userService');
                    // We need the user object, so we get it from auth.currentUser
                    if (auth.currentUser) {
                        await migrateLocalStorageToFirestore(auth.currentUser.uid);
                    }
                } catch (migrationError) {
                    console.error('Data migration warning:', migrationError);
                }

                // Clear the email from storage
                window.localStorage.removeItem('emailForSignIn');

                setStatus('success');
                setMessage('Sign-in successful! Redirecting...');

                // Redirect to dashboard after a brief delay
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);

            } catch (error: any) {
                console.error('Sign-in verification error:', error);
                setStatus('error');
                setMessage(error.message || 'Failed to verify sign-in link. Please try again.');
            }
        };

        verifySignIn();
    }, [navigate]);

    // If already signed in, redirect immediately
    useEffect(() => {
        if (user && status === 'success') {
            navigate('/dashboard');
        }
    }, [user, status, navigate]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-black">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-80 -right-80 h-[800px] w-[800px] rounded-full blur-[200px] opacity-[0.08] bg-orange-500" />
                <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full blur-[150px] opacity-[0.04] bg-orange-400" />
                <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:60px_60px]" />
            </div>

            {/* Main Content */}
            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
                <div className="w-full max-w-md">

                    {/* Status Card */}
                    <div className="glass-box border border-white/10 rounded-2xl p-8">

                        {status === 'verifying' && (
                            <div className="text-center py-6">
                                <div className="h-16 w-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-6">
                                    <div className="h-8 w-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
                                </div>
                                <h2 className="text-xl font-medium text-white mb-3">Verifying Sign-In</h2>
                                <p className="text-white/60">{message}</p>
                            </div>
                        )}

                        {status === 'success' && (
                            <div className="text-center py-6">
                                <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-medium text-white mb-3">Welcome Back!</h2>
                                <p className="text-white/60">{message}</p>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="text-center py-6">
                                <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-medium text-white mb-3">Verification Failed</h2>
                                <p className="text-white/60 mb-6">{message}</p>
                                <button
                                    onClick={() => navigate('/signin')}
                                    className="bg-orange-500 hover:bg-orange-400 text-black font-semibold px-6 py-3 rounded-xl transition-all duration-300 tracking-wide"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}

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
