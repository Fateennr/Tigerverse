-- get the list of the squads 

DELIMITER $$

DROP PROCEDURE IF EXISTS GetUserSquads $$

CREATE PROCEDURE GetUserSquads()
BEGIN
    SELECT ID,Namee, Creation, Favourite
    FROM UserSquads;
END $$

DELIMITER ;

DELIMITER $$

-- get the squads that are favourite
DROP PROCEDURE IF EXISTS GetFavouriteUserSquads $$

CREATE PROCEDURE GetFavouriteUserSquads()
BEGIN
    SELECT ID,Namee, Creation, Favourite
    FROM UserSquads
    WHERE Favourite = TRUE;
END $$

DELIMITER ;

DELIMITER $$

-- get player id and the index 

DROP PROCEDURE IF EXISTS GetPlayerIDAndIndexBySquadID $$

CREATE PROCEDURE GetPlayerIDAndIndexBySquadID(IN givenSquadID INT)
BEGIN
    -- Query to fetch PlayerID and Index (position) from UserSquadPlayers based on SquadID
    SELECT PlayerID, Indexx
    FROM UserSquadPlayers
    WHERE SquadID = givenSquadID;
END $$

DELIMITER ;

DELIMITER $$

-- Drop the procedure if it already exists
DROP PROCEDURE IF EXISTS CreateUserSquadWithPlayers $$

CREATE PROCEDURE CreateUserSquadWithPlayers(
    IN squadName VARCHAR(255),
    IN coachID INT,
    IN captainID INT,
    IN matchType VARCHAR(50),
    IN favourite BOOLEAN,
    IN player1ID INT, IN index1 INT,
    IN player2ID INT, IN index2 INT,
    IN player3ID INT, IN index3 INT,
    IN player4ID INT, IN index4 INT,
    IN player5ID INT, IN index5 INT,
    IN player6ID INT, IN index6 INT,
    IN player7ID INT, IN index7 INT,
    IN player8ID INT, IN index8 INT,
    IN player9ID INT, IN index9 INT,
    IN player10ID INT, IN index10 INT,
    IN player11ID INT, IN index11 INT
)
BEGIN
    DECLARE newSquadID INT;

    -- Step 1: Insert a new squad into UserSquads table
    INSERT INTO UserSquads (Namee, Creation, Favourite, CoachID, CaptainID, MatchType)
    VALUES (squadName, CURRENT_DATE(), favourite, coachID, captainID, matchType);
    
    -- Get the newly inserted SquadID
    SET newSquadID = LAST_INSERT_ID();

   
    
    -- Step 2: Insert the players into UserSquadPlayers table with their positions
    INSERT INTO UserSquadPlayers (SquadID, PlayerID, Indexx)
    VALUES (newSquadID, player1ID, index1),
           (newSquadID, player2ID, index2),
           (newSquadID, player3ID, index3),
           (newSquadID, player4ID, index4),
           (newSquadID, player5ID, index5),
           (newSquadID, player6ID, index6),
           (newSquadID, player7ID, index7),
           (newSquadID, player8ID, index8),
           (newSquadID, player9ID, index9),
           (newSquadID, player10ID, index10),
           (newSquadID, player11ID, index11);
END $$

DELIMITER ;

DELIMITER $$

DROP PROCEDURE IF EXISTS DeleteUserSquadByID $$

CREATE PROCEDURE DeleteUserSquadByID(IN givenSquadID INT)
BEGIN
    DELETE FROM UserSquads
    WHERE ID = givenSquadID;
END $$

DELIMITER ;


DELIMITER $$

DROP PROCEDURE IF EXISTS GetAllPlayers $$

CREATE PROCEDURE GetAllPlayers(
  IN in_status    VARCHAR(10),  -- 'playing','retired','ALL'
  IN in_format    VARCHAR(10),  -- 'ODI','Test','T20','ALL'
  IN in_role      VARCHAR(20),  -- 'Batsman','Bowler','Wicketkeeper','ALL'
  IN in_sortBy    VARCHAR(20),  -- 'runs','wickets','ranking','matches','dismissals','none'
  IN in_sortOrder VARCHAR(4)    -- 'ASC','DESC'
)
BEGIN
  DECLARE where_clause TEXT DEFAULT '';
  DECLARE sort_col     VARCHAR(50) DEFAULT 'p.ID';
  DECLARE sort_dir     VARCHAR(4)  DEFAULT 'ASC';
  DECLARE fmt_q        VARCHAR(20);

  -- 1) Status filter
  IF in_status = 'playing' THEN
    SET where_clause = CONCAT(where_clause, ' AND p.Retired IS NULL ');
  ELSEIF in_status = 'retired' THEN
    SET where_clause = CONCAT(where_clause, ' AND p.Retired IS NOT NULL ');
  -- if 'ALL', no filter needed
  END IF;

  -- 2) Role filter
  IF in_role <> 'ALL' THEN
    SET where_clause = CONCAT(
      where_clause,
      ' AND p.PlayerRole = ''',
      in_role,
      ''' '
    );
  END IF;

  -- 3) Format filter (must have played that type)
  SET fmt_q = QUOTE(in_format);  -- safely quote e.g. 'ODI'
  IF in_format <> 'ALL' THEN
    SET where_clause = CONCAT(
      where_clause,
      ' AND EXISTS (',
        'SELECT 1 FROM BattingCareerAgainst b ',
        'WHERE b.PlayerID = p.ID AND b.MatchType = ',
        fmt_q,
      ') '
    );
  END IF;

  -- 4) Determine sort column
  IF in_sortBy = 'runs' THEN
    SET sort_col = 'TotalRuns';
  ELSEIF in_sortBy = 'wickets' THEN
    SET sort_col = 'TotalWickets';
  ELSEIF in_sortBy = 'ranking' THEN
    SET sort_col = 'p.RANKING';
  ELSEIF in_sortBy = 'matches' THEN
    SET sort_col = 'TotalMatches';
  ELSEIF in_sortBy = 'dismissals' THEN
    SET sort_col = 'TotalDismissals';
  ELSE
    SET sort_col = 'p.ID'; -- Default sort
  END IF;

  -- 5) Determine sort direction
  IF UPPER(in_sortOrder) = 'DESC' THEN
    SET sort_dir = 'DESC';
  ELSE
    SET sort_dir = 'ASC';
  END IF;

  -- 6) Build and run dynamic SQL
  SET @sql_text = CONCAT(
    'SELECT ',
      'p.*, ',
      'COALESCE((SELECT SUM(Runs) FROM BattingCareerAgainst ',
               'WHERE PlayerID = p.ID ',
                 'AND (MatchType = ', fmt_q, ' OR ', fmt_q, ' = ''ALL'')), 0) AS TotalRuns, ',
      'COALESCE((SELECT SUM(Wickets) FROM BowlingCareerAgainst ',
               'WHERE PlayerID = p.ID ',
                 'AND (MatchType = ', fmt_q, ' OR ', fmt_q, ' = ''ALL'')), 0) AS TotalWickets, ',
      'COALESCE((SELECT SUM(Matches) FROM BattingCareerAgainst ',
               'WHERE PlayerID = p.ID ',
                 'AND (MatchType = ', fmt_q, ' OR ', fmt_q, ' = ''ALL'')), 0) AS TotalMatches, ',
      'COALESCE((SELECT SUM(Catches+Stumpings+RunOuts+DirectHits) ',
               'FROM FieldingCareer ',
               'WHERE PlayerID = p.ID ',
                 'AND (MatchType = ', fmt_q, ' OR ', fmt_q, ' = ''ALL'')), 0) AS TotalDismissals ',
    'FROM Players p ',
    'WHERE 1=1 ',
      where_clause,
    ' ORDER BY ', sort_col, ' ', sort_dir
  );

  PREPARE stmt FROM @sql_text;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;
END $$

DELIMITER ;




