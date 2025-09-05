"use server";

import { eq, sql } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { rewardsTable, userTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const buyReward = async (userId: string, rewardId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");

  // Fetch user's current credit
  const user = await db
    .select({ credit: userTable.credit })
    .from(userTable)
    .where(eq(userTable.id, userId))
    .limit(1);

  const credit = user[0]?.credit;

  if (credit && credit >= 5) {
    await db
      .update(userTable)
      .set({ credit: sql`${userTable.credit} - 5` })
      .where(eq(userTable.id, userId));

    await db
      .update(rewardsTable)
      .set({ status: "purchased" })
      .where(eq(rewardsTable.id, rewardId));
  } else {
    throw new Error("Insufficient credit");
  }
};
