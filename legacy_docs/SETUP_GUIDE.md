# 🚀 DEFRAG Critical Fixes - Setup Guide

## ✅ What's Been Fixed

### 1. Authentication System

- ✅ Firebase Authentication with magic links (passwordless)
- ✅ User context provider
- ✅ Owner email detection
- ✅ Secure sign-in/sign-out

### 2. Database Integration

- ✅ Firestore database setup
- ✅ User profile storage
- ✅ Relationship manual storage
- ✅ Payment tracking
- ✅ Migration helper from localStorage

### 3. Legal Compliance

- ✅ Comprehensive Privacy Policy (GDPR + CCPA compliant)
- ✅ Complete Terms of Service
- ✅ Proper routing

### 4. Dependencies

- ✅ Firebase SDK installed

---

## 📋 Setup Instructions

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it "DEFRAG" (or your preferred name)
4. Disable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click **Email/Password**
3. Enable **Email link (passwordless sign-in)**
4. Click **Save**

### Step 3: Create Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode**
4. Select a location (choose closest to your users)
5. Click **Enable**

### Step 4: Set Security Rules

In Firestore, go to **Rules** tab and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Manuals can only be read/written by owner
    match /manuals/{manualId} {
      allow read: if request.auth != null && 
                     (resource.data.userId == request.auth.uid ||
                      request.auth.token.email in ['info@defrag.app', 'chadowen93@gmail.com']);
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Admin-only access
    match /admin/{document=**} {
      allow read, write: if request.auth != null && 
                            request.auth.token.email in ['info@defrag.app', 'chadowen93@gmail.com'];
    }
  }
}
```

### Step 5: Get Firebase Config

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the **Web** icon (`</>`)
4. Register app with nickname "DEFRAG Web"
5. Copy the `firebaseConfig` object

### Step 6: Update Environment Variables

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase config values in `.env.local`:

   ```env
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=defrag-xxxxx.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=defrag-xxxxx
   VITE_FIREBASE_STORAGE_BUCKET=defrag-xxxxx.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```

3. Keep your existing Stripe and Gemini keys

### Step 7: Wrap App with AuthProvider

Update `index.tsx`:

```tsx
import { AuthProvider } from './src/contexts/AuthContext';

// ... existing imports ...

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
```

### Step 8: Update SignIn Page

Replace the mock authentication in `src/pages/SignIn.tsx` with real Firebase auth:

```tsx
import { useAuth } from '../contexts/AuthContext';

export default function SignIn() {
  const { sendMagicLink, user } = useAuth();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await sendMagicLink(email);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  // ... rest of component
}
```

### Step 9: Create Sign-In Verification Page

Create `src/pages/SignInVerify.tsx`:

```tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function SignInVerify() {
  const { signInWithLink } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      setError('Email not found. Please try signing in again.');
      return;
    }

    signInWithLink(email, window.location.href)
      .then(() => {
        navigate('/dashboard');
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [signInWithLink, navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>Signing you in...</div>;
}
```

Add route in `AppRouter.tsx`:

```tsx
<Route path="/signin/verify" element={<SignInVerify />} />
```

### Step 10: Protect Routes

Create `src/components/ProtectedRoute.tsx`:

```tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}

export function OwnerRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isOwner } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !isOwner) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
```

Update routes in `AppRouter.tsx`:

```tsx
<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
<Route path="/manual" element={<ProtectedRoute><Manual /></ProtectedRoute>} />
<Route path="/admin" element={<OwnerRoute><Admin /></OwnerRoute>} />
```

---

## 🧪 Testing

### Test Authentication

1. Go to `/signin`
2. Enter your email
3. Check your email for magic link
4. Click link
5. Should redirect to `/dashboard`

### Test Data Persistence

1. Create a manual
2. Close browser
3. Reopen and sign in
4. Manual should still be there

### Test Owner Access

1. Sign in with `info@defrag.app` or `chadowen93@gmail.com`
2. Should redirect to `/admin`
3. Should see admin dashboard

---

## 🔐 Security Checklist

- [ ] Firebase security rules configured
- [ ] Environment variables set
- [ ] `.env.local` added to `.gitignore`
- [ ] Owner emails verified
- [ ] Magic link email domain authorized in Firebase
- [ ] Firestore indexes created (if needed)

---

## 🚨 Known Issues to Fix Next

### High Priority

1. **Email Sending** - Configure Resend for magic link delivery
2. **Stripe Webhooks** - Add server-side payment verification
3. **Error Handling** - Add comprehensive error boundaries
4. **Loading States** - Add loading indicators throughout

### Medium Priority

5. **Migration Script** - One-time migration for existing users
2. **Mobile Testing** - Test all pages on mobile devices
3. **Analytics** - Add privacy-focused analytics (Plausible)

---

## 📞 Support

If you encounter issues:

1. Check Firebase Console for errors
2. Check browser console for errors
3. Verify environment variables are set
4. Ensure Firebase security rules are correct

**Contact:** <info@defrag.app>

---

## 🎯 Next Steps

After completing setup:

1. Test authentication flow end-to-end
2. Migrate existing localStorage data
3. Configure Resend for email delivery
4. Add Stripe webhook handler
5. Deploy to production

**Estimated Setup Time:** 30-60 minutes

---

*Last Updated: January 23, 2026*
