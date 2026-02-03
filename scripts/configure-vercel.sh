#!/bin/bash
set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}⚡ Defrag Production Configuration ⚡${NC}"
echo "---------------------------------------"
echo "This script will help you add the required environment variables to Vercel."
echo "You can get these values from the Firebase Console (Project Settings > General > Your apps)."
echo ""

add_var() {
    local key=$1
    local name=$2
    echo -e "${BLUE}Adding $key...${NC}"
    echo -n "Enter value for $key: "
    read value
    
    if [ -z "$value" ]; then
        echo "Skipping $key (empty value)"
    else
        # Remove quotes if present
        value=$(echo "$value" | sed 's/"//g' | sed "s/'//g")
        echo -n "$value" | npx vercel env add "$key" production
    fi
    echo ""
}

echo "Please copy the values from your Firebase Console and paste them here."
echo ""

add_var "VITE_FIREBASE_API_KEY" "API Key"
add_var "VITE_FIREBASE_AUTH_DOMAIN" "Auth Domain"
add_var "VITE_FIREBASE_PROJECT_ID" "Project ID"
add_var "VITE_FIREBASE_STORAGE_BUCKET" "Storage Bucket"
add_var "VITE_FIREBASE_MESSAGING_SENDER_ID" "Messaging Sender ID"
add_var "VITE_FIREBASE_APP_ID" "App ID"

echo "---------------------------------------"
echo -e "${BLUE}Adding Stripe Configuration${NC}"
echo ""
add_var "STRIPE_WEBHOOK_SECRET" "Stripe Webhook Secret (whsec_...)"

echo ""
echo -e "${GREEN}✅ Configuration Complete!${NC}"
echo "You can verify variables with 'vercel env ls'"
echo "To apply changes, a redeployment might be needed."
