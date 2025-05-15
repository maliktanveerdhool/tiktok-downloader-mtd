
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-95 py-3 px-4 md:px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="text-tiktok-primary font-bold text-xl">Tik</span>
            <span className="text-tiktok-secondary font-bold text-xl">Down</span>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <a 
            href="https://www.tiktok.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-tiktok-primary transition duration-300"
          >
            Visit TikTok
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
