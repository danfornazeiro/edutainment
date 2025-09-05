import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { rewardsTable, userRewardsTable } from "@/db/schema";

export const GET = async (req: Request) => {
  const userId = req.headers.get("x-user-id"); // enviar id do usuário nos headers

  try {
    const rewards = await db.select().from(rewardsTable);

    if (!userId) return NextResponse.json(rewards);

    const purchased = await db
      .select({ rewardId: userRewardsTable.rewardId })
      .from(userRewardsTable)
      .where(eq(userRewardsTable.userId, userId));

    const purchasedIds = purchased.map((p) => p.rewardId);

    const rewardsWithStatus = rewards.map((r) => ({
      ...r,
      status: purchasedIds.includes(r.id) ? "purchased" : r.status,
    }));

    return NextResponse.json(rewardsWithStatus);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
