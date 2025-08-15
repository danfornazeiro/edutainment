/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YoutubePlayerProps {
  videoId: string;
  onEnd: () => void;
}

export default function YoutubePlayer({ videoId, onEnd }: YoutubePlayerProps) {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.id = "youtube-iframe-api";
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("player", {
        width: "100%", // largura 100%
        height: "100%", // altura 100% do container
        videoId: videoId,
        events: {
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              onEnd();
            }
          },
        },
      });
    };
  }, [videoId, onEnd]);

  return (
    <div className="mx-auto w-full max-w-xs" style={{ aspectRatio: "16/9" }}>
      <div id="player" className="h-full w-full" />
    </div>
  );
}
