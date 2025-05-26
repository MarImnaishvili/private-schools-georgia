//api/schools/[id]/route
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const schoolId = params.id;
    const body = await req.json();

    const updatedSchool = await prisma.schoolData.update({
      where: { id: schoolId },
      data: {
        name: body.name,
        phoneNumber1: body.phoneNumber1,
        phoneNumber2: body.phoneNumber2,
        phoneNumber3: body.phoneNumber3,
        schoolsWebSite: body.schoolsWebSite,
        facebookProfileURL: body.facebookProfileURL,
        instagramProfileURL: body.instagramProfileURL,
        founder: body.founder,
        director: body.director,
        publicRelationsManager: body.publicRelationsManager,
        parentRelationshipManager: body.parentRelationshipManager,
        establishedYear: body.establishedYear,
        accreditationStatus: body.accreditationStatus,
        accreditationComment: body.accreditationComment,
        graduationRate: body.graduationRate
          ? parseFloat(body.graduationRate)
          : null,
        averageNationalExamScore: body.averageNationalExamScore
          ? parseFloat(body.averageNationalExamScore)
          : null,
        description: body.description,
        hasTutor: body.hasTutor,
        tutorDescription: body.tutorDescription,
        hasScholarshipsGrants: body.hasScholarshipsGrants,
        scholarshipsGrants: body.scholarshipsGrants,
        hasExchangePrograms: body.hasExchangePrograms,
        exchangePrograms: body.exchangePrograms,
        hasOutdoorGarden: body.hasOutdoorGarden,
        outdoorGarden: body.outdoorGarden,
        otherPrograms: body.otherPrograms,

        address: {
          update: {
            city: body.address.city,
            street: body.address.street,
            zipCode: body.address.zipCode?.toString() || "",
            district: body.address.district,
          },
        },

        infrastructure: {
          update: {
            buildings_has: body.infrastructure.buildings,
            numberOfFloors_has: body.infrastructure.numberOfFloors,
            squareness_has: body.infrastructure.squareness,
            stadiums_has: body.infrastructure.stadiums,
            pools_has: body.infrastructure.pools,
            courtyard_has: body.infrastructure.courtyard,
            laboratories_has: body.infrastructure.laboratories,
            library_has: body.infrastructure.library,
            cafe_has: body.infrastructure.cafe,
          },
        },

        primaryLevel: {
          update: {
            price: body.primary.price,
            schoolUniform: body.primary.schoolUniform,
            discountAndPaymentTerms: body.primary.discountAndPaymentTerms,
            numberOfStudents: body.primary.numberOfStudents,
            meals: body.primary.meals,
            mealsDescription: body.primary.mealsDescription,
            transportation: body.primary.transportation,
            mandatorySportsClubs: Array.isArray(
              body.primary.mandatorySportsClubs
            )
              ? body.primary.mandatorySportsClubs.join(",")
              : body.primary.mandatorySportsClubs,
            teachingStyleBooks: body.primary.teachingStyleBooks,
            textbooksPrice: body.primary.textbooksPrice || null,
            clubsAndCircles: body.primary.clubsAndCircles,
            duration: body.primary.duration,
          },
        },

        basicLevel: {
          update: {
            price: body.basic.price,
            schoolUniform: body.basic.schoolUniform,
            discountAndPaymentTerms: body.basic.discountAndPaymentTerms,
            numberOfStudents: body.basic.numberOfStudents,
            meals: body.basic.meals,
            mealsDescription: body.basic.mealsDescription,
            transportation: body.basic.transportation,
            mandatorySportsClubs: Array.isArray(body.basic.mandatorySportsClubs)
              ? body.basic.mandatorySportsClubs.join(",")
              : body.basic.mandatorySportsClubs,
            teachingStyleBooks: body.basic.teachingStyleBooks,
            textbooksPrice: body.basic.textbooksPrice || null,
            clubsAndCircles: body.basic.clubsAndCircles,
            duration: body.basic.duration,
          },
        },

        secondaryLevel: {
          update: {
            price: body.secondary.price,
            schoolUniform: body.secondary.schoolUniform,
            discountAndPaymentTerms: body.secondary.discountAndPaymentTerms,
            numberOfStudents: body.secondary.numberOfStudents,
            meals: body.secondary.meals,
            mealsDescription: body.secondary.mealsDescription,
            transportation: body.secondary.transportation,
            mandatorySportsClubs: Array.isArray(
              body.secondary.mandatorySportsClubs
            )
              ? body.secondary.mandatorySportsClubs.join(",")
              : body.secondary.mandatorySportsClubs,
            teachingStyleBooks: body.secondary.teachingStyleBooks,
            textbooksPrice: body.secondary.textbooksPrice || null,
            clubsAndCircles: body.secondary.clubsAndCircles,
            duration: body.secondary.duration,
          },
        },
      },
    });

    return NextResponse.json(updatedSchool);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update school" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
