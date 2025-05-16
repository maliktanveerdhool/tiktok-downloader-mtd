
import { Downloader } from '@tobyg74/tiktok-api-dl';

export interface TikTokVideoResponse {
  url: string;
  type: 'video' | 'image';
  title: string;
  author: string;
  cover?: string;
  error?: string;
}

export async function downloadTikTokVideo(url: string): Promise<TikTokVideoResponse> {
  try {
    console.log(`Processing TikTok URL: ${url}`);
    
    // Call the TikTok API
    const result = await Downloader(url, {
      version: "v1"
    });
    
    console.log('API Response:', JSON.stringify(result, null, 2));
    
    // Check if the request was successful
    if (result.status === "success" && result.result) {
      const data = result.result;
      
      // Handle video type
      if (data.type === "video" && data.video) {
        return {
          url: data.video.downloadAddr[0] || data.video.playAddr[0],
          type: 'video',
          title: data.desc || "TikTok Video",
          author: data.author?.nickname || "Unknown",
          cover: data.cover?.[0] || data.video.cover?.[0]
        };
      } 
      // Handle image type (slides)
      else if (data.type === "image" && data.images) {
        return {
          url: data.images[0],
          type: 'image',
          title: data.desc || "TikTok Image",
          author: data.author?.nickname || "Unknown",
          cover: data.cover?.[0]
        };
      }
      
      return {
        url: "",
        type: "video",
        title: "",
        author: "",
        error: "Could not process media from the response"
      };
    }
    
    // Handle error
    return {
      url: "",
      type: "video",
      title: "",
      author: "",
      error: result.message || "Failed to download video"
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
