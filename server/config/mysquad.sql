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




