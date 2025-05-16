
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, User } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { TikTokVideoResponse } from '@/services/tiktokService';

interface DownloadSectionProps {
  videoUrl: string;
  resetDownload: () => void;
  videoInfo?: TikTokVideoResponse;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ 
  videoUrl, 
  resetDownload,
  videoInfo
}) => {
  if (!videoUrl) return null;

  const handleDownload = () => {
    try {
      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = videoUrl;
      
      // Set filename based on video info or default
      const fileExtension = videoInfo?.type === 'image' ? 'jpg' : 'mp4';
      const fileName = videoInfo?.title 
        ? `${videoInfo.title.substring(0, 30).replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.${fileExtension}`
        : `tiktok-${Date.now()}.${fileExtension}`;
        
      link.download = fileName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Download started!');
    } catch (error) {
      console.error("Download error:", error);
      toast.error('Download failed. Please try again.');
    }
  };

  return (
    <div className="mt-8 p-6 bg-white/5 rounded-lg border border-tiktok-primary/30 animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
      <div className="text-center space-y-4">
        <h3 className="text-xl font-medium text-white">Your {videoInfo?.type || 'media'} is ready!</h3>
        
        {videoInfo?.cover && (
          <div className="flex justify-center">
            <img 
              src={videoInfo.cover} 
              alt={videoInfo.title || "TikTok media"} 
              className="w-48 h-48 object-cover rounded-lg border border-tiktok-secondary/30"
            />
          </div>
        )}
        
        {videoInfo?.title && (
          <p className="text-gray-200 text-lg font-medium">{videoInfo.title}</p>
        )}
        
        {videoInfo?.author && (
          <div className="flex items-center justify-center gap-2 text-tiktok-secondary">
            <User size={16} />
            <span>{videoInfo.author}</span>
          </div>
        )}
        
        <p className="text-gray-400">Click the button below to download your TikTok {videoInfo?.type || 'media'}</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-tiktok-primary to-tiktok-accent text-black px-6 py-6 h-auto text-lg font-medium hover:opacity-90"
          >
            <Download className="mr-2 h-5 w-5" />
            Download {videoInfo?.type === 'image' ? 'Image' : 'Video'}
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
