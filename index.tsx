
console.log('DEFRAG v1.1 System Loaded');
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './src/AppRouter';
import './src/index.css';

// CACHE BUSTING & VERSION CONTROL
const APP_VERSION = '1.1.2';

try {
  const currentStoredVersion = localStorage.getItem('defrag_version');
  if (currentStoredVersion !== APP_VERSION) {
    console.log(`New version detected: ${APP_VERSION} (was ${currentStoredVersion}). Clearing cache...`);

    // 1. Update version
    localStorage.setItem('defrag_version', APP_VERSION);

    // 2. Clear generic caches
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          console.log('Deleting cache:', name);
          caches.delete(name);
        });
      });
    }

    // 3. Unregister Service Workers (if any existed from previous PWA attempts)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          console.log('Unregistering SW:', registration);
          registration.unregister();
        }
      });
    }

    // 4. Force reload if we weren't just loaded (to avoid loops on very first load)
    // Actually, simple reload is safer. The loop is prevented because we set localStorage above.
    // However, if the OLD code is running, it won't have this block. 
    // IF the NEW code is running, we are already fresh. 
    // This block mainly cleans up artifacts for future stability.
  }
} catch (e) {
  console.error('Cache clear failed', e);
}

console.log(`DEFRAG System v${APP_VERSION} Initialized`);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);
