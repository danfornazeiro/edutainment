import { NextRequest } from "next/server";

import { db } from "@/db";

export const GET = async (req: NextRequest) => {
  const courses = await db.query.coursesTable.findMany({});
  return new Response(JSON.stringify(courses), { status: 200 });
};
