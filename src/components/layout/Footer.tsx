
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-90 py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-tiktok-primary font-bold text-xl">Tik</span>
              <span className="text-tiktok-secondary font-bold text-xl">Down</span>
            </div>
            <p className="text-gray-400 max-w-md">
              A simple tool to download your favorite TikTok videos without watermarks.
              For personal use only.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end">
            <h3 className="text-white font-medium mb-3">Important Notice</h3>
            <p className="text-gray-400 text-sm max-w-md md:text-right">
              This tool is for personal use only. Please respect copyright and terms of service for TikTok. 
              We do not store any videos or user data on our servers.
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TikDown. Not affiliated with TikTok.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-400 hover:text-tiktok-primary text-sm">Terms</a></li>
              <li><a href="#" className="text-gray-400 hover:text-tiktok-primary text-sm">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-tiktok-primary text-sm">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
