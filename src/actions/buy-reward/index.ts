"use server";

import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { rewardsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

interface BuyRewardParams {
  userId: string;
  rewardId: string;
}

export const buyReward = async ({ userId, rewardId }: BuyRewardParams) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  // opcional: garantir que o usuário da sessão só compre sua própria recompensa
  if (session.user.id !== userId) {
    throw new Error("Você não pode comprar essa recompensa");
  }

  await db
    .update(rewardsTable)
    .set({ status: "purchased", updatedAt: new Date() })
    .where(and(eq(rewardsTable.id, rewardId), eq(rewardsTable.userId, userId)));
};
