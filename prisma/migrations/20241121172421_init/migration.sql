/*
  Warnings:

  - You are about to drop the `batting_career` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `player` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `batting_career` DROP FOREIGN KEY `Batting_Career_player_id_fkey`;

-- DropTable
DROP TABLE `batting_career`;

-- DropTable
DROP TABLE `player`;
