import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 p-8 mt-12 bg-gray-50 text-sm text-gray-600">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold mb-4">Platform</h4>
          <ul className="space-y-2">
            <li><Link to="/products/manuals">Manuals</Link></li>
            <li><Link to="/relational">Relational</Link></li>
            <li><Link to="/signal">Signal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Developers</h4>
          <ul className="space-y-2">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/docs">Documentation</Link></li>
            <li><Link to="/developer">Dev Portal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Company</h4>
          <ul className="space-y-2">
            <li><Link to="/company/about">About</Link></li>
            <li><Link to="/company/contact">Contact</Link></li>
            <li><Link to="/company/careers">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><Link to="/legal/terms">Terms</Link></li>
            <li><Link to="/legal/privacy">Privacy</Link></li>
            <li><Link to="/legal/clinical">Clinical Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-200 text-center">
        © {new Date().getFullYear()} DEFRAG. Systems nominal.
      </div>
    </footer>
  );
};
export default Footer;
