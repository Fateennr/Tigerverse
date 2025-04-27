CREATE FUNCTION `GetPlayerCareerDetails`(player_id INT) 
	RETURNS json
	DETERMINISTIC
	BEGIN
		DECLARE opponent_country VARCHAR(30);
		DECLARE matches INT DEFAULT 0;
		DECLARE innings INT DEFAULT 0;
		DECLARE notout INT DEFAULT 0;
		DECLARE runs INT DEFAULT 0;
		DECLARE highestscores INT DEFAULT 0;
		DECLARE average FLOAT DEFAULT 0;
		DECLARE ballsfaced FLOAT DEFAULT 0;
		DECLARE strikerate FLOAT DEFAULT 0;
		DECLARE hundreds INT DEFAULT 0;
		DECLARE fifties INT DEFAULT 0;
		DECLARE ducks INT DEFAULT 0;
		DECLARE fours INT DEFAULT 0;
		DECLARE Sixes INT DEFAULT 0;
		DECLARE playerstyle VARCHAR(191) DEFAULT 'Bowler';
		DECLARE careerDetails JSON;

		DECLARE totalOvers FLOAT DEFAULT 0;
		DECLARE totalMaidens INT DEFAULT 0;
		DECLARE totalBowlingRuns INT DEFAULT 0;
		DECLARE totalWickets INT DEFAULT 0;
		DECLARE totalFourW INT DEFAULT 0;
		DECLARE totalFiveW INT DEFAULT 0;
		DECLARE bowlingAverage FLOAT DEFAULT 0;
		DECLARE economyRate FLOAT DEFAULT 0;
		DECLARE bowlingStrikeRate FLOAT DEFAULT 0;

		SELECT PlayerRole INTO playerstyle
		FROM Player
		WHERE ID = player_id;

		IF playerstyle = 'Batsman' THEN
		    SELECT
		        SUM(Mat),
		        SUM(Inns),
		        SUM(`NO`),
		        SUM(Runs),
		        SUM(BF),
		        SUM(Hundreds),
		        SUM(Fifty),
		        SUM(Duck),
		        SUM(Fours),
		        SUM(Sixes)
		    INTO
		        matches,
		        innings,
		        notout,
		        runs,
		        ballsfaced,
		        hundreds,
		        fifties,
		        ducks,
		        fours,
		        Sixes
		    FROM Batting_Career
		    WHERE player_id = player_id;

		    SELECT AVG(Avg) INTO average
		    FROM Batting_Career
		    WHERE player_id = player_id;

		    SELECT AVG(SR) INTO strikerate
		    FROM Batting_Career
		    WHERE player_id = player_id;

		    SET careerDetails = JSON_OBJECT(
		        'Role', 'Batsman',
		        'Matches', matches,
		        'Innings', innings,
		        'NO', notout,
		        'Runs', runs,
		        'Average', ROUND(average,2),
		        'StrikeRate', ROUND(strikerate,2),
		        'Hundreds', hundreds,
		        'Fifties', fifties,
		        'Ducks', ducks,
		        'Fours', fours,
		        'Sixes', sixes
		    );

		ELSEIF playerstyle = 'Bowler' THEN

		    SELECT
		        SUM(Mat),
		        SUM(Inns),
		        SUM(Overs),
		        SUM(Mdns),
		        SUM(Runs),
		        SUM(Wkts),
		        SUM(FourW),
		        SUM(FiveW)
		    INTO
		        matches,
		        innings,
		        totalOvers,
		        totalMaidens,
		        totalBowlingRuns,
		        totalWickets,
		        totalFourW,
		        totalFiveW
		    FROM Bowling_Career
		    WHERE player_id = player_id;

		    SELECT
		        AVG(Avg), AVG(Econ), AVG(SR)
		    INTO
		        bowlingAverage, economyRate, bowlingStrikeRate
		    FROM Bowling_Career
		    WHERE player_id = player_id;

		    SET careerDetails = JSON_OBJECT(
		        'Role', 'Bowler',
		        'Matches', matches,
		        'Innings', innings,
		        'Overs', ROUND(totalOvers,2),
		        'Maidens', totalMaidens,
		        'RunsConceded', totalBowlingRuns,
		        'Wickets', totalWickets,
		        'BowlingAverage', ROUND(bowlingAverage, 2),
		        'EconomyRate', ROUND(economyRate, 2),
		        'StrikeRate', ROUND(bowlingStrikeRate, 2),
		        'FourWicketHauls', totalFourW,
		        'FiveWicketHauls', totalFiveW
		    );
		ELSE
		    SET careerDetails = JSON_OBJECT('Error', playerstyle);
		END IF;
		
		RETURN careerDetails;
	END

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


--inserting data into players table --
 INSERT INTO players (ID, Name, DOB, BattingStyle, BowlingStyle, ICCRanking, IntDebut, Profile, CaptainStatus, PlayerRole) VALUES
(1, 'Afif Hossain Dhrubo', '1999-09-22', 'Left hand Bat', NULL, 1000, '2020-01-01', 'Afif Hossain Dhrubo is a promising allrounder for Bangladesh known for his versatility in batting and bowling.', FALSE, 'Allrounder'),
(2, 'Mohammad Anamul Haque Bijoy', '1992-12-16', 'Right-hand bat', NULL, 212, '2012-11-30', 'Anamul Haque is a technically sound right-handed batsman and occasional wicketkeeper with solid international experience.', FALSE, 'WicketKeeper'),
(3, 'Shakib Al Hasan', '1987-03-24', 'Left-hand bat', 'Slow left-arm orthodox', 1, '2006-08-06', 'Shakib Al Hasan, a world-class allrounder, has led Bangladesh to historic wins with his aggressive batting and sharp bowling.', TRUE, 'Allrounder'),
(4, 'Tamim Iqbal', '1989-03-20', 'Left-hand bat', 'Right-arm offbreak', 12, '2007-02-09', 'Tamim Iqbal, a reliable left-handed opener, is known for aggressive stroke play and holds numerous batting records for Bangladesh.', TRUE, 'Batsman'),
(5, 'Mushfiqur Rahim', '1987-09-09', 'Right-hand bat', 'Right-arm offbreak', 1, '2005-05-26', 'Mushfiqur Rahim, a skilled batsman and wicketkeeper, is known for his resilience and being the first Bangladeshi with a Test double century.', TRUE, 'Batsman'),
(6, 'Imrul Kayes', '1987-02-02', 'Left-hand bat', 'Slow left-arm orthodox', 85, '2008-10-14', 'Imrul Kayes is a consistent left-handed batsman known for his steady partnerships and resilience in challenging conditions.', FALSE, 'Batsman'),
(7, 'Mohammad Ashraful', '1984-07-07', 'Right-hand bat', 'Right-arm offbreak', 128, '2001-04-11', 'Mohammad Ashraful is a right-handed batsman and youngest Test centurion, known for match-winning knocks and early career brilliance.', FALSE, 'Batsman'),
(8, 'Mustafizur Rahman', '1995-09-06', 'Left-hand bat', 'Left-arm fast-medium', 15, '2015-06-18', 'Mustafizur Rahman is a skilled left-arm pacer famed for his cutters and clutch performances in ODIs and T20s.', FALSE, 'Bowler'),
(9, 'Taskin Ahmed', '1995-04-03', 'Left-hand bat', 'Right-arm fast', 18, '2014-04-01', 'Taskin Ahmed is a right-arm fast bowler with pace and bounce, making him a key player in Bangladesh\'s bowling lineup.', FALSE, 'Bowler'),
(10, 'Nasum Ahmed', '1994-12-05', 'Left-hand bat', 'Slow left-arm orthodox', 133, '2021-03-28', 'Nasum Ahmed is an economical left-arm spinner known for taking crucial wickets in T20Is for Bangladesh.', FALSE, 'Bowler'),
(11, 'Rishad Hossain', '2002-07-15', 'Right-hand bat', 'Legbreak googly', 250, '2023-03-31', 'Rishad Hossain is a leg-spinner known for his googlies and a promising addition to Bangladesh\'s bowling arsenal.', FALSE, 'Bowler');


CREATE TABLE `Matches` (
  `ID` INTEGER NOT NULL AUTO_INCREMENT,
  `Opponent` VARCHAR (255) NOT NULL,
  `Type` VARCHAR (255) NOT NULL,
  `Date` DATETIME NOT NULL,
  `Venue` VARCHAR (255) NOT NULL,
  `Result` VARCHAR (255) NOT NULL,
  `Wonbywicket` BOOLEAN DEFAULT FALSE,
  `Wonbyrun` BOOLEAN DEFAULT FALSE,
  `Winrun` INTEGER NOT NULL,
  `Winwicket` INTEGER NOT NULL,
  `Score_BD_Over_Played` FLOAT NOT NULL,
  `Score_BD_Run` FLOAT NOT NULL,
  `Score_BD_wicket` INTEGER NOT NULL,
  `Score_Opp_Over_Played` FLOAT NOT NULL,
  `Score_Opp_Run` FLOAT NOT NULL,
  `Score_Opp_wicket` INTEGER NOT NULL,
  PRIMARY KEY (`ID`)
);



INSERT INTO Matches 
    (ID, Opponent, Type, Date, Venue, Result, Wonbywicket, Wonbyrun, Winrun, Winwicket, 
    Score_BD_Run, Score_BD_Over_Played, Score_BD_wicket, Score_Opp_Run, Score_Opp_Over_Played, Score_Opp_wicket) 
VALUES
--     (2, 'India', 'ODI', '2024-10-15', 'Eden Gardens, Kolkata', 'India', true, false, 0, 6, 220, 50, 9, 221, 44.2, 4);
    (3, 'India', 'Test', '2024-09-21', 'M. Chinnaswamy Stadium, Bengaluru', 'India', true, false, 0, 3, 310, 98.5, 10, 312, 95.2, 7),
    (4, 'India', 'ODI', '2024-08-11', 'Sher-e-Bangla National Stadium, Dhaka', 'Bangladesh', false, true, 25, 0, 250, 47.5, 8, 225, 50, 10),
    (5, 'India', 'ODI', '2024-07-18', 'Rajiv Gandhi International Cricket Stadium, Hyderabad', 'Bangladesh', true, false, 0, 2, 290, 49.4, 8, 289, 50, 9),
    (6, 'India', 'Test', '2024-06-02', 'Wankhede Stadium, Mumbai', 'India', false, true, 120, 0, 280, 89.4, 10, 400, 120.2, 10),
    (7, 'India', 'ODI', '2024-05-25', 'Narendra Modi Stadium, Ahmedabad', 'Bangladesh', false, true, 35, 0, 270, 50, 7, 235, 48.5, 10),
    (8, 'India', 'Test', '2024-03-14', 'MA Chidambaram Stadium, Chennai', 'India', false, true, 180, 0, 210, 75.4, 10, 390, 110.3, 10),
    (9, 'India', 'ODI', '2024-02-19', 'Holkar Cricket Stadium, Indore', 'India', true, false, 0, 5, 200, 47.3, 10, 202, 44.1, 5),
    (10, 'India', 'ODI', '2024-01-07', 'Barabati Stadium, Cuttack', 'Bangladesh', true, false, 0, 3, 280, 48.2, 8, 278, 50, 10),
    (11, 'India', 'T20', '2024-11-10', 'Arun Jaitley Stadium, Delhi', 'India', true, false, 0, 4, 145, 19.5, 10, 146, 18.3, 6),
    (12, 'India', 'T20', '2024-10-28', 'Sylhet International Cricket Stadium, Sylhet', 'Bangladesh', false, true, 15, 0, 170, 20, 7, 155, 19.4, 10),
    (13, 'India', 'T20', '2024-09-05', 'Saurashtra Cricket Association Stadium, Rajkot', 'India', false, true, 35, 0, 135, 18.5, 10, 170, 20, 6),
    (14, 'India', 'T20', '2024-07-22', 'Greenfield International Stadium, Thiruvananthapuram', 'Bangladesh', true, false, 0, 2, 175, 19.4, 8, 174, 20, 9),
    (15, 'India', 'T20', '2024-06-30', 'Zahur Ahmed Chowdhury Stadium, Chattogram', 'India', false, true, 25, 0, 160, 19.3, 10, 185, 20, 6),
    (16, 'Zimbabwe', 'ODI', '2024-10-02', 'Queens Sports Club, Bulawayo', 'Bangladesh', true, false, 0, 5, 220, 47.2, 5, 219, 50, 10),
        (17, 'Zimbabwe', 'ODI', '2024-08-30', 'Queens Sports Club, Bulawayo', 'Zimbabwe', false, true, 35, 0, 250, 50, 8, 285, 50, 10),
        (18, 'Zimbabwe', 'Test', '2024-07-15', 'Harare Sports Club, Harare', 'Bangladesh', true, false, 0, 4, 320, 95.3, 10, 290, 89.1, 8),
        (19, 'Zimbabwe', 'ODI', '2024-06-10', 'Queens Sports Club, Bulawayo', 'Bangladesh', false, true, 40, 0, 270, 48.3, 7, 230, 49.5, 10),
        (20, 'Zimbabwe', 'Test', '2024-05-03', 'Harare Sports Club, Harare', 'Zimbabwe', true, false, 0, 6, 320, 110, 10, 290, 92, 9);
        (21, 'Sri Lanka', 'ODI', '2024-04-25', 'Pallekele International Cricket Stadium, Kandy', 'Sri Lanka', true, false, 0, 3, 220, 48.4, 10, 215, 50, 9),
        (22, 'Sri Lanka', 'Test', '2024-03-01', 'Galle International Stadium, Galle', 'Sri Lanka', false, true, 50, 0, 290, 92.2, 9, 240, 85.5, 8),
        (23, 'Sri Lanka', 'ODI', '2024-02-12', 'R. Premadasa Stadium, Colombo', 'Bangladesh', true, false, 0, 2, 270, 50, 8, 265, 50, 10),
        (24, 'Sri Lanka', 'Test', '2024-01-10', 'Singhalese Sports Club Ground, Colombo', 'Bangladesh', true, false, 0, 4, 315, 94, 10, 300, 98, 9),
        (25, 'Australia', 'ODI', '2024-12-10', 'Melbourne Cricket Ground, Melbourne', 'Australia', false, true, 25, 0, 230, 47.4, 8, 255, 50, 10),
        (26, 'Australia', 'Test', '2024-11-05', 'Sydney Cricket Ground, Sydney', 'Bangladesh', true, false, 0, 3, 280, 95.2, 8, 275, 99.1, 9),
        (27, 'Australia', 'ODI', '2024-10-15', 'Adelaide Oval, Adelaide', 'Bangladesh', false, true, 10, 0, 250, 50, 8, 265, 48.5, 9),
        (28, 'Australia', 'Test', '2024-09-30', 'The Gabba, Brisbane', 'Bangladesh', false, true, 70, 0, 310, 98.5, 9, 330, 102.3, 8),
        (29, 'Australia', 'ODI', '2024-08-10', 'Bellerive Oval, Hobart', 'Australia', true, false, 0, 4, 240, 49.5, 9, 220, 50, 8),
        (30, 'Australia', 'Test', '2024-07-19', 'Optus Stadium, Perth', 'Bangladesh', true, false, 0, 3, 290, 98.1, 9, 270, 99.2, 8);




INSERT INTO Batting_Career (
    player_id, Type, Value, Span, Mat, Inns, NO, Runs, HS, Avg, BF, SR, Hundred, Fifty, Duck, Fours, Sixes
) VALUES 
(4, 'Country', 'England', '2010-2016', 6, 12, 0, 736, 108, 61.33, 996, 73.89, 3, 5, 0, 93, 5),
(4, 'Country', 'India', '2010-2017', 4, 8, 1, 296, 151, 42.28, 484, 61.15, 1, 1, 1, 39, 3),
(4, 'Country', 'New Zealand', '2008-2019', 11, 20, 0, 908, 126, 45.40, 1523, 59.61, 1, 8, 1, 136, 4),
(4, 'Country', 'Pakistan', '2011-2020', 5, 10, 0, 373, 206, 37.30, 577, 64.64, 1, 0, 0, 44, 8),
(4, 'Country', 'South Africa', '2008-2022', 8, 14, 0, 265, 57, 18.92, 567, 46.73, 0, 1, 2, 35, 1),
(4, 'Country', 'Sri Lanka', '2008-2022', 13, 25, 1, 917, 133, 38.20, 1519, 60.36, 1, 7, 4, 114, 7),
(4, 'Country', 'West Indies', '2009-2022', 14, 28, 0, 954, 128, 34.07, 1763, 54.11, 1, 6, 2, 119, 8),
(4, 'Country', 'Zimbabwe', '2011-2020', 6, 11, 0, 463, 109, 42.09, 951, 48.68, 2, 1, 1, 55, 1),
(1, 'Country', 'Afghanistan', '2022-2023', 7, 6, 3, 119, 93, 39.66, 145, 82.06, 0, 1, 1, 13, 1),
(1, 'Country', 'England', '2023-2023', 3, 3, 0, 47, 23, 15.66, 69, 68.11, 0, 0, 0, 5, 1),
(1, 'Country', 'India', '2022-2022', 3, 3, 0, 14, 8, 4.66, 25, 56.00, 0, 0, 1, 1, 0),
(1, 'Country', 'New Zealand', '2023-2023', 1, 1, 0, 38, 38, 38.00, 28, 135.71, 0, 0, 0, 5, 1),
(1, 'Country', 'Pakistan', '2023-2023', 1, 1, 0, 12, 12, 12.00, 11, 109.09, 0, 0, 0, 0, 1),
(1, 'Country', 'South Africa', '2022-2022', 3, 2, 0, 89, 72, 44.50, 120, 74.16, 0, 1, 0, 10, 1),
(1, 'Country', 'Sri Lanka', '2021-2021', 3, 3, 1, 53, 27, 26.50, 48, 110.41, 0, 0, 0, 5, 0),
(1, 'Country', 'West Indies', '2022-2022', 3, 2, 0, 9, 9, 4.50, 19, 47.36, 0, 0, 1, 1, 0),
(1, 'Country', 'Zimbabwe', '2020-2022', 7, 6, 2, 219, 85, 54.75, 201, 108.95, 0, 1, 0, 15, 5);

--bowling career--

INSERT INTO Bowling_Career (Type, Value, Span, Mat, Inns, Overs, Mdns, Runs, Wkts, BBI, Avg, Econ, SR, FourW, FiveW, player_id)  
VALUES 
('Country', 'Afghanistan', '2022-2023', 7, 3, 3.1, 0, 14, 1, '1/0', 14.00, 4.42, 19.0, 0, 0, 1), 
('Country', 'England', '2023-2023', 3, 0, 0, 0, 0, 0, '0/0', 0.00, 0.00, 0.00, 0, 0, 1),
('Country', 'India', '2022-2022', 3, 1, 1.0, 0, 14, 0, '0/0', 0.00, 14.00, 0.00, 0, 0, 1), 
('Country', 'New Zealand', '2023-2023', 1, 1, 1.0, 0, 17, 0, '0/0', 0.00, 17.00, 0.00, 0, 0, 1),
('Country', 'Pakistan', '2023-2023', 1, 0, 0, 0, 0, 0, '0/0', 0.00, 0.00, 0.00, 0, 0, 1),
('Country', 'South Africa', '2022-2022', 3, 1, 5.0, 0, 15, 1, '1/15', 15.00, 3.00, 30.0, 0, 0, 1); 

-- ('Country', 'Sri Lanka', '2021-2021', 3, 0, 0, 0, 0, 0, '0/0', 0.00, 0.00, 0.00, 0, 0, 1),
-- ('Country', 'West Indies', '2022-2022', 3, 1, 2.0, 1, 2, 0, '0/0', 0.00, 1.00, 0.00, 0, 0, 1),
-- ('Country', 'Zimbabwe', '2020-2022', 7, 3, 3.3, 0, 29, 1, '1/12', 29.00, 8.28, 21.0, 0, 0, 1), 
-- ('Country', 'Bangladesh', '2020-2023', 16, 4, 5.1, 0, 34, 2, '1/0', 17.00, 6.58, 15.5, 0, 0, 1),
-- ('Country', 'Pakistan', '2023-2023', 2, 1, 1.0, 0, 6, 0, '0/0', 0.00, 6.00, 0.00, 0, 0, 1),
-- ('Country', 'Zimbabwe', '2021-2022', 6, 2, 1.3, 0, 17, 0, '0/0', 0.00, 11.33, 0.00, 0, 0, 1);





