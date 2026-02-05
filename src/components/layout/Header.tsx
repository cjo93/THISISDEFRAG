import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center text-white">
        <Link to="/" className="text-white text-sm font-bold tracking-[0.2em] uppercase font-sans z-50 hover:opacity-70 transition-opacity">
          DEFRAG
        </Link>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="text-white text-sm font-bold tracking-[0.2em] uppercase font-sans z-50 hover:opacity-70 transition-opacity"
        >
          Menu
        </button>
      </header>
      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
