"use server";

import { eq, sql } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { userTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const addPoints = async (userId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Unauthorized");

  await db
    .update(userTable)
    .set({ credit: sql`${userTable.credit} + 5` })
    .where(eq(userTable.id, userId));
};
