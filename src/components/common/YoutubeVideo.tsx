"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addPoints } from "@/actions/add-points";
import { authClient } from "@/lib/auth-client";

import YoutubePlayer from "./youtube-player";

interface YoutubeVideoProps {
  videoId: string;
}

const YoutubeVideo = ({ videoId }: YoutubeVideoProps) => {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;
  const query = useQueryClient();

  const handleVideoEnd = async () => {
    if (!userId) return;
    toast.success("Você ganhou 5 créditos!");
    await addPoints(userId);
    query.invalidateQueries({ queryKey: ["userCredit", userId] });
  };

  return <YoutubePlayer videoId={videoId} onEnd={handleVideoEnd} />;
};

export default YoutubeVideo;
