-- AlterTable
ALTER TABLE `Player` MODIFY `CaptainStatus` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Matches` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Opponent` VARCHAR(191) NOT NULL,
    `Type` VARCHAR(191) NOT NULL,
    `Date` DATETIME(3) NOT NULL,
    `Venue` VARCHAR(191) NOT NULL,
    `Result` VARCHAR(191) NOT NULL,
    `Wonbywicket` BOOLEAN NOT NULL DEFAULT false,
    `Wonbyrun` BOOLEAN NOT NULL DEFAULT false,
    `Winrun` INTEGER NOT NULL,
    `Winwicket` DOUBLE NOT NULL,
    `Score_BD` VARCHAR(191) NOT NULL,
    `Score_Opponent` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Batting_Career` (
    `player_id` INTEGER NOT NULL,
    `Type` VARCHAR(191) NOT NULL,
    `Country` VARCHAR(191) NOT NULL,
    `Span` VARCHAR(191) NOT NULL,
    `Mat` INTEGER NOT NULL,
    `Inns` INTEGER NOT NULL,
    `NO` INTEGER NOT NULL,
    `Runs` INTEGER NOT NULL,
    `HS` INTEGER NOT NULL,
    `Avg` DOUBLE NOT NULL,
    `BF` INTEGER NOT NULL,
    `SR` DOUBLE NOT NULL,
    `Hundred` INTEGER NOT NULL,
    `Fifty` INTEGER NOT NULL,
    `Duck` INTEGER NOT NULL,
    `Fours` INTEGER NOT NULL,
    `Sixes` INTEGER NOT NULL,

    PRIMARY KEY (`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Batting_Career` ADD CONSTRAINT `Batting_Career_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `Player`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
