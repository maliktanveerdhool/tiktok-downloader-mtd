
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
    
    // Extract video ID from the TikTok URL
    const videoId = extractVideoId(url);
    
    if (!videoId) {
      throw new Error("Could not extract video ID from the URL");
    }
    
    console.log(`Extracted video ID: ${videoId}`);
    
    try {
      // First attempt: Use the tiktok-video-no-watermark2 RapidAPI endpoint
      const response = await fetch(`https://tiktok-video-no-watermark2.p.rapidapi.com/video/data?video_id=${videoId}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'a3f4e4bf05msh8297f426407dbecp1c245fjsn009592560ff3',
          'x-rapidapi-host': 'tiktok-video-no-watermark2.p.rapidapi.com'
        }
      });
  
      if (!response.ok) {
        throw new Error(`API response error: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('RapidAPI tiktok-video-no-watermark2 response:', data);
      
      // Check if the API returned valid data
      if (!data || !data.data) {
        throw new Error("Invalid response from API");
      }
      
      // Extract video information from the API response
      const videoData = data.data;
      
      // Find the no watermark URL in the response
      let downloadUrl = "";
      if (videoData.play) {
        downloadUrl = videoData.play;
      } else if (videoData.video && videoData.video.playAddr) {
        downloadUrl = videoData.video.playAddr;
      } else if (videoData.video && videoData.video.downloadAddr) {
        downloadUrl = videoData.video.downloadAddr;
      } else if (Array.isArray(videoData.itemStruct?.video?.playAddr) && videoData.itemStruct.video.playAddr.length > 0) {
        downloadUrl = videoData.itemStruct.video.playAddr[0];
      }
      
      // If no URL found, try to get it from alternate location in response
      if (!downloadUrl && videoData.itemStruct && videoData.itemStruct.video) {
        const videoFormats = videoData.itemStruct.video.bitRateList || [];
        if (videoFormats.length > 0) {
          // Get highest quality video
          const sortedFormats = [...videoFormats].sort((a, b) => b.bitRate - a.bitRate);
          downloadUrl = sortedFormats[0]?.playAddr || "";
        }
      }
      
      if (!downloadUrl) {
        throw new Error("Could not find download URL in the API response");
      }
      
      // Get video details
      const title = videoData.title || videoData.desc || `TikTok Video ${videoId}`;
      const author = videoData.author?.nickname || videoData.author?.uniqueId || "TikTok Creator";
      const cover = videoData.cover || videoData.dynamicCover || videoData.originCover || "";
      
      return {
        url: downloadUrl,
        type: 'video',
        title: title,
        author: author,
        cover: cover
      };
    } catch (apiError) {
      console.log("First API method failed, trying alternative approach:", apiError);
      
      // Alternative method: Try another endpoint - tiktok-video-downloader-api-no-watermark
      const response = await fetch(`https://tiktok-video-downloader-api-no-watermark.p.rapidapi.com/tiktok`, {
        method: 'POST',
        headers: {
          'x-rapidapi-key': 'a3f4e4bf05msh8297f426407dbecp1c245fjsn009592560ff3',
          'x-rapidapi-host': 'tiktok-video-downloader-api-no-watermark.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error(`Alternative API response error: ${response.status}`);
      }

      const data = await response.json();
      console.log('RapidAPI alternative response:', data);
      
      if (!data || !data.result || !data.result.video || !data.result.video.length) {
        throw new Error("Invalid response from alternative API");
      }
      
      // Extract video information
      const videoURL = data.result.video[0];
      const title = data.result.title || `TikTok Video ${videoId}`;
      const author = data.result.author?.name || "TikTok Creator";
      const cover = data.result.cover || "";
      
      return {
        url: videoURL,
        type: 'video',
        title,
        author,
        cover
      };
    }
  } catch (error) {
    console.error("Error downloading TikTok video:", error);
    
    // As a last resort, try to generate a direct embed URL for the video
    // This won't download the video but at least provides a way to view it
    const embedUrl = `https://www.tiktok.com/embed/v2/${extractVideoId(url)}`;
    
    return {
      url: embedUrl,
      type: 'video',
      title: `TikTok Video`,
      author: "TikTok Creator",
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}

// Helper function to extract video ID from TikTok URL
function extractVideoId(url: string): string | null {
  try {
    // Handle regular TikTok URLs
    let regularUrlMatch = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/i);
    if (regularUrlMatch && regularUrlMatch[1]) {
      return regularUrlMatch[1];
    }
    
    // Handle shortened URLs
    let shortUrlMatch = url.match(/vm\.tiktok\.com\/(\w+)/i) || url.match(/vt\.tiktok\.com\/(\w+)/i);
    if (shortUrlMatch) {
      // For short URLs, we might need to resolve them first, but we'll try with the short ID
      return shortUrlMatch[1];
    }
    
    // Additional pattern for mobile URLs
    let mobileUrlMatch = url.match(/tiktok\.com\/t\/(\w+)/i);
    if (mobileUrlMatch) {
      return mobileUrlMatch[1];
    }
    
    // Try to match any numeric sequence that could be a video ID
    let genericIdMatch = url.match(/\/video\/(\d+)/i) || url.match(/[\?&]video_id=(\d+)/i);
    if (genericIdMatch && genericIdMatch[1]) {
      return genericIdMatch[1];
    }
    
    return null;
  } catch (e) {
    console.error("Error extracting video ID:", e);
    return null;
  }
}

