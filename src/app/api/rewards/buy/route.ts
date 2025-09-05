import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/db";
import { userRewardsTable, userTable } from "@/db/schema";

export async function POST(req: NextRequest) {
  const { rewardId, userId, requiredCredits } = await req.json();

  if (!userId)
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 },
    );

  const user = await db.query.userTable.findFirst({
    where: eq(userTable.id, userId),
  });

  if (!user || user.credit < requiredCredits) {
    return NextResponse.json(
      { error: "Créditos insuficientes" },
      { status: 400 },
    );
  }

  // Registrar compra do usuário
  await db
    .insert(userRewardsTable)
    .values({ id: crypto.randomUUID(), userId, rewardId });

  // Subtrair créditos do usuário
  await db
    .update(userTable)
    .set({ credit: user.credit - requiredCredits })
    .where(eq(userTable.id, userId));

  return NextResponse.json({ success: true });
}
