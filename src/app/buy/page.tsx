"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useRewards } from "@/hooks/queries/use-get-rewards";
import { useUserCredit } from "@/hooks/queries/use-user-get-credit";
import { authClient } from "@/lib/auth-client";

import Card from "./components/card";

type ToastType = "success" | "error";

const ShopPage = () => {
  const { data: rewards = [], isLoading, error } = useRewards();
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;
  const { data: credit } = useUserCredit(userId);

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  const queryClient = useQueryClient();

  if (isLoading) return <p>Carregando recompensas...</p>;
  if (error) return <p>Erro ao carregar recompensas</p>;

  const handleBuy = async (rewardId: string, requiredCredits: number) => {
    if (!userId) return;

    // Verifica créditos
    if ((credit ?? 0) < requiredCredits) {
      setToast({ message: "Créditos insuficientes!", type: "error" });
      return;
    }

    try {
      const res = await fetch("/api/rewards/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rewardId, userId, requiredCredits }),
      });

      const data = await res.json();

      if (!res.ok) {
        setToast({
          message: data.error || "Erro ao comprar a recompensa",
          type: "error",
        });
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["rewards"] });
      queryClient.invalidateQueries({ queryKey: ["userCredit"] });

      setToast({
        message: "Recompensa comprada com sucesso!",
        type: "success",
      });
    } catch (err) {
      console.error("Erro ao comprar a recompensa", err);
      setToast({ message: "Erro ao comprar a recompensa", type: "error" });
    }
  };

  return (
    <div className="relative p-4">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {rewards.map((reward) => {
          const isPurchased = reward.status === "purchased";

          return (
            <Card
              key={reward.id}
              title={reward.title}
              status={reward.status}
              description={reward.description}
              price={reward.requiredCredits.toString()}
              image=""
              onBuy={
                isPurchased
                  ? undefined
                  : () => handleBuy(reward.id, reward.requiredCredits)
              }
            />
          );
        })}
      </div>

      {toast && (
        <div
          className={`animate-fade-in-out fixed top-5 right-5 z-50 flex w-72 items-center justify-between gap-4 rounded-lg p-4 text-white shadow-lg ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <p className="font-semibold">{toast.message}</p>
          <button
            onClick={() => setToast(null)}
            className="hover:bg-opacity-75 flex h-6 w-6 items-center justify-center rounded-full font-bold text-white"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
