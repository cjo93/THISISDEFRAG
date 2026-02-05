import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Navigation({ isOpen, onClose }: NavigationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A] flex flex-col items-center justify-center animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:opacity-70 transition-opacity p-2"
        aria-label="Close Menu"
      >
        <X size={24} />
      </button>

      <nav className="flex flex-col items-center space-y-12 text-center">
        <Link
          to="/"
          onClick={onClose}
          className="text-4xl md:text-5xl font-serif text-white hover:text-[#64748B] transition-colors tracking-tight"
        >
          Home
        </Link>
        <Link
          to="/defrag-manual"
          onClick={onClose}
          className="text-4xl md:text-5xl font-serif text-white hover:text-[#64748B] transition-colors tracking-tight"
        >
          Manual
        </Link>
        <Link
          to="/developer"
          onClick={onClose}
          className="text-4xl md:text-5xl font-serif text-white hover:text-[#64748B] transition-colors tracking-tight"
        >
          Developer
        </Link>
        <Link
          to="/signin"
          onClick={onClose}
          className="text-4xl md:text-5xl font-serif text-white hover:text-[#64748B] transition-colors tracking-tight"
        >
          Sign In
        </Link>
      </nav>
    </div>
  );
}
