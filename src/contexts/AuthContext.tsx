import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import {
    User,
    signInWithEmailLink,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    sendMagicLink: (email: string) => Promise<void>;
    signInWithLink: (email: string, link: string) => Promise<void>;
    signOut: () => Promise<void>;
    isOwner: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const OWNER_EMAILS = ['info@defrag.app', 'chadowen93@gmail.com'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const sendMagicLink = useCallback(async (email: string) => {
        const actionCodeSettings = {
            url: `${window.location.origin}/signin/verify`,
            handleCodeInApp: true,
        };

        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        // Save email to localStorage for verification
        window.localStorage.setItem('emailForSignIn', email);
    }, []);

    const signInWithLink = useCallback(async (email: string, link: string) => {
        if (isSignInWithEmailLink(auth, link)) {
            await signInWithEmailLink(auth, email, link);
            window.localStorage.removeItem('emailForSignIn');
        }
    }, []);

    const signOut = useCallback(async () => {
        await firebaseSignOut(auth);
        // Clear all local storage
        localStorage.removeItem('defrag_owner_bypass');
        localStorage.removeItem('defrag_payment_verified');
    }, []);

    const isOwner = useMemo(() => user ? OWNER_EMAILS.includes(user.email || '') : false, [user]);

    const value = useMemo(() => ({
        user,
        loading,
        sendMagicLink,
        signInWithLink,
        signOut,
        isOwner,
    }), [user, loading, sendMagicLink, signInWithLink, signOut, isOwner]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
