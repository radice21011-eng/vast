
import React from 'react';
import { Link } from 'react-router-dom';

interface LegalPageWrapperProps {
  title: string;
  children: React.ReactNode;
}

const LegalPageWrapper: React.FC<LegalPageWrapperProps> = ({ title, children }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-800 bg-opacity-60 backdrop-blur-md p-8 rounded-lg shadow-2xl border border-gray-700 text-gray-300">
      <div className="relative mb-6">
        <Link to="/" className="absolute left-0 top-1 text-blue-400 hover:text-blue-300">&larr; Back to Agent</Link>
        <h1 className="text-3xl font-bold text-center text-white">{title}</h1>
      </div>
      <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-gray-100 prose-a:text-blue-400 max-w-none">
        {children}
      </div>
    </div>
  );
};

export default LegalPageWrapper;
