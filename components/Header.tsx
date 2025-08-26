
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gray-900 bg-opacity-50 backdrop-blur-sm shadow-lg z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white tracking-wider">
              <span className="text-blue-400">V.A.S.T.</span> AI Agent
            </Link>
            <p className="text-xs text-gray-400 -mt-1">Versatile Autonomous Secure Transactional AI</p>
          </div>
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/privacy-policy" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">API & Privacy</Link>
              <Link to="/terms-of-service" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Terms of Use</Link>
              <Link to="/gdpr" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Data & GDPR</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;