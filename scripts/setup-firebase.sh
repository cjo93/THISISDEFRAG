#!/bin/bash

# DEFRAG Firebase & Stripe Setup Script
# This script will guide you through setting up Firebase and Stripe for DEFRAG

set -e

echo "🔥 DEFRAG - Firebase & Stripe Configuration"
echo "==========================================="
echo ""

# Check if firebase-tools is installed
if ! command -v firebase &> /dev/null; then
    echo "📦 Installing Firebase CLI..."
    npm install -g firebase-tools
fi

# Login to Firebase
echo "🔐 Logging into Firebase..."
firebase login --no-localhost

# Initialize Firebase project
echo "🎯 Initializing Firebase..."
firebase init firestore auth

# Create firestore.rules file
cat > firestore.rules << 'EOF'
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function to check if user owns the document
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Helper function to check if user is an admin
    function isAdmin() {
      return isAuthenticated() && 
             (request.auth.token.email == 'info@defrag.app' || 
              request.auth.token.email == 'chadowen93@gmail.com');
    }
    
    // User profiles - users can only read/write their own
    match /users/{userId} {
      allow read: if isOwner(userId) || isAdmin();
      allow write: if isOwner(userId) || isAdmin();
    }
    
    // Relationship manuals - users can only access their own
    match /manuals/{manualId} {
      allow read: if isAuthenticated() && 
                     (resource.data.createdBy == request.auth.uid || isAdmin());
      allow create: if isAuthenticated();
      allow update, delete: if isAuthenticated() && 
                               (resource.data.createdBy == request.auth.uid || isAdmin());
    }
    
    // Admin-only collections
    match /admin/{document=**} {
      allow read, write: if isAdmin();
    }
  }
}
EOF

# Deploy Firestore rules
echo "🚀 Deploying Firestore security rules..."
firebase deploy --only firestore:rules

# Get Firebase config
echo ""
echo "📋 Getting Firebase configuration..."
firebase apps:sdkconfig web

echo ""
echo "✅ Firebase setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Copy the Firebase config values to .env.local"
echo "2. Add VITE_FIREBASE_* environment variables"
echo "3. Restart your dev server"
echo ""
echo "🔗 Firebase Console: https://console.firebase.google.com"
