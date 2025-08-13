import { useQuery } from "@tanstack/react-query";

async function fetchCredit(userId: string): Promise<number> {
  const res = await fetch(`/api/user/credit?userId=${userId}`);
  if (!res.ok) throw new Error("Erro ao buscar crédito");
  const data = await res.json();
  return data.credit ?? 0;
}

export function useUserCredit(userId: string | undefined) {
  return useQuery({
    queryKey: ["userCredit", userId],
    queryFn: () => {
      if (!userId) return Promise.resolve(0);
      return fetchCredit(userId);
    },
    enabled: !!userId, // só busca se userId existir
  });
}
