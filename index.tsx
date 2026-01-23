
console.log('BOOT: Starting index.tsx execution...');

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './src/AppRouter';
import './src/index.css';

console.log('BOOT: Imports passed. Looking for root...');

// CACHE BUSTING & VERSION CONTROL
const APP_VERSION = '1.2.0';

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

    // Optional: Force reload if we suspect we are running stale code, 
    // but usually let the React app mount first so we don't boot loop.
  }
} catch (e) {
  console.error('Cache clear failed', e);
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('BOOT FAILURE: Root element not found');
  throw new Error("Could not find root element to mount to");
}

console.log('BOOT: Root found. Attempting mount...');

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 50, color: 'red', background: 'black', height: '100vh', overflow: 'auto' }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
          <pre>{this.state.error?.stack}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
  console.log('BOOT: Mount called successfully.');
} catch (err) {
  console.error('BOOT FAILURE: Render crashed', err);
}
