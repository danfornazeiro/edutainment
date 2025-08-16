"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Import da server action
import { addPoints } from "@/actions/add-points";
import { useUserCredit } from "@/hooks/queries/use-user-get-credit";
import { authClient } from "@/lib/auth-client";

import YoutubePlayer from "./youtube-player";

const Teste = () => {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;
  const query = useQueryClient();

  const { data: credit } = useUserCredit(userId);
  const router = useRouter();

  const handleVideoEnd = async () => {
    if (!userId) return;
    toast.success("Deu cerot");
    await addPoints(userId);
    query.invalidateQueries({ queryKey: ["userCredit", userId] });
  };

  return <YoutubePlayer videoId="AT0nNJRK67o" onEnd={handleVideoEnd} />;
};

export default Teste;
