#!/bin/bash

# ==========================================
# 🚀 DEFRAG MASTER DEPLOYMENT SCRIPT
# ==========================================
# This script bridges the gap between your Dropbox development environment
# and the Vercel deployment pipeline to bypass macOS permission issues.
#
# USAGE: ./quick_deploy.sh "Optional Commit Message"

# Configuration
SOURCE_DIR="/Users/cjo/Library/CloudStorage/Dropbox-Chadowen93/Chadowen93 Team Folder/defrag_assets_v2/THISISDEFRAG/THISISDEFRAG"
DEPLOY_DIR="/Users/cjo/Dev/THISISDEFRAG"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}==========================================${NC}"
echo -e "${BLUE}   🚀 DEFRAG AUTOMATED DEPLOYMENT SYSTEM   ${NC}"
echo -e "${BLUE}==========================================${NC}"

# 1. Validation
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${YELLOW}❌ Source directory not found in Dropbox! Check path.${NC}"
    exit 1
fi

# 2. Synchronization
echo -e "${YELLOW}🔄 Syncing codebase to staging area...${NC}"
mkdir -p "$DEPLOY_DIR"

# Rsync flags: -a (archive), -v (verbose), --delete (remove files in dest that aren't in source)
rsync -av --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.vercel' \
  --exclude '.DS_Store' \
  --exclude 'dist' \
  "$SOURCE_DIR/" "$DEPLOY_DIR/"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Sync Complete.${NC}"
else
    echo -e "${YELLOW}❌ Sync Failed!${NC}"
    exit 1
fi

# 3. Deployment
echo -e "${YELLOW}🚀 Triggering Vercel Production Build...${NC}"
cd "$DEPLOY_DIR" || exit

# Run Vercel Deploy
# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  'vercel' CLI not found. Trying 'npx vercel'...${NC}"
    npx vercel --prod --yes
else
    vercel --prod --yes
fi

# 4. Success Report
echo -e "${BLUE}==========================================${NC}"
echo -e "${GREEN}✅ DEPLOYMENT PIPELINE SUCCESSFUL${NC}"
echo -e "   - Code Synced"
echo -e "   - Build Triggered"
echo -e ""
echo -e "   🌍 Live Site: https://defrag.app"
echo -e "   📊 Dash:      https://vercel.com/dashboard"
echo -e "${BLUE}==========================================${NC}"
