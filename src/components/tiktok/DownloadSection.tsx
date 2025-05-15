
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface DownloadSectionProps {
  videoUrl: string | null;
  resetDownload: () => void;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ 
  videoUrl, 
  resetDownload 
}) => {
  if (!videoUrl) return null;

  const handleDownload = () => {
    // In a real application, this would trigger an actual download
    // Currently it's mocked since we don't have a backend
    
    // Create an anchor element and trigger download
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = `tiktok-video-${Date.now()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Download started!');
  };

  return (
    <div className="mt-8 p-6 bg-white/5 rounded-lg border border-tiktok-primary/30 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
      <div className="text-center space-y-4">
        <h3 className="text-xl font-medium text-white">Your video is ready!</h3>
        <p className="text-gray-400">Click the button below to download your TikTok video</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-tiktok-primary to-tiktok-accent text-black px-6 py-6 h-auto text-lg font-medium hover:opacity-90"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Video
          </Button>
          
          <Button
            onClick={resetDownload}
            variant="outline"
            className="border-tiktok-secondary/50 text-tiktok-secondary hover:bg-tiktok-secondary/10"
          >
            Download Another
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
