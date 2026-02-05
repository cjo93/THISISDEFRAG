import fs from 'fs';
import path from 'path';

const REQUIRED_FILES = [
  'PLATFORM-SPEC.md',
  'API-SPEC.md',
  'UX-GUIDE.md',
  'GODMODE-COLAB.md',
  'src/AppRouter.tsx',
  'src/lib/auth-context.tsx',
  'src/lib/api-client.ts',
  'src/lib/Inversion_Library.json',
  'api/inversion/analyze.ts',
  'src/pages/products/InversionReport.tsx',
  'api/status.ts',
  'src/consumer-theme.css',
  'src/platform-theme.css'
];

const checkFiles = () => {
  const missing: string[] = [];
  REQUIRED_FILES.forEach(file => {
    if (!fs.existsSync(file)) {
      missing.push(file);
    }
  });

  if (missing.length > 0) {
    console.error('❌ Missing required files:', missing);
    process.exit(1);
  }
  console.log('✅ All required files present');
};

checkFiles();
