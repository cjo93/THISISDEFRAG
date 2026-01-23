import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface OwnerRouteProps {
    children: React.ReactNode;
}

const OWNER_EMAILS = [
    'info@defrag.app',
    'chadowen93@gmail.com'
];

export default function OwnerRoute({ children }: OwnerRouteProps) {
    const { user, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="h-12 w-12 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white/60">Verifying access...</p>
                </div>
            </div>
        );
    }

    // Redirect to sign-in if not authenticated
    if (!user) {
        return <Navigate to="/signin?owner=true" replace />;
    }

    // Check if user is an owner
    const isOwner = user.email && OWNER_EMAILS.includes(user.email.toLowerCase());

    // Redirect to dashboard if not an owner
    if (!isOwner) {
        return <Navigate to="/dashboard" replace />;
    }

    // Render owner-only content
    return <>{children}</>;
}
