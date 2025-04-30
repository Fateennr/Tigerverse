DROP PROCEDURE IF EXISTS GetHighestWicketsByPlayerID;
DROP PROCEDURE IF EXISTS GetMatchesPlayedByPlayerID;
DROP PROCEDURE IF EXISTS GetHighestDismissalsByPlayerID;
DROP FUNCTION IF EXISTS GetPlayerStatusByID;

-- Set delimiter
DELIMITER $$

-- Get the highest run by a player
CREATE PROCEDURE GetHighestRunByPlayerID(IN player_id INT)
BEGIN
    SELECT MAX(HighestScore) AS HighestRun
    FROM BattingCareerAgainst
    WHERE PlayerID = player_id;
END $$



-- Get the highest wickets by a player
CREATE PROCEDURE GetHighestWicketsByPlayerID(IN player_id INT)
BEGIN
    SELECT MAX(Wickets) AS HighestWickets
    FROM BowlingCareerAgainst
    WHERE PlayerID = player_id;
END $$

-- Get the total matches played by a player
CREATE PROCEDURE GetMatchesPlayedByPlayerID(IN player_id INT)
BEGIN
    SELECT 
        COALESCE(
            (SELECT SUM(Matches) FROM BattingCareerAgainst WHERE PlayerID = player_id), 0
        ) +
        COALESCE(
            (SELECT SUM(Matches) FROM BowlingCareerAgainst WHERE PlayerID = player_id), 0
        ) +
        COALESCE(
            (SELECT SUM(Matches) FROM FieldingCareer WHERE PlayerID = player_id), 0
        ) AS TotalMatchesPlayed;
END $$

-- Get the highest dismissals by a player
CREATE PROCEDURE GetHighestDismissalsByPlayerID(IN player_id INT)
BEGIN
    SELECT MAX(Catches + Stumpings + RunOuts + DirectHits) AS HighestDismissals
    FROM FieldingCareer
    WHERE PlayerID = player_id;
END $$

-- Get the player status (Retired or Playing)
CREATE FUNCTION GetPlayerStatusByID(player_id INT) 
RETURNS VARCHAR(10)
DETERMINISTIC
BEGIN
    DECLARE player_status VARCHAR(10);

    SELECT CASE
             WHEN Retired IS NULL THEN 'Playing'
             ELSE 'Retired'
           END
    INTO player_status
    FROM Players
    WHERE ID = player_id;

    RETURN player_status;
END $$

-- Reset delimiter
DELIMITER ;

-- 1) Most Wickets in a Single Innings (Best Figures)
DROP PROCEDURE IF EXISTS get_highest_single_innings_wickets;
CREATE PROCEDURE get_highest_single_innings_wickets(
  IN in_opponent      VARCHAR(100),
  IN in_matchtype     ENUM('Test','ODI','T20'),
  IN in_locationtype  ENUM('Home','Away','Neutral')
)
BEGIN
  SELECT
    p.ID                                                                 AS PlayerID,
    p.Name                                                               AS PlayerName,
    CONCAT(YEAR(p.IntDebut), '-', COALESCE(YEAR(p.Retired), 'Present'))  AS CareerSpan,
    COALESCE(
      (SELECT pic.ImageURL
         FROM Picture pic
        WHERE pic.Category = 'player'
          AND pic.EntityID = p.ID
        ORDER BY pic.PictureID DESC
        LIMIT 1),
      '-1'
    )                                                                    AS ImageURL,
    b.MatchType                                                          AS MatchType,
    b.BestBowlingFigures                                                 AS Figures
  FROM BowlingCareerAgainst b
  JOIN Players p ON p.ID = b.PlayerID
  WHERE (b.Opponent     = in_opponent     OR in_opponent     IS NULL)
    AND (b.MatchType    = in_matchtype    OR in_matchtype    IS NULL)
    AND (b.LocationType = in_locationtype OR in_locationtype IS NULL)
  ORDER BY
    CAST(SUBSTRING_INDEX(b.BestBowlingFigures,'/',1) AS UNSIGNED) DESC,
    CAST(SUBSTRING_INDEX(b.BestBowlingFigures,'/',-1) AS UNSIGNED) ASC
  LIMIT 1;
END;
//

-- 2) Best (Lowest) Bowling Average – requires at least min_wkts
DROP PROCEDURE IF EXISTS get_best_bowling_average;
CREATE PROCEDURE get_best_bowling_average(
  IN in_opponent      VARCHAR(100),
  IN in_matchtype     ENUM('Test','ODI','T20'),
  IN in_locationtype  ENUM('Home','Away','Neutral'),
  IN min_wkts         INT
)
BEGIN
  SELECT
    p.ID                                                                 AS PlayerID,
    p.Name                                                               AS PlayerName,
    CONCAT(YEAR(p.IntDebut), '-', COALESCE(YEAR(p.Retired), 'Present'))  AS CareerSpan,
    COALESCE(
      (SELECT pic.ImageURL
         FROM Picture pic
        WHERE pic.Category = 'player'
          AND pic.EntityID = p.ID
        ORDER BY pic.PictureID DESC
        LIMIT 1),
      '-1'
    )                                                                    AS ImageURL,
    ROUND(SUM(b.RunsConceded) / SUM(b.Wickets), 2)                         AS BowlingAverage
  FROM BowlingCareerAgainst b
  JOIN Players p ON p.ID = b.PlayerID
  WHERE (b.Opponent     = in_opponent     OR in_opponent     IS NULL)
    AND (b.MatchType    = in_matchtype    OR in_matchtype    IS NULL)
    AND (b.LocationType = in_locationtype OR in_locationtype IS NULL)
  GROUP BY b.PlayerID
  HAVING SUM(b.Wickets) >= min_wkts
  ORDER BY BowlingAverage ASC
  LIMIT 1;
END;
//

-- 3) Best Bowling Figures (alias of #1)
DROP PROCEDURE IF EXISTS get_best_bowling_figures;
CREATE PROCEDURE get_best_bowling_figures(
  IN in_opponent      VARCHAR(100),
  IN in_matchtype     ENUM('Test','ODI','T20'),
  IN in_locationtype  ENUM('Home','Away','Neutral')
)
BEGIN
  CALL get_highest_single_innings_wickets(in_opponent, in_matchtype, in_locationtype);
END;
//

-- 4) Highest Career Wicket-Tally
DROP PROCEDURE IF EXISTS get_highest_career_wickets;
CREATE PROCEDURE get_highest_career_wickets(
  IN in_opponent      VARCHAR(100),
  IN in_matchtype     ENUM('Test','ODI','T20'),
  IN in_locationtype  ENUM('Home','Away','Neutral')
)
BEGIN
  SELECT
    p.ID                                                                 AS PlayerID,
    p.Name                                                               AS PlayerName,
    CONCAT(YEAR(p.IntDebut), '-', COALESCE(YEAR(p.Retired), 'Present'))  AS CareerSpan,
    COALESCE(
      (SELECT pic.ImageURL
         FROM Picture pic
        WHERE pic.Category = 'player'
          AND pic.EntityID = p.ID
        ORDER BY pic.PictureID DESC
        LIMIT 1),
      '-1'
    )                                                                    AS ImageURL,
    SUM(b.Wickets)                                                       AS TotalWickets
  FROM BowlingCareerAgainst b
  JOIN Players p ON p.ID = b.PlayerID
  WHERE (b.Opponent     = in_opponent     OR in_opponent     IS NULL)
    AND (b.MatchType    = in_matchtype    OR in_matchtype    IS NULL)
    AND (b.LocationType = in_locationtype OR in_locationtype IS NULL)
  GROUP BY b.PlayerID
  ORDER BY TotalWickets DESC
  LIMIT 1;
END;
//

-- 5) Most 5-Wicket Hauls
DROP PROCEDURE IF EXISTS get_most_five_wicket_hauls;
CREATE PROCEDURE get_most_five_wicket_hauls(
  IN in_opponent      VARCHAR(100),
  IN in_matchtype     ENUM('Test','ODI','T20'),
  IN in_locationtype  ENUM('Home','Away','Neutral')
)
BEGIN
  SELECT
    p.ID                                                                 AS PlayerID,
    p.Name                                                               AS PlayerName,
    CONCAT(YEAR(p.IntDebut), '-', COALESCE(YEAR(p.Retired), 'Present'))  AS CareerSpan,
    COALESCE(
      (SELECT pic.ImageURL
         FROM Picture pic
        WHERE pic.Category = 'player'
          AND pic.EntityID = p.ID
        ORDER BY pic.PictureID DESC
        LIMIT 1),
      '-1'
    )                                                                    AS ImageURL,
    SUM(b.FiveWicketHauls)                                                AS FiveHauls,
    COALESCE(in_matchtype, 'All Formats')                                 AS MatchType
  FROM BowlingCareerAgainst b
  JOIN Players p ON p.ID = b.PlayerID
  WHERE (b.Opponent     = in_opponent     OR in_opponent     IS NULL)
    AND (b.MatchType    = in_matchtype    OR in_matchtype    IS NULL)
    AND (b.LocationType = in_locationtype OR in_locationtype IS NULL)
  GROUP BY b.PlayerID
  ORDER BY FiveHauls DESC
  LIMIT 1;
END;
//

-- 6) Most 10-Wicket Matches
DROP PROCEDURE IF EXISTS get_most_ten_wicket_hauls;
CREATE PROCEDURE get_most_ten_wicket_hauls(
  IN in_opponent      VARCHAR(100),
  IN in_matchtype     ENUM('Test','ODI','T20'),
  IN in_locationtype  ENUM('Home','Away','Neutral')
)
BEGIN
  SELECT
    p.ID                                                                 AS PlayerID,
    p.Name                                                               AS PlayerName,
    CONCAT(YEAR(p.IntDebut), '-', COALESCE(YEAR(p.Retired), 'Present'))  AS CareerSpan,
    COALESCE(
      (SELECT pic.ImageURL
         FROM Picture pic
        WHERE pic.Category = 'player'
          AND pic.EntityID = p.ID
        ORDER BY pic.PictureID DESC
        LIMIT 1),
      '-1'
    )                                                                    AS ImageURL,
    SUM(b.TenWicketHauls)                                                 AS TenHauls,
    COALESCE(in_matchtype, 'All Formats')                                 AS MatchType
  FROM BowlingCareerAgainst b
  JOIN Players p ON p.ID = b.PlayerID
  WHERE (b.Opponent     = in_opponent     OR in_opponent     IS NULL)
    AND (b.MatchType    = in_matchtype    OR in_matchtype    IS NULL)
    AND (b.LocationType = in_locationtype OR in_locationtype IS NULL)
  GROUP BY b.PlayerID
  ORDER BY TenHauls DESC
  LIMIT 1;
END;
//

DELIMITER ;




-- summerise bowling career for player

DELIMITER //

DROP PROCEDURE IF EXISTS SummarizeBowlingCareer;
//
CREATE PROCEDURE SummarizeBowlingCareer(
  IN in_playerId INT
)
BEGIN
  DECLARE done        BOOLEAN DEFAULT FALSE;
  DECLARE v_Format    VARCHAR(10);
  DECLARE v_Location  VARCHAR(10);
  DECLARE v_Matches   INT;
  DECLARE v_Five      INT;
  DECLARE v_Ten       INT;
  DECLARE v_Maidens   INT;

  DECLARE tot_ODI       INT DEFAULT 0;
  DECLARE tot_T20       INT DEFAULT 0;
  DECLARE tot_Test      INT DEFAULT 0;
  DECLARE tot_Home      INT DEFAULT 0;
  DECLARE tot_Away      INT DEFAULT 0;
  DECLARE tot_Neutral   INT DEFAULT 0;
  DECLARE tot_FiveHauls INT DEFAULT 0;
  DECLARE tot_TenHauls  INT DEFAULT 0;
  DECLARE tot_Maidens   INT DEFAULT 0;

  DECLARE cur CURSOR FOR
    SELECT MatchType, LocationType, Matches,
           FiveWicketHauls, TenWicketHauls, Maidens
      FROM BowlingCareerAgainst
     WHERE PlayerID = in_playerId;

  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

  OPEN cur;
  read_loop: LOOP
    FETCH cur INTO
      v_Format, v_Location, v_Matches,
      v_Five, v_Ten, v_Maidens;
    IF done THEN
      LEAVE read_loop;
    END IF;

    IF v_Format = 'ODI'  THEN SET tot_ODI   = tot_ODI   + v_Matches; END IF;
    IF v_Format = 'T20'  THEN SET tot_T20   = tot_T20   + v_Matches; END IF;
    IF v_Format = 'Test' THEN SET tot_Test  = tot_Test  + v_Matches; END IF;

    IF v_Location = 'Home'    THEN SET tot_Home    = tot_Home    + v_Matches; END IF;
    IF v_Location = 'Away'    THEN SET tot_Away    = tot_Away    + v_Matches; END IF;
    IF v_Location = 'Neutral' THEN SET tot_Neutral = tot_Neutral + v_Matches; END IF;

    SET tot_FiveHauls = tot_FiveHauls + v_Five;
    SET tot_TenHauls  = tot_TenHauls  + v_Ten;
    SET tot_Maidens   = tot_Maidens   + v_Maidens;
  END LOOP;
  CLOSE cur;

  SELECT
    tot_ODI       AS TotalODIMatches,
    tot_T20       AS TotalT20Matches,
    tot_Test      AS TotalTestMatches,
    tot_Home      AS TotalHomeMatches,
    tot_Away      AS TotalAwayMatches,
    tot_Neutral   AS TotalNeutralMatches,
    tot_FiveHauls AS TotalFiveWicketHauls,
    tot_TenHauls  AS TotalTenWicketHauls,
    tot_Maidens   AS TotalMaidens;
END;
//
DELIMITER ;

-- Switch to a custom delimiter so we can define multi‐statement routines
DELIMITER //

-- 1) Highest Total Runs (optional filters) + full player info & career totals
DROP PROCEDURE IF EXISTS get_highest_total_runs_by_filters//
CREATE PROCEDURE get_highest_total_runs_by_filters(
  IN in_opponent      VARCHAR(100),
  IN in_matchtype     ENUM('Test','ODI','T20'),
  IN in_locationtype  ENUM('Home','Away','Neutral')
)
BEGIN
  SELECT
    p.ID                                              AS PlayerID,
    p.Name                                            AS PlayerName,
    CONCAT(YEAR(p.IntDebut), '-', COALESCE(YEAR(p.Retired),'Present')) AS CareerSpan,
    COALESCE(
      (SELECT pic.ImageURL
         FROM Picture pic
        WHERE pic.Category='player' 
          AND pic.EntityID = p.ID
        ORDER BY pic.PictureID DESC
        LIMIT 1),
      '-1'
    )                                                 AS ImageURL,
    /* metric for this filter */
    SUM(b.Runs)                                       AS TotalRuns,
    /* full career aggregates */
    agg.TotalMatches,
    agg.TotalInnings,
    agg.TotalRuns    AS CareerRuns,
    agg.TotalBalls   AS CareerBallsFaced,
    agg.TotalNotOuts,
    ROUND(agg.TotalRuns / NULLIF(agg.TotalInnings - agg.TotalNotOuts,0),2)   AS CareerAverage,
    ROUND(agg.TotalRuns / NULLIF(agg.TotalBalls,0) *100,2)                  AS CareerStrikeRate
  FROM BattingCareerAgainst b
  JOIN Players p ON p.ID = b.PlayerID
  LEFT JOIN (
    SELECT
      PlayerID,
      SUM(Matches)    AS TotalMatches,
      SUM(Innings)    AS TotalInnings,
      SUM(Runs)       AS TotalRuns,
      SUM(BallsFaced) AS TotalBalls,
      SUM(NotOuts)    AS TotalNotOuts
    FROM BattingCareerAgainst
    GROUP BY PlayerID
  ) AS agg ON agg.PlayerID = p.ID
  WHERE (b.Opponent     = in_opponent     OR in_opponent     IS NULL)
    AND (b.MatchType    = in_matchtype    OR in_matchtype    IS NULL)
    AND (b.LocationType = in_locationtype OR in_locationtype IS NULL)
  GROUP BY p.ID
  ORDER BY TotalRuns DESC
  LIMIT 1;
END//

-- 2) Highest Score in a Single Innings + full player info & career totals
DROP PROCEDURE IF EXISTS get_highest_score_by_filters//
CREATE PROCEDURE get_highest_score_by_filters(
  IN in_opponent      VARCHAR(100),
  IN in_matchtype     ENUM('Test','ODI','T20'),
  IN in_locationtype  ENUM('Home','Away','Neutral')
)
BEGIN
  SELECT
    p.ID                                              AS PlayerID,
    p.Name                                            AS PlayerName,
    CONCAT(YEAR(p.IntDebut), '-', COALESCE(YEAR(p.Retired),'Present')) AS CareerSpan,
    COALESCE(
      (SELECT pic.ImageURL
         FROM Picture pic
        WHERE pic.Category='player'
          AND pic.EntityID = p.ID
        ORDER BY pic.PictureID DESC
        LIMIT 1),
      '-1'
    )                                                 AS ImageURL,
    b.MatchType                                       AS MatchType,
    b.HighestScore                                    AS HighestScore,
    agg.TotalMatches,
    agg.TotalInnings,
    agg.TotalRuns    AS CareerRuns,
    agg.TotalBalls   AS CareerBallsFaced,
    agg.TotalNotOuts,
    ROUND(agg.TotalRuns / NULLIF(agg.TotalInnings - agg.TotalNotOuts,0),2)   AS CareerAverage,
    ROUND(agg.TotalRuns / NULLIF(agg.TotalBalls,0) *100,2)                  AS CareerStrikeRate
  FROM BattingCareerAgainst b
  JOIN Players p ON p.ID = b.PlayerID
  LEFT JOIN (
    SELECT
      PlayerID,
      SUM(Matches)    AS TotalMatches,
      SUM(Innings)    AS TotalInnings,
      SUM(Runs)       AS TotalRuns,
      SUM(BallsFaced) AS TotalBalls,
      SUM(NotOuts)    AS TotalNotOuts
    FROM BattingCareerAgainst
    GROUP BY PlayerID
  ) AS agg ON agg.PlayerID = p.ID
  WHERE (b.Opponent     = in_opponent     OR in_opponent     IS NULL)
    AND (b.MatchType    = in_matchtype    OR in_matchtype    IS NULL)
    AND (b.LocationType = in_locationtype OR in_locationtype IS NULL)
  ORDER BY b.HighestScore DESC
  LIMIT 1;
END//

-- 3) Most Centuries (100+) + full player info & career totals
DROP PROCEDURE IF EXISTS get_most_centuries_by_filters//
CREATE PROCEDURE get_most_centuries_by_filters(
  IN in_opponent      VARCHAR(100),
  IN in_matchtype     ENUM('Test','ODI','T20'),
  IN in_locationtype  ENUM('Home','Away','Neutral')
)
BEGIN
  SELECT
    p.ID                                              AS PlayerID,
    p.Name                                            AS PlayerName,
    CONCAT(YEAR(p.IntDebut), '-', COALESCE(YEAR(p.Retired),'Present')) AS CareerSpan,
    COALESCE(
      (SELECT pic.ImageURL
         FROM Picture pic
        WHERE pic.Category='player'
          AND pic.EntityID = p.ID
        ORDER BY pic.PictureID DESC
        LIMIT 1),
      '-1'
    )                                                 AS ImageURL,
    SUM(b.Hundreds)                                   AS TotalCenturies,
    agg.TotalMatches,
    agg.TotalInnings,
    agg.TotalRuns    AS CareerRuns,
    agg.TotalBalls   AS CareerBallsFaced,
    agg.TotalNotOuts,
    ROUND(agg.TotalRuns / NULLIF(agg.TotalInnings - agg.TotalNotOuts,0),2)   AS CareerAverage,
    ROUND(agg.TotalRuns / NULLIF(agg.TotalBalls,0) *100,2)                  AS CareerStrikeRate
  FROM BattingCareerAgainst b
  JOIN Players p ON p.ID = b.PlayerID
  LEFT JOIN (
    SELECT
      PlayerID,
      SUM(Matches)    AS TotalMatches,
      SUM(Innings)    AS TotalInnings,
      SUM(Runs)       AS TotalRuns,
      SUM(BallsFaced) AS TotalBalls,
      SUM(NotOuts)    AS TotalNotOuts
    FROM BattingCareerAgainst
    GROUP BY PlayerID
  ) AS agg ON agg.PlayerID = p.ID
  WHERE (b.Opponent     = in_opponent     OR in_opponent     IS NULL)
    AND (b.MatchType    = in_matchtype    OR in_matchtype    IS NULL)
    AND (b.LocationType = in_locationtype OR in_locationtype IS NULL)
  GROUP BY p.ID
  ORDER BY TotalCenturies DESC
  LIMIT 1;
END//

-- 4) Most Half-Centuries (50+) + full player info & career totals
DROP PROCEDURE IF EXISTS get_most_half_centuries_by_filters//
CREATE PROCEDURE get_most_half_centuries_by_filters(
  IN in_opponent      VARCHAR(100),
  IN in_matchtype     ENUM('Test','ODI','T20'),
  IN in_locationtype  ENUM('Home','Away','Neutral')
)
BEGIN
  SELECT
    p.ID                                              AS PlayerID,
    p.Name                                            AS PlayerName,
    CONCAT(YEAR(p.IntDebut), '-', COALESCE(YEAR(p.Retired),'Present')) AS CareerSpan,
    COALESCE(
      (SELECT pic.ImageURL
         FROM Picture pic
        WHERE pic.Category='player'
          AND pic.EntityID = p.ID
        ORDER BY pic.PictureID DESC
        LIMIT 1),
      '-1'
    )                                                 AS ImageURL,
    SUM(b.Fifties)                                    AS TotalHalfCenturies,
    agg.TotalMatches,
    agg.TotalInnings,
    agg.TotalRuns    AS CareerRuns,
    agg.TotalBalls   AS CareerBallsFaced,
    agg.TotalNotOuts,
    ROUND(agg.TotalRuns / NULLIF(agg.TotalInnings - agg.TotalNotOuts,0),2)   AS CareerAverage,
    ROUND(agg.TotalRuns / NULLIF(agg.TotalBalls,0) *100,2)                  AS CareerStrikeRate
  FROM BattingCareerAgainst b
  JOIN Players p ON p.ID = b.PlayerID
  LEFT JOIN (
    SELECT
      PlayerID,
      SUM(Matches)    AS TotalMatches,
      SUM(Innings)    AS TotalInnings,
      SUM(Runs)       AS TotalRuns,
      SUM(BallsFaced) AS TotalBalls,
      SUM(NotOuts)    AS TotalNotOuts
    FROM BattingCareerAgainst
    GROUP BY PlayerID
  ) AS agg ON agg.PlayerID = p.ID
  WHERE (b.Opponent     = in_opponent     OR in_opponent     IS NULL)
    AND (b.MatchType    = in_matchtype    OR in_matchtype    IS NULL)
    AND (b.LocationType = in_locationtype OR in_locationtype IS NULL)
  GROUP BY p.ID
  ORDER BY TotalHalfCenturies DESC
  LIMIT 1;
END//

-- 5) Highest Strike Rate + full player info & career totals
DROP PROCEDURE IF EXISTS get_highest_strike_rate_by_filters//
CREATE PROCEDURE get_highest_strike_rate_by_filters(
  IN in_opponent      VARCHAR(100),
  IN in_matchtype     ENUM('Test','ODI','T20'),
  IN in_locationtype  ENUM('Home','Away','Neutral')
)
BEGIN
  SELECT
    p.ID                                              AS PlayerID,
    p.Name                                            AS PlayerName,
    CONCAT(YEAR(p.IntDebut), '-', COALESCE(YEAR(p.Retired),'Present')) AS CareerSpan,
    COALESCE(
      (SELECT pic.ImageURL
         FROM Picture pic
        WHERE pic.Category='player'
          AND pic.EntityID = p.ID
        ORDER BY pic.PictureID DESC
        LIMIT 1),
      '-1'
    )                                                 AS ImageURL,
    ROUND(SUM(b.Runs)/SUM(b.BallsFaced)*100,2)        AS StrikeRate,
    agg.TotalMatches,
    agg.TotalInnings,
    agg.TotalRuns    AS CareerRuns,
    agg.TotalBalls   AS CareerBallsFaced,
    agg.TotalNotOuts,
    ROUND(agg.TotalRuns / NULLIF(agg.TotalInnings - agg.TotalNotOuts,0),2)   AS CareerAverage,
    ROUND(agg.TotalRuns / NULLIF(agg.TotalBalls,0) *100,2)                  AS CareerStrikeRate
  FROM BattingCareerAgainst b
  JOIN Players p ON p.ID = b.PlayerID
  LEFT JOIN (
    SELECT
      PlayerID,
      SUM(Matches)    AS TotalMatches,
      SUM(Innings)    AS TotalInnings,
      SUM(Runs)       AS TotalRuns,
      SUM(BallsFaced) AS TotalBalls,
      SUM(NotOuts)    AS TotalNotOuts
    FROM BattingCareerAgainst
    GROUP BY PlayerID
  ) AS agg ON agg.PlayerID = p.ID
  WHERE (b.Opponent     = in_opponent     OR in_opponent     IS NULL)
    AND (b.MatchType    = in_matchtype    OR in_matchtype    IS NULL)
    AND (b.LocationType = in_locationtype OR in_locationtype IS NULL)
    AND b.BallsFaced > 0
  GROUP BY p.ID
  ORDER BY StrikeRate DESC
  LIMIT 1;
END//

-- 6) Highest Batting Average + full player info & career totals
DROP PROCEDURE IF EXISTS get_highest_average_by_filters//
CREATE PROCEDURE get_highest_average_by_filters(
  IN in_opponent      VARCHAR(100),
  IN in_matchtype     ENUM('Test','ODI','T20'),
  IN in_locationtype  ENUM('Home','Away','Neutral')
)
BEGIN
  SELECT
    p.ID                                              AS PlayerID,
    p.Name                                            AS PlayerName,
    CONCAT(YEAR(p.IntDebut), '-', COALESCE(YEAR(p.Retired),'Present')) AS CareerSpan,
    COALESCE(
      (SELECT pic.ImageURL
         FROM Picture pic
        WHERE pic.Category='player'
          AND pic.EntityID = p.ID
        ORDER BY pic.PictureID DESC
        LIMIT 1),
      '-1'
    )                                                 AS ImageURL,
    ROUND(SUM(b.Runs)/NULLIF(SUM(b.Innings)-SUM(b.NotOuts),0),2) AS BattingAverage,
    agg.TotalMatches,
    agg.TotalInnings,
    agg.TotalRuns    AS CareerRuns,
    agg.TotalBalls   AS CareerBallsFaced,
    agg.TotalNotOuts,
    ROUND(agg.TotalRuns / NULLIF(agg.TotalInnings - agg.TotalNotOuts,0),2)   AS CareerAverage,
    ROUND(agg.TotalRuns / NULLIF(agg.TotalBalls,0) *100,2)                  AS CareerStrikeRate
  FROM BattingCareerAgainst b
  JOIN Players p ON p.ID = b.PlayerID
  LEFT JOIN (
    SELECT
      PlayerID,
      SUM(Matches)    AS TotalMatches,
      SUM(Innings)    AS TotalInnings,
      SUM(Runs)       AS TotalRuns,
      SUM(BallsFaced) AS TotalBalls,
      SUM(NotOuts)    AS TotalNotOuts
    FROM BattingCareerAgainst
    GROUP BY PlayerID
  ) AS agg ON agg.PlayerID = p.ID
  WHERE (b.Opponent     = in_opponent     OR in_opponent     IS NULL)
    AND (b.MatchType    = in_matchtype    OR in_matchtype    IS NULL)
    AND (b.LocationType = in_locationtype OR in_locationtype IS NULL)
  GROUP BY p.ID
  HAVING SUM(b.Innings)-SUM(b.NotOuts) > 0
  ORDER BY BattingAverage DESC
  LIMIT 1;
END//

-- Restore standard delimiter
DELIMITER ;

DELIMITER //


DELIMITER //

DROP PROCEDURE IF EXISTS GetMostMatchesPlayedByProfile;
//
CREATE PROCEDURE GetMostMatchesPlayedByProfile()
BEGIN
  SELECT
    p.ID                        AS PlayerID,
    p.Name                      AS PlayerName,

    /* 1) ProfileType */
    CASE
      WHEN LOWER(p.Profile) LIKE '%all-rounder%' THEN 'Allrounder'
      WHEN LOWER(p.Profile) LIKE '%bowler%'
           AND LOWER(p.Profile) NOT LIKE '%batsman%' THEN 'Bowler'
      WHEN LOWER(p.Profile) LIKE '%batsman%'
           AND LOWER(p.Profile) NOT LIKE '%bowler%' THEN 'Batsman'
      WHEN LOWER(p.Profile) LIKE '%bowler%' 
       AND LOWER(p.Profile) LIKE '%batsman%' THEN 'Allrounder'
      ELSE 'Unknown'
    END                          AS ProfileType,

    /* 2) TotalMatches */
    CASE
      WHEN LOWER(p.Profile) LIKE '%bowler%'
           AND LOWER(p.Profile) NOT LIKE '%batsman%' 
        THEN COALESCE(bw.BowlMatches, 0)
      WHEN LOWER(p.Profile) LIKE '%batsman%'
           AND LOWER(p.Profile) NOT LIKE '%bowler%' 
        THEN COALESCE(bc.BatMatches, 0)
      WHEN LOWER(p.Profile) LIKE '%all-rounder%'
           OR (LOWER(p.Profile) LIKE '%bowler%'
               AND LOWER(p.Profile) LIKE '%batsman%')
        THEN (COALESCE(bc.BatMatches,0) + COALESCE(bw.BowlMatches,0)) / 2
      ELSE 0
    END                          AS TotalMatches,

    /* 3) CareerSpan with ASCII hyphen */
    CONCAT(
      YEAR(p.IntDebut),
      '-',
      IF(p.Retired IS NULL, 'Present', YEAR(p.Retired))
    )                            AS CareerSpan,

    /* 4) Picture URL */
    pic.ImageURL                 AS PictureURL

  FROM Players p

  LEFT JOIN (
    SELECT PlayerID, SUM(Matches) AS BatMatches
    FROM BattingCareerAgainst
    GROUP BY PlayerID
  ) AS bc ON p.ID = bc.PlayerID

  LEFT JOIN (
    SELECT PlayerID, SUM(Matches) AS BowlMatches
    FROM BowlingCareerAgainst
    GROUP BY PlayerID
  ) AS bw ON p.ID = bw.PlayerID

  LEFT JOIN Picture pic
    ON pic.Category = 'player'
   AND pic.EntityID = p.ID

  ORDER BY TotalMatches DESC
  LIMIT 1;
END;
//
DELIMITER ;


DELIMITER //
DROP PROCEDURE IF EXISTS GetLongestCareer;
//
CREATE PROCEDURE GetLongestCareer()
BEGIN
  SELECT
    p.ID                           AS PlayerID,
    p.Name                         AS PlayerName,
    -- e.g. "2005–Present" or "2005–2019"
    CONCAT(
      YEAR(p.IntDebut),
      '–',
      IF(p.Retired IS NULL, 'Present', YEAR(p.Retired))
    )                              AS CareerSpan,
    -- full years between debut and retired/current_date
    FLOOR(
      DATEDIFF(
        IF(p.Retired IS NOT NULL, p.Retired, CURRENT_DATE()),
        p.IntDebut
      ) / 365
    )                              AS YearsPlayed,
    pic.ImageURL                   AS PictureURL
  FROM Players p
  LEFT JOIN Picture pic
    ON pic.Category = 'player'
   AND pic.EntityID = p.ID
  ORDER BY YearsPlayed DESC
  LIMIT 1;
END;
//
DELIMITER ;


------bowling halloffame
DELIMITER //

-- 1) Most Wickets in a Single Innings (Best Figures)
DROP PROCEDURE IF EXISTS get_highest_single_innings_wickets;
CREATE PROCEDURE get_highest_single_innings_wickets(
  IN in_opponent      VARCHAR(100),
  IN in_matchtype     ENUM('Test','ODI','T20'),
  IN in_locationtype  ENUM('Home','Away','Neutral')
)
BEGIN
  SELECT
    p.ID                                                                 AS PlayerID,
    p.Name                                                               AS PlayerName,
    CONCAT(YEAR(p.IntDebut), '-', COALESCE(YEAR(p.Retired), 'Present'))  AS CareerSpan,
    COALESCE(
      (SELECT pic.ImageURL
         FROM Picture pic
        WHERE pic.Category = 'player'
          AND pic.EntityID = p.ID
        ORDER BY pic.PictureID DESC
        LIMIT 1),
      '-1'
    )                                                                    AS ImageURL,
    b.MatchType                                                          AS MatchType,
    b.BestBowlingFigures                                                 AS Figures
  FROM BowlingCareerAgainst b
  JOIN Players p ON p.ID = b.PlayerID
  WHERE (b.Opponent     = in_opponent     OR in_opponent     IS NULL)
    AND (b.MatchType    = in_matchtype    OR in_matchtype    IS NULL)
    AND (b.LocationType = in_locationtype OR in_locationtype IS NULL)
  ORDER BY
    CAST(SUBSTRING_INDEX(b.BestBowlingFigures,'/',1) AS UNSIGNED) DESC,
    CAST(SUBSTRING_INDEX(b.BestBowlingFigures,'/',-1) AS UNSIGNED) ASC
  LIMIT 1;
END;
//

-- 2) Best (Lowest) Bowling Average – requires at least min_wkts
DROP PROCEDURE IF EXISTS get_best_bowling_average;
CREATE PROCEDURE get_best_bowling_average(
  IN in_opponent      VARCHAR(100),
  IN in_matchtype     ENUM('Test','ODI','T20'),
  IN in_locationtype  ENUM('Home','Away','Neutral'),
  IN min_wkts         INT
)
BEGIN
  SELECT
    p.ID                                                                 AS PlayerID,
    p.Name                                                               AS PlayerName,
    CONCAT(YEAR(p.IntDebut), '-', COALESCE(YEAR(p.Retired), 'Present'))  AS CareerSpan,
    COALESCE(
      (SELECT pic.ImageURL
         FROM Picture pic
        WHERE pic.Category = 'player'
          AND pic.EntityID = p.ID
        ORDER BY pic.PictureID DESC
        LIMIT 1),
      '-1'
    )                                                                    AS ImageURL,
    ROUND(SUM(b.RunsConceded) / SUM(b.Wickets), 2)                         AS BowlingAverage
  FROM BowlingCareerAgainst b
  JOIN Players p ON p.ID = b.PlayerID
  WHERE (b.Opponent     = in_opponent     OR in_opponent     IS NULL)
    AND (b.MatchType    = in_matchtype    OR in_matchtype    IS NULL)
    AND (b.LocationType = in_locationtype OR in_locationtype IS NULL)
  GROUP BY b.PlayerID
  HAVING SUM(b.Wickets) >= min_wkts
  ORDER BY BowlingAverage ASC
  LIMIT 1;
END;
//

-- 3) Best Bowling Figures (alias of #1)
DROP PROCEDURE IF EXISTS get_best_bowling_figures;
CREATE PROCEDURE get_best_bowling_figures(
  IN in_opponent      VARCHAR(100),
  IN in_matchtype     ENUM('Test','ODI','T20'),
  IN in_locationtype  ENUM('Home','Away','Neutral')
)
BEGIN
  CALL get_highest_single_innings_wickets(in_opponent, in_matchtype, in_locationtype);
END;
//

-- 4) Highest Career Wicket-Tally
DROP PROCEDURE IF EXISTS get_highest_career_wickets;
CREATE PROCEDURE get_highest_career_wickets(
  IN in_opponent      VARCHAR(100),
  IN in_matchtype     ENUM('Test','ODI','T20'),
  IN in_locationtype  ENUM('Home','Away','Neutral')
)
BEGIN
  SELECT
    p.ID                                                                 AS PlayerID,
    p.Name                                                               AS PlayerName,
    CONCAT(YEAR(p.IntDebut), '-', COALESCE(YEAR(p.Retired), 'Present'))  AS CareerSpan,
    COALESCE(
      (SELECT pic.ImageURL
         FROM Picture pic
        WHERE pic.Category = 'player'
          AND pic.EntityID = p.ID
        ORDER BY pic.PictureID DESC
        LIMIT 1),
      '-1'
    )                                                                    AS ImageURL,
    SUM(b.Wickets)                                                       AS TotalWickets
  FROM BowlingCareerAgainst b
  JOIN Players p ON p.ID = b.PlayerID
  WHERE (b.Opponent     = in_opponent     OR in_opponent     IS NULL)
    AND (b.MatchType    = in_matchtype    OR in_matchtype    IS NULL)
    AND (b.LocationType = in_locationtype OR in_locationtype IS NULL)
  GROUP BY b.PlayerID
  ORDER BY TotalWickets DESC
  LIMIT 1;
END;
//

-- 5) Most 5-Wicket Hauls
DROP PROCEDURE IF EXISTS get_most_five_wicket_hauls;
CREATE PROCEDURE get_most_five_wicket_hauls(
  IN in_opponent      VARCHAR(100),
  IN in_matchtype     ENUM('Test','ODI','T20'),
  IN in_locationtype  ENUM('Home','Away','Neutral')
)
BEGIN
  SELECT
    p.ID                                                                 AS PlayerID,
    p.Name                                                               AS PlayerName,
    CONCAT(YEAR(p.IntDebut), '-', COALESCE(YEAR(p.Retired), 'Present'))  AS CareerSpan,
    COALESCE(
      (SELECT pic.ImageURL
         FROM Picture pic
        WHERE pic.Category = 'player'
          AND pic.EntityID = p.ID
        ORDER BY pic.PictureID DESC
        LIMIT 1),
      '-1'
    )                                                                    AS ImageURL,
    SUM(b.FiveWicketHauls)                                                AS FiveHauls,
    COALESCE(in_matchtype, 'All Formats')                                 AS MatchType
  FROM BowlingCareerAgainst b
  JOIN Players p ON p.ID = b.PlayerID
  WHERE (b.Opponent     = in_opponent     OR in_opponent     IS NULL)
    AND (b.MatchType    = in_matchtype    OR in_matchtype    IS NULL)
    AND (b.LocationType = in_locationtype OR in_locationtype IS NULL)
  GROUP BY b.PlayerID
  ORDER BY FiveHauls DESC
  LIMIT 1;
END;
//

-- 6) Most 10-Wicket Matches
DROP PROCEDURE IF EXISTS get_most_ten_wicket_hauls;
CREATE PROCEDURE get_most_ten_wicket_hauls(
  IN in_opponent      VARCHAR(100),
  IN in_matchtype     ENUM('Test','ODI','T20'),
  IN in_locationtype  ENUM('Home','Away','Neutral')
)
BEGIN
  SELECT
    p.ID                                                                 AS PlayerID,
    p.Name                                                               AS PlayerName,
    CONCAT(YEAR(p.IntDebut), '-', COALESCE(YEAR(p.Retired), 'Present'))  AS CareerSpan,
    COALESCE(
      (SELECT pic.ImageURL
         FROM Picture pic
        WHERE pic.Category = 'player'
          AND pic.EntityID = p.ID
        ORDER BY pic.PictureID DESC
        LIMIT 1),
      '-1'
    )                                                                    AS ImageURL,
    SUM(b.TenWicketHauls)                                                 AS TenHauls,
    COALESCE(in_matchtype, 'All Formats')                                 AS MatchType
  FROM BowlingCareerAgainst b
  JOIN Players p ON p.ID = b.PlayerID
  WHERE (b.Opponent     = in_opponent     OR in_opponent     IS NULL)
    AND (b.MatchType    = in_matchtype    OR in_matchtype    IS NULL)
    AND (b.LocationType = in_locationtype OR in_locationtype IS NULL)
  GROUP BY b.PlayerID
  ORDER BY TenHauls DESC
  LIMIT 1;
END;
//

DELIMITER ;


