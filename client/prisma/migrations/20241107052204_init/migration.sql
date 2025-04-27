-- CreateTable
CREATE TABLE `Player` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `DOB` DATETIME(3) NOT NULL,
    `BattingStyle` VARCHAR(191) NOT NULL,
    `ICCRanking` INTEGER NOT NULL,
    `IntDebut` DATETIME(3) NOT NULL,
    `Profile` VARCHAR(191) NOT NULL,
    `CaptainStatus` BOOLEAN NOT NULL,
    `PlayerRole` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
