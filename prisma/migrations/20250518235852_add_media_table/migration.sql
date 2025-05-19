/*
  Warnings:

  - You are about to drop the column `booksPriceIncludes` on the `BasicLevel` table. All the data in the column will be lost.
  - You are about to drop the column `booksPriceIncludes` on the `PrimaryLevel` table. All the data in the column will be lost.
  - You are about to drop the column `booksPriceIncludes` on the `SecondaryLevel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `BasicLevel` DROP COLUMN `booksPriceIncludes`,
    ADD COLUMN `textbooksPrice` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `PrimaryLevel` DROP COLUMN `booksPriceIncludes`,
    ADD COLUMN `textbooksPrice` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `SecondaryLevel` DROP COLUMN `booksPriceIncludes`,
    ADD COLUMN `textbooksPrice` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `media_url` TEXT NOT NULL,
    `type` ENUM('photo', 'video') NOT NULL,
    `description` TEXT NULL,
    `school_id` INTEGER NULL,
    `basic_level_id` INTEGER NULL,
    `primary_level_id` INTEGER NULL,
    `secondary_level_id` INTEGER NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `basic_level_id`(`basic_level_id`),
    INDEX `primary_level_id`(`primary_level_id`),
    INDEX `school_id`(`school_id`),
    INDEX `secondary_level_id`(`secondary_level_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `media` ADD CONSTRAINT `media_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `SchoolData`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `media` ADD CONSTRAINT `media_ibfk_2` FOREIGN KEY (`basic_level_id`) REFERENCES `BasicLevel`(`basicLevelId`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `media` ADD CONSTRAINT `media_ibfk_3` FOREIGN KEY (`primary_level_id`) REFERENCES `PrimaryLevel`(`primaryLevelId`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `media` ADD CONSTRAINT `media_ibfk_4` FOREIGN KEY (`secondary_level_id`) REFERENCES `SecondaryLevel`(`secondaryLevelID`) ON DELETE CASCADE ON UPDATE NO ACTION;
