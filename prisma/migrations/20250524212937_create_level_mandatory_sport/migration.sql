/*
  Warnings:

  - You are about to drop the `levelmandatorysport` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LevelName" AS ENUM ('Primary', 'Basic', 'Secondary');

-- DropForeignKey
ALTER TABLE "levelmandatorysport" DROP CONSTRAINT "levelmandatorysport_schoolId_fkey";

-- DropTable
DROP TABLE "levelmandatorysport";

-- CreateTable
CREATE TABLE "LevelMandatorySport" (
    "id" SERIAL NOT NULL,
    "schoolId" UUID NOT NULL,
    "schoolName" TEXT NOT NULL,
    "levelName" "LevelName" NOT NULL,
    "levelId" INTEGER NOT NULL,
    "sport" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "duration" TEXT NOT NULL,
    "discountAndPaymentTerms" TEXT,
    "numberOfStudents" INTEGER NOT NULL,
    "meals" TEXT,
    "mealsDescription" TEXT,
    "transportation" TEXT,
    "transportationDescription" TEXT,
    "schoolUniform" BOOLEAN NOT NULL,
    "schoolUniformDescription" TEXT,
    "optionalSportsClubs" TEXT,
    "foreignLanguages" TEXT,
    "teachingStyleBooks" TEXT,
    "clubsAndCircles" TEXT,
    "textbooksPrice" TEXT,

    CONSTRAINT "LevelMandatorySport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LevelMandatorySport_schoolId_idx" ON "LevelMandatorySport"("schoolId");

-- CreateIndex
CREATE INDEX "LevelMandatorySport_levelId_idx" ON "LevelMandatorySport"("levelId");

-- AddForeignKey
ALTER TABLE "LevelMandatorySport" ADD CONSTRAINT "LevelMandatorySport_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "SchoolData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
