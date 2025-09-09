"use client";

import { useQueryClient } from "@tanstack/react-query";

import { minusPoint } from "@/actions/minus-points";
import { useUserCredit } from "@/hooks/queries/use-user-get-credit";
import { authClient } from "@/lib/auth-client";

import { Button } from "../ui/button";

const Teste2 = () => {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;
  const query = useQueryClient();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: credit } = useUserCredit(userId);

  const handleMinusPoints = async () => {
    if (!userId) return;
    await minusPoint(userId);
    query.invalidateQueries({ queryKey: ["userCredit", userId] });
  };

  return <Button onClick={handleMinusPoints}>perder 5 pontos</Button>;
};

export default Teste2;
