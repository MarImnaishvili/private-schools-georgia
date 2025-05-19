import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const newSchool = await prisma.schoolData.create({
      SchoolData: {
        name: "Test School",
        address: {
          create: {
            city: "Tbilisi",
            street: "Rustaveli Ave 12",
            postalCode: "0108",
          },
        },
        infrastructure: {
          create: {
            hasLibrary: true,
          },
        },
        primaryLevel: {
          create: {
            price: 120,
            duration: "10",
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: newSchool });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
    return NextResponse.json({
      success: false,
      error: "An unknown error occurred.",
    });
  }
}
