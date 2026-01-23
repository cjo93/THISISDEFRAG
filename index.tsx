
console.log('BOOT: Starting index.tsx execution...');

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './src/AppRouter';
import './src/index.css';

console.log('BOOT: Imports passed. Looking for root...');

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
