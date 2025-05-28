/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/schools/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const uuidSchema = z.string().uuid();

function transformNestedUpdates(data: any) {
  const { address, infrastructure, primary, basic, secondary, ...rest } = data;

  return {
    ...rest,
    ...(address && { address: { update: address } }),
    ...(infrastructure && { infrastructure: { update: infrastructure } }),
    ...(primary && { primary: { update: primary } }),
    ...(basic && { basic: { update: basic } }),
    ...(secondary && { secondary: { update: secondary } }),
  };
}

// ✅ FIXED GET signature
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // extract ID from the URL

  if (!id || !uuidSchema.safeParse(id).success) {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const school = await prisma.schoolData.findUnique({
    where: { id },
    include: {
      address: true,
      infrastructure: true,
      primary: true,
      basic: true,
      secondary: true,
    },
  });

  if (!school) {
    return new NextResponse("School not found", { status: 404 });
  }

  return NextResponse.json(school);
}

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (!id) {
      return new NextResponse("Missing school ID", { status: 400 });
    }

    const validId = uuidSchema.parse(id);
    const data = await req.json();
    const transformedData = transformNestedUpdates(data);

    const updated = await prisma.schoolData.update({
      where: { id: validId },
      data: transformedData,
      include: {
        address: true,
        infrastructure: true,
        primary: true,
        basic: true,
        secondary: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /schoolData/:id error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to update school", error }),
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    if (!id) {
      return new NextResponse("Missing school ID", { status: 400 });
    }

    const validId = uuidSchema.parse(id);

    console.log("Deleting school with ID:", validId);

    const deleted = await prisma.schoolData.delete({
      where: { id: validId },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("DELETE /api/schools/[id] error:", error);
    return new NextResponse("Failed to delete school", { status: 500 });
  }
}
