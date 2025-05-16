
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ onUrlSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  
  const validateTikTokUrl = (url: string): boolean => {
    // Basic validation for TikTok URLs
    const patterns = [
      /https?:\/\/(www\.)?tiktok\.com\/@[\w.-]+\/video\/\d+/i,
      /https?:\/\/(www\.)?vm\.tiktok\.com\/\w+/i,
      /https?:\/\/(www\.)?vt\.tiktok\.com\/\w+/i,
    ];
    
    return patterns.some(pattern => pattern.test(url));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error('Please enter a TikTok URL');
      return;
    }
    
    // Enhanced TikTok URL validation
    if (!validateTikTokUrl(url)) {
      toast.error('Please enter a valid TikTok URL');
      return;
    }
    
    onUrlSubmit(url);
  };
  
  const handlePaste = () => {
    navigator.clipboard.readText()
      .then(text => {
        if (text && validateTikTokUrl(text)) {
          setUrl(text);
          toast.success('TikTok URL pasted!');
        } else {
          toast.error('Clipboard does not contain a valid TikTok URL');
        }
      })
      .catch(() => {
        toast.error('Could not access clipboard');
      });
  };
  
  const handleClear = () => {
    setUrl('');
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Paste TikTok video URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={cn(
              "pr-24 bg-white/10 text-white border-tiktok-primary/50 focus:border-tiktok-primary",
              "placeholder:text-gray-400 h-12 text-base"
            )}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
            {url && (
              <Button 
                type="button" 
                onClick={handleClear}
                className="bg-transparent hover:bg-white/10 text-gray-400 h-8 px-2"
                disabled={isLoading}
              >
                ✕
              </Button>
            )}
            <Button 
              type="button" 
              onClick={handlePaste}
              className="bg-transparent hover:bg-white/10 text-tiktok-primary h-8 px-3"
              disabled={isLoading}
            >
              Paste
            </Button>
          </div>
        </div>
        <Button 
          type="submit" 
          className={cn(
            "bg-gradient-to-r from-tiktok-primary to-tiktok-accent text-black h-12 px-8 font-medium",
            "hover:opacity-90 transition-all"
          )}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Download'}
        </Button>
      </div>
      <div className="text-xs text-gray-400 text-center">
        Supported formats: TikTok video links (www.tiktok.com/@user/video/id, vm.tiktok.com, vt.tiktok.com)
      </div>
    </form>
  );
};

export default UrlInput;
