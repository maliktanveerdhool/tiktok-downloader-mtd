
import React, { useState } from 'react';
import { FileVideo, Download, Share2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import UrlInput from '@/components/tiktok/UrlInput';
import LoadingIndicator from '@/components/tiktok/LoadingIndicator';
import DownloadSection from '@/components/tiktok/DownloadSection';
import FeatureCard from '@/components/tiktok/FeatureCard';
import TikTokLogo from '@/components/tiktok/TikTokLogo';
import { toast } from '@/components/ui/sonner';
import { downloadTikTokVideo, TikTokVideoResponse } from '@/services/tiktokService';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [downloadInfo, setDownloadInfo] = useState<TikTokVideoResponse | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const handleUrlSubmit = async (url: string) => {
    setIsLoading(true);
    setDownloadInfo(null);
    setIsDemoMode(false);
    
    try {
      // Call our service to download the TikTok video
      const result = await downloadTikTokVideo(url);
      
      if (result.error) {
        toast.error(result.error);
        setIsLoading(false);
        return;
      }
      
      // Check if we're using the fallback (demo) mode
      if (result.url.includes('storage.googleapis.com')) {
        setIsDemoMode(true);
      }
      
      // Success - set the download information
      setDownloadInfo(result);
      toast.success('Video processed successfully!');
    } catch (error) {
      toast.error('Failed to process TikTok URL');
      console.error("Error processing TikTok URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetDownload = () => {
    setDownloadInfo(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Demo Mode Alert - Only show if in demo mode */}
        {isDemoMode && (
          <div className="max-w-5xl mx-auto px-4 mt-4">
            <Alert className="bg-yellow-900/20 border-yellow-600 text-yellow-200">
              <AlertTitle className="text-yellow-300">Demo Mode Active</AlertTitle>
              <AlertDescription>
                The TikTok API might be experiencing issues or the video URL format is not supported.
                A sample video is being provided for demonstration purposes.
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <TikTokLogo className="w-20 h-20" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-tiktok-primary via-white to-tiktok-secondary text-transparent bg-clip-text">
              TikTok Video Downloader
            </h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-12">
              Download TikTok videos without watermarks. Fast, free, and easy to use.
            </p>
            
            <div className="max-w-3xl mx-auto">
              <UrlInput onUrlSubmit={handleUrlSubmit} isLoading={isLoading} />
            </div>
            
            {isLoading && <LoadingIndicator />}
            
            {downloadInfo && (
              <DownloadSection 
                videoUrl={downloadInfo.url} 
                resetDownload={resetDownload}
                videoInfo={downloadInfo}
              />
            )}
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="Paste TikTok URL" 
                description="Copy the link of any TikTok video you want to download and paste it into our tool."
                icon={<Share2 size={36} />}
              />
              <FeatureCard 
                title="Process Video" 
                description="Our system will process the video and remove any watermarks from the content."
                icon={<FileVideo size={36} />}
              />
              <FeatureCard 
                title="Download Video" 
                description="Download the video to your device and enjoy watching it offline anytime."
                icon={<Download size={36} />}
              />
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-medium text-tiktok-primary mb-2">Is this service free?</h3>
                <p className="text-gray-300">Yes, our TikTok video downloader is completely free to use with no hidden charges.</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-medium text-tiktok-primary mb-2">Is it legal to download TikTok videos?</h3>
                <p className="text-gray-300">Downloading videos for personal use is generally acceptable. However, please respect copyright and do not redistribute content without permission.</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-medium text-tiktok-primary mb-2">What video quality do I get?</h3>
                <p className="text-gray-300">We provide the highest quality available from the original video upload on TikTok.</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-medium text-tiktok-primary mb-2">Do you store the videos I download?</h3>
                <p className="text-gray-300">No, we do not store any videos on our servers. The process happens in real-time and we don't keep any user data.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
