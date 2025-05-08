// src/app/api/schools/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all schools
export async function GET() {
  try {
    const schools = await prisma.school.findMany({
      orderBy: { createdAt: "desc" },
    });

    const parsed = schools.map((school) => ({
      ...school,
      photoUrls: JSON.parse(school.photoUrls),
      infrastructure: JSON.parse(school.infrastructure),
      primary: JSON.parse(school.primary),
      basic: JSON.parse(school.basic),
      secondary: JSON.parse(school.secondary),
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch schools" },
      { status: 500 }
    );
  }
}

// POST a new school
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newSchool = await prisma.school.create({
      data: {
        name: body.name,
        address: body.address,
        phoneNumber: body.phoneNumber,
        schoolsWebSite: body.schoolsWebSite,
        otherSocialLinks: body.otherSocialLinks,
        founder: body.founder,
        director: body.director,
        publicRelationsManager: body.publicRelationsManager,
        parentRelationshipManager: body.parentRelationshipManager,

        infrastructure: JSON.stringify(body.infrastructure),
        primary: JSON.stringify(body.primary),
        basic: JSON.stringify(body.basic),
        secondary: JSON.stringify(body.secondary),

        otherPrograms: body.otherPrograms,
        description: body.description,
        photoUrls: JSON.stringify(body.photoUrls),

        tutor: body.tutor,
        scholarshipsGrants: body.scholarshipsGrants,
        exchangePrograms: body.exchangePrograms,
        outdoorGarden: body.outdoorGarden,
      },
    });

    return NextResponse.json(newSchool, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create school" },
      { status: 500 }
    );
  }
}
