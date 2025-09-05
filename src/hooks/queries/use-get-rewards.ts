import { useQuery } from "@tanstack/react-query";

import { authClient } from "@/lib/auth-client";

export interface Reward {
  id: string;
  title: string;
  description: string;
  requiredCredits: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Função que busca as recompensas da API
async function fetchRewards(userId?: string): Promise<Reward[]> {
  const res = await fetch("/api/rewards", {
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId || "",
    },
  });
  if (!res.ok) throw new Error("Erro ao buscar recompensas");
  const data = await res.json();
  return data;
}

// Hook para usar em componentes
export function useRewards() {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  return useQuery({
    queryKey: ["rewards", userId],
    queryFn: () => fetchRewards(userId),
    staleTime: 1000 * 60, // 1 minuto
  });
}
