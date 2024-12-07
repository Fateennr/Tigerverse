CREATE FUNCTION GetOpponentStats(opponent_name VARCHAR(255))
   RETURNS JSON
   DETERMINISTIC
   BEGIN
         DECLARE totalMatchesPlayed INT;
         DECLARE won INT;
         DECLARE lost INT;
         DECLARE tied INT;
         DECLARE highestInnings FLOAT;
         DECLARE lowestInnings FLOAT;
         DECLARE totalRunsAgainst FLOAT;
    
         -- Calculate total matches played
         SELECT COUNT(*) INTO totalMatchesPlayed
         FROM Matches
         WHERE Opponent = opponent_name;
    
         -- Calculate total wins
        SELECT COUNT(*) INTO won
        FROM Matches
        WHERE Opponent = opponent_name AND Result = 'Bangladesh';
    
        -- Calculate total losses
         SELECT COUNT(*) INTO lost
         FROM Matches
         WHERE Opponent = opponent_name AND Result != 'Bangladesh';
    
         -- Calculate total ties
         SELECT COUNT(*) INTO tied
         FROM Matches
         WHERE Opponent = opponent_name AND Result = 'Tie';
    
         -- Calculate highest innings
         SELECT MAX(Score_BD_Run) INTO highestInnings
         FROM Matches
         WHERE Opponent = opponent_name;
    
         -- Calculate lowest innings
         SELECT MIN(Score_BD_Run) INTO lowestInnings
         FROM Matches
         WHERE Opponent = opponent_name;
    
         -- Calculate total runs scored against the opponent
         SELECT SUM(Score_Opp_Run) INTO totalRunsAgainst
         FROM Matches
         WHERE Opponent = opponent_name;
    
         -- Return results as a JSON object
         RETURN JSON_OBJECT(
            'totalMatchesPlayed', totalMatchesPlayed,
            'won', won,
            'lost', lost,
            'tied', tied,
            'highestInnings', highestInnings,
            'lowestInnings', lowestInnings,
            'totalRunsAgainst', totalRunsAgainst
      );
 END