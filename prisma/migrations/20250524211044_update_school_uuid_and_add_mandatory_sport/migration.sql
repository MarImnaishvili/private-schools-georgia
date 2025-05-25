-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('photo', 'video');

-- CreateEnum
CREATE TYPE "MediaAttachment" AS ENUM ('school', 'primary', 'basic', 'secondary');

-- CreateTable
CREATE TABLE "SchoolData" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    "phoneNumber1" TEXT,
    "phoneNumber2" TEXT,
    "phoneNumber3" TEXT,
    "schoolsWebSite" TEXT,
    "facebookProfileURL" TEXT,
    "instagramProfileURL" TEXT,
    "founder" TEXT,
    "director" TEXT,
    "publicRelationsManager" TEXT,
    "parentRelationshipManager" TEXT,
    "infrastructureId" INTEGER,
    "primaryLevelId" INTEGER,
    "basicLevelId" INTEGER,
    "secondaryLevelID" INTEGER,
    "otherPrograms" TEXT,
    "description" TEXT,
    "hasTutor" BOOLEAN NOT NULL DEFAULT false,
    "tutorDescription" TEXT,
    "hasScholarshipsGrants" BOOLEAN NOT NULL DEFAULT false,
    "scholarshipsGrants" TEXT,
    "hasExchangePrograms" BOOLEAN NOT NULL DEFAULT false,
    "exchangePrograms" TEXT,
    "hasOutdoorGarden" BOOLEAN NOT NULL DEFAULT false,
    "outdoorGarden" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TIMESTAMP(3),
    "establishedYear" INTEGER,
    "accreditationStatus" TEXT,
    "accreditationComment" TEXT,
    "graduationRate" REAL,
    "averageNationalExamScore" REAL,

    CONSTRAINT "SchoolData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Infrastructure" (
    "id" SERIAL NOT NULL,
    "buildings_has" BOOLEAN NOT NULL DEFAULT false,
    "buildings_comment" TEXT,
    "numberOfFloors_has" INTEGER,
    "numberOfFloors_comment" TEXT,
    "squareness_has" INTEGER,
    "squareness_comment" TEXT,
    "stadiums_has" BOOLEAN NOT NULL DEFAULT false,
    "stadiums_comment" TEXT,
    "pools_has" BOOLEAN NOT NULL DEFAULT false,
    "pools_comment" TEXT,
    "courtyard_has" BOOLEAN NOT NULL DEFAULT false,
    "courtyard_comment" TEXT,
    "laboratories_has" BOOLEAN NOT NULL DEFAULT false,
    "laboratories_comment" TEXT,
    "library_has" BOOLEAN NOT NULL DEFAULT false,
    "library_comment" TEXT,
    "cafe_has" BOOLEAN NOT NULL DEFAULT false,
    "cafe_comment" TEXT,

    CONSTRAINT "Infrastructure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrimaryLevel" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "duration" TEXT NOT NULL,
    "discountAndPaymentTerms" TEXT,
    "numberOfStudents" INTEGER NOT NULL,
    "meals" TEXT,
    "mealsDescription" TEXT,
    "transportation" TEXT,
    "transportationDescription" TEXT,
    "schoolUniform" BOOLEAN NOT NULL DEFAULT false,
    "schoolUniformDescription" TEXT,
    "mandatorySportsClubs" TEXT,
    "optionalSportsClubs" TEXT,
    "foreignLanguages" TEXT,
    "teachingStyleBooks" TEXT,
    "clubsAndCircles" TEXT,
    "textbooksPrice" TEXT,

    CONSTRAINT "PrimaryLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasicLevel" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "duration" TEXT NOT NULL,
    "discountAndPaymentTerms" TEXT,
    "numberOfStudents" INTEGER NOT NULL,
    "meals" TEXT,
    "mealsDescription" TEXT,
    "transportation" TEXT,
    "transportationDescription" TEXT,
    "schoolUniform" BOOLEAN NOT NULL DEFAULT false,
    "schoolUniformDescription" TEXT,
    "mandatorySportsClubs" TEXT,
    "optionalSportsClubs" TEXT,
    "foreignLanguages" TEXT,
    "teachingStyleBooks" TEXT,
    "clubsAndCircles" TEXT,
    "textbooksPrice" TEXT,

    CONSTRAINT "BasicLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecondaryLevel" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "duration" TEXT NOT NULL,
    "discountAndPaymentTerms" TEXT,
    "numberOfStudents" INTEGER NOT NULL,
    "meals" TEXT,
    "mealsDescription" TEXT,
    "transportation" TEXT,
    "transportationDescription" TEXT,
    "schoolUniform" BOOLEAN NOT NULL DEFAULT false,
    "schoolUniformDescription" TEXT,
    "mandatorySportsClubs" TEXT,
    "optionalSportsClubs" TEXT,
    "foreignLanguages" TEXT,
    "teachingStyleBooks" TEXT,
    "clubsAndCircles" TEXT,
    "textbooksPrice" TEXT,

    CONSTRAINT "SecondaryLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "media_url" TEXT NOT NULL,
    "description" TEXT,
    "school_id" UUID,
    "basic_level_id" INTEGER,
    "primary_level_id" INTEGER,
    "secondary_level_id" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "type" "MediaType" NOT NULL,
    "attachedTo" "MediaAttachment" NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "levelmandatorysport" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "schoolId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "levelmandatorysport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SchoolData_addressId_idx" ON "SchoolData"("addressId");

-- CreateIndex
CREATE INDEX "SchoolData_basicLevelId_idx" ON "SchoolData"("basicLevelId");

-- CreateIndex
CREATE INDEX "SchoolData_infrastructureId_idx" ON "SchoolData"("infrastructureId");

-- CreateIndex
CREATE INDEX "SchoolData_primaryLevelId_idx" ON "SchoolData"("primaryLevelId");

-- CreateIndex
CREATE INDEX "SchoolData_secondaryLevelID_idx" ON "SchoolData"("secondaryLevelID");

-- CreateIndex
CREATE INDEX "media_school_id_idx" ON "media"("school_id");

-- CreateIndex
CREATE INDEX "media_basic_level_id_idx" ON "media"("basic_level_id");

-- CreateIndex
CREATE INDEX "media_primary_level_id_idx" ON "media"("primary_level_id");

-- CreateIndex
CREATE INDEX "media_secondary_level_id_idx" ON "media"("secondary_level_id");

-- AddForeignKey
ALTER TABLE "SchoolData" ADD CONSTRAINT "SchoolData_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolData" ADD CONSTRAINT "SchoolData_basicLevelId_fkey" FOREIGN KEY ("basicLevelId") REFERENCES "BasicLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolData" ADD CONSTRAINT "SchoolData_infrastructureId_fkey" FOREIGN KEY ("infrastructureId") REFERENCES "Infrastructure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolData" ADD CONSTRAINT "SchoolData_primaryLevelId_fkey" FOREIGN KEY ("primaryLevelId") REFERENCES "PrimaryLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchoolData" ADD CONSTRAINT "SchoolData_secondaryLevelID_fkey" FOREIGN KEY ("secondaryLevelID") REFERENCES "SecondaryLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_basic_level_id_fkey" FOREIGN KEY ("basic_level_id") REFERENCES "BasicLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_primary_level_id_fkey" FOREIGN KEY ("primary_level_id") REFERENCES "PrimaryLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "SchoolData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_secondary_level_id_fkey" FOREIGN KEY ("secondary_level_id") REFERENCES "SecondaryLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "levelmandatorysport" ADD CONSTRAINT "levelmandatorysport_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "SchoolData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
