# 🔥 DEFRAG - Quick Firebase & Stripe Setup

## ⚡ IMMEDIATE SETUP (5 minutes)

### Step 1: Create Firebase Project (2 min)

1. Go to <https://console.firebase.google.com/>
2. Click "Add project"
3. Name: `defrag-production`
4. Disable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Authentication (1 min)

1. In Firebase Console → **Authentication** → **Get started**
2. Click **Sign-in method** tab
3. Click **Email/Password**
4. Enable **Email link (passwordless sign-in)**
5. Click **Save**

### Step 3: Create Firestore Database (1 min)

1. In Firebase Console → **Firestore Database** → **Create database**
2. Select **Start in production mode**
3. Choose location: `us-central` (or closest to you)
4. Click **Enable**

### Step 4: Get Firebase Config (1 min)

1. In Firebase Console → **Project Settings** (⚙️ icon)
2. Scroll to **Your apps** section
3. Click **Web app** (</> icon)
4. Register app name: `DEFRAG`
5. Copy the `firebaseConfig` object

It will look like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCuKXC8f_lDuJUrcFrSNZBQj3OIf2tZfl4",
  authDomain: "defrag-xxxxx.firebaseapp.com",
  projectId: "defrag-xxxxx",
  storageBucket: "defrag-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### Step 5: Update Environment Variables (1 min)

Add to `.env.local`:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyCuKXC8f_lDuJUrcFrSNZBQj3OIf2tZfl4
VITE_FIREBASE_AUTH_DOMAIN=defrag-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=defrag-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=defrag-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

# Stripe Webhook (get from Stripe Dashboard)
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## 🔒 Deploy Security Rules (5 minutes)

### Option A: Firebase Console (Easiest)

1. In Firebase Console → **Firestore Database** → **Rules** tab
2. Replace the rules with the content from `firestore.rules`
3. Click **Publish**

### Option B: Firebase CLI

```bash
npm install -g firebase-tools
firebase login
firebase init firestore
firebase deploy --only firestore:rules
```

---

## 💳 Configure Stripe Webhook (5 minutes)

### Step 1: Get Webhook Secret

1. Go to <https://dashboard.stripe.com/webhooks>
2. Click **Add endpoint**
3. Endpoint URL: `https://defrag.app/api/stripe-webhook`
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)

### Step 2: Add to Environment

Add to `.env.local`:

```bash
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
```

### Step 3: Test Webhook (Optional)

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

---

## ✅ Verify Setup

Run these checks:

1. **Firebase connected?**

   ```bash
   # Restart dev server
   npm run dev
   # Check browser console - should see "Firebase initialized"
   ```

2. **Authentication working?**
   - Go to <http://localhost:3000/signin>
   - Enter your email
   - Should say "Check your email for sign-in link"
   - Check Firebase Console → Authentication → Users

3. **Protected routes working?**
   - Try <http://localhost:3000/dashboard>
   - Should redirect to /signin if not logged in

4. **Stripe webhook working?**
   - Make test payment
   - Check Stripe Dashboard → Events
   - Should see `checkout.session.completed`

---

## 🚀 Deploy to Production

### Option A: Vercel (Recommended)

1. Push to GitHub:

   ```bash
   git add .
   git commit -m "Configure Firebase and Stripe"
   git push origin main
   ```

2. Vercel will auto-deploy

3. Add environment variables in Vercel Dashboard:
   - Go to Project → Settings → Environment Variables
   - Add all `VITE_FIREBASE_*` vars
   - Add `STRIPE_WEBHOOK_SECRET`

4. Update Stripe webhook URL to:
   `https://defrag.app/api/stripe-webhook`

### Option B: Manual Deploy

```bash
npm run build
vercel --prod
```

---

## 🐛 Troubleshooting

### "Firebase not initialized"

- Check `.env.local` has all `VITE_FIREBASE_*` variables
- Restart dev server after adding env vars

### "Auth email not sending"

- Check Firebase Console → Authentication → Templates
- Verify domain is authorized: Settings → Authorized domains
- Add `defrag.app` and `localhost`

### "Webhook signature verification failed"

- Check `STRIPE_WEBHOOK_SECRET` is correct
- Make sure it starts with `whsec_`
- Use test mode secret for development

### "Firestore permission denied"

- Check security rules are deployed
- Verify user is authenticated
- Check browser console for auth errors

---

## 📞 Need Help?

- **Firebase Docs**: <https://firebase.google.com/docs>
- **Stripe Docs**: <https://stripe.com/docs/webhooks>
- **Email Support**: <info@defrag.app>

---

**Total Setup Time: ~15 minutes**

**Status:**

- ✅ Code implemented
- ⏳ Firebase project creation needed
- ⏳ Environment variables needed  
- ⏳ Security rules deployment needed
- ⏳ Stripe webhook configuration needed
