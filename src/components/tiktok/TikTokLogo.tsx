
import React from 'react';

const TikTokLogo: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-tiktok-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-tiktok"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/2 h-1/2 relative">
          <div className="absolute inset-0 bg-black rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-3/4 flex items-center justify-center">
              <div className="w-1/2 h-1/2 bg-tiktok-primary rounded-sm animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TikTokLogo;
