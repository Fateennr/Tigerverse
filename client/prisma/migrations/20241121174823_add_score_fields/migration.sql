/*
  Warnings:

  - You are about to drop the column `Score_BD` on the `matches` table. All the data in the column will be lost.
  - You are about to drop the column `Score_Opponent` on the `matches` table. All the data in the column will be lost.
  - You are about to alter the column `Winrun` on the `matches` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `Score_BD_Over_Played` to the `Matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Score_BD_Run` to the `Matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Score_BD_wicket` to the `Matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Score_Opp_Over_Played` to the `Matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Score_Opp_Run` to the `Matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Score_Opp_wicket` to the `Matches` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `matches` DROP COLUMN `Score_BD`,
    DROP COLUMN `Score_Opponent`,
    ADD COLUMN `Score_BD_Over_Played` DOUBLE NOT NULL,
    ADD COLUMN `Score_BD_Run` DOUBLE NOT NULL,
    ADD COLUMN `Score_BD_wicket` INTEGER NOT NULL,
    ADD COLUMN `Score_Opp_Over_Played` DOUBLE NOT NULL,
    ADD COLUMN `Score_Opp_Run` DOUBLE NOT NULL,
    ADD COLUMN `Score_Opp_wicket` INTEGER NOT NULL,
    MODIFY `Winrun` DOUBLE NOT NULL;
