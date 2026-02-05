import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-black)] flex items-center justify-center">
                <div className="text-center">
                    <div className="h-12 w-12 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white/60 font-mono text-xs tracking-widest uppercase">Authenticating Identity...</p>
                </div>
            </div>
        );
    }

    // Redirect to sign-in if not authenticated
    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    // Render protected content
    return <>{children}</>;
}
