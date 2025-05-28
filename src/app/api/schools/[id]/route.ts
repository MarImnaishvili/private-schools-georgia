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

export async function GET(
  req: NextRequest,
  context: Promise<{ params: { id: string } }>
) {
  const { params } = await context;
  const { id } = params;

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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = uuidSchema.parse(params.id);
    const data = await req.json();

    const transformedData = transformNestedUpdates(data);

    const updated = await prisma.schoolData.update({
      where: { id },
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Log for debugging
    console.log("Deleting school with ID:", id);

    const deleted = await prisma.schoolData.delete({
      where: { id },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("DELETE /api/schools/[id] error:", error);
    return new NextResponse("Failed to delete school", { status: 500 });
  }
}
