import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma"; // your prisma client instance

export async function POST(request: Request) {
  try {
    const mediaItems = await request.json();

    // Insert all media items (adapt as needed for relations)
    // Example assuming mediaItems is an array of media objects
    await prisma.media.createMany({
      data: mediaItems,
    });

    return NextResponse.json({ message: "Media saved" }, { status: 201 });
  } catch (error) {
    console.error("Failed to save media", error);
    return NextResponse.json(
      { error: "Failed to save media" },
      { status: 500 }
    );
  }
}
