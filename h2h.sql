DELIMITER //

CREATE FUNCTION `GetOpponentStats`(
    opponentName VARCHAR(255),
    matchType    VARCHAR(50),
    venueName    VARCHAR(255)
)
RETURNS JSON
DETERMINISTIC
BEGIN
    DECLARE totalMatchesPlayed INT DEFAULT 0;
    DECLARE won                 INT DEFAULT 0;
    DECLARE lost                INT DEFAULT 0;
    DECLARE tied                INT DEFAULT 0;
    DECLARE highestInnings      FLOAT DEFAULT 0;
    DECLARE lowestInnings       FLOAT DEFAULT 0;
    DECLARE totalRunsAgainst    FLOAT DEFAULT 0;

    -- Helper condition fragment:
    --   (matchType    IS NULL OR `Type`  = matchType)
    -- AND (venueName    IS NULL OR `Venue` = venueName)

    -- 1) Total matches
    SELECT COUNT(*) 
      INTO totalMatchesPlayed
    FROM `Matches`
    WHERE `Opponent` = opponentName
      AND (matchType IS NULL OR `Type`  = matchType)
      AND (venueName IS NULL OR `Venue` = venueName);

    -- 2) Wins by Bangladesh
    SELECT COUNT(*) 
      INTO won
    FROM `Matches`
    WHERE `Opponent` = opponentName
      AND `Result` = 'Bangladesh'
      AND (matchType IS NULL OR `Type`  = matchType)
      AND (venueName IS NULL OR `Venue` = venueName);

    -- 3) Losses (Result neither 'Bangladesh' nor 'Tie')
    SELECT COUNT(*) 
      INTO lost
    FROM `Matches`
    WHERE `Opponent` = opponentName
      AND `Result` NOT IN ('Bangladesh','Tie')
      AND (matchType IS NULL OR `Type`  = matchType)
      AND (venueName IS NULL OR `Venue` = venueName);

    -- 4) Tied matches
    SELECT COUNT(*) 
      INTO tied
    FROM `Matches`
    WHERE `Opponent` = opponentName
      AND `Result` = 'Tie'
      AND (matchType IS NULL OR `Type`  = matchType)
      AND (venueName IS NULL OR `Venue` = venueName);

    -- 5) Highest & lowest Bangladesh innings
    SELECT 
        MAX(`Score_BD_Run`),
        MIN(`Score_BD_Run`)
      INTO highestInnings, lowestInnings
    FROM `Matches`
    WHERE `Opponent` = opponentName
      AND (matchType IS NULL OR `Type`  = matchType)
      AND (venueName IS NULL OR `Venue` = venueName);

    -- 6) Total runs scored by the opponent
    SELECT SUM(`Score_Opp_Run`)
      INTO totalRunsAgainst
    FROM `Matches`
    WHERE `Opponent` = opponentName
      AND (matchType IS NULL OR `Type`  = matchType)
      AND (venueName IS NULL OR `Venue` = venueName);

    RETURN JSON_OBJECT(
        'totalMatchesPlayed', totalMatchesPlayed,
        'won',               won,
        'lost',              lost,
        'tied',              tied,
        'highestInnings',    highestInnings,
        'lowestInnings',     lowestInnings,
        'totalRunsAgainst',  totalRunsAgainst
    );
END//

DELIMITER ;
