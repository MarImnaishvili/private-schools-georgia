/*
  Warnings:

  - You are about to drop the column `levelId` on the `LevelMandatorySport` table. All the data in the column will be lost.
  - You are about to drop the column `levelName` on the `LevelMandatorySport` table. All the data in the column will be lost.
  - You are about to drop the column `schoolName` on the `LevelMandatorySport` table. All the data in the column will be lost.
  - You are about to drop the column `sport` on the `LevelMandatorySport` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `LevelMandatorySport` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Decimal(65,30)`.
  - The primary key for the `SchoolData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `name` to the `LevelMandatorySport` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LevelMandatorySport" DROP CONSTRAINT "LevelMandatorySport_schoolId_fkey";

-- DropForeignKey
ALTER TABLE "media" DROP CONSTRAINT "media_school_id_fkey";

-- DropIndex
DROP INDEX "LevelMandatorySport_levelId_idx";

-- AlterTable
ALTER TABLE "LevelMandatorySport" DROP COLUMN "levelId",
DROP COLUMN "levelName",
DROP COLUMN "schoolName",
DROP COLUMN "sport",
ADD COLUMN     "comment" TEXT,
ADD COLUMN     "mandatorySportsClubs" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "schoolId" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "schoolUniform" SET DEFAULT false;

-- AlterTable
ALTER TABLE "SchoolData" DROP CONSTRAINT "SchoolData_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SchoolData_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "media" ALTER COLUMN "school_id" SET DATA TYPE TEXT;

-- DropEnum
DROP TYPE "LevelName";

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "SchoolData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LevelMandatorySport" ADD CONSTRAINT "LevelMandatorySport_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "SchoolData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
