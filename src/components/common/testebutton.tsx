"use client";

import { useQueryClient } from "@tanstack/react-query";

import { addPoints } from "@/actions/add-points";
import { useUserCredit } from "@/hooks/queries/use-user-get-credit";
import { authClient } from "@/lib/auth-client";

import { Button } from "../ui/button";

const Teste = () => {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;
  const query = useQueryClient();

  const { data: credit } = useUserCredit(userId);

  const handleAddPoints = async () => {
    if (!userId) return;
    await addPoints(userId);
    query.invalidateQueries({ queryKey: ["userCredit", userId] });
  };

  return <Button onClick={handleAddPoints}>Ganhar 5 pontos</Button>;
};

export default Teste;
