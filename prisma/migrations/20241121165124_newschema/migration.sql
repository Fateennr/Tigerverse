/*
  Warnings:

  - You are about to drop the column `Score_BD` on the `Matches` table. All the data in the column will be lost.
  - You are about to drop the column `Score_Opponent` on the `Matches` table. All the data in the column will be lost.
  - Added the required column `Score_BD_Over_Played` to the `Matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Score_BD_Run` to the `Matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Score_BD_wicket` to the `Matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Score_Opp_Over_Played` to the `Matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Score_Opp_Run` to the `Matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Score_Opp_wicket` to the `Matches` table without a default value. This is not possible if the table is not empty.

*/


ALTER TABLE `Matches` DROP COLUMN `Score_BD`,
    DROP COLUMN `Score_Opponent`,
    ADD COLUMN `Score_BD_Over_Played` DOUBLE NOT NULL,
    ADD COLUMN `Score_BD_Run` DOUBLE NOT NULL,
    ADD COLUMN `Score_BD_wicket` INTEGER NOT NULL,
    ADD COLUMN `Score_Opp_Over_Played` DOUBLE NOT NULL,
    ADD COLUMN `Score_Opp_Run` DOUBLE NOT NULL,
    ADD COLUMN `Score_Opp_wicket` INTEGER NOT NULL,
    MODIFY `Winwicket` INTEGER NOT NULL;

/* adding functions for head2head page */
CREATE FUNCTION GetStats(Opponent_Country VARCHAR(30), Type VARCHAR(30)) 
RETURNS JSON
READS SQL DATA
BEGIN
  DECLARE Played INT;
  DECLARE Won INT;
  DECLARE Lost INT;
  DECLARE Tied INT;
  DECLARE Highest_Innings VARCHAR(20);
  DECLARE Lowest_Innings VARCHAR(20);
  DECLARE Total_Runs INT;
  DECLARE Results JSON;


  SELECT COUNT(*) INTO Played
  FROM Matches
  WHERE Opponent = Opponent_country AND Type = Type;

  SELECT COUNT(*) INTO Won
  FROM Matches
  WHERE Opponent = Opponent_country and Type = Type
  AND (Wonbywicket = TRUE OR Wonbyrun = True);

  SELECT COUNT(*) INTO Lost
  FROM Matches
  WHERE Opponent = Opponent_Country AND Type = Type
  AND (Wonbywicket = FALSE AND Wonbyrun = FALSE);

  SELECT SUM(Score_BD_Run) INTO Total_Runs
  FROM Matches
  WHERE Opponent = Opponent_country AND Type = Type;

  SELECT CONCAT(Score_BD_Run,'/', Score_Opp_Run) INTO Highest_Innings
  FROM Matches
  WHERE Opponent = Opponent_Country AND Type = Type
  ORDER BY Score_BD_Run DESC LIMIT 1;

  SELECT CONCAT(Score_BD_Run,'/', Score_Opp_Run) INTO Lowest_Innings
  FROM Matches
  WHERE Opponent = Opponent_Country AND Type = Type
  ORDER BY Score_BD_Run ASC LIMIT 1;
        
  SET Results = JSON_OBJECT(
      'Played', Played,
      'Won', Won,
      'Lost', Lost,
      'Total_Runs', Total_Runs,
      'Highest_Innings', Highest_Innings,
      'Lowest_Innings', Lowest_Innings
  );

    RETURN Results;
END;

