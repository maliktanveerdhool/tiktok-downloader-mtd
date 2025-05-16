
export interface TikTokVideoResponse {
  url: string;
  type: 'video' | 'image';
  title: string;
  author: string;
  cover?: string;
  error?: string;
}

// This is a browser-compatible mock of the TikTok downloader API
// The actual @tobyg74/tiktok-api-dl library is intended for Node.js use
export async function downloadTikTokVideo(url: string): Promise<TikTokVideoResponse> {
  try {
    console.log(`Processing TikTok URL: ${url}`);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Extract video ID for demonstration
    const videoId = extractVideoId(url);
    
    if (!videoId) {
      return {
        url: "",
        type: "video",
        title: "",
        author: "",
        error: "Could not extract video ID from URL"
      };
    }
    
    // For demonstration purposes, we're creating a mock response
    // In a production app, you'd want to call your backend API that handles the TikTok API
    return {
      url: `https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
      type: 'video',
      title: `TikTok Video ${videoId}`,
      author: "TikTok Creator",
      cover: "https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
    };
  } catch (error) {
    console.error("Error downloading TikTok video:", error);
    return {
      url: "",
      type: "video",
      title: "",
      author: "",
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}

// Helper function to extract video ID from TikTok URL
function extractVideoId(url: string): string | null {
  try {
    // Handle different TikTok URL formats
    const regularUrlMatch = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/i);
    const shortUrlMatch = url.match(/vm\.tiktok\.com\/(\w+)/i) || url.match(/vt\.tiktok\.com\/(\w+)/i);
    
    if (regularUrlMatch && regularUrlMatch[1]) {
      return regularUrlMatch[1];
    }
    
    if (shortUrlMatch && shortUrlMatch[1]) {
      return shortUrlMatch[1];
    }
    
    return null;
  } catch (e) {
    console.error("Error extracting video ID:", e);
    return null;
  }
}
