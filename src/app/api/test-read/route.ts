import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const schools = await prisma.schoolData.findMany({
      include: {
        address: true,
        infrastructure: true,
        primaryLevel: true,
        basicLevel: true,
        secondaryLevel: true,
      },
    });

    return NextResponse.json({ success: true, data: schools });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
    return NextResponse.json({
      success: false,
      error: "An unknown error occurred.",
    });
  }
}
