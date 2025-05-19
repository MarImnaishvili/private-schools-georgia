/*
  Warnings:

  - Made the column `schoolUniform` on table `BasicLevel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `schoolUniform` on table `PrimaryLevel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `schoolUniform` on table `SecondaryLevel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `BasicLevel` MODIFY `schoolUniform` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `PrimaryLevel` MODIFY `schoolUniform` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `SecondaryLevel` MODIFY `schoolUniform` BOOLEAN NOT NULL DEFAULT false;
