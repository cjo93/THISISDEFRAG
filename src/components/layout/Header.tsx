import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-200 p-4 flex justify-between items-center bg-white text-black">
      <Link to="/" className="font-bold text-xl">DEFRAG</Link>
      <nav className="space-x-4">
        <Link to="/products/manuals" className="hover:underline">Manuals</Link>
        <Link to="/relational" className="hover:underline">Relational</Link>
        <Link to="/signal" className="hover:underline">Signal</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
      </nav>
    </header>
  );
};
export default Header;
