
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 bg-opacity-50 border-t border-gray-800 mt-auto py-6 px-4 z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
        <p className="mb-4 sm:mb-0">
          &copy; {currentYear} Ervin Remus Radosavlevici. All rights reserved. Private Use.
        </p>
        <div className="flex space-x-4">
          <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors">API & Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-gray-300 transition-colors">Terms of Use</Link>
          <Link to="/gdpr" className="hover:text-gray-300 transition-colors">Data & GDPR</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
