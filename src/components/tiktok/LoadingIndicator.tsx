
import React from 'react';

interface LoadingIndicatorProps {
  text?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  text = "Processing TikTok media..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 animate-in fade-in-50 duration-300">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-tiktok-primary border-r-tiktok-secondary border-b-tiktok-primary border-l-tiktok-secondary animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-black rounded-full"></div>
        </div>
      </div>
      <p className="mt-4 text-white text-lg">{text}</p>
      <p className="text-gray-400 text-sm mt-2">This may take a moment...</p>
    </div>
  );
};

export default LoadingIndicator;
