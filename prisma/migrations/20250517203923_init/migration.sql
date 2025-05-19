-- CreateTable
CREATE TABLE `SchoolData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `addressId` INTEGER NOT NULL,
    `phoneNumber1` BIGINT NULL,
    `phoneNumber2` BIGINT NULL,
    `phoneNumber3` BIGINT NULL,
    `schoolsWebSite` VARCHAR(191) NULL,
    `facebookProfileURL` VARCHAR(191) NULL,
    `instagramProfileURL` VARCHAR(191) NULL,
    `founder` VARCHAR(191) NULL,
    `director` VARCHAR(191) NULL,
    `publicRelationsManager` VARCHAR(191) NULL,
    `parentRelationshipManager` VARCHAR(191) NULL,
    `infrastructureId` INTEGER NULL,
    `primaryLevelId` INTEGER NULL,
    `basicLevelId` INTEGER NULL,
    `secondaryLevelID` INTEGER NULL,
    `otherPrograms` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `hasTutor` BOOLEAN NOT NULL DEFAULT false,
    `tutorDescription` VARCHAR(191) NULL,
    `hasScholarshipsGrants` BOOLEAN NOT NULL DEFAULT false,
    `scholarshipsGrants` VARCHAR(191) NULL,
    `hasExchangePrograms` BOOLEAN NOT NULL DEFAULT false,
    `exchangePrograms` VARCHAR(191) NULL,
    `hasOutdoorGarden` BOOLEAN NOT NULL DEFAULT false,
    `outdoorGarden` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `updatedBy` DATETIME(3) NULL,

    INDEX `SchoolData_addressId_fkey`(`addressId`),
    INDEX `SchoolData_basicLevelId_fkey`(`basicLevelId`),
    INDEX `SchoolData_infrastructureId_fkey`(`infrastructureId`),
    INDEX `SchoolData_primaryLevelId_fkey`(`primaryLevelId`),
    INDEX `SchoolData_secondaryLevelID_fkey`(`secondaryLevelID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `addressId` INTEGER NOT NULL AUTO_INCREMENT,
    `city` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `zipCode` INTEGER NOT NULL,

    PRIMARY KEY (`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Infrastructure` (
    `infrastructureId` INTEGER NOT NULL AUTO_INCREMENT,
    `buildings_has` BOOLEAN NOT NULL DEFAULT false,
    `buildings_comment` VARCHAR(191) NULL,
    `numberOfFloors_has` INTEGER NULL,
    `numberOfFloors_comment` VARCHAR(191) NULL,
    `squareness_has` INTEGER NULL,
    `squareness_comment` VARCHAR(191) NULL,
    `stadiums_has` BOOLEAN NOT NULL DEFAULT false,
    `stadiums_comment` VARCHAR(191) NULL,
    `pools_has` BOOLEAN NOT NULL DEFAULT false,
    `pools_comment` VARCHAR(191) NULL,
    `courtyard_has` BOOLEAN NOT NULL DEFAULT false,
    `courtyard_comment` VARCHAR(191) NULL,
    `laboratories_has` BOOLEAN NOT NULL DEFAULT false,
    `laboratories_comment` VARCHAR(191) NULL,
    `library_has` BOOLEAN NOT NULL DEFAULT false,
    `library_comment` VARCHAR(191) NULL,
    `cafe_has` BOOLEAN NOT NULL DEFAULT false,
    `cafe_comment` VARCHAR(191) NULL,

    PRIMARY KEY (`infrastructureId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrimaryLevel` (
    `primaryLevelId` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DECIMAL(65, 30) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `discountAndPaymentTerms` VARCHAR(191) NULL,
    `numberOfStudents` INTEGER NOT NULL,
    `meals` VARCHAR(191) NULL,
    `mealsDescription` VARCHAR(191) NULL,
    `transportation` VARCHAR(191) NULL,
    `transportationDescription` VARCHAR(191) NULL,
    `schoolUniform` BOOLEAN NULL,
    `schoolUniformDescription` VARCHAR(191) NULL,
    `mandatorySportsClubs` VARCHAR(191) NULL,
    `optionalSportsClubs` VARCHAR(191) NULL,
    `foreignLanguages` VARCHAR(191) NULL,
    `teachingStyleBooks` VARCHAR(191) NULL,
    `booksPriceIncludes` BOOLEAN NOT NULL DEFAULT false,
    `clubsAndCircles` VARCHAR(191) NULL,

    PRIMARY KEY (`primaryLevelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BasicLevel` (
    `basicLevelId` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DECIMAL(65, 30) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `discountAndPaymentTerms` VARCHAR(191) NULL,
    `numberOfStudents` INTEGER NOT NULL,
    `meals` VARCHAR(191) NULL,
    `mealsDescription` VARCHAR(191) NULL,
    `transportation` VARCHAR(191) NULL,
    `transportationDescription` VARCHAR(191) NULL,
    `schoolUniform` BOOLEAN NULL,
    `schoolUniformDescription` VARCHAR(191) NULL,
    `mandatorySportsClubs` VARCHAR(191) NULL,
    `optionalSportsClubs` VARCHAR(191) NULL,
    `foreignLanguages` VARCHAR(191) NULL,
    `teachingStyleBooks` VARCHAR(191) NULL,
    `booksPriceIncludes` BOOLEAN NOT NULL DEFAULT false,
    `clubsAndCircles` VARCHAR(191) NULL,

    PRIMARY KEY (`basicLevelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SecondaryLevel` (
    `secondaryLevelID` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DECIMAL(65, 30) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `discountAndPaymentTerms` VARCHAR(191) NULL,
    `numberOfStudents` INTEGER NOT NULL,
    `meals` VARCHAR(191) NULL,
    `mealsDescription` VARCHAR(191) NULL,
    `transportation` VARCHAR(191) NULL,
    `transportationDescription` VARCHAR(191) NULL,
    `schoolUniform` BOOLEAN NULL,
    `schoolUniformDescription` VARCHAR(191) NULL,
    `mandatorySportsClubs` VARCHAR(191) NULL,
    `optionalSportsClubs` VARCHAR(191) NULL,
    `foreignLanguages` VARCHAR(191) NULL,
    `teachingStyleBooks` VARCHAR(191) NULL,
    `booksPriceIncludes` BOOLEAN NOT NULL DEFAULT false,
    `clubsAndCircles` VARCHAR(191) NULL,

    PRIMARY KEY (`secondaryLevelID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SchoolData` ADD CONSTRAINT `SchoolData_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`addressId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SchoolData` ADD CONSTRAINT `SchoolData_basicLevelId_fkey` FOREIGN KEY (`basicLevelId`) REFERENCES `BasicLevel`(`basicLevelId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SchoolData` ADD CONSTRAINT `SchoolData_infrastructureId_fkey` FOREIGN KEY (`infrastructureId`) REFERENCES `Infrastructure`(`infrastructureId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SchoolData` ADD CONSTRAINT `SchoolData_primaryLevelId_fkey` FOREIGN KEY (`primaryLevelId`) REFERENCES `PrimaryLevel`(`primaryLevelId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SchoolData` ADD CONSTRAINT `SchoolData_secondaryLevelID_fkey` FOREIGN KEY (`secondaryLevelID`) REFERENCES `SecondaryLevel`(`secondaryLevelID`) ON DELETE SET NULL ON UPDATE CASCADE;
