import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const root = document.getElementById('root');
    if (!root) return;

    // Platform routes
    if (path.startsWith('/dashboard') || path.startsWith('/docs') || path.startsWith('/developer') || path.startsWith('/auth')) {
      root.classList.remove('theme-consumer');
      root.classList.add('theme-platform');
    } else {
      // Consumer routes (default)
      root.classList.remove('theme-platform');
      root.classList.add('theme-consumer');
    }
  }, [location]);

  return <>{children}</>;
};
