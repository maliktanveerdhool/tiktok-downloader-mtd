
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, User, ExternalLink } from 'lucide-react';
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

  const isEmbedUrl = videoUrl.includes('tiktok.com/embed');
  
  const handleDownload = () => {
    try {
      if (isEmbedUrl) {
        // If it's an embed URL, open in new tab
        window.open(videoUrl, '_blank');
        toast.info('Opening video in new tab. You can use browser tools to save it.');
        return;
      }
      
      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = videoUrl;
      
      // Set filename based on video info or default
      const fileExtension = videoInfo?.type === 'image' ? 'jpg' : 'mp4';
      const fileName = videoInfo?.title 
        ? `${videoInfo.title.substring(0, 30).replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.${fileExtension}`
        : `tiktok-${Date.now()}.${fileExtension}`;
        
      link.download = fileName;
      link.target = "_blank"; // Open in new tab which helps with some browsers
      
      // For direct download, we need to handle cross-origin issues
      window.open(videoUrl, '_blank');
      
      // Also try the traditional approach as a fallback
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Download started! If nothing happens, try right-clicking the video and select "Save as"');
    } catch (error) {
      console.error("Download error:", error);
      toast.error('Download failed. Please try right-clicking the video player and select "Save video as"');
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
        
        {videoInfo?.error && (
          <div className="text-amber-400 text-sm bg-amber-950/30 p-3 rounded-md">
            Note: {videoInfo.error}. Direct download may not work. 
            You can try right-clicking on the video and selecting "Save As".
          </div>
        )}
        
        <p className="text-gray-400">
          {isEmbedUrl 
            ? "Click to watch the TikTok video in a new tab" 
            : "Click the button below to download your TikTok video"}
        </p>
        
        {/* Add video preview */}
        <div className="max-w-md mx-auto my-4">
          {isEmbedUrl ? (
            <iframe
              src={videoUrl}
              className="w-full h-[500px] rounded-lg border border-tiktok-secondary/30"
              allowFullScreen
            />
          ) : (
            <video 
              src={videoUrl} 
              controls 
              poster={videoInfo?.cover} 
              className="w-full rounded-lg border border-tiktok-secondary/30"
            >
              Your browser does not support the video tag.
            </video>
          )}
          <p className="text-xs text-gray-400 mt-2">
            {isEmbedUrl 
              ? "Click the Open button below to watch on TikTok" 
              : "If video doesn't play, click the download button below"}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-tiktok-primary to-tiktok-accent text-black px-6 py-6 h-auto text-lg font-medium hover:opacity-90"
          >
            {isEmbedUrl ? (
              <>
                <ExternalLink className="mr-2 h-5 w-5" />
                Open Video
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                Download {videoInfo?.type === 'image' ? 'Image' : 'Video'}
              </>
            )}
          </Button>
          
          <Button
            onClick={resetDownload}
            variant="outline"
            className="border-tiktok-secondary/50 text-tiktok-secondary hover:bg-tiktok-secondary/10"
          >
            Download Another
          </Button>
        </div>
        
        <div className="text-xs text-gray-400 mt-4">
          <p>If the download button doesn't work, you can:</p>
          <ol className="list-decimal list-inside mt-2 text-left max-w-xs mx-auto">
            <li>Right-click on the video above</li>
            <li>Select "Save video as..."</li>
            <li>Choose a location on your device to save the video</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
