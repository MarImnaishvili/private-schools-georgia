// app/api/test/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const schools = await prisma.schoolData.findMany({
    include: {
      address: true,
    },
  });

  return NextResponse.json(schools);
}
