//app/api/schools/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { stringifyBigInts } from "@/lib/stringifyBigInts";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newSchool = await prisma.schoolData.create({
      data: {
        name: body.name,
        phoneNumber1: body.phoneNumber1?.toString() || null,
        phoneNumber2: body.phoneNumber2?.toString() || null,
        phoneNumber3: body.phoneNumber3?.toString() || null,
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
        graduationRate:
          body.graduationRate !== "" ? parseFloat(body.graduationRate) : null,
        averageNationalExamScore:
          body.averageNationalExamScore !== ""
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
        otherPrograms: body.otherPrograms || null, // now a string column
        address: {
          create: {
            city: body.address.city,
            street: body.address.street,
            zipCode: body.address.zipCode?.toString() || "",
            district: body.address.district,
          },
        },

        infrastructure: {
          create: {
            buildings_has: body.infrastructure.buildings,
            numberOfFloors_has: body.infrastructure.numberOfFloors,
            squareness_has: body.infrastructure.squareness,
            stadiums_has: body.infrastructure.stadiums,
            pools_has: body.infrastructure.pools,
            courtyard_has: body.infrastructure.courtyard,
            laboratories_has: body.infrastructure.laboratories,
            library_has: body.infrastructure.library,
            cafe_has: body.infrastructure.cafe,
            // Set all _comment fields to null or default for now
            buildings_comment: null,
            numberOfFloors_comment: null,
            squareness_comment: null,
            stadiums_comment: null,
            pools_comment: null,
            courtyard_comment: null,
            laboratories_comment: null,
            library_comment: null,
            cafe_comment: null,
          },
        },

        primaryLevel: {
          create: {
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
            media: body.primary.schoolUniformPhotoUrls?.length
              ? {
                  create: body.primary.schoolUniformPhotoUrls.map(
                    (url: string) => ({
                      url,
                      type: "photo",
                    })
                  ),
                }
              : undefined,
          },
        },
        basicLevel: {
          create: {
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
            media: body.basic.schoolUniformPhotoUrls?.length
              ? {
                  create: body.basic.schoolUniformPhotoUrls.map(
                    (url: string) => ({
                      url,
                      type: "photo",
                    })
                  ),
                }
              : undefined,
          },
        },
        secondaryLevel: {
          create: {
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
            media: body.secondary.schoolUniformPhotoUrls?.length
              ? {
                  create: body.secondary.schoolUniformPhotoUrls.map(
                    (url: string) => ({
                      url,
                      type: "photo",
                    })
                  ),
                }
              : undefined,
          },
        },
      },
    });
    return NextResponse.json(stringifyBigInts(newSchool), { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create school" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // cleanly disconnect after query
  }
}
