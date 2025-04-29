-- functions, procedures and queries

-- to fetch the latest squad and filter by date, ascending descending and sortby
DELIMITER //
DROP PROCEDURE IF EXISTS GetSquad;
//
CREATE PROCEDURE GetSquad(
  IN in_format     VARCHAR(10),
  IN in_span       VARCHAR(50),
  IN in_sortBy     VARCHAR(20),
  IN in_sortOrder  VARCHAR(4)
)
BEGIN
  DECLARE order_col  VARCHAR(50) DEFAULT 'p.RANKING';
  DECLARE order_dir  VARCHAR(4)  DEFAULT 'ASC';
  DECLARE id_aggr   VARCHAR(4)  DEFAULT 'MAX';

  IF in_sortBy = 'date' THEN
    SET order_col = 's.ID';
  ELSEIF in_sortBy = 'ranking' THEN
    SET order_col = 'p.RANKING';
  END IF;

  IF UPPER(in_sortOrder) = 'DESC' THEN
    SET order_dir = 'DESC';
  END IF;

  IF in_sortBy = 'date' AND UPPER(in_sortOrder) = 'ASC' THEN
    SET id_aggr = 'MIN';
  ELSE
    -- for date+DESC or any ranking sort, use MAX
    SET id_aggr = 'MAX';
  END IF;

   SET @sql_text = CONCAT(
    'SELECT ',
      'p.ID, ',
      'p.Name AS Name, ',
      'p.RANKING AS Ranking, ',
      'p.Age AS Age, ',
      's.Span, ',
      'p.PlayerRole AS PlayerRole, ',
      'CASE WHEN p.Specialist IS NULL THEN ''TEST,ODI,T20'' ELSE UPPER(p.Specialist) END AS Specialist ',
    'FROM Squads s ',
      'JOIN SquadPlayers sp ON s.ID = sp.SquadID ',
      'JOIN Players p       ON sp.PlayerID = p.ID ',
    'WHERE s.MatchType = ? ',
      'AND s.Span      = ? ',
      'AND s.ID = (',
        'SELECT ', id_aggr, '(ID) FROM Squads ',
        'WHERE MatchType = ? AND Span = ?',
      ') ',
    'ORDER BY ', order_col, ' ', order_dir
  );


  PREPARE stmt FROM @sql_text;
    SET @fmt1  = in_format;
    SET @span1 = in_span;
    SET @fmt2  = in_format;
    SET @span2 = in_span;
  EXECUTE stmt USING @fmt1, @span1, @fmt2, @span2;
  DEALLOCATE PREPARE stmt;
END;
//
DELIMITER ;

-- test the query
CALL GetSquad('T20','2024-2025', ' ranking', 'ASC');


-- to get the list of the players
DELIMITER //

DROP PROCEDURE IF EXISTS GetAllPlayers;
//
CREATE PROCEDURE GetAllPlayers(
  IN in_status    VARCHAR(10),  -- 'playing','retired','both'
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
  END IF;

  -- 5) Determine sort direction
  IF UPPER(in_sortOrder) = 'DESC' THEN
    SET sort_dir = 'DESC';
  END IF;

  -- 6) Build and run dynamic SQL
  SET @sql_text = CONCAT(
    'SELECT ',
      'p.ID, ',
      'p.Name, ',
      'p.RANKING, ',
      'p.PlayerRole, ',
      'p.BattingStyle, ',
      'p.BowlingStyle, ',
      -- your aggregates follow:
      'COALESCE((SELECT SUM(Runs)     FROM BattingCareerAgainst ',
               'WHERE PlayerID = p.ID ',
                 'AND (MatchType = ', fmt_q, ' OR ', fmt_q, ' = ''ALL'')), 0) AS TotalRuns, ',
      'COALESCE((SELECT SUM(Wickets)  FROM BowlingCareerAgainst ',
               'WHERE PlayerID = p.ID ',
                 'AND (MatchType = ', fmt_q, ' OR ', fmt_q, ' = ''ALL'')), 0) AS TotalWickets, ',
      'COALESCE((SELECT SUM(Matches)  FROM BattingCareerAgainst ',
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
END;
//
DELIMITER ;

-- test the players
CALL GetAllPlayers('playing','ALL','Bowler','runs','DESC');

-- for squad page


-- get matches list based on filtering

-- Get matches List 

DELIMITER //

DROP PROCEDURE IF EXISTS GetMatchesList;

CREATE PROCEDURE GetMatchesList(
  IN in_venues     TEXT,         -- comma-sep list or 'ALL'
  IN in_format     VARCHAR(10),  -- 'ODI','Test','T20','ALL'
  IN in_opponents  TEXT,         -- comma-sep list or 'ALL'
  IN in_winType    VARCHAR(10),  -- 'run','wicket','both'
  IN in_sortBy     VARCHAR(20),  -- 'wonbyrun','winrun','winwicket','longest','highestrun'
  IN in_sortOrder  VARCHAR(4)    -- 'ASC' or 'DESC'
)
BEGIN
  DECLARE sort_col VARCHAR(100) DEFAULT 'ID';
  DECLARE sort_dir VARCHAR(4)   DEFAULT 'ASC';
  DECLARE ql       TEXT;

  IF in_sortBy = 'wonbyrun' THEN
    SET sort_col = 'Wonbyrun';
  ELSEIF in_sortBy = 'winrun' THEN
    SET sort_col = 'Winrun';
  ELSEIF in_sortBy = 'winwicket' THEN
    SET sort_col = 'Winwicket';
  ELSEIF in_sortBy = 'longest' THEN
    SET sort_col = 'Score_BD_Over_Played + Score_Opp_Over_Played';
  ELSEIF in_sortBy = 'highestrun' THEN
    SET sort_col = 'GREATEST(Score_BD_Run, Score_Opp_Run)';
  END IF;

  IF UPPER(in_sortOrder) = 'DESC' THEN
    SET sort_dir = 'DESC';
  END IF;

  SET ql = CONCAT(
    'SELECT * FROM Matches WHERE ',
      '(? = ''ALL'' OR FIND_IN_SET(Venue, ?) > 0) ',
      'AND (? = ''ALL'' OR `Type` = ?) ',
      'AND (? = ''ALL'' OR FIND_IN_SET(Opponent, ?) > 0) ',
      'AND (',
        '? IN (''ALL'',''both'') ',
        'OR (? = ''run''    AND Wonbyrun   = 1) ',
        'OR (? = ''wicket'' AND Wonbywicket= 1)',
      ') ',
    'ORDER BY ', sort_col, ' ', sort_dir
  );

  SET @sql = ql;
  PREPARE stmt FROM @sql;
  SET @v1 = in_venues;
  SET @v2 = in_venues;
  SET @v3 = in_format;
  SET @v4 = in_format;
  SET @v5 = in_opponents;
  SET @v6 = in_opponents;
  SET @v7 = in_winType;
  SET @v8 = in_winType;
  SET @v9 = in_winType;

  EXECUTE stmt USING @v1, @v2, @v3, @v4, @v5, @v6, @v7, @v8, @v9;
  DEALLOCATE PREPARE stmt;
END; 
//
DELIMITER ;


-- test
CALL GetMatchesList(
  'Lord\'s Cricket Ground',
  'ODI',
  'India',
  'both',
  'highestrun',
  'DESC'
);

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

-- calculate thestats of the player
-- Rewritten getPlayerStats function with null-handling
DELIMITER //

DROP FUNCTION IF EXISTS getPlayerStats;//

CREATE FUNCTION getPlayerStats(
  in_playerId INT,
  in_totalrun INT
) RETURNS JSON
DETERMINISTIC
BEGIN
  DECLARE role       VARCHAR(255);
  DECLARE ranking    INT;
  DECLARE remrun     INT;
  DECLARE baseRun    INT;
  DECLARE offsetRun  INT;
  DECLARE theirrun   INT;
  DECLARE randVal    INT;
  DECLARE balls      INT;
  DECLARE fours      INT;
  DECLARE sixes      INT;

  -- Lookup player role and ranking
  SELECT PlayerRole, RANKING
    INTO role, ranking
    FROM Players
   WHERE ID = in_playerId;

  -- Default null role to 'Batsman', null ranking to half of totalrun
  SET role    = IFNULL(role, 'Batsman');
  SET ranking = IFNULL(ranking, in_totalrun DIV 2);

  -- Initial remrun based on role
  SET remrun = in_totalrun;
  IF role = 'Bowler' THEN
    SET remrun = remrun DIV 3;
  ELSE
    -- Batsman and Allrounder and any other default
    SET remrun = remrun DIV 2;
  END IF;

  -- Calculate runs: min(remrun, ranking) + random offset
  SET baseRun   = LEAST(remrun, ranking);
  SET offsetRun = FLOOR(RAND() * 11) - 5;    -- random between -5 and +5
  SET theirrun  = GREATEST(0, baseRun + offsetRun);

  -- Update remrun
  SET remrun = remrun - theirrun;

  -- Balls: runs plus random capped at 15
  SET randVal = FLOOR(RAND() * 61) - 30;      -- random -30..+30
  SET balls   = GREATEST(1, LEAST(15, randVal) + theirrun);

  -- Fours: floor((runs - random(10..30)) / 4)
  SET randVal = FLOOR(RAND() * 21) + 10;       -- random 10..30
  SET fours   = GREATEST(0, FLOOR((theirrun - randVal) / 4));

  -- Sixes: floor((runs - fours*4 - random(0..40 capped 15)) / 6)
  SET randVal = LEAST(15, FLOOR(RAND() * 41)); -- random 0..40 capped at 15
  SET sixes   = GREATEST(0, FLOOR((theirrun - (fours * 4) - randVal) / 6));

  -- Return JSON object
  RETURN JSON_OBJECT(
    'runs',  theirrun,
    'balls', balls,
    'fours', fours,
    'sixes', sixes
  );
END;//

DELIMITER ;

DELIMITER //

DROP PROCEDURE IF EXISTS GetMatchPlayerStats;
//
CREATE PROCEDURE GetMatchPlayerStats(IN in_matchId INT)
BEGIN
  DECLARE remRun INT;

  -- 1) load the match’s BD runs
  SET remRun = (
    SELECT Score_BD_Run
      FROM Matches
     WHERE ID = in_matchId
  );

  SELECT
    COALESCE(
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'id',    p.ID,
          'name',  p.Name,
          'role',  p.PlayerRole,
          'stats', getPlayerStats(p.ID, remRun)
        )
      ),
      JSON_ARRAY()
    ) AS squadStats
  FROM Squads s
  JOIN SquadPlayers sp ON sp.SquadID = s.ID
  JOIN Players p       ON p.ID       = sp.PlayerID
  WHERE s.MatchType = (
    SELECT `Type`
      FROM Matches
     WHERE ID = in_matchId
  )
    AND s.ID = (
      SELECT MAX(ID)
        FROM Squads
       WHERE MatchType = (
         SELECT `Type` FROM Matches WHERE ID = in_matchId
       )
    )
  ORDER BY p.RANKING ASC;
END;
//
DELIMITER ;




