
DROP DATABASE TIGERVERSE;
CREATE DATABASE TIGERVERSE;
USE TIGERVERSE;

 
 CREATE TABLE Players (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    DOB DATE,
    Age INT,
    RANKING INT,
    IntDebut DATE,
    Retired DATE,
    Profile TEXT,
    PlayerRole VARCHAR(255),
    BattingStyle VARCHAR(255),
    BowlingStyle VARCHAR(255),
    Specialist VARCHAR(255)
);


CREATE TABLE Coaches (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    DOB DATE,
    Age INT,
    Nationality VARCHAR(100),
    ExperienceYears INT,
    AppointedDate DATE,
    Retired DATE DEFAULT NULL
);

CREATE TABLE BattingCareerAgainst (
  PlayerID       INT                NOT NULL,
  Opponent       VARCHAR(100)       NOT NULL,
  MatchType      ENUM('Test','ODI','T20')    NOT NULL,
  LocationType   ENUM('Home','Away','Neutral') NOT NULL,
  Matches        INT UNSIGNED NOT NULL,
  Innings        INT UNSIGNED NOT NULL,
  Runs           INT UNSIGNED       NOT NULL,
  BallsFaced     INT UNSIGNED       NOT NULL,
  HighestScore   INT UNSIGNED NOT NULL,
  Average        DECIMAL(5,2)       NOT NULL,
  StrikeRate     DECIMAL(5,2)       NOT NULL,
  Hundreds       INT UNSIGNED   NOT NULL,
  Fifties        INT UNSIGNED   NOT NULL,
  Fours          INT UNSIGNED NOT NULL,
  Sixes          INT UNSIGNED NOT NULL,
  Ducks          INT UNSIGNED   NOT NULL,
  NotOuts        INT UNSIGNED   NOT NULL,
  PRIMARY KEY (PlayerID, Opponent, MatchType, LocationType),
  CONSTRAINT fk_bca_player
    FOREIGN KEY (PlayerID) REFERENCES Players(ID)
);

CREATE TABLE BowlingCareerAgainst (
  PlayerID            INT                  NOT NULL,
  Opponent            VARCHAR(100)         NOT NULL,
  MatchType           ENUM('Test','ODI','T20')   NOT NULL,
  LocationType        ENUM('Home','Away','Neutral') NOT NULL,
  Matches             INT UNSIGNED    NOT NULL,
  Innings             INT UNSIGNED    NOT NULL,
  OversBowled         INT UNSIGNED    NOT NULL,
  BallsBowled         INT UNSIGNED         NOT NULL,
  RunsConceded        INT UNSIGNED         NOT NULL,
  Wickets             INT UNSIGNED    NOT NULL,
  Economy             DECIMAL(5,2)         NOT NULL,
  Average             DECIMAL(5,2)         NOT NULL,
  StrikeRate          DECIMAL(5,2)         NOT NULL,
  FiveWicketHauls     INT UNSIGNED     NOT NULL,
  TenWicketHauls      INT UNSIGNED     NOT NULL,
  BestBowlingFigures  VARCHAR(10)          NOT NULL,
  Maidens             INT UNSIGNED    NOT NULL,
  PRIMARY KEY (PlayerID, Opponent, MatchType, LocationType),
  CONSTRAINT fk_bowling_player
    FOREIGN KEY (PlayerID) REFERENCES Players(ID)
);

CREATE TABLE FieldingCareer (
  PlayerID       INT                  NOT NULL,
  MatchType      ENUM('Test','ODI','T20')   NOT NULL,
  Opponent       VARCHAR(100)         NOT NULL,
  LocationType   ENUM('Home','Away','Neutral') NOT NULL,
  Matches        INT UNSIGNED    NOT NULL,
  Innings        INT UNSIGNED    NOT NULL,
  Catches        INT UNSIGNED    NOT NULL,
  Stumpings      INT UNSIGNED    NOT NULL,
  RunOuts        INT UNSIGNED    NOT NULL,
  DirectHits     INT UNSIGNED    NOT NULL,
  PRIMARY KEY (PlayerID, MatchType, Opponent, LocationType),
  CONSTRAINT fk_fielding_player
    FOREIGN KEY (PlayerID) REFERENCES Players(ID)
);



CREATE TABLE Squads (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    CoachID INT,
    CaptainID INT,
    Span VARCHAR(50),
    MatchType VARCHAR(50),
    FOREIGN KEY (CoachID) REFERENCES Coaches(ID) ON DELETE SET NULL
);

CREATE TABLE SquadPlayers (
    SquadID INT,
    PlayerID INT,
    PRIMARY KEY (SquadID, PlayerID),
    FOREIGN KEY (SquadID) REFERENCES Squads(ID) ON DELETE CASCADE,
    FOREIGN KEY (PlayerID) REFERENCES Players(ID) ON DELETE CASCADE
);



 CREATE TABLE Matches (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Opponent VARCHAR(255),
    Type VARCHAR(191),
    Date DATETIME(3),
    Venue VARCHAR(191),
    Result VARCHAR(191),
    Wonbywicket INT,
    Wonbyrun INT(1),
    Winrun DOUBLE,
    Winwicket DOUBLE,
    Score_BD_Over_Played DOUBLE,
    Score_BD_Run DOUBLE,
    Score_BD_wicket INT,
    Score_Opp_Over_Played DOUBLE,
    Score_Opp_Run DOUBLE,
    Score_Opp_wicket INT
);


INSERT INTO Players (Name, DOB, Age, RANKING, IntDebut, Retired, Profile, PlayerRole, BattingStyle, BowlingStyle, Specialist)
VALUES
('Rahim Hossain', '2001-07-08', 23, 83, '2022-07-20', NULL, 'Promising middle-order batsman', 'Batsman', 'Right-handed', 'Right Arm Offbreak', 'T20'),
('Hasan Mahmud', '1999-12-05', 24, 47, '2022-01-10', NULL, 'Fast bowler with great potential', 'Batsman', 'Right-handed', 'Right-arm fast', NULL),
('Tamim Iqbal', '1989-03-20', 34, 15, '2007-02-09', '2023-07-08', 'Prolific opening batsman', 'Batsman', 'Left-handed', 'Left-arm slow', NULL),
('Mohammad Naim', '2000-02-20', 24, 56, '2023-01-05', NULL, 'Young opening batsman', 'Batsman', 'Left-handed', 'Left-arm medium', NULL),
('Mahmud Hasan Joy', '2000-09-13', 23, 93, '2021-12-04', NULL, 'Rising fast bowler', 'Batsman', 'Right-handed', 'Right-arm fast', NULL),
('Jayed Ahmed', '2000-07-30', 24, 132, '2023-11-14', NULL, 'Reliable middle-order batsman', 'Batsman', 'Right-handed', 'Right-arm fast', NULL),
('Towhid Hridoy', '2001-11-04', 23, 65, '2024-01-18', NULL, 'Aggressive top-order batsman', 'Batsman', 'Right-handed', 'Right-arm Medium', NULL),

('Najmul Hossain Shanto', '1998-12-07', 26, 39, '2019-01-18', NULL, 'Stylish left-handed batsman, top-order', 'Batsman', 'Left-handed', 'Right-arm slow', 'TEST'),

('Parvez Hossain Emon', '2001-10-10', 23, 120, '2023-06-12', NULL, 'Aggressive opening batsman', 'Batsman', 'Left-handed', 'Right-arm slow', 'ODI'),

('Rishad Hossain', '2000-03-25', 24, 150, '2016-07-10', NULL, 'Rising middle-order batsman', 'Batsman', 'Right-handed', 'Left-arm slow', NULL),

('Tanzid Hasan Tamim', '2000-08-01', 24, 110, '2012-01-10', NULL, 'Top-order batsman with good technique', 'Batsman', 'Right-handed', 'Right-arm leg-spin', NULL),

('Towhid Hridoy', '2001-11-04', 23, 65, '2016-01-18', NULL, 'Aggressive top-order batsman', 'Batsman', 'Right-handed', 'Right-arm medium', NULL),

('Najmul Hasan Shanto', '1998-12-07', 26, 40, '2019-01-18', NULL, 'Stylish left-handed batsman, top-order', 'Batsman', 'Left-handed', 'Right-arm leg-spin', NULL);

INSERT INTO Players (Name, DOB, Age, RANKING, IntDebut, Retired, Profile, PlayerRole, BattingStyle, BowlingStyle, Specialist)
VALUES
('Zakir Hasan', '1999-06-04', 25, 140, '2015-07-01', NULL, 'Promising opening batsman', 'Batsman', 'Right-handed', 'Left-arm unorthodox', NULL),

('Anamul Haque', '1992-04-04', 32, 115, '2011-07-06', NULL, 'Opening batsman with good technique', 'Batsman', 'Right-handed', 'Right-arm slow', 'T20, All-rounder'),

('Shakib Ahmed', '1998-04-12', 25, 78, '2022-03-15', NULL, 'Dynamic all-rounder', 'All-rounder', 'Left-handed', 'Left-arm orthodox', NULL),

('Mahmudullah Riyad', '1986-02-04', 37, 32, '2007-07-25', '2023-12-15', 'Dependable middle-order allrounder', 'All-rounder', 'Right-handed', 'Right-arm off spin', NULL),

('Rakibul Hasan', '2002-03-14', 22, 111, '2023-09-05', NULL, 'All-rounder with promising skills', 'All-rounder', 'Left-handed', 'Left-arm orthodox', 'T20'),

('Md. Saifuddin', '1999-01-01', 26, 150, '2024-06-15', NULL, 'All-rounder, strong in death overs', 'All-rounder', 'Right-handed', 'Right-arm medium', NULL),

('Afif Hossain', '1999-09-22', 26, 51, '2018-02-15', NULL, 'Dependable middle-order', 'All-rounder', 'Right-handed', 'Right-arm offspin', 'ODI'),

('Mehidy Hasan Miraz', '1997-11-25', 27, 44, '2016-11-10', NULL, 'Reliable off-spinner and handy batsman', 'All-rounder', 'Right-handed', 'Right-arm offspin', NULL),

('Soumya Sarkar', '1993-02-25', 31, 60, '2014-06-17', NULL, 'All-rounder', 'All-rounder', 'Left-handed', 'Right-arm medium', 'T20'),

('Shakib Al Hasan', '1987-03-24', 37, 1, '2006-08-01', NULL, 'World-class all-rounder, experienced', 'All-rounder', 'Left-handed', 'Left-arm orthodox', NULL),

('Mehedi Hasan', '1997-11-25', 27, 43, '2016-11-10', NULL, 'Reliable off-spinner and handy batsman', 'All-rounder', 'Right-handed', 'Right-arm offspin', 'Bowler'),

('Mashrafe Mortaza', '1983-10-05', 40, 28, '2001-11-08', '2023-03-01', 'Legendary captain and pace bowler', 'Bowler', 'Right-handed', 'Right-arm medium', 'T20'),

('Nasum Ahmed', '1998-12-05', 26, 72, '2023-02-15', NULL, 'Left-arm orthodox bowler', 'Bowler', 'Left-handed', 'Left-arm orthodox', NULL);

INSERT INTO Players 
(Name, DOB, Age, RANKING, IntDebut, Retired, Profile, PlayerRole, BattingStyle, BowlingStyle, Specialist)
VALUES 
('Shoriful Islam', '2000-11-23', 24, 82, '2023-06-20', NULL, 'Left-arm fast-medium bowler', 'Bowler', 'Left-handed', 'Left-arm fast', NULL),
('Mukidul Islam', '1999-10-11', 25, 120, '2024-03-06', NULL, 'Solid bowler and lower-order bat', 'Bowler', 'Right-handed', 'Right-arm fast', NULL),
('Arafat Sunny', '1998-05-25', 26, 140, '2017-04-22', NULL, 'Left-arm spinner', 'Bowler', 'Left-handed', 'Left-arm orthodox', NULL),
('Mustafizur Rahman', '1995-09-06', 29, 81, '2015-04-24', NULL, 'Left-arm fast bowler, death over specialist', 'Bowler', 'Left-handed', 'Left-arm fast', NULL),
('Nahid Rana', '1999-07-21', 25, 131, '2020-03-28', NULL, 'Promising fast bowler', 'Bowler', 'Right-handed', 'Right-arm fast', NULL),
('Nasum Ahmed', '1998-12-05', 26, 72, '2017-02-15', NULL, 'Left-arm orthodox bowler', 'Bowler', 'Left-handed', 'Left-arm orthodox', NULL),
('Tanzim Hasan Sakib', '2001-09-10', 23, 92, '2013-04-12', NULL, 'Rising fast bowler', 'Bowler', 'Right-handed', 'Right-arm fast', NULL),
('Taskin Ahmed', '1995-04-03', 29, 85, '2014-12-09', NULL, 'Pace bowler with good pace and bounce', 'Bowler', 'Right-handed', 'Right-arm fast', NULL),
('Hasan Mahmud', '1999-12-05', 25, 80, '2017-01-10', NULL, 'Fast bowler with good pace and bounce', 'Bowler', 'Right-handed', 'Right-arm fast', NULL),
('Shoriful Islam', '2000-11-23', 24, 90, '2012-03-22', NULL, 'Left-arm fast-medium bowler', 'Bowler', 'Left-handed', 'Left-arm fast', NULL),
('Shahdat Hossain', '1997-05-22', 27, 130, '2016-08-20', NULL, 'Talented fast bowler', 'Bowler', 'Right-handed', 'Right-arm fast', NULL),
('Jaker Ali', '1997-03-18', 27, 100, '2020-01-19', NULL, 'Wicketkeeper-batsman', 'Wicketkeeper', 'Right-handed', 'Left-arm slow', NULL),
('Mushfiqur Rahim', '1987-06-09', 37, 30, '2005-05-06', NULL, 'Senior batsman, wicketkeeper', 'Wicket Keeper', 'Right-handed', 'Right-arm leg-spin', NULL),
('Liton Das', '1994-10-13', 30, 50, '2015-11-27', NULL, 'Stylish wicketkeeper-batsman', 'Wicket Keeper', 'Right-handed', 'Right-arm slow', NULL);


INSERT INTO Coaches (Name, DOB, Age, Nationality, ExperienceYears, AppointedDate, Retired)
VALUES
('John Wright', '1954-07-05', 69, 'New Zealand', 25, '2010-01-15', '2022-09-07'),
('Gary Kirsten', '1967-11-23', 56, 'South Africa', 20, '2011-06-01', NULL),
('Trevor Bayliss', '1962-12-21', 61, 'Australia', 22, '2015-07-01', NULL),
('Darren Lehmann', '1970-02-05', 54, 'Australia', 18, '2013-06-20', '2023-11-29'),
('Andy Flower', '1968-04-28', 55, 'Zimbabwe', 21, '2009-08-07', NULL),
('Tom Moody', '1965-10-02', 58, 'Australia', 23, '2005-05-01', NULL),
('Ottis Gibson', '1969-03-16', 54, 'West Indies', 19, '2017-08-23', NULL),
('Russell Domingo', '1974-08-30', 49, 'South Africa', 15, '2019-09-01', NULL),
('Misbah-ul-Haq', '1974-05-28', 49, 'Pakistan', 12, '2019-09-04', '2024-02-27'),
('Mahela Jayawardene', '1977-05-27', 46, 'Sri Lanka', 10, '2021-11-01', NULL),
('Ravi Shastri', '1962-05-27', 61, 'India', 18, '2017-07-11', NULL),
('Brendon McCullum', '1981-09-27', 42, 'New Zealand', 5, '2022-05-13', NULL),
('Justin Langer', '1970-11-21', 53, 'Australia', 16, '2018-05-03', NULL),
('Phil Simmons', '1963-04-18', 60, 'West Indies', 20, '2015-11-01', NULL),
('Graham Ford', '1960-11-16', 63, 'South Africa', 24, '2016-12-01', NULL);


INSERT INTO Squads (CoachID, CaptainID, Span, MatchType)
VALUES 
(5, 4, '2019-2020', 'ODI'),
(6, 5, '2019-2020', 'ODI'),
(7, 14, '2020-2021', 'ODI'),
(8, 7, '2020-2021', 'ODI'),
(9, 1, '2021-2022', 'ODI'),
(5, 13, '2021-2022', 'ODI'),
(11, 12, '2022-2023', 'ODI'),
(12, 25, '2022-2023', 'ODI'),
(13, 6, '2023-2024', 'ODI'),
(14, 16, '2023-2024', 'ODI'),
(15, 6, '2024-2025', 'ODI'),
(8, 10, '2024-2025', 'ODI'),
(3, 14, '2019-2020', 'Test');
INSERT INTO Squads (CoachID, CaptainID, Span, MatchType) VALUES
(5, 4, '2019-2020', 'ODI'),
(6, 5, '2019-2020', 'ODI'),
(7, 14, '2020-2021', 'ODI'),
(8, 7, '2020-2021', 'ODI'),
(9, 1, '2021-2022', 'ODI'),
(5, 13, '2021-2022', 'ODI'),
(11, 12, '2022-2023', 'ODI'),
(12, 25, '2022-2023', 'ODI'),
(13, 6, '2023-2024', 'ODI'),
(14, 16, '2023-2024', 'ODI'),
(15, 6, '2024-2025', 'ODI'),
(8, 10, '2024-2025', 'ODI'),
(3, 14, '2019-2020', 'Test'),
(4, 1, '2019-2020', 'Test'),
(7, 4, '2020-2021', 'Test'),
(3, 5, '2020-2021', 'Test'),
(5, 5, '2021-2022', 'Test'),
(6, 5, '2021-2022', 'Test'),
(8, 7, '2022-2023', 'Test'),
(9, 19, '2022-2023', 'Test'),
(10, 13, '2023-2024', 'Test'),
(12, 8, '2023-2024', 'Test'),
(13, 19, '2024-2025', 'Test'),
(14, 2, '2024-2025', 'Test'),
(1, 18, '2019-2020', 'T20'),
(2, 14, '2019-2020', 'T20'),
(3, 7, '2020-2021', 'T20'),
(4, 15, '2020-2021', 'T20'),
(5, 18, '2021-2022', 'T20'),
(6, 13, '2021-2022', 'T20');

INSERT INTO Squads (CoachID, CaptainID, Span, MatchType) VALUES
(2, 19, '2022-2023', 'T20'),
(6, 25, '2022-2023', 'T20'),
(13, 19, '2023-2024', 'T20'),
(3, 18, '2023-2024', 'T20'),
(11, 9, '2024-2025', 'T20'),
(10, 25, '2024-2025', 'T20');




INSERT INTO SquadPlayers (SquadID, PlayerID) VALUES
-- Squad 1
(1, 4), (1, 24), (1, 34), (1, 17), (1, 19), (1, 26), (1, 30), (1, 6), (1, 21), (1, 15), (1, 23),

-- Squad 2
(2, 38), (2, 39), (2, 34), (2, 27), (2, 26), (2, 28), (2, 19), (2, 20), (2, 21), (2, 22), (2, 23),

-- Squad 3
(3, 21), (3, 38), (3, 6), (3, 26), (3, 24), (3, 19), (3, 31), (3, 3), (3, 4), (3, 34), (3, 20),

-- Squad 4
(4, 26), (4, 22), (4, 17), (4, 32), (4, 24), (4, 29), (4, 30), (4, 19), (4, 21), (4, 20), (4, 28),

-- Squad 5
(5, 32), (5, 1), (5, 2), (5, 19), (5, 26), (5, 24), (5, 15), (5, 17), (5, 22), (5, 23), (5, 21),

-- Squad 6
(6, 32), (6, 18), (6, 5), (6, 23), (6, 36), (6, 30), (6, 24), (6, 22), (6, 29), (6, 20), (6, 10),

-- Squad 7
(7, 6), (7, 11), (7, 9), (7, 18), (7, 5), (7, 14), (7, 4), (7, 17), (7, 25), (7, 12), (7, 8),

-- Squad 8
(8, 18), (8, 2), (8, 4), (8, 7), (8, 28), (8, 11), (8, 16), (8, 23), (8, 13), (8, 30), (8, 38),

-- Squad 9
(9, 18), (9, 5), (9, 13), (9, 17), (9, 3), (9, 12), (9, 27), (9, 6), (9, 8), (9, 22), (9, 30),

-- Squad 10
(10, 21), (10, 20), (10, 28), (10, 27), (10, 8), (10, 3), (10, 9), (10, 13), (10, 22), (10, 10), (10, 29),

-- Squad 11
(11, 33), (11, 4), (11, 12), (11, 7), (11, 13), (11, 19), (11, 6), (11, 23), (11, 18), (11, 22), (11, 20),

-- Squad 12
(12, 18), (12, 16), (12, 9), (12, 11), (12, 20), (12, 28), (12, 3), (12, 19), (12, 29), (12, 8), (12, 22),

-- Squad 13
(13, 21), (13, 9), (13, 13), (13, 7), (13, 11), (13, 6), (13, 5), (13, 17), (13, 10), (13, 38), (13, 14);

INSERT INTO SquadPlayers (SquadID, PlayerID) VALUES
(14, 4), (14, 24), (14, 34), (14, 17), (14, 19), (14, 26), (14, 30), (14, 6), (14, 21), (14, 15), (14, 23),
(15, 38), (15, 39), (15, 34), (15, 27), (15, 26), (15, 28), (15, 19), (15, 20), (15, 21), (15, 22), (15, 23),
(16, 21), (16, 38), (16, 6), (16, 26), (16, 24), (16, 19), (16, 31), (16, 3), (16, 4), (16, 34), (16, 20),
(17, 26), (17, 22), (17, 17), (17, 32), (17, 24), (17, 29), (17, 30), (17, 19), (17, 21), (17, 20), (17, 28),
(18, 32), (18, 1), (18, 2), (18, 19), (18, 26), (18, 24), (18, 15), (18, 17), (18, 22), (18, 23), (18, 21),
(19, 32), (19, 18), (19, 5), (19, 23), (19, 36), (19, 30), (19, 24), (19, 22), (19, 29), (19, 20), (19, 10),
(20, 6), (20, 11), (20, 9), (20, 18), (20, 5), (20, 14), (20, 4), (20, 17), (20, 25), (20, 12), (20, 8),
(21, 18), (21, 2), (21, 4), (21, 7), (21, 28), (21, 11), (21, 16), (21, 23), (21, 13), (21, 30), (21, 38),
(22, 18), (22, 5), (22, 13), (22, 17), (22, 3), (22, 12), (22, 27), (22, 6), (22, 8), (22, 22), (22, 30),
(23, 21), (23, 20), (23, 28), (23, 27), (23, 8), (23, 3), (23, 9), (23, 13), (23, 22), (23, 10), (23, 29),
(24, 33), (24, 4), (24, 12), (24, 7), (24, 13), (24, 19), (24, 6), (24, 23), (24, 18), (24, 22), (24, 20),
(25, 18), (25, 16), (25, 9), (25, 11), (25, 20), (25, 28), (25, 3), (25, 19), (25, 29), (25, 8), (25, 22),
(26, 21), (26, 9), (26, 13), (26, 7), (26, 11), (26, 6), (26, 5), (26, 17), (26, 10), (26, 38), (26, 14),
(27, 21), (27, 28), (27, 1), (27, 34), (27, 6), (27, 2), (27, 5), (27, 12), (27, 22), (27, 24), (27, 20),
(28, 21), (28, 4), (28, 7), (28, 11), (28, 28), (28, 3), (28, 5), (28, 20), (28, 30), (28, 22), (28, 15),
(29, 21), (29, 28), (29, 27), (29, 25), (29, 30), (29, 1), (29, 9), (29, 18), (29, 8), (29, 22), (29, 20),
(30, 21), (30, 4), (30, 3), (30, 17), (30, 20), (30, 6), (30, 5), (30, 32), (30, 30), (30, 22), (30, 27);

INSERT INTO SquadPlayers (SquadID, PlayerID) VALUES
(31, 19), (31, 5), (31, 12), (31, 7), (31, 14), (31, 2), (31, 16), (31, 11), (31, 10), (31, 13), (31, 9),
(32, 22), (32, 3), (32, 18), (32, 10), (32, 6), (32, 27), (32, 25), (32, 9), (32, 5), (32, 14), (32, 13),
(33, 19), (33, 7), (33, 28), (33, 12), (33, 16), (33, 3), (33, 5), (33, 22), (33, 9), (33, 6), (33, 10),
(34, 28), (34, 5), (34, 6), (34, 16), (34, 9), (34, 18), (34, 7), (34, 12), (34, 2), (34, 27), (34, 3),
(35, 7), (35, 5), (35, 9), (35, 12), (35, 10), (35, 14), (35, 6), (35, 19), (35, 28), (35, 18), (35, 3),
(36, 19), (36, 22), (36, 3), (36, 13), (36, 18), (36, 28), (36, 9), (36, 25), (36, 5), (36, 12), (36, 7);


INSERT INTO Matches (
    Opponent, Type, Date, Venue, Result, Wonbywicket, Wonbyrun, Winrun, Winwicket, 
    Score_BD_Over_Played, Score_BD_Run, Score_BD_wicket, Score_Opp_Over_Played, 
    Score_Opp_Run, Score_Opp_wicket
) VALUES 
('India', 'odi', '2024-06-10', "Lord's Cricket Ground", 'Bangladesh', 1, 0, 0, 4, 48.5, 294, 11, 39, 292, 6),
('India', 'odi', '2023-01-15', 'Sylhet International Stadium', 'Bangladesh', 0, 1, 32, 0, 50, 286, 11, 50, 254, 6),
('India', 'odi', '2022-06-13', 'Eden Gardens', 'India', 1, 0, 0, 7, 50, 309, 4, 50, 310, 8),
('India', 't20', '2024-10-12', 'Mirpur, Bangladesh', 'India', 0, 1, 133, 0, 20, 164, 7, 20, 297, 6),
('India', 't20', '2023-10-09', 'Barsapara Cricket Stadium', 'India', 0, 1, 86, 0, 20, 135, 9, 20, 221, 9),
('India', 't20', '2022-10-06', 'Rajiv Gandhi Stadium', 'Bangladesh', 1, 0, 0, 7, 11.5, 128, 11, 19.5, 127, 4),
('India', 't20', '2021-06-22', 'Shere Bangla National Stadium', 'India', 0, 1, 50, 0, 14.6, 80, 4, 19.6, 130, 11),
('India', 't20', '2020-06-01', 'Melbourne Cricket Ground', 'Bangladesh', 0, 1, 60, 0, 20, 182, 5, 20, 122, 9),
('India', 't20', '2019-10-06', 'Asian Games Cricket Field', 'India', 1, 0, 0, 9, 20, 96, 2, 9.2, 97, 5),
('India', 'test', '2024-09-27', 'Arun Jaitley Stadium', 'India', 1, 0, 0, 7, 104, 379, 10, 53, 383, 9),
('India', 'test', '2024-09-19', 'Sylhet International Stadium', 'India', 0, 1, 280, 0, 82, 383, 10, 80, 654, 4),
('India', 'test', '2023-12-22', 'Eden Gardens', 'India', 1, 0, 0, 3, 97, 227, 10, 56, 314, 7),
('India', 'test', '2022-12-14', 'Melbourne Cricket Ground', 'India', 0, 1, 188, 0, 86, 474, 10, 94, 662, 2),
('India', 'test', '2019-11-22', 'Rajiv Gandhi Stadium', 'Bangladesh', 0, 1, 46, 0, 54, 347, 9, 82, 301, 10),
('India', 'test', '2020-11-14', 'Asian Games Cricket Field', 'India', 0, 1, 130, 0, 73, 363, 10, 112, 493, 6);


INSERT INTO Matches (
    Opponent, Type, Date, Venue, Result, Wonbywicket, Wonbyrun, Winrun, Winwicket, 
    Score_BD_Over_Played, Score_BD_Run, Score_BD_wicket, 
    Score_Opp_Over_Played, Score_Opp_Run, Score_Opp_wicket
) VALUES
('Zimbabwe', 'odi', '2022-08-10', 'Harare Sports Club', 'Bangladesh', 0, 1, 105, 0, 50, 256, 11, 32.2, 151, 10),
('Zimbabwe', 'odi', '2023-08-07', 'Mirpur,Bangladesh', 'Zimbabwe', 1, 0, 0, 5, 50, 290, 6, 47.3, 291, 5),
('Zimbabwe', 'odi', '2022-08-05', 'Harare Sports Club', 'Zimbabwe', 1, 0, 0, 5, 50, 303, 6, 48.2, 307, 5),
('Zimbabwe', 'odi', '2020-07-20', 'Sylhet International Stadium', 'Bangladesh', 1, 0, 0, 5, 48, 302, 11, 49.3, 298, 5),
('Zimbabwe', 'odi', '2024-07-18', 'Queens Sports Club', 'Bangladesh', 1, 0, 0, 3, 49.1, 242, 7, 50, 240, 8),
('Zimbabwe', 'odi', '2019-07-16', 'Queens Sports Club', 'Bangladesh', 0, 1, 155, 0, 50, 276, 11, 28, 121, 10),
('Zimbabwe', 't20', '2024-05-12', 'Harare Sports Club', 'Zimbabwe', 1, 0, 0, 8, 20, 157, 3, 18.3, 158, 2),
('Zimbabwe', 't20', '2023-05-10', 'Shere Bangla National Stadium', 'Bangladesh', 0, 1, 5, 0, 19.5, 143, 11, 19.4, 138, 11),
('Zimbabwe', 't20', '2021-05-07', 'Sylhet International Stadium', 'Bangladesh', 0, 1, 9, 0, 20, 165, 5, 20, 156, 9),
('Zimbabwe', 't20', '2020-05-05', 'Harare Sports Club', 'Bangladesh', 1, 0, 0, 6, 18.3, 142, 4, 20, 138, 5),
('Zimbabwe', 't20', '2019-05-03', 'Queens Sports Club', 'Bangladesh', 1, 0, 0, 8, 15.2, 126, 2, 20, 124, 3),
('Zimbabwe', 't20', '2022-10-30', 'The Gabba, Brisbane', 'Bangladesh', 0, 1, 3, 0, 20, 150, 7, 20, 147, 8),
('Zimbabwe', 'test', '2021-07-11', 'Shere Bangla National Stadium', 'Bangladesh', 0, 1, 220, 0, 99, 752, 20, 97, 532, 11),
('Zimbabwe', 'test', '2020-02-25', 'Harare Sports Club', 'Bangladesh', 0, 1, 106, 0, 103, 560, 6, 120, 454, 9),
('Zimbabwe', 'test', '2019-11-15', 'Harare Test Ground', 'Bangladesh', 0, 1, 218, 0, 166, 754, 17, 105, 532, 13),
('Zimbabwe', 'test', '2024-11-06', 'Harare Test Ground', 'Zimbabwe', 0, 1, 151, 0, 155, 312, 10, 89, 463, 20),
('Zimbabwe', 'test', '2022-11-16', 'Sylhet International Stadium', 'Bangladesh', 0, 1, 186, 0, 176, 822, 15, 145.0, 636, 18),
('Pakistan', 'odi', '2023-10-31', 'Mirpur, Bangladesh', 'Pakistan', 1, 0, 0, 7, 45.1, 204, 4, 32.3, 205, 11),
('Pakistan', 'odi', '2023-09-06', 'Gaddafi Stadium', 'Pakistan', 1, 0, 0, 7, 38.4, 193, 4, 39.3, 194, 11),
('Pakistan', 'odi', '2020-07-05', 'Lord''s Cricket Ground', 'Pakistan', 0, 1, 94, 0, 44.1, 221, 10, 50, 315, 11),
('Pakistan', 'odi', '2019-05-26', 'Shere Bangla National Stadium', 'none', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('Pakistan', 'odi', '2021-09-26', 'Dubai International Stadium', 'Bangladesh', 0, 1, 37, 0, 48.5, 239, 10, 50, 202, 11),
('Pakistan', 'odi', '2022-05-27', 'The Oval', 'Pakistan', 1, 0, 0, 2, 50, 341, 11, 49.3, 342, 8);


INSERT INTO Matches (
    Opponent, Type, Date, Venue, Result, Wonbywicket, Wonbyrun, Winrun, Winwicket,
    Score_BD_Over_Played, Score_BD_Run, Score_BD_wicket,
    Score_Opp_Over_Played, Score_Opp_Run, Score_Opp_wicket
) VALUES
('Pakistan', 't20', '2023-10-07', 'Asian Games, Hangzhou', 'Bangladesh', 1, 0, 0, 6, 11.2, 49, 11, 9, 48, 11),
('Pakistan', 't20', '2022-11-06', 'Adelaide Oval', 'Pakistan', 1, 0, 0, 5, 18.1, 127, 6, 20, 128, 11),
('Pakistan', 't20', '2024-10-13', 'Christchurch, NZ', 'Pakistan', 1, 0, 0, 7, 19.5, 173, 6, 20, 177, 11),
('Pakistan', 't20', '2022-10-07', 'Lahore, Pakistan', 'Pakistan', 0, 1, 21, 0, 20, 146, 8, 20, 167, 5),
('Pakistan', 't20', '2021-11-22', 'Mirpur, Bangladesh', 'Pakistan', 1, 0, 0, 5, 20, 124, 6, 15, 127, 5),
('Pakistan', 't20', '2019-11-20', 'Mirpur, Bangladesh', 'Pakistan', 1, 0, 0, 8, 18.1, 108, 3, 20, 109, 11),
('Pakistan', 'test', '2024-08-30', 'Mirpur, Bangladesh', 'Bangladesh', 1, 0, 0, 6, 157.4, 447, 14, 146.0, 446, 14),
('Pakistan', 'test', '2024-08-21', 'Lord\'s, England', 'Bangladesh', 1, 0, 0, 10, 195, 595, 10, 154.0, 594, 14),
('Pakistan', 'test', '2023-12-04', 'Sydney Cricket Ground, AUS', 'Pakistan', 0, 1, 8, 0, 136.4, 497, 10, 110.0, 505, 14),
('Pakistan', 'test', '2022-11-26', 'Dhaka, Bangladesh', 'Pakistan', 1, 0, 0, 8, 174, 487, 14, 145, 489, 10),
('Pakistan', 'test', '2020-02-07', 'Eden Gardens, India', 'Pakistan', 0, 1, 44, 0, 157, 401, 14, 118, 445, 10),
('Pakistan', 'test', '2019-05-06', 'Gabba, Brisbane, AUS', 'Pakistan', 0, 1, 328, 0, 200, 424, 20, 166.0, 752, 16),
('Australia', 'odi', '2023-11-11', 'Mirpur, Bangladesh', 'Australia', 1, 0, 0, 8, 50.0, 306, 3, 44.4, 307, 6),
('Australia', 'odi', '2019-06-20', 'The Oval, England', 'Australia', 0, 1, 48, 0, 50.0, 333, 8, 50.0, 381, 5),
('Australia', 'odi', '2022-06-05', 'Sydney Cricket Ground', 'No result', 0, 0, 0, 0, 44.3, 182, 6, 16.0, 83, 1),
('Australia', 'odi', '2021-02-21', 'Gabba, Brisbane', 'Abandoned', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('Australia', 'odi', '2022-04-11', 'Shere Bangla Stadium', 'Australia', 0, 1, 66, 0, 50.0, 229, 6, 50.0, 295, 6),
('Australia', 'odi', '2023-04-07', 'Warner Park, St. Kitts', 'Bangladesh', 0, 1, 10, 0, 50.0, 259, 9, 50.0, 249, 7),
('Australia', 't20', '2021-06-24', 'Shere Bangla National Stadium', 'Australia', 0, 1, 28, 0, 20, 140, 8, 20, 168, 2),
('Australia', 't20', '2019-11-04', 'Sydney Cricket Ground', 'Australia', 1, 0, 0, 8, 5, 73, 3, 6.2, 78, 11),
('Australia', 't20', '2021-08-09', 'Shere Bangla National Stadium', 'Bangladesh', 0, 1, 60, 0, 20, 122, 11, 13.4, 62, 0),
('Australia', 't20', '2023-08-07', 'Melbourne Cricket Ground', 'Australia', 1, 0, 0, 3, 20, 104, 8, 19, 105, 7),
('Australia', 't20', '2022-08-06', 'Zahur Ahmed Chowdhury', 'Bangladesh', 0, 1, 10, 0, 20, 127, 9, 20, 117, 4);


INSERT INTO Matches (
    Opponent, Type, Date, Venue, Result, Wonbywicket, Wonbyrun, Winrun, Winwicket, 
    Score_BD_Over_Played, Score_BD_Run, Score_BD_wicket, 
    Score_Opp_Over_Played, Score_Opp_Run, Score_Opp_wicket
) VALUES
('Australia', 't20', '2024-08-04', 'Zahur Ahmed Chowdhury', 'Bangladesh', 1, 0, 0, 5, 18.4, 123, 5, 20, 121, 6),
('Australia', 'test', '2021-12-01', 'Shere Bangla Stadium', 'Bangladesh', 0, 1, 45, 0, 150.2, 730, 8, 143.5, 685, 10),
('Australia', 'test', '2022-03-15', 'Sydney Cricket Ground', 'Australia', 1, 0, 0, 5, 120.4, 420, 10, 105.3, 505, 8),
('Australia', 'test', '2022-07-18', 'Zahur Ahmed Chowdhury', 'Bangladesh', 0, 1, 30, 0, 143.2, 450, 7, 150.1, 420, 10),
('Australia', 'test', '2019-10-10', 'Melbourne Cricket Ground', 'Australia', 1, 0, 0, 8, 98.3, 350, 10, 130.5, 470, 6),
('Australia', 'test', '2023-02-25', 'Shere Bangla National Stadium', 'Bangladesh', 0, 1, 15, 0, 138.4, 560, 9, 140.2, 545, 10),
('Australia', 'test', '2023-08-05', 'Adelaide Oval', 'Australia', 0, 1, 60, 0, 110.2, 475, 10, 112.4, 535, 8),
('Sri Lanka', 'odi', '2024-03-18', 'Shere Bangla National Stadium', 'Bangladesh', 1, 0, 0, 4, 40.2, 237, 6, 50, 235, 7),
('Sri Lanka', 'odi', '2022-03-15', 'Premadasa Stadium', 'Sri Lanka', 1, 0, 0, 3, 50, 286, 8, 47.1, 287, 7),
('Sri Lanka', 'odi', '2023-11-06', 'Shere Bangla Stadium', 'Bangladesh', 1, 0, 0, 3, 41.1, 282, 11, 49.3, 279, 8),
('Sri Lanka', 'odi', '2019-03-13', 'Zahur Ahmed Chowdhury', 'Bangladesh', 1, 0, 0, 6, 44.4, 257, 11, 48.5, 255, 5),
('Sri Lanka', 'odi', '2023-09-29', 'Premadasa Stadium', 'Bangladesh', 1, 0, 0, 7, 42, 264, 11, 49.1, 263, 4),
('Sri Lanka', 'odi', '2022-09-09', 'Premadasa Stadium', 'Sri Lanka', 0, 1, 21, 0, 48.1, 236, 10, 50, 257, 11),
('Sri Lanka', 't20', '2024-06-08', 'Sher-e-Bangla National Stadium', 'Bangladesh', 1, 0, 0, 2, 20, 124, 9, 20, 121, 9),
('Sri Lanka', 't20', '2024-03-09', 'R. Premadasa Stadium', 'Sri Lanka', 0, 1, 28, 0, 20, 174, 7, 20, 202, 8),
('Sri Lanka', 't20', '2023-03-06', 'R. Premadasa Stadium', 'Bangladesh', 1, 0, 0, 2, 20, 165, 5, 20, 163, 9),
('Sri Lanka', 't20', '2019-03-04', 'R. Premadasa Stadium', 'Sri Lanka', 0, 1, 3, 0, 20, 200, 11, 18.1, 203, 8),
('Sri Lanka', 't20', '2020-09-01', 'Bangabandhu National Stadium', 'Sri Lanka', 0, 1, 0, 2, 20, 184, 9, 19.2, 185, 7),
('Sri Lanka', 't20', '2021-10-24', 'Zohur Ahmed Chowdhury Stadium', 'Sri Lanka', 0, 1, 5, 0, 20, 172, 11, 18.5, 177, 4),
('Sri Lanka', 'test', '2024-01-15', 'Mirpur, Bangladesh', 'Sri Lanka', 0, 1, 78, 0, 90, 400, 9, 150, 478, 3),
('Sri Lanka', 'test', '2023-01-19', 'Galle International Stadium', 'Bangladesh', 1, 0, 0, 3, 85, 300, 5, 125, 290, 11),
('Sri Lanka', 'test', '2022-01-25', 'Pallekele International Cricket Stadium', 'Sri Lanka', 0, 1, 45, 0, 105, 475, 7, 125, 520, 8),
('Sri Lanka', 'test', '2019-02-02', 'Zahur Ahmed Chowdhury Stadium', 'Bangladesh', 1, 0, 0, 4, 95, 450, 12, 180, 410, 3),
('Sri Lanka', 'test', '2021-02-08', 'Sinhalese Sports Club Ground', 'Bangladesh', 1, 0, 0, 5, 88, 350, 10, 160, 310, 6);


INSERT INTO FieldingCareer (PlayerID, MatchType, Opponent, LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES 
(14, 'Test', 'Sri Lanka', 'Home', 4, 8, 5, 0, 1, 0), 
(14, 'Test', 'Sri Lanka', 'Away', 3, 6, 4, 0, 0, 1), 
(14, 'Test', 'India', 'Home', 5, 10, 6, 0, 2, 0), 
(14, 'Test', 'India', 'Away', 4, 8, 5, 0, 1, 1), 
(14, 'Test', 'Australia', 'Neutral', 3, 6, 3, 0, 0, 0), 
(14, 'Test', 'Australia', 'Home', 3, 6, 4, 0, 1, 1), 
(14, 'Test', 'Pakistan', 'Home', 3, 6, 2, 0, 0, 0), 
(14, 'Test', 'Pakistan', 'Away', 2, 4, 3, 0, 0, 0), 
(14, 'Test', 'Zimbabwe', 'Away', 2, 4, 1, 0, 0, 0),
(14, 'Test', 'Zimbabwe', 'Home', 3, 6, 2, 0, 1, 0);

INSERT INTO FieldingCareer
(PlayerID, MatchType, Opponent, LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(23, 'ODI', 'Australia', 'Away', 11, 9, 6, 0, 2, 1),
(23, 'ODI', 'India', 'Home', 10, 8, 5, 0, 3, 0),
(23, 'ODI', 'Pakistan', 'Neutral', 9, 7, 4, 0, 2, 0),
(23, 'ODI', 'Zimbabwe', 'Away', 8, 7, 3, 0, 1, 0),
(23, 'ODI', 'Sri Lanka', 'Home', 10, 8, 7, 0, 2, 1);

INSERT INTO FieldingCareer
(PlayerID, MatchType, Opponent, LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(24, 'T20', 'Australia', 'Home', 7, 7, 5, 0, 2, 1),
(24, 'T20', 'India', 'Away', 6, 6, 4, 0, 1, 0),
(24, 'T20', 'Pakistan', 'Neutral', 5, 5, 3, 0, 2, 0),
(24, 'T20', 'Zimbabwe', 'Home', 4, 4, 2, 0, 1, 0),
(24, 'T20', 'Sri Lanka', 'Away', 6, 6, 5, 0, 2, 1);

INSERT INTO FieldingCareer
(PlayerID, MatchType, Opponent, LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(30, 'Test', 'Australia', 'Home', 10, 10, 6, 0, 2, 1),
(30, 'Test', 'India', 'Away', 9, 9, 5, 0, 1, 0),
(30, 'Test', 'Pakistan', 'Neutral', 8, 8, 4, 0, 2, 0),
(30, 'Test', 'Zimbabwe', 'Home', 6, 6, 3, 0, 1, 0),
(30, 'Test', 'Sri Lanka', 'Away', 7, 7, 4, 0, 2, 1);


INSERT INTO FieldingCareer
(PlayerID, MatchType, Opponent, LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(10, 'Test', 'Australia', 'Home', 9, 9, 5, 0, 2, 1),
(10, 'Test', 'Sri Lanka', 'Home', 9, 9, 6, 0, 1, 0),
(10, 'Test', 'India', 'Away', 8, 8, 4, 0, 1, 0),
(10, 'Test', 'Pakistan', 'Neutral', 8, 8, 4, 0, 2, 1),
(10, 'Test', 'Zimbabwe', 'Away', 7, 7, 3, 0, 1, 0),
(10, 'ODI', 'Australia', 'Away', 10, 8, 6, 0, 2, 1),
(10, 'ODI', 'Sri Lanka', 'Away', 11, 9, 7, 0, 1, 0),
(10, 'ODI', 'India', 'Home', 9, 8, 5, 0, 2, 1),
(10, 'ODI', 'Pakistan', 'Away', 9, 8, 5, 0, 1, 0),
(10, 'ODI', 'Zimbabwe', 'Home', 8, 7, 4, 0, 2, 1),
(10, 'T20', 'Australia', 'Neutral', 6, 6, 3, 0, 1, 0),
(10, 'T20', 'Sri Lanka', 'Neutral', 7, 6, 4, 0, 2, 1),
(10, 'T20', 'India', 'Away', 7, 7, 3, 0, 1, 0),
(10, 'T20', 'Pakistan', 'Home', 6, 6, 2, 0, 1, 0),
(10, 'T20', 'Zimbabwe', 'Neutral', 5, 5, 3, 0, 1, 0);

INSERT INTO FieldingCareer
(PlayerID, MatchType, Opponent, LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(15, 'Test', 'Sri Lanka', 'Home', 6, 10, 4, 0, 2, 1),
(15, 'ODI', 'Sri Lanka', 'Away', 8, 10, 6, 0, 3, 1),
(15, 'T20', 'Sri Lanka', 'Neutral', 5, 6, 3, 0, 2, 1),
(15, 'Test', 'Australia', 'Away', 5, 8, 3, 0, 2, 1),
(15, 'ODI', 'Australia', 'Home', 7, 9, 4, 0, 3, 2),
(15, 'T20', 'Australia', 'Away', 4, 5, 2, 0, 1, 1),
(15, 'Test', 'India', 'Home', 7, 11, 5, 0, 3, 1),
(15, 'ODI', 'India', 'Away', 6, 8, 5, 0, 2, 1),
(15, 'T20', 'India', 'Home', 5, 6, 3, 0, 2, 1),
(15, 'Test', 'Pakistan', 'Neutral', 4, 7, 3, 0, 2, 1),
(15, 'ODI', 'Pakistan', 'Neutral', 5, 6, 4, 0, 2, 1),
(15, 'T20', 'Pakistan', 'Home', 3, 4, 2, 0, 1, 0),
(15, 'Test', 'Zimbabwe', 'Away', 5, 9, 4, 0, 3, 2),
(15, 'ODI', 'Zimbabwe', 'Home', 6, 7, 4, 0, 2, 1),
(15, 'T20', 'Zimbabwe', 'Neutral', 3, 5, 2, 0, 1, 0);

INSERT INTO FieldingCareer
(PlayerID, MatchType, Opponent, LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(22, 'Test', 'Sri Lanka', 'Away', 8, 9, 4, 0, 2, 1),
(22, 'ODI', 'Sri Lanka', 'Home', 9, 7, 6, 0, 3, 1),
(22, 'T20', 'Sri Lanka', 'Neutral', 7, 6, 3, 0, 2, 1),
(22, 'Test', 'Australia', 'Home', 9, 11, 5, 0, 3, 1),
(22, 'ODI', 'Australia', 'Away', 10, 8, 6, 0, 4, 2),
(22, 'T20', 'Australia', 'Neutral', 6, 6, 3, 0, 2, 1),
(22, 'Test', 'India', 'Away', 8, 10, 5, 0, 3, 1),
(22, 'ODI', 'India', 'Home', 9, 8, 6, 0, 3, 1),
(22, 'T20', 'India', 'Away', 7, 7, 3, 0, 2, 1),
(22, 'Test', 'Pakistan', 'Away', 9, 11, 5, 0, 3, 1),
(22, 'ODI', 'Pakistan', 'Home', 10, 9, 6, 0, 3, 2),
(22, 'T20', 'Pakistan', 'Neutral', 6, 6, 3, 0, 2, 1),
(22, 'Test', 'Zimbabwe', 'Home', 8, 10, 5, 0, 3, 1),
(22, 'ODI', 'Zimbabwe', 'Away', 9, 8, 6, 0, 3, 1),
(22, 'T20', 'Zimbabwe', 'Neutral', 7, 6, 3, 0, 2, 1);

INSERT INTO FieldingCareer
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(29, 'Sri Lanka', 'Test', 'Away', 7, 9, 5, 0, 2, 1),
(29, 'Sri Lanka', 'ODI', 'Home', 8, 7, 4, 0, 2, 1),
(29, 'Sri Lanka', 'T20', 'Neutral', 5, 5, 3, 0, 1, 0),
(29, 'Pakistan', 'Test', 'Neutral', 7, 8, 6, 0, 2, 1),
(29, 'Pakistan', 'ODI', 'Away', 8, 7, 5, 0, 2, 1),
(29, 'Pakistan', 'T20', 'Home', 6, 6, 4, 0, 1, 0),
(29, 'Zimbabwe', 'Test', 'Away', 6, 7, 5, 0, 2, 1),
(29, 'Zimbabwe', 'ODI', 'Home', 7, 6, 4, 0, 2, 1),
(29, 'Zimbabwe', 'T20', 'Neutral', 4, 4, 3, 0, 1, 0),
(29, 'India', 'Test', 'Away', 7, 8, 6, 0, 2, 1),
(29, 'India', 'ODI', 'Home', 8, 7, 5, 0, 2, 1),
(29, 'India', 'T20', 'Neutral', 6, 6, 4, 0, 1, 0),
(29, 'Australia', 'Test', 'Neutral', 6, 7, 6, 0, 2, 1),
(29, 'Australia', 'ODI', 'Away', 7, 6, 5, 0, 2, 1),
(29, 'Australia', 'T20', 'Home', 5, 5, 4, 0, 1, 0);

INSERT INTO FieldingCareer
(PlayerID, Opponent, MatchType,  LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(36, 'Sri Lanka', 'Test', 'Away', 8, 10, 6, 0, 2, 1),
(36, 'Sri Lanka', 'ODI', 'Home', 9, 7, 5, 0, 2, 1),
(36, 'Sri Lanka', 'T20', 'Neutral', 5, 5, 4, 0, 1, 1),
(36, 'India', 'Test', 'Home', 9, 11, 7, 0, 3, 1),
(36, 'India', 'ODI', 'Away', 10, 8, 6, 0, 3, 2),
(36, 'India', 'T20', 'Neutral', 5, 5, 4, 0, 1, 1),
(36, 'Australia', 'Test', 'Home', 8, 9, 6, 0, 2, 1),
(36, 'Australia', 'ODI', 'Away', 9, 8, 5, 0, 2, 1),
(36, 'Australia', 'T20', 'Neutral', 6, 6, 4, 0, 2, 1),
(36, 'Pakistan', 'Test', 'Neutral', 8, 10, 7, 0, 3, 2),
(36, 'Pakistan', 'ODI', 'Home', 9, 8, 6, 0, 3, 2),
(36, 'Pakistan', 'T20', 'Away', 5, 5, 5, 0, 2, 1),
(36, 'Zimbabwe', 'Test', 'Away', 7, 8, 6, 0, 2, 1),
(36, 'Zimbabwe', 'ODI', 'Home', 8, 7, 5, 0, 3, 2),
(36, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 4, 0, 1, 1);

INSERT INTO FieldingCareer
(PlayerID, MatchType, Opponent, LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(38, 'Test', 'Sri Lanka', 'Home', 9, 9, 3, 0, 1, 0),
(38, 'Test', 'Pakistan', 'Away', 8, 9, 2, 0, 1, 0),
(38, 'Test', 'Zimbabwe', 'Home', 7, 8, 2, 0, 1, 0),
(38, 'Test', 'India', 'Away', 8, 10, 4, 0, 1, 0),
(38, 'Test', 'Australia', 'Home', 9, 11, 3, 0, 1, 0),
(38, 'ODI', 'Sri Lanka', 'Away', 11, 9, 4, 0, 2, 0),
(38, 'ODI', 'Pakistan', 'Home', 10, 8, 3, 0, 1, 0),
(38, 'ODI', 'Zimbabwe', 'Away', 9, 7, 2, 0, 1, 0),
(38, 'ODI', 'India', 'Home', 10, 9, 4, 0, 2, 0),
(38, 'ODI', 'Australia', 'Away', 10, 8, 4, 0, 1, 0),
(38, 'T20', 'Sri Lanka', 'Neutral', 7, 6, 2, 0, 1, 0),
(38, 'T20', 'Pakistan', 'Neutral', 6, 6, 1, 0, 1, 0),
(38, 'T20', 'Zimbabwe', 'Neutral', 5, 5, 1, 0, 0, 0),
(38, 'T20', 'India', 'Neutral', 6, 6, 2, 0, 1, 0),
(38, 'T20', 'Australia', 'Neutral', 7, 6, 1, 0, 0, 0);

INSERT INTO FieldingCareer
(PlayerID, MatchType, Opponent, LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(40, 'Test', 'Sri Lanka', 'Away', 9, 12, 2, 0, 1, 0),
(40, 'Test', 'Pakistan', 'Away', 9, 12, 1, 0, 1, 0),
(40, 'Test', 'India', 'Away', 7, 9, 2, 0, 1, 0),
(40, 'Test', 'Zimbabwe', 'Home', 8, 10, 2, 0, 1, 0),
(40, 'Test', 'Australia', 'Home', 9, 10, 2, 0, 1, 0),
(40, 'ODI', 'Sri Lanka', 'Home', 11, 9, 2, 0, 1, 0),
(40, 'ODI', 'Pakistan', 'Home', 11, 9, 1, 0, 1, 0),
(40, 'ODI', 'India', 'Home', 8, 7, 2, 0, 0, 0),
(40, 'ODI', 'Zimbabwe', 'Away', 9, 7, 2, 0, 0, 0),
(40, 'ODI', 'Australia', 'Away', 11, 9, 2, 0, 1, 0),
(40, 'T20', 'Sri Lanka', 'Neutral', 6, 6, 1, 0, 0, 0),
(40, 'T20', 'Pakistan', 'Away', 7, 7, 1, 0, 0, 0),
(40, 'T20', 'India', 'Away', 5, 5, 1, 0, 0, 0),
(40, 'T20', 'Zimbabwe', 'Neutral', 5, 5, 1, 0, 0, 0),
(40, 'T20', 'Australia', 'Neutral', 6, 6, 1, 0, 0, 0);

INSERT INTO FieldingCareer
(PlayerID, MatchType, Opponent, LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(18, 'Test', 'Sri Lanka', 'Home', 10, 18, 85, 15, 2, 4),
(18, 'Test', 'Pakistan', 'Away', 9, 15, 78, 18, 2, 3),
(18, 'Test', 'Zimbabwe', 'Home', 8, 14, 80, 15, 1, 4),
(18, 'Test', 'India', 'Away', 10, 16, 85, 17, 2, 4),
(18, 'Test', 'Australia', 'Home', 11, 17, 90, 19, 2, 3),
(18, 'ODI', 'Sri Lanka', 'Away', 12, 12, 68, 18, 1, 3),
(18, 'ODI', 'Pakistan', 'Home', 10, 10, 65, 16, 1, 2),
(18, 'ODI', 'Zimbabwe', 'Away', 9, 9, 60, 14, 1, 2),
(18, 'ODI', 'India', 'Home', 12, 12, 72, 18, 1, 3),
(18, 'ODI', 'Australia', 'Away', 13, 13, 75, 20, 0, 2),
(18, 'T20', 'Sri Lanka', 'Neutral', 8, 8, 40, 20, 0, 2),
(18, 'T20', 'Pakistan', 'Neutral', 7, 7, 40, 18, 0, 2),
(18, 'T20', 'Zimbabwe', 'Neutral', 6, 6, 35, 15, 0, 1),
(18, 'T20', 'India', 'Neutral', 8, 8, 42, 20, 0, 2),
(18, 'T20', 'Australia', 'Neutral', 9, 9, 45, 22, 0, 2);

INSERT INTO FieldingCareer
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(21, 'Sri Lanka', 'Test', 'Home', 10, 8, 2, 4, 0, 0),
(21, 'Sri Lanka', 'ODI', 'Away', 12, 10, 3, 5,0, 0),
(21, 'Sri Lanka', 'T20', 'Neutral', 8, 7, 1, 2,0, 0),
(21, 'Pakistan', 'Test', 'Away', 9, 7, 2, 3,0, 0),
(21, 'Pakistan', 'ODI', 'Home', 10, 9, 3, 4,0, 0),
(21, 'Pakistan', 'T20', 'Neutral', 7, 6, 1, 2,0, 0),
(21, 'Zimbabwe', 'Test', 'Home', 8, 6, 2, 3,0, 0),
(21, 'Zimbabwe', 'ODI', 'Away', 9, 8, 2, 3,0, 0),
(21, 'Zimbabwe', 'T20', 'Neutral', 5, 4, 1, 1,0, 0),
(21, 'India', 'Test', 'Away', 10, 9, 3, 4,0, 0),
(21, 'India', 'ODI', 'Home', 12, 11, 2, 3,0, 0),
(21, 'India', 'T20', 'Neutral', 8, 7, 1, 2,0, 0),
(21, 'Australia', 'Test', 'Home', 11, 10, 3, 4,0, 0),
(21, 'Australia', 'ODI', 'Away', 13, 12, 3, 4,0, 0),
(21, 'Australia', 'T20', 'Neutral', 9, 8, 1, 2,0, 0);

INSERT INTO FieldingCareer
(PlayerID, MatchType, Opponent, LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(33, 'Test', 'Sri Lanka', 'Home', 11, 11, 40, 3, 0, 0),
(33, 'ODI', 'Sri Lanka', 'Away', 14, 14, 50, 5, 0, 0),
(33, 'T20', 'Sri Lanka', 'Neutral', 9, 9, 30, 2, 0, 0),
(33, 'Test', 'Pakistan', 'Away', 10, 10, 35, 4, 0, 0),
(33, 'ODI', 'Pakistan', 'Home', 12, 12, 45, 4, 0, 0),
(33, 'T20', 'Pakistan', 'Neutral', 8, 8, 20, 1, 0, 0),
(33, 'Test', 'Zimbabwe', 'Home', 9, 9, 30, 3, 0, 0),
(33, 'ODI', 'Zimbabwe', 'Away', 10, 10, 25, 2, 0, 0),
(33, 'T20', 'Zimbabwe', 'Neutral', 7, 7, 15, 1, 0, 0),
(33, 'Test', 'Australia', 'Away', 10, 10, 35, 4, 0, 0),
(33, 'ODI', 'Australia', 'Home', 13, 13, 40, 3, 0, 0),
(33, 'T20', 'Australia', 'Neutral', 8, 8, 20, 2, 0, 0),
(33, 'Test', 'India', 'Home', 10, 10, 30, 4, 0, 0),
(33, 'ODI', 'India', 'Away', 12, 12, 40, 5, 0, 0),
(33, 'T20', 'India', 'Neutral', 8, 8, 25, 3, 0, 0);


INSERT INTO BattingCareerAgainst
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts) VALUES
(23, 'Australia', 'ODI', 'Away', 11, 9, 95, 230, 28, 10.56, 41.30, 0, 0, 10, 2, 3, 2),
(23, 'India', 'ODI', 'Home', 10, 8, 85, 210, 26, 10.00, 40.48, 0, 0, 9, 2, 3, 2),
(23, 'Pakistan', 'ODI', 'Neutral', 9, 7, 90, 220, 25, 10.00, 40.91, 0, 0, 10, 2, 3, 2),
(23, 'Zimbabwe', 'ODI', 'Away', 8, 7, 80, 200, 23, 9.71, 40.00, 0, 0, 9, 1, 3, 2),
(23, 'Sri Lanka', 'ODI', 'Home', 10, 8, 100, 230, 28, 11.11, 43.48, 0, 0, 11, 3, 2, 1),
(14, 'Australia', 'Test', 'Home', 5, 6, 60, 180, 20, 10.00, 33.33, 0, 0, 6, 1, 2, 1),
(14, 'India', 'Test', 'Away', 4, 5, 50, 150, 15, 10.00, 33.33, 0, 0, 5, 1, 2, 1),
(14, 'Pakistan', 'Test', 'Neutral', 3, 4, 40, 120, 12, 10.00, 33.33, 0, 0, 4, 0, 1, 0),
(14, 'Zimbabwe', 'Test', 'Home', 2, 3, 30, 90, 10, 10.00, 33.33, 0, 0, 3, 0, 1, 0),
(14, 'Sri Lanka', 'Test', 'Away', 3, 4, 20, 60, 8, 5.00, 33.33, 0, 0, 2, 0, 2, 0),
(24, 'Australia', 'T20', 'Home', 7, 7, 85, 120, 24, 12.14, 70.83, 0, 0, 9, 3, 2, 1),
(24, 'India', 'T20', 'Away', 6, 6, 75, 110, 22, 11.67, 68.18, 0, 0, 8, 2, 2, 1),
(24, 'Pakistan', 'T20', 'Neutral', 5, 5, 80, 115, 21, 12.50, 69.57, 0, 0, 9, 3, 2, 1),
(24, 'Zimbabwe', 'T20', 'Home', 4, 4, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(24, 'Sri Lanka', 'T20', 'Away', 6, 6, 90, 130, 25, 12.50, 69.23, 0, 0, 10, 3, 2, 1),
(30, 'Australia', 'Test', 'Home', 10, 12, 130, 380, 36, 10.83, 34.21, 0, 0, 14, 3, 4, 3),
(30, 'India', 'Test', 'Away', 9, 11, 120, 370, 32, 10.91, 32.43, 0, 0, 13, 2, 3, 2),
(30, 'Pakistan', 'Test', 'Neutral', 8, 10, 110, 350, 30, 11.00, 31.43, 0, 0, 12, 3, 3, 2),
(30, 'Zimbabwe', 'Test', 'Home', 6, 8, 100, 320, 28, 10.71, 31.25, 0, 0, 11, 2, 2, 2),
(30, 'Sri Lanka', 'Test', 'Away', 7, 9, 115, 340, 29, 11.50, 32.35, 0, 0, 12, 3, 2, 2),
(33, 'Sri Lanka', 'Test', 'Home', 11, 19, 900, 1800, 150, 32.14, 50.00, 2, 5, 100, 20, 1, 4),
(33, 'Sri Lanka', 'ODI', 'Away', 14, 14, 700, 800, 110, 35.00, 87.50, 1, 4, 75, 22, 1, 3),
(33, 'Sri Lanka', 'T20', 'Neutral', 9, 9, 420, 280, 85, 42.00, 150.00, 0, 3, 45, 25, 0, 3),
(33, 'Pakistan', 'Test', 'Away', 10, 16, 850, 1700, 140, 31.48, 50.00, 1, 4, 100, 18, 1, 3),
(33, 'Pakistan', 'ODI', 'Home', 12, 12, 620, 700, 100, 34.44, 88.57, 1, 3, 78, 19, 0, 3),
(33, 'Pakistan', 'T20', 'Neutral', 8, 8, 400, 280, 80, 40.00, 142.86, 0, 2, 45, 21, 0, 2),
(33, 'Zimbabwe', 'Test', 'Home', 9, 14, 820, 1600, 135, 32.80, 51.25, 1, 3, 95, 17, 1, 4),
(33, 'Zimbabwe', 'ODI', 'Away', 10, 10, 580, 640, 98, 32.22, 90.63, 1, 3, 72, 18, 0, 2),
(33, 'Zimbabwe', 'T20', 'Neutral', 7, 7, 360, 240, 75, 38.89, 150.00, 0, 2, 40, 19, 0, 2),
(33, 'Australia', 'Test', 'Away', 10, 16, 950, 1800, 155, 35.00, 52.78, 2, 5, 110, 25, 1, 5),
(33, 'Australia', 'ODI', 'Home', 13, 13, 750, 850, 120, 38.46, 88.24, 1, 4, 85, 20, 0, 2),
(33, 'Australia', 'T20', 'Neutral', 8, 8, 500, 320, 90, 62.50, 156.25, 0, 4, 55, 30, 0, 3),
(33, 'Zimbabwe', 'Test', 'Away', 8, 12, 780, 1600, 130, 34.00, 48.75, 1, 4, 90, 15, 0, 2),
(33, 'Zimbabwe', 'ODI', 'Home', 11, 11, 600, 720, 105, 36.36, 83.33, 1, 4, 70, 19, 0, 1),
(10, 'Australia', 'Test', 'Home', 9, 11, 125, 400, 30, 11.36, 31.25, 0, 0, 13, 3, 3, 2),
(10, 'Australia', 'ODI', 'Away', 10, 8, 110, 250, 28, 13.33, 44.00, 0, 0, 12, 4, 3, 2),
(10, 'Australia', 'T20', 'Neutral', 6, 6, 80, 115, 21, 13.33, 69.57, 0, 0, 9, 2, 1, 1),
(10, 'Sri Lanka', 'Test', 'Home', 9, 10, 125, 400, 35, 13.89, 31.25, 0, 1, 14, 2, 3, 2),
(10, 'Sri Lanka', 'ODI', 'Away', 11, 9, 110, 250, 30, 12.22, 44.00, 0, 0, 12, 3, 2, 1),
(10, 'Sri Lanka', 'T20', 'Neutral', 7, 6, 80, 120, 20, 13.33, 66.67, 0, 0, 9, 3, 2, 1),
(10, 'India', 'Test', 'Away', 8, 10, 115, 370, 32, 11.50, 31.08, 0, 0, 12, 3, 2, 2),
(10, 'India', 'ODI', 'Home', 9, 8, 105, 240, 28, 11.67, 43.75, 0, 0, 11, 3, 2, 2),
(10, 'India', 'T20', 'Away', 7, 7, 85, 130, 22, 12.14, 65.38, 0, 0, 9, 3, 1, 1),
(10, 'Pakistan', 'Test', 'Neutral', 8, 9, 130, 390, 35, 12.50, 33.33, 0, 0, 13, 3, 3, 2),
(10, 'Pakistan', 'ODI', 'Away', 9, 8, 100, 230, 27, 11.11, 43.48, 0, 0, 11, 3, 2, 2),
(10, 'Pakistan', 'T20', 'Home', 6, 6, 75, 110, 21, 12.50, 68.18, 0, 0, 8, 2, 1, 1),
(10, 'Zimbabwe', 'Test', 'Away', 7, 8, 120, 350, 33, 12.00, 34.29, 0, 0, 12, 3, 2, 2),
(10, 'Zimbabwe', 'ODI', 'Home', 8, 7, 95, 220, 26, 10.56, 43.18, 0, 0, 10, 2, 3, 2),
(10, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(15, 'Sri Lanka', 'Test', 'Home', 9, 10, 130, 380, 32, 12.00, 34.21, 0, 1, 13, 2, 3, 2),
(15, 'Sri Lanka', 'ODI', 'Away', 10, 8, 105, 240, 28, 11.67, 43.75, 0, 0, 11, 3, 2, 1),
(15, 'Sri Lanka', 'T20', 'Neutral', 6, 6, 70, 100, 18, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(15, 'Australia', 'Test', 'Home', 8, 9, 110, 370, 30, 12.22, 29.73, 0, 0, 12, 3, 3, 2), 
(15, 'Australia', 'ODI', 'Away', 9, 8, 100, 240, 28, 11.11, 41.67, 0, 0, 11, 3, 2, 2), 
(15, 'Australia', 'T20', 'Neutral', 6, 6, 80, 115, 21, 13.33, 69.57, 0, 0, 9, 2, 1, 1), 
(15, 'India', 'Test', 'Away', 7, 9, 105, 350, 28, 11.67, 30.00, 0, 0, 12, 2, 3, 2), 
(15, 'India', 'ODI', 'Home', 8, 7, 95, 220, 26, 10.56, 43.18, 0, 0, 10, 2, 3, 2), 
(15, 'India', 'T20', 'Away', 5, 5, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1), 
(15, 'Pakistan', 'Test', 'Neutral', 6, 8, 110, 360, 31, 12.50, 30.56, 0, 0, 11, 3, 2, 2), 
(15, 'Pakistan', 'ODI', 'Away', 7, 7, 90, 210, 25, 10.00, 42.86, 0, 0, 10, 2, 3, 2), 
(15, 'Pakistan', 'T20', 'Home', 4, 4, 55, 85, 16, 10.00, 64.71, 0, 0, 6, 2, 1, 1), 
(15, 'Zimbabwe', 'Test', 'Away', 5, 7, 100, 330, 29, 11.43, 30.30, 0, 0, 10, 3, 2, 2), 
(15, 'Zimbabwe', 'ODI', 'Home', 6, 6, 85, 200, 24, 10.63, 42.50, 0, 0, 9, 2, 3, 2), 
(15, 'Zimbabwe', 'T20', 'Neutral', 3, 3, 50, 75, 15, 10.00, 66.67, 0, 0, 5, 1, 1, 1),
(22, 'Sri Lanka', 'Test', 'Away', 8, 9, 115, 350, 30, 11.50, 32.86, 0, 0, 12, 3, 3, 2),
(22, 'Sri Lanka', 'ODI', 'Home', 9, 7, 100, 230, 28, 12.50, 43.48, 0, 0, 11, 3, 2, 1),
(22, 'Sri Lanka', 'T20', 'Neutral', 7, 6, 85, 120, 22, 14.17, 70.83, 0, 0, 9, 3, 2, 1),
(22, 'Australia', 'Test', 'Home', 9, 11, 140, 420, 38, 12.73, 33.33, 0, 0, 15, 4, 2, 2),
(22, 'Australia', 'ODI', 'Away', 10, 8, 125, 275, 35, 13.89, 45.45, 0, 0, 13, 5, 3, 2),
(22, 'Australia', 'T20', 'Neutral', 6, 6, 90, 130, 22, 13.50, 69.23, 0, 0, 10, 3, 2, 1),
(22, 'India', 'Test', 'Away', 8, 10, 135, 400, 37, 13.50, 33.75, 0, 0, 14, 3, 2, 2),
(22, 'India', 'ODI', 'Home', 9, 8, 115, 260, 30, 12.78, 44.23, 0, 0, 12, 4, 2, 2),
(22, 'India', 'T20', 'Away', 7, 7, 85, 125, 21, 12.14, 68.00, 0, 0, 9, 2, 2, 1),
(22, 'Pakistan', 'Test', 'Away', 9, 11, 145, 410, 39, 13.18, 35.37, 0, 0, 16, 4, 3, 2), 
(22, 'Pakistan', 'ODI', 'Home', 10, 9, 120, 270, 32, 12.00, 44.44, 0, 0, 13, 4, 3, 2), 
(22, 'Pakistan', 'T20', 'Neutral', 6, 6, 88, 130, 23, 14.67, 67.69, 0, 0, 10, 3, 2, 1),
(22, 'Zimbabwe', 'Test', 'Home', 8, 10, 138, 390, 36, 13.80, 35.38, 0, 0, 15, 4, 2, 2), 
(22, 'Zimbabwe', 'ODI', 'Away', 9, 8, 110, 250, 29, 12.22, 44.00, 0, 0, 12, 3, 2, 2), 
(22, 'Zimbabwe', 'T20', 'Neutral', 7, 6, 80, 115, 20, 13.33, 69.57, 0, 0, 8, 3, 2, 1),
(29, 'Sri Lanka', 'Test', 'Away', 8, 10, 110, 350, 30, 11.00, 31.43, 0, 0, 12, 3, 3, 2),
(29, 'Sri Lanka', 'ODI', 'Home', 9, 7, 95, 220, 27, 11.88, 43.18, 0, 0, 10, 3, 2, 1),
(29, 'Sri Lanka', 'T20', 'Neutral', 5, 5, 60, 90, 17, 10.00, 66.67, 0, 0, 6, 2, 1, 1),
(29, 'Pakistan', 'Test', 'Neutral', 8, 9, 130, 390, 35, 12.50, 33.33, 0, 0, 13, 3, 3, 2),
(29, 'Pakistan', 'ODI', 'Away', 9, 8, 100, 230, 27, 11.11, 43.48, 0, 0, 11, 3, 2, 2),
(29, 'Pakistan', 'T20', 'Home', 6, 6, 75, 110, 21, 12.50, 68.18, 0, 0, 8, 2, 1, 1),
(29, 'Zimbabwe', 'Test', 'Away', 7, 8, 120, 350, 33, 12.00, 34.29, 0, 0, 12, 3, 2, 2),
(29, 'Zimbabwe', 'ODI', 'Home', 8, 7, 95, 220, 26, 10.56, 43.18, 0, 0, 10, 2, 3, 2),
(29, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(29, 'India', 'Test', 'Away', 8, 9, 125, 370, 34, 11.36, 33.78, 0, 0, 14, 3, 3, 2), 
(29, 'India', 'ODI', 'Home', 9, 8, 105, 240, 29, 11.67, 43.75, 0, 0, 11, 3, 2, 2), 
(29, 'India', 'T20', 'Neutral', 6, 6, 80, 110, 22, 13.33, 72.73, 0, 0, 9, 3, 2, 1), 
(29, 'Australia', 'Test', 'Neutral', 7, 8, 115, 340, 31, 11.50, 33.82, 0, 0, 13, 3, 3, 2), 
(29, 'Australia', 'ODI', 'Away', 8, 7, 98, 225, 28, 10.89, 43.56, 0, 0, 10, 3, 2, 2), 
(29, 'Australia', 'T20', 'Home', 5, 5, 72, 105, 20, 12.00, 68.57, 0, 0, 8, 2, 2, 1),
(36, 'Sri Lanka', 'Test', 'Away', 8, 10, 110, 350, 30, 11.00, 31.43, 0, 0, 12, 3, 3, 2),
(36, 'Sri Lanka', 'ODI', 'Home', 9, 7, 95, 220, 27, 11.88, 43.18, 0, 0, 10, 3, 2, 1),
(36, 'Sri Lanka', 'T20', 'Neutral', 5, 5, 60, 90, 17, 10.00, 66.67, 0, 0, 6, 2, 1, 1),
(36, 'India', 'Test', 'Home', 9, 11, 130, 380, 36, 11.82, 34.21, 0, 1, 14, 3, 4, 3),
(36, 'India', 'ODI', 'Away', 10, 8, 120, 250, 28, 13.33, 48.00, 0, 0, 13, 4, 3, 2),
(36, 'India', 'T20', 'Neutral', 5, 5, 60, 90, 17, 10.00, 66.67, 0, 0, 6, 2, 1, 1),
(36, 'Australia', 'Test', 'Home', 8, 9, 110, 370, 30, 12.22, 29.73, 0, 0, 12, 3, 3, 2),
(36, 'Australia', 'ODI', 'Away', 9, 8, 100, 240, 28, 11.11, 41.67, 0, 0, 11, 3, 2, 2),
(36, 'Australia', 'T20', 'Neutral', 6, 6, 80, 115, 21, 13.33, 69.57, 0, 0, 9, 2, 1, 1),
(36, 'Pakistan', 'Test', 'Neutral', 8, 10, 125, 400, 34, 12.50, 31.25, 0, 0, 14, 4, 3, 2), 
(36, 'Pakistan', 'ODI', 'Home', 9, 8, 110, 250, 29, 13.75, 44.00, 0, 0, 12, 4, 3, 2), 
(36, 'Pakistan', 'T20', 'Away', 5, 5, 70, 100, 18, 14.00, 70.00, 0, 0, 8, 2, 2, 1), 
(36, 'Zimbabwe', 'Test', 'Away', 7, 8, 115, 360, 32, 12.88, 31.94, 0, 0, 13, 3, 2, 2), 
(36, 'Zimbabwe', 'ODI', 'Home', 8, 7, 90, 220, 25, 12.50, 40.91, 0, 0, 9, 3, 3, 2), 
(36, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 65, 95, 20, 13.00, 68.42, 0, 0, 7, 2, 1, 1),
(38, 'Sri Lanka', 'Test', 'Home', 9, 10, 125, 400, 35, 13.89, 31.25, 0, 1, 14, 2, 3, 2),
(38, 'Sri Lanka', 'ODI', 'Away', 11, 9, 110, 250, 30, 12.22, 44.00, 0, 0, 12, 3, 2, 1),
(38, 'Sri Lanka', 'T20', 'Neutral', 7, 6, 80, 120, 20, 13.33, 66.67, 0, 0, 9, 3, 2, 1),
(38, 'Pakistan', 'Test', 'Away', 8, 9, 120, 380, 34, 13.33, 31.58, 0, 0, 13, 3, 2, 2),
(38, 'Pakistan', 'ODI', 'Home', 10, 8, 115, 260, 29, 14.38, 44.23, 0, 0, 12, 4, 2, 2),
(38, 'Pakistan', 'T20', 'Neutral', 6, 6, 75, 110, 22, 12.50, 68.18, 0, 0, 8, 2, 2, 1),
(38, 'Zimbabwe', 'Test', 'Home', 7, 8, 130, 360, 36, 12.86, 36.11, 0, 0, 14, 3, 2, 2),
(38, 'Zimbabwe', 'ODI', 'Away', 9, 7, 100, 230, 27, 14.29, 43.48, 0, 0, 10, 3, 2, 1),
(38, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 70, 100, 19, 14.00, 70.00, 0, 0, 7, 2, 1, 1),
(38, 'India', 'Test', 'Away', 8, 10, 135, 410, 38, 13.50, 32.92, 0, 1, 15, 3, 3, 3),
(38, 'India', 'ODI', 'Home', 10, 9, 120, 280, 34, 13.33, 42.86, 0, 0, 11, 3, 3, 2),
(38, 'India', 'T20', 'Neutral', 6, 6, 85, 125, 24, 14.17, 68.00, 0, 0, 10, 2, 2, 1),
(38, 'Australia', 'Test', 'Home', 9, 11, 140, 450, 39, 12.73, 31.11, 0, 0, 16, 4, 3, 2),
(38, 'Australia', 'ODI', 'Away', 10, 8, 115, 260, 30, 12.88, 44.23, 0, 0, 12, 4, 2, 2),
(38, 'Australia', 'T20', 'Neutral', 7, 6, 90, 130, 23, 15.00, 69.23, 0, 0, 10, 3, 2, 1),
(40, 'Sri Lanka', 'Test', 'Away', 9, 12, 120, 370, 32, 10.91, 32.43, 0, 0, 13, 2, 3, 2),
(40, 'Sri Lanka', 'ODI', 'Home', 11, 9, 105, 240, 28, 11.67, 43.75, 0, 0, 11, 3, 2, 2),
(40, 'Sri Lanka', 'T20', 'Neutral', 6, 6, 75, 110, 22, 12.50, 68.18, 0, 0, 8, 3, 2, 1),
(40, 'Pakistan', 'Test', 'Away', 9, 12, 120, 370, 32, 10.91, 32.43, 0, 0, 13, 2, 3, 2),
(40, 'Pakistan', 'ODI', 'Home', 11, 9, 105, 240, 28, 11.67, 43.75, 0, 0, 11, 3, 2, 2),
(40, 'Pakistan', 'T20', 'Away', 7, 7, 90, 130, 25, 12.50, 69.23, 0, 0, 10, 3, 2, 1),
(40, 'India', 'Test', 'Away', 7, 9, 105, 350, 28, 11.67, 30.00, 0, 0, 12, 2, 3, 2),
(40, 'India', 'ODI', 'Home', 8, 7, 95, 220, 26, 10.56, 43.18, 0, 0, 10, 2, 3, 2),
(40, 'India', 'T20', 'Away', 5, 5, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(40, 'Zimbabwe', 'Test', 'Home', 8, 10, 110, 340, 31, 11.00, 32.35, 0, 0, 12, 3, 2, 2),
(40, 'Zimbabwe', 'ODI', 'Away', 9, 7, 100, 240, 28, 14.29, 41.67, 0, 0, 10, 3, 2, 2),
(40, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 75, 100, 20, 15.00, 75.00, 0, 0, 8, 2, 1, 1),
(40, 'Australia', 'Test', 'Home', 9, 10, 125, 380, 35, 12.50, 32.89, 0, 0, 14, 3, 3, 2),
(40, 'Australia', 'ODI', 'Away', 11, 9, 100, 230, 28, 11.11, 43.48, 0, 0, 11, 3, 2, 2),
(40, 'Australia', 'T20', 'Neutral', 6, 6, 80, 120, 22, 13.33, 66.67, 0, 0, 9, 3, 2, 1),
(18, 'Sri Lanka', 'Test', 'Home', 10, 18, 740, 1400, 120, 29.60, 52.86, 1, 4, 85, 15, 2, 4),
(18, 'Sri Lanka', 'ODI', 'Away', 12, 12, 580, 650, 100, 32.22, 89.23, 1, 3, 68, 18, 1, 3),
(18, 'Sri Lanka', 'T20', 'Neutral', 8, 8, 360, 230, 75, 40.00, 156.52, 0, 2, 40, 20, 0, 2),
(18, 'Pakistan', 'Test', 'Away', 9, 15, 680, 1300, 115, 28.33, 52.31, 1, 3, 78, 18, 2, 3),
(18, 'Pakistan', 'ODI', 'Home', 10, 10, 510, 570, 90, 34.00, 89.47, 0, 3, 65, 16, 1, 2),
(18, 'Pakistan', 'T20', 'Neutral', 7, 7, 350, 250, 70, 38.89, 140.00, 0, 2, 40, 18, 0, 2),
(18, 'Zimbabwe', 'Test', 'Home', 8, 14, 720, 1250, 125, 30.00, 57.60, 1, 4, 80, 15, 1, 4),
(18, 'Zimbabwe', 'ODI', 'Away', 9, 9, 490, 550, 85, 32.67, 89.09, 1, 2, 60, 14, 1, 2),
(18, 'Zimbabwe', 'T20', 'Neutral', 6, 6, 310, 220, 60, 35.00, 140.91, 0, 1, 35, 15, 0, 1),
(18, 'India', 'Test', 'Away', 10, 16, 750, 1400, 130, 31.25, 53.57, 1, 3, 85, 17, 2, 4),
(18, 'India', 'ODI', 'Home', 12, 12, 570, 640, 95, 31.67, 89.06, 0, 3, 72, 18, 1, 3),
(18, 'India', 'T20', 'Neutral', 8, 8, 400, 280, 80, 40.00, 142.86, 0, 2, 42, 20, 0, 2),
(18, 'Australia', 'Test', 'Home', 11, 17, 780, 1450, 140, 30.00, 53.79, 1, 3, 90, 19, 2, 3),
(18, 'Australia', 'ODI', 'Away', 13, 13, 600, 670, 100, 33.33, 89.55, 1, 3, 75, 20, 0, 2),
(18, 'Australia', 'T20', 'Neutral', 9, 9, 420, 300, 85, 42.00, 140.00, 0, 2, 45, 22, 0, 2),
(21, 'Pakistan', 'Test', 'Away', 11, 18, 1050, 2100, 170, 36.21, 50.00, 2, 4, 115, 22, 1, 4),
(21, 'Pakistan', 'ODI', 'Home', 14, 14, 700, 780, 125, 35.00, 89.74, 1, 3, 85, 20, 1, 3),
(21, 'Pakistan', 'T20', 'Neutral', 9, 9, 480, 340, 90, 40.00, 141.18, 0, 2, 50, 22, 0, 2),
(21, 'Zimbabwe', 'Test', 'Home', 10, 16, 1020, 1950, 155, 34.00, 52.31, 2, 4, 110, 20, 1, 4),
(21, 'Zimbabwe', 'ODI', 'Away', 12, 12, 650, 720, 110, 32.50, 90.28, 1, 3, 80, 18, 1, 2),
(21, 'Zimbabwe', 'T20', 'Neutral', 8, 8, 460, 330, 85, 38.33, 139.39, 0, 2, 48, 20, 0, 1),
(21, 'India', 'Test', 'Away', 13, 20, 1120, 2200, 185, 37.33, 50.91, 3, 5, 120, 25, 1, 4),
(21, 'India', 'ODI', 'Home', 16, 16, 750, 860, 135, 35.71, 87.21, 1, 4, 95, 22, 0, 3),
(21, 'India', 'T20', 'Neutral', 10, 10, 500, 370, 95, 41.67, 135.14, 0, 3, 55, 23, 0, 2),
(21, 'Australia', 'Test', 'Home', 12, 18, 1080, 2050, 165, 35.00, 52.68, 2, 4, 118, 23, 1, 3),
(21, 'Australia', 'ODI', 'Away', 14, 14, 720, 810, 120, 34.29, 88.89, 1, 3, 88, 22, 0, 2),
(21, 'Australia', 'T20', 'Neutral', 9, 9, 480, 350, 85, 40.00, 137.14, 0, 2, 50, 24, 0, 2),
(21, 'Sri Lanka', 'Test', 'Away', 12, 20, 1100, 2200, 180, 36.67, 50.00, 3, 5, 120, 25, 1, 5),
(21, 'Sri Lanka', 'ODI', 'Home', 15, 15, 750, 850, 130, 37.50, 88.24, 2, 5, 80, 20, 0, 4),
(21, 'Sri Lanka', 'T20', 'Neutral', 10, 10, 500, 350, 90, 41.67, 142.86, 0, 4, 50, 25, 0, 3);

INSERT INTO BattingCareerAgainst
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts)
VALUES
(23, 'Australia', 'ODI', 'Away', 11, 9, 95, 230, 28, 10.56, 41.30, 0, 0, 10, 2, 3, 2),
(23, 'India', 'ODI', 'Home', 10, 8, 85, 210, 26, 10.00, 40.48, 0, 0, 9, 2, 3, 2),
(23, 'Pakistan', 'ODI', 'Neutral', 9, 7, 90, 220, 25, 10.00, 40.91, 0, 0, 10, 2, 3, 2),
(23, 'Zimbabwe', 'ODI', 'Away', 8, 7, 80, 200, 23, 9.71, 40.00, 0, 0, 9, 1, 3, 2),
(23, 'Sri Lanka', 'ODI', 'Home', 10, 8, 100, 230, 28, 11.11, 43.48, 0, 0, 11, 3, 2, 1),
(14, 'Australia', 'Test', 'Home', 5, 6, 60, 180, 20, 10.00, 33.33, 0, 0, 6, 1, 2, 1),
(14, 'India', 'Test', 'Away', 4, 5, 50, 150, 15, 10.00, 33.33, 0, 0, 5, 1, 2, 1),
(14, 'Pakistan', 'Test', 'Neutral', 3, 4, 40, 120, 12, 10.00, 33.33, 0, 0, 4, 0, 1, 0),
(14, 'Zimbabwe', 'Test', 'Home', 2, 3, 30, 90, 10, 10.00, 33.33, 0, 0, 3, 0, 1, 0),
(14, 'Sri Lanka', 'Test', 'Away', 3, 4, 20, 60, 8, 5.00, 33.33, 0, 0, 2, 0, 2, 0),
(24, 'Australia', 'T20', 'Home', 7, 7, 85, 120, 24, 12.14, 70.83, 0, 0, 9, 3, 2, 1),
(24, 'India', 'T20', 'Away', 6, 6, 75, 110, 22, 11.67, 68.18, 0, 0, 8, 2, 2, 1),
(24, 'Pakistan', 'T20', 'Neutral', 5, 5, 80, 115, 21, 12.50, 69.57, 0, 0, 9, 3, 2, 1),
(24, 'Zimbabwe', 'T20', 'Home', 4, 4, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(24, 'Sri Lanka', 'T20', 'Away', 6, 6, 90, 130, 25, 12.50, 69.23, 0, 0, 10, 3, 2, 1),
(30, 'Australia', 'Test', 'Home', 10, 12, 130, 380, 36, 10.83, 34.21, 0, 0, 14, 3, 4, 3),
(30, 'India', 'Test', 'Away', 9, 11, 120, 370, 32, 10.91, 32.43, 0, 0, 13, 2, 3, 2),
(30, 'Pakistan', 'Test', 'Neutral', 8, 10, 110, 350, 30, 11.00, 31.43, 0, 0, 12, 3, 3, 2),
(30, 'Zimbabwe', 'Test', 'Home', 6, 8, 100, 320, 28, 10.71, 31.25, 0, 0, 11, 2, 2, 2),
(30, 'Sri Lanka', 'Test', 'Away', 7, 9, 115, 340, 29, 11.50, 32.35, 0, 0, 12, 3, 2, 2),
(33, 'Sri Lanka', 'Test', 'Home', 11, 19, 900, 1800, 150, 32.14, 50.00, 2, 5, 100, 20, 1, 4),
(33, 'Sri Lanka', 'ODI', 'Away', 14, 14, 700, 800, 110, 35.00, 87.50, 1, 4, 75, 22, 1, 3),
(33, 'Sri Lanka', 'T20', 'Neutral', 9, 9, 420, 280, 85, 42.00, 150.00, 0, 3, 45, 25, 0, 3),
(33, 'Pakistan', 'Test', 'Away', 10, 16, 850, 1700, 140, 31.48, 50.00, 1, 4, 100, 18, 1, 3),
(33, 'Pakistan', 'ODI', 'Home', 12, 12, 620, 700, 100, 34.44, 88.57, 1, 3, 78, 19, 0, 3),
(33, 'Pakistan', 'T20', 'Neutral', 8, 8, 400, 280, 80, 40.00, 142.86, 0, 2, 45, 21, 0, 2),
(33, 'Zimbabwe', 'Test', 'Home', 9, 14, 820, 1600, 135, 32.80, 51.25, 1, 3, 95, 17, 1, 4),
(33, 'Zimbabwe', 'ODI', 'Away', 10, 10, 580, 640, 98, 32.22, 90.63, 1, 3, 72, 18, 0, 2),
(33, 'Zimbabwe', 'T20', 'Neutral', 7, 7, 360, 240, 75, 38.89, 150.00, 0, 2, 40, 19, 0, 2),
(33, 'Australia', 'Test', 'Away', 10, 16, 950, 1800, 155, 35.00, 52.78, 2, 5, 110, 25, 1, 5),
(33, 'Australia', 'ODI', 'Home', 13, 13, 750, 850, 120, 38.46, 88.24, 1, 4, 85, 20, 0, 2),
(33, 'Australia', 'T20', 'Neutral', 8, 8, 500, 320, 90, 62.50, 156.25, 0, 4, 55, 30, 0, 3),
(33, 'Zimbabwe', 'Test', 'Away', 8, 12, 780, 1600, 130, 34.00, 48.75, 1, 4, 90, 15, 0, 2),
(10, 'Australia', 'Test', 'Home', 9, 11, 125, 400, 30, 11.36, 31.25, 0, 0, 13, 3, 3, 2),
(10, 'Australia', 'ODI', 'Away', 10, 8, 110, 250, 28, 13.33, 44.00, 0, 0, 12, 4, 3, 2),
(10, 'Australia', 'T20', 'Neutral', 6, 6, 80, 115, 21, 13.33, 69.57, 0, 0, 9, 2, 1, 1),
(10, 'Sri Lanka', 'Test', 'Home', 9, 10, 125, 400, 35, 13.89, 31.25, 0, 1, 14, 2, 3, 2),
(10, 'Sri Lanka', 'ODI', 'Away', 11, 9, 110, 250, 30, 12.22, 44.00, 0, 0, 12, 3, 2, 1),
(10, 'Sri Lanka', 'T20', 'Neutral', 7, 6, 80, 120, 20, 13.33, 66.67, 0, 0, 9, 3, 2, 1),
(10, 'India', 'Test', 'Away', 8, 10, 115, 370, 32, 11.50, 31.08, 0, 0, 12, 3, 2, 2),
(10, 'India', 'ODI', 'Home', 9, 8, 105, 240, 28, 11.67, 43.75, 0, 0, 11, 3, 2, 2),
(10, 'India', 'T20', 'Away', 7, 7, 85, 130, 22, 12.14, 65.38, 0, 0, 9, 3, 1, 1),
(10, 'Pakistan', 'Test', 'Neutral', 8, 9, 130, 390, 35, 12.50, 33.33, 0, 0, 13, 3, 3, 2),
(10, 'Pakistan', 'ODI', 'Away', 9, 8, 100, 230, 27, 11.11, 43.48, 0, 0, 11, 3, 2, 2),
(10, 'Pakistan', 'T20', 'Home', 6, 6, 75, 110, 21, 12.50, 68.18, 0, 0, 8, 2, 1, 1),
(10, 'Zimbabwe', 'Test', 'Away', 7, 8, 120, 350, 33, 12.00, 34.29, 0, 0, 12, 3, 2, 2),
(10, 'Zimbabwe', 'ODI', 'Home', 8, 7, 95, 220, 26, 10.56, 43.18, 0, 0, 10, 2, 3, 2),
(10, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(15, 'Sri Lanka', 'Test', 'Home', 9, 10, 130, 380, 32, 12.00, 34.21, 0, 1, 13, 2, 3, 2),
(15, 'Sri Lanka', 'ODI', 'Away', 10, 8, 105, 240, 28, 11.67, 43.75, 0, 0, 11, 3, 2, 1),
(15, 'Sri Lanka', 'T20', 'Neutral', 6, 6, 70, 100, 18, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(15, 'Australia', 'Test', 'Home', 8, 9, 110, 370, 30, 12.22, 29.73, 0, 0, 12, 3, 3, 2), 
(15, 'Australia', 'ODI', 'Away', 9, 8, 100, 240, 28, 11.11, 41.67, 0, 0, 11, 3, 2, 2), 
(15, 'Australia', 'T20', 'Neutral', 6, 6, 80, 115, 21, 13.33, 69.57, 0, 0, 9, 2, 1, 1), 
(15, 'India', 'Test', 'Away', 7, 9, 105, 350, 28, 11.67, 30.00, 0, 0, 12, 2, 3, 2), 
(15, 'India', 'ODI', 'Home', 8, 7, 95, 220, 26, 10.56, 43.18, 0, 0, 10, 2, 3, 2), 
(15, 'India', 'T20', 'Away', 5, 5, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1), 
(15, 'Pakistan', 'Test', 'Neutral', 6, 8, 110, 360, 31, 12.50, 30.56, 0, 0, 11, 3, 2, 2), 
(15, 'Pakistan', 'ODI', 'Away', 7, 7, 90, 210, 25, 10.00, 42.86, 0, 0, 10, 2, 3, 2), 
(15, 'Pakistan', 'T20', 'Home', 4, 4, 55, 85, 16, 10.00, 64.71, 0, 0, 6, 2, 1, 1), 
(15, 'Zimbabwe', 'Test', 'Away', 5, 7, 100, 330, 29, 11.43, 30.30, 0, 0, 10, 3, 2, 2), 
(15, 'Zimbabwe', 'ODI', 'Home', 6, 6, 85, 200, 24, 10.63, 42.50, 0, 0, 9, 2, 3, 2), 
(15, 'Zimbabwe', 'T20', 'Neutral', 3, 3, 50, 75, 15, 10.00, 66.67, 0, 0, 5, 1, 1, 1),
(22, 'Sri Lanka', 'Test', 'Away', 8, 9, 115, 350, 30, 11.50, 32.86, 0, 0, 12, 3, 3, 2),
(22, 'Sri Lanka', 'ODI', 'Home', 9, 7, 100, 230, 28, 12.50, 43.48, 0, 0, 11, 3, 2, 1),
(22, 'Sri Lanka', 'T20', 'Neutral', 7, 6, 85, 120, 22, 14.17, 70.83, 0, 0, 9, 3, 2, 1),
(22, 'Australia', 'Test', 'Home', 9, 11, 140, 420, 38, 12.73, 33.33, 0, 0, 15, 4, 2, 2),
(22, 'Australia', 'ODI', 'Away', 10, 8, 125, 275, 35, 13.89, 45.45, 0, 0, 13, 5, 3, 2),
(22, 'Australia', 'T20', 'Neutral', 6, 6, 90, 130, 22, 13.50, 69.23, 0, 0, 10, 3, 2, 1),
(22, 'India', 'Test', 'Away', 8, 10, 135, 400, 37, 13.50, 33.75, 0, 0, 14, 3, 2, 2),
(22, 'India', 'ODI', 'Home', 9, 8, 115, 260, 30, 12.78, 44.23, 0, 0, 12, 4, 2, 2),
(22, 'India', 'T20', 'Away', 7, 7, 85, 125, 21, 12.14, 68.00, 0, 0, 9, 2, 2, 1),
(22, 'Pakistan', 'Test', 'Away', 9, 11, 145, 410, 39, 13.18, 35.37, 0, 0, 16, 4, 3, 2), 
(22, 'Pakistan', 'ODI', 'Home', 10, 9, 120, 270, 32, 12.00, 44.44, 0, 0, 13, 4, 3, 2), 
(22, 'Pakistan', 'T20', 'Neutral', 6, 6, 88, 130, 23, 14.67, 67.69, 0, 0, 10, 3, 2, 1),
(22, 'Zimbabwe', 'Test', 'Home', 8, 10, 138, 390, 36, 13.80, 35.38, 0, 0, 15, 4, 2, 2), 
(22, 'Zimbabwe', 'ODI', 'Away', 9, 8, 110, 250, 29, 12.22, 44.00, 0, 0, 12, 3, 2, 2), 
(22, 'Zimbabwe', 'T20', 'Neutral', 7, 6, 80, 115, 20, 13.33, 69.57, 0, 0, 8, 3, 2, 1),
(29, 'Sri Lanka', 'Test', 'Away', 8, 10, 110, 350, 30, 11.00, 31.43, 0, 0, 12, 3, 3, 2),
(29, 'Sri Lanka', 'ODI', 'Home', 9, 7, 95, 220, 27, 11.88, 43.18, 0, 0, 10, 3, 2, 1),
(29, 'Sri Lanka', 'T20', 'Neutral', 5, 5, 60, 90, 17, 10.00, 66.67, 0, 0, 6, 2, 1, 1),
(29, 'Pakistan', 'Test', 'Neutral', 8, 9, 130, 390, 35, 12.50, 33.33, 0, 0, 13, 3, 3, 2),
(29, 'Pakistan', 'ODI', 'Away', 9, 8, 100, 230, 27, 11.11, 43.48, 0, 0, 11, 3, 2, 2),
(29, 'Pakistan', 'T20', 'Home', 6, 6, 75, 110, 21, 12.50, 68.18, 0, 0, 8, 2, 1, 1),
(29, 'Zimbabwe', 'Test', 'Away', 7, 8, 120, 350, 33, 12.00, 34.29, 0, 0, 12, 3, 2, 2),
(29, 'Zimbabwe', 'ODI', 'Home', 8, 7, 95, 220, 26, 10.56, 43.18, 0, 0, 10, 2, 3, 2),
(29, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(29, 'India', 'Test', 'Away', 8, 9, 125, 370, 34, 11.36, 33.78, 0, 0, 14, 3, 3, 2), 
(29, 'India', 'ODI', 'Home', 9, 8, 105, 240, 29, 11.67, 43.75, 0, 0, 11, 3, 2, 2), 
(29, 'India', 'T20', 'Neutral', 6, 6, 80, 110, 22, 13.33, 72.73, 0, 0, 9, 3, 2, 1), 
(29, 'Australia', 'Test', 'Neutral', 7, 8, 115, 340, 31, 11.50, 33.82, 0, 0, 13, 3, 3, 2), 
(29, 'Australia', 'ODI', 'Away', 8, 7, 98, 225, 28, 10.89, 43.56, 0, 0, 10, 3, 2, 2), 
(29, 'Australia', 'T20', 'Home', 5, 5, 72, 105, 20, 12.00, 68.57, 0, 0, 8, 2, 2, 1),
(36, 'Sri Lanka', 'Test', 'Away', 8, 10, 110, 350, 30, 11.00, 31.43, 0, 0, 12, 3, 3, 2),
(36, 'Sri Lanka', 'ODI', 'Home', 9, 7, 95, 220, 27, 11.88, 43.18, 0, 0, 10, 3, 2, 1),
(36, 'Sri Lanka', 'T20', 'Neutral', 5, 5, 60, 90, 17, 10.00, 66.67, 0, 0, 6, 2, 1, 1),
(36, 'India', 'Test', 'Home', 9, 11, 130, 380, 36, 11.82, 34.21, 0, 1, 14, 3, 4, 3),
(36, 'India', 'ODI', 'Away', 10, 8, 120, 250, 28, 13.33, 48.00, 0, 0, 13, 4, 3, 2),
(36, 'India', 'T20', 'Neutral', 5, 5, 60, 90, 17, 10.00, 66.67, 0, 0, 6, 2, 1, 1),
(36, 'Australia', 'Test', 'Home', 8, 9, 110, 370, 30, 12.22, 29.73, 0, 0, 12, 3, 3, 2),
(36, 'Australia', 'ODI', 'Away', 9, 8, 100, 240, 28, 11.11, 41.67, 0, 0, 11, 3, 2, 2),
(36, 'Australia', 'T20', 'Neutral', 6, 6, 80, 115, 21, 13.33, 69.57, 0, 0, 9, 2, 1, 1),
(36, 'Pakistan', 'Test', 'Neutral', 8, 10, 125, 400, 34, 12.50, 31.25, 0, 0, 14, 4, 3, 2), 
(36, 'Pakistan', 'ODI', 'Home', 9, 8, 110, 250, 29, 13.75, 44.00, 0, 0, 12, 4, 3, 2), 
(36, 'Pakistan', 'T20', 'Away', 5, 5, 70, 100, 18, 14.00, 70.00, 0, 0, 8, 2, 2, 1), 
(36, 'Zimbabwe', 'Test', 'Away', 7, 8, 115, 360, 32, 12.88, 31.94, 0, 0, 13, 3, 2, 2), 
(36, 'Zimbabwe', 'ODI', 'Home', 8, 7, 90, 220, 25, 12.50, 40.91, 0, 0, 9, 3, 3, 2), 
(36, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 65, 95, 20, 13.00, 68.42, 0, 0, 7, 2, 1, 1),
(38, 'Sri Lanka', 'Test', 'Home', 9, 10, 125, 400, 35, 13.89, 31.25, 0, 1, 14, 2, 3, 2),
(38, 'Sri Lanka', 'ODI', 'Away', 11, 9, 110, 250, 30, 12.22, 44.00, 0, 0, 12, 3, 2, 1),
(38, 'Sri Lanka', 'T20', 'Neutral', 7, 6, 80, 120, 20, 13.33, 66.67, 0, 0, 9, 3, 2, 1),
(38, 'Pakistan', 'Test', 'Away', 8, 9, 120, 380, 34, 13.33, 31.58, 0, 0, 13, 3, 2, 2),
(38, 'Pakistan', 'ODI', 'Home', 10, 8, 115, 260, 29, 14.38, 44.23, 0, 0, 12, 4, 2, 2),
(38, 'Pakistan', 'T20', 'Neutral', 6, 6, 75, 110, 22, 12.50, 68.18, 0, 0, 8, 2, 2, 1),
(38, 'Zimbabwe', 'Test', 'Home', 7, 8, 130, 360, 36, 12.86, 36.11, 0, 0, 14, 3, 2, 2),
(38, 'Zimbabwe', 'ODI', 'Away', 9, 7, 100, 230, 27, 14.29, 43.48, 0, 0, 10, 3, 2, 1),
(38, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 70, 100, 19, 14.00, 70.00, 0, 0, 7, 2, 1, 1),
(38, 'India', 'Test', 'Away', 8, 10, 135, 410, 38, 13.50, 32.92, 0, 1, 15, 3, 3, 3),
(38, 'India', 'ODI', 'Home', 10, 9, 120, 280, 34, 13.33, 42.86, 0, 0, 11, 3, 3, 2),
(38, 'India', 'T20', 'Neutral', 6, 6, 85, 125, 24, 14.17, 68.00, 0, 0, 10, 2, 2, 1),
(38, 'Australia', 'Test', 'Home', 9, 11, 140, 450, 39, 12.73, 31.11, 0, 0, 16, 4, 3, 2),
(38, 'Australia', 'ODI', 'Away', 10, 8, 115, 260, 30, 12.88, 44.23, 0, 0, 12, 4, 2, 2),
(38, 'Australia', 'T20', 'Neutral', 7, 6, 90, 130, 23, 15.00, 69.23, 0, 0, 10, 3, 2, 1),
(40, 'Sri Lanka', 'Test', 'Away', 9, 12, 120, 370, 32, 10.91, 32.43, 0, 0, 13, 2, 3, 2),
(40, 'Sri Lanka', 'ODI', 'Home', 11, 9, 105, 240, 28, 11.67, 43.75, 0, 0, 11, 3, 2, 2),
(40, 'Sri Lanka', 'T20', 'Neutral', 6, 6, 75, 110, 22, 12.50, 68.18, 0, 0, 8, 3, 2, 1),
(40, 'Pakistan', 'Test', 'Away', 9, 12, 120, 370, 32, 10.91, 32.43, 0, 0, 13, 2, 3, 2),
(40, 'Pakistan', 'ODI', 'Home', 11, 9, 105, 240, 28, 11.67, 43.75, 0, 0, 11, 3, 2, 2),
(40, 'Pakistan', 'T20', 'Away', 7, 7, 90, 130, 25, 12.50, 69.23, 0, 0, 10, 3, 2, 1),
(40, 'India', 'Test', 'Away', 7, 9, 105, 350, 28, 11.67, 30.00, 0, 0, 12, 2, 3, 2),
(40, 'India', 'ODI', 'Home', 8, 7, 95, 220, 26, 10.56, 43.18, 0, 0, 10, 2, 3, 2),
(40, 'India', 'T20', 'Away', 5, 5, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(40, 'Zimbabwe', 'Test', 'Home', 8, 10, 110, 340, 31, 11.00, 32.35, 0, 0, 12, 3, 2, 2),
(40, 'Zimbabwe', 'ODI', 'Away', 9, 7, 100, 240, 28, 14.29, 41.67, 0, 0, 10, 3, 2, 2),
(40, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 75, 100, 20, 15.00, 75.00, 0, 0, 8, 2, 1, 1),
(40, 'Australia', 'Test', 'Home', 9, 10, 125, 380, 35, 12.50, 32.89, 0, 0, 14, 3, 3, 2),
(40, 'Australia', 'ODI', 'Away', 11, 9, 100, 230, 28, 11.11, 43.48, 0, 0, 11, 3, 2, 2),
(40, 'Australia', 'T20', 'Neutral', 6, 6, 80, 120, 22, 13.33, 66.67, 0, 0, 9, 3, 2, 1),
(18, 'Sri Lanka', 'Test', 'Home', 10, 18, 740, 1400, 120, 29.60, 52.86, 1, 4, 85, 15, 2, 4),
(18, 'Sri Lanka', 'ODI', 'Away', 12, 12, 580, 650, 100, 32.22, 89.23, 1, 3, 68, 18, 1, 3),
(18, 'Sri Lanka', 'T20', 'Neutral', 8, 8, 360, 230, 75, 40.00, 156.52, 0, 2, 40, 20, 0, 2),
(18, 'Pakistan', 'Test', 'Away', 9, 15, 680, 1300, 115, 28.33, 52.31, 1, 3, 78, 18, 2, 3),
(18, 'Pakistan', 'ODI', 'Home', 10, 10, 510, 570, 90, 34.00, 89.47, 0, 3, 65, 16, 1, 2),
(18, 'Pakistan', 'T20', 'Neutral', 7, 7, 350, 250, 70, 38.89, 140.00, 0, 2, 40, 18, 0, 2),
(18, 'Zimbabwe', 'Test', 'Home', 8, 14, 720, 1250, 125, 30.00, 57.60, 1, 4, 80, 15, 1, 4),
(18, 'Zimbabwe', 'ODI', 'Away', 9, 9, 490, 550, 85, 32.67, 89.09, 1, 2, 60, 14, 1, 2),
(18, 'Zimbabwe', 'T20', 'Neutral', 6, 6, 310, 220, 60, 35.00, 140.91, 0, 1, 35, 15, 0, 1),
(18, 'India', 'Test', 'Away', 10, 16, 750, 1400, 130, 31.25, 53.57, 1, 3, 85, 17, 2, 4),
(18, 'India', 'ODI', 'Home', 12, 12, 570, 640, 95, 31.67, 89.06, 0, 3, 72, 18, 1, 3),
(18, 'India', 'T20', 'Neutral', 8, 8, 400, 280, 80, 40.00, 142.86, 0, 2, 42, 20, 0, 2),
(18, 'Australia', 'Test', 'Home', 11, 17, 780, 1450, 140, 30.00, 53.79, 1, 3, 90, 19, 2, 3),
(18, 'Australia', 'ODI', 'Away', 13, 13, 600, 670, 100, 33.33, 89.55, 1, 3, 75, 20, 0, 2),
(18, 'Australia', 'T20', 'Neutral', 9, 9, 420, 300, 85, 42.00, 140.00, 0, 2, 45, 22, 0, 2),
(21, 'Pakistan', 'Test', 'Away', 11, 18, 1050, 2100, 170, 36.21, 50.00, 2, 4, 115, 22, 1, 4),
(21, 'Pakistan', 'ODI', 'Home', 14, 14, 700, 780, 125, 35.00, 89.74, 1, 3, 85, 20, 1, 3),
(21, 'Pakistan', 'T20', 'Neutral', 9, 9, 480, 340, 90, 40.00, 141.18, 0, 2, 50, 22, 0, 2),
(21, 'Zimbabwe', 'Test', 'Home', 10, 16, 1020, 1950, 155, 34.00, 52.31, 2, 4, 110, 20, 1, 4),
(21, 'Zimbabwe', 'ODI', 'Away', 12, 12, 650, 720, 110, 32.50, 90.28, 1, 3, 80, 18, 1, 2),
(21, 'Zimbabwe', 'T20', 'Neutral', 8, 8, 460, 330, 85, 38.33, 139.39, 0, 2, 48, 20, 0, 1),
(21, 'India', 'Test', 'Away', 13, 20, 1120, 2200, 185, 37.33, 50.91, 3, 5, 120, 25, 1, 4),
(21, 'India', 'ODI', 'Home', 16, 16, 750, 860, 135, 35.71, 87.21, 1, 4, 95, 22, 0, 3),
(21, 'India', 'T20', 'Neutral', 10, 10, 500, 370, 95, 41.67, 135.14, 0, 3, 55, 23, 0, 2),
(21, 'Australia', 'Test', 'Home', 12, 18, 1080, 2050, 165, 35.00, 52.68, 2, 4, 118, 23, 1, 3),
(21, 'Australia', 'ODI', 'Away', 14, 14, 720, 810, 120, 34.29, 88.89, 1, 3, 88, 22, 0, 2),
(21, 'Australia', 'T20', 'Neutral', 9, 9, 480, 350, 85, 40.00, 137.14, 0, 2, 50, 24, 0, 2),
(21, 'Sri Lanka', 'Test', 'Away', 12, 20, 1100, 2200, 180, 36.67, 50.00, 3, 5, 120, 25, 1, 5),
(21, 'Sri Lanka', 'ODI', 'Home', 15, 15, 750, 850, 130, 37.50, 88.24, 2, 5, 80, 20, 0, 4),
(21, 'Sri Lanka', 'T20', 'Neutral', 10, 10, 500, 350, 90, 41.67, 142.86, 0, 4, 50, 25, 0, 3);

INSERT INTO BattingCareerAgainst
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts) VALUES
(23, 'Australia', 'ODI', 'Away', 11, 9, 95, 230, 28, 10.56, 41.30, 0, 0, 10, 2, 3, 2),
(23, 'India', 'ODI', 'Home', 10, 8, 85, 210, 26, 10.00, 40.48, 0, 0, 9, 2, 3, 2),
(23, 'Pakistan', 'ODI', 'Neutral', 9, 7, 90, 220, 25, 10.00, 40.91, 0, 0, 10, 2, 3, 2),
(23, 'Zimbabwe', 'ODI', 'Away', 8, 7, 80, 200, 23, 9.71, 40.00, 0, 0, 9, 1, 3, 2),
(23, 'Sri Lanka', 'ODI', 'Home', 10, 8, 100, 230, 28, 11.11, 43.48, 0, 0, 11, 3, 2, 1),
(14, 'Australia', 'Test', 'Home', 5, 6, 60, 180, 20, 10.00, 33.33, 0, 0, 6, 1, 2, 1),
(14, 'India', 'Test', 'Away', 4, 5, 50, 150, 15, 10.00, 33.33, 0, 0, 5, 1, 2, 1),
(14, 'Pakistan', 'Test', 'Neutral', 3, 4, 40, 120, 12, 10.00, 33.33, 0, 0, 4, 0, 1, 0),
(14, 'Zimbabwe', 'Test', 'Home', 2, 3, 30, 90, 10, 10.00, 33.33, 0, 0, 3, 0, 1, 0),
(14, 'Sri Lanka', 'Test', 'Away', 3, 4, 20, 60, 8, 5.00, 33.33, 0, 0, 2, 0, 2, 0),
(24, 'Australia', 'T20', 'Home', 7, 7, 85, 120, 24, 12.14, 70.83, 0, 0, 9, 3, 2, 1),
(24, 'India', 'T20', 'Away', 6, 6, 75, 110, 22, 11.67, 68.18, 0, 0, 8, 2, 2, 1),
(24, 'Pakistan', 'T20', 'Neutral', 5, 5, 80, 115, 21, 12.50, 69.57, 0, 0, 9, 3, 2, 1),
(24, 'Zimbabwe', 'T20', 'Home', 4, 4, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(24, 'Sri Lanka', 'T20', 'Away', 6, 6, 90, 130, 25, 12.50, 69.23, 0, 0, 10, 3, 2, 1),
(30, 'Australia', 'Test', 'Home', 10, 12, 130, 380, 36, 10.83, 34.21, 0, 0, 14, 3, 4, 3),
(30, 'India', 'Test', 'Away', 9, 11, 120, 370, 32, 10.91, 32.43, 0, 0, 13, 2, 3, 2),
(30, 'Pakistan', 'Test', 'Neutral', 8, 10, 110, 350, 30, 11.00, 31.43, 0, 0, 12, 3, 3, 2),
(30, 'Zimbabwe', 'Test', 'Home', 6, 8, 100, 320, 28, 10.71, 31.25, 0, 0, 11, 2, 2, 2),
(30, 'Sri Lanka', 'Test', 'Away', 7, 9, 115, 340, 29, 11.50, 32.35, 0, 0, 12, 3, 2, 2),
(33, 'Sri Lanka', 'Test', 'Home', 11, 19, 900, 1800, 150, 32.14, 50.00, 2, 5, 100, 20, 1, 4),
(33, 'Sri Lanka', 'ODI', 'Away', 14, 14, 700, 800, 110, 35.00, 87.50, 1, 4, 75, 22, 1, 3),
(33, 'Sri Lanka', 'T20', 'Neutral', 9, 9, 420, 280, 85, 42.00, 150.00, 0, 3, 45, 25, 0, 3),
(33, 'Pakistan', 'Test', 'Away', 10, 16, 850, 1700, 140, 31.48, 50.00, 1, 4, 100, 18, 1, 3),
(33, 'Pakistan', 'ODI', 'Home', 12, 12, 620, 700, 100, 34.44, 88.57, 1, 3, 78, 19, 0, 3),
(33, 'Pakistan', 'T20', 'Neutral', 8, 8, 400, 280, 80, 40.00, 142.86, 0, 2, 45, 21, 0, 2),
(33, 'Zimbabwe', 'Test', 'Home', 9, 14, 820, 1600, 135, 32.80, 51.25, 1, 3, 95, 17, 1, 4),
(33, 'Zimbabwe', 'ODI', 'Away', 10, 10, 580, 640, 98, 32.22, 90.63, 1, 3, 72, 18, 0, 2),
(33, 'Zimbabwe', 'T20', 'Neutral', 7, 7, 360, 240, 75, 38.89, 150.00, 0, 2, 40, 19, 0, 2),
(33, 'Australia', 'Test', 'Away', 10, 16, 950, 1800, 155, 35.00, 52.78, 2, 5, 110, 25, 1, 5),
(33, 'Australia', 'ODI', 'Home', 13, 13, 750, 850, 120, 38.46, 88.24, 1, 4, 85, 20, 0, 2),
(33, 'Australia', 'T20', 'Neutral', 8, 8, 500, 320, 90, 62.50, 156.25, 0, 4, 55, 30, 0, 3),
(33, 'Zimbabwe', 'Test', 'Away', 8, 12, 780, 1600, 130, 34.00, 48.75, 1, 4, 90, 15, 0, 2),
(33, 'Zimbabwe', 'ODI', 'Home', 11, 11, 600, 720, 105, 36.36, 83.33, 1, 4, 70, 19, 0, 1),
(10, 'Australia', 'Test', 'Home', 9, 11, 125, 400, 30, 11.36, 31.25, 0, 0, 13, 3, 3, 2),
(10, 'Australia', 'ODI', 'Away', 10, 8, 110, 250, 28, 13.33, 44.00, 0, 0, 12, 4, 3, 2),
(10, 'Australia', 'T20', 'Neutral', 6, 6, 80, 115, 21, 13.33, 69.57, 0, 0, 9, 2, 1, 1),
(10, 'Sri Lanka', 'Test', 'Home', 9, 10, 125, 400, 35, 13.89, 31.25, 0, 1, 14, 2, 3, 2),
(10, 'Sri Lanka', 'ODI', 'Away', 11, 9, 110, 250, 30, 12.22, 44.00, 0, 0, 12, 3, 2, 1),
(10, 'Sri Lanka', 'T20', 'Neutral', 7, 6, 80, 120, 20, 13.33, 66.67, 0, 0, 9, 3, 2, 1),
(10, 'India', 'Test', 'Away', 8, 10, 115, 370, 32, 11.50, 31.08, 0, 0, 12, 3, 2, 2),
(10, 'India', 'ODI', 'Home', 9, 8, 105, 240, 28, 11.67, 43.75, 0, 0, 11, 3, 2, 2),
(10, 'India', 'T20', 'Away', 7, 7, 85, 130, 22, 12.14, 65.38, 0, 0, 9, 3, 1, 1),
(10, 'Pakistan', 'Test', 'Neutral', 8, 9, 130, 390, 35, 12.50, 33.33, 0, 0, 13, 3, 3, 2),
(10, 'Pakistan', 'ODI', 'Away', 9, 8, 100, 230, 27, 11.11, 43.48, 0, 0, 11, 3, 2, 2),
(10, 'Pakistan', 'T20', 'Home', 6, 6, 75, 110, 21, 12.50, 68.18, 0, 0, 8, 2, 1, 1),
(10, 'Zimbabwe', 'Test', 'Away', 7, 8, 120, 350, 33, 12.00, 34.29, 0, 0, 12, 3, 2, 2),
(10, 'Zimbabwe', 'ODI', 'Home', 8, 7, 95, 220, 26, 10.56, 43.18, 0, 0, 10, 2, 3, 2),
(10, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(15, 'Sri Lanka', 'Test', 'Home', 9, 10, 130, 380, 32, 12.00, 34.21, 0, 1, 13, 2, 3, 2),
(15, 'Sri Lanka', 'ODI', 'Away', 10, 8, 105, 240, 28, 11.67, 43.75, 0, 0, 11, 3, 2, 1),
(15, 'Sri Lanka', 'T20', 'Neutral', 6, 6, 70, 100, 18, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(15, 'Australia', 'Test', 'Home', 8, 9, 110, 370, 30, 12.22, 29.73, 0, 0, 12, 3, 3, 2), 
(15, 'Australia', 'ODI', 'Away', 9, 8, 100, 240, 28, 11.11, 41.67, 0, 0, 11, 3, 2, 2), 
(15, 'Australia', 'T20', 'Neutral', 6, 6, 80, 115, 21, 13.33, 69.57, 0, 0, 9, 2, 1, 1), 
(15, 'India', 'Test', 'Away', 7, 9, 105, 350, 28, 11.67, 30.00, 0, 0, 12, 2, 3, 2), 
(15, 'India', 'ODI', 'Home', 8, 7, 95, 220, 26, 10.56, 43.18, 0, 0, 10, 2, 3, 2), 
(15, 'India', 'T20', 'Away', 5, 5, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1), 
(15, 'Pakistan', 'Test', 'Neutral', 6, 8, 110, 360, 31, 12.50, 30.56, 0, 0, 11, 3, 2, 2), 
(15, 'Pakistan', 'ODI', 'Away', 7, 7, 90, 210, 25, 10.00, 42.86, 0, 0, 10, 2, 3, 2), 
(15, 'Pakistan', 'T20', 'Home', 4, 4, 55, 85, 16, 10.00, 64.71, 0, 0, 6, 2, 1, 1), 
(15, 'Zimbabwe', 'Test', 'Away', 5, 7, 100, 330, 29, 11.43, 30.30, 0, 0, 10, 3, 2, 2), 
(15, 'Zimbabwe', 'ODI', 'Home', 6, 6, 85, 200, 24, 10.63, 42.50, 0, 0, 9, 2, 3, 2), 
(15, 'Zimbabwe', 'T20', 'Neutral', 3, 3, 50, 75, 15, 10.00, 66.67, 0, 0, 5, 1, 1, 1),
(22, 'Sri Lanka', 'Test', 'Away', 8, 9, 115, 350, 30, 11.50, 32.86, 0, 0, 12, 3, 3, 2),
(22, 'Sri Lanka', 'ODI', 'Home', 9, 7, 100, 230, 28, 12.50, 43.48, 0, 0, 11, 3, 2, 1),
(22, 'Sri Lanka', 'T20', 'Neutral', 7, 6, 85, 120, 22, 14.17, 70.83, 0, 0, 9, 3, 2, 1),
(22, 'Australia', 'Test', 'Home', 9, 11, 140, 420, 38, 12.73, 33.33, 0, 0, 15, 4, 2, 2),
(22, 'Australia', 'ODI', 'Away', 10, 8, 125, 275, 35, 13.89, 45.45, 0, 0, 13, 5, 3, 2),
(22, 'Australia', 'T20', 'Neutral', 6, 6, 90, 130, 22, 13.50, 69.23, 0, 0, 10, 3, 2, 1),
(22, 'India', 'Test', 'Away', 8, 10, 135, 400, 37, 13.50, 33.75, 0, 0, 14, 3, 2, 2),
(22, 'India', 'ODI', 'Home', 9, 8, 115, 260, 30, 12.78, 44.23, 0, 0, 12, 4, 2, 2),
(22, 'India', 'T20', 'Away', 7, 7, 85, 125, 21, 12.14, 68.00, 0, 0, 9, 2, 2, 1),
(22, 'Pakistan', 'Test', 'Away', 9, 11, 145, 410, 39, 13.18, 35.37, 0, 0, 16, 4, 3, 2), 
(22, 'Pakistan', 'ODI', 'Home', 10, 9, 120, 270, 32, 12.00, 44.44, 0, 0, 13, 4, 3, 2), 
(22, 'Pakistan', 'T20', 'Neutral', 6, 6, 88, 130, 23, 14.67, 67.69, 0, 0, 10, 3, 2, 1),
(22, 'Zimbabwe', 'Test', 'Home', 8, 10, 138, 390, 36, 13.80, 35.38, 0, 0, 15, 4, 2, 2), 
(22, 'Zimbabwe', 'ODI', 'Away', 9, 8, 110, 250, 29, 12.22, 44.00, 0, 0, 12, 3, 2, 2), 
(22, 'Zimbabwe', 'T20', 'Neutral', 7, 6, 80, 115, 20, 13.33, 69.57, 0, 0, 8, 3, 2, 1),
(29, 'Sri Lanka', 'Test', 'Away', 8, 10, 110, 350, 30, 11.00, 31.43, 0, 0, 12, 3, 3, 2),
(29, 'Sri Lanka', 'ODI', 'Home', 9, 7, 95, 220, 27, 11.88, 43.18, 0, 0, 10, 3, 2, 1),
(29, 'Sri Lanka', 'T20', 'Neutral', 5, 5, 60, 90, 17, 10.00, 66.67, 0, 0, 6, 2, 1, 1),
(29, 'Pakistan', 'Test', 'Neutral', 8, 9, 130, 390, 35, 12.50, 33.33, 0, 0, 13, 3, 3, 2),
(29, 'Pakistan', 'ODI', 'Away', 9, 8, 100, 230, 27, 11.11, 43.48, 0, 0, 11, 3, 2, 2),
(29, 'Pakistan', 'T20', 'Home', 6, 6, 75, 110, 21, 12.50, 68.18, 0, 0, 8, 2, 1, 1),
(29, 'Zimbabwe', 'Test', 'Away', 7, 8, 120, 350, 33, 12.00, 34.29, 0, 0, 12, 3, 2, 2),
(29, 'Zimbabwe', 'ODI', 'Home', 8, 7, 95, 220, 26, 10.56, 43.18, 0, 0, 10, 2, 3, 2),
(29, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(29, 'India', 'Test', 'Away', 8, 9, 125, 370, 34, 11.36, 33.78, 0, 0, 14, 3, 3, 2), 
(29, 'India', 'ODI', 'Home', 9, 8, 105, 240, 29, 11.67, 43.75, 0, 0, 11, 3, 2, 2), 
(29, 'India', 'T20', 'Neutral', 6, 6, 80, 110, 22, 13.33, 72.73, 0, 0, 9, 3, 2, 1), 
(29, 'Australia', 'Test', 'Neutral', 7, 8, 115, 340, 31, 11.50, 33.82, 0, 0, 13, 3, 3, 2), 
(29, 'Australia', 'ODI', 'Away', 8, 7, 98, 225, 28, 10.89, 43.56, 0, 0, 10, 3, 2, 2), 
(29, 'Australia', 'T20', 'Home', 5, 5, 72, 105, 20, 12.00, 68.57, 0, 0, 8, 2, 2, 1),
(36, 'Sri Lanka', 'Test', 'Away', 8, 10, 110, 350, 30, 11.00, 31.43, 0, 0, 12, 3, 3, 2),
(36, 'Sri Lanka', 'ODI', 'Home', 9, 7, 95, 220, 27, 11.88, 43.18, 0, 0, 10, 3, 2, 1),
(36, 'Sri Lanka', 'T20', 'Neutral', 5, 5, 60, 90, 17, 10.00, 66.67, 0, 0, 6, 2, 1, 1),
(36, 'India', 'Test', 'Home', 9, 11, 130, 380, 36, 11.82, 34.21, 0, 1, 14, 3, 4, 3),
(36, 'India', 'ODI', 'Away', 10, 8, 120, 250, 28, 13.33, 48.00, 0, 0, 13, 4, 3, 2),
(36, 'India', 'T20', 'Neutral', 5, 5, 60, 90, 17, 10.00, 66.67, 0, 0, 6, 2, 1, 1),
(36, 'Australia', 'Test', 'Home', 8, 9, 110, 370, 30, 12.22, 29.73, 0, 0, 12, 3, 3, 2),
(36, 'Australia', 'ODI', 'Away', 9, 8, 100, 240, 28, 11.11, 41.67, 0, 0, 11, 3, 2, 2),
(36, 'Australia', 'T20', 'Neutral', 6, 6, 80, 115, 21, 13.33, 69.57, 0, 0, 9, 2, 1, 1),
(36, 'Pakistan', 'Test', 'Neutral', 8, 10, 125, 400, 34, 12.50, 31.25, 0, 0, 14, 4, 3, 2), 
(36, 'Pakistan', 'ODI', 'Home', 9, 8, 110, 250, 29, 13.75, 44.00, 0, 0, 12, 4, 3, 2), 
(36, 'Pakistan', 'T20', 'Away', 5, 5, 70, 100, 18, 14.00, 70.00, 0, 0, 8, 2, 2, 1), 
(36, 'Zimbabwe', 'Test', 'Away', 7, 8, 115, 360, 32, 12.88, 31.94, 0, 0, 13, 3, 2, 2), 
(36, 'Zimbabwe', 'ODI', 'Home', 8, 7, 90, 220, 25, 12.50, 40.91, 0, 0, 9, 3, 3, 2), 
(36, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 65, 95, 20, 13.00, 68.42, 0, 0, 7, 2, 1, 1),
(38, 'Sri Lanka', 'Test', 'Home', 9, 10, 125, 400, 35, 13.89, 31.25, 0, 1, 14, 2, 3, 2),
(38, 'Sri Lanka', 'ODI', 'Away', 11, 9, 110, 250, 30, 12.22, 44.00, 0, 0, 12, 3, 2, 1),
(38, 'Sri Lanka', 'T20', 'Neutral', 7, 6, 80, 120, 20, 13.33, 66.67, 0, 0, 9, 3, 2, 1),
(38, 'Pakistan', 'Test', 'Away', 8, 9, 120, 380, 34, 13.33, 31.58, 0, 0, 13, 3, 2, 2),
(38, 'Pakistan', 'ODI', 'Home', 10, 8, 115, 260, 29, 14.38, 44.23, 0, 0, 12, 4, 2, 2),
(38, 'Pakistan', 'T20', 'Neutral', 6, 6, 75, 110, 22, 12.50, 68.18, 0, 0, 8, 2, 2, 1),
(38, 'Zimbabwe', 'Test', 'Home', 7, 8, 130, 360, 36, 12.86, 36.11, 0, 0, 14, 3, 2, 2),
(38, 'Zimbabwe', 'ODI', 'Away', 9, 7, 100, 230, 27, 14.29, 43.48, 0, 0, 10, 3, 2, 1),
(38, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 70, 100, 19, 14.00, 70.00, 0, 0, 7, 2, 1, 1),
(38, 'India', 'Test', 'Away', 8, 10, 135, 410, 38, 13.50, 32.92, 0, 1, 15, 3, 3, 3),
(38, 'India', 'ODI', 'Home', 10, 9, 120, 280, 34, 13.33, 42.86, 0, 0, 11, 3, 3, 2),
(38, 'India', 'T20', 'Neutral', 6, 6, 85, 125, 24, 14.17, 68.00, 0, 0, 10, 2, 2, 1),
(38, 'Australia', 'Test', 'Home', 9, 11, 140, 450, 39, 12.73, 31.11, 0, 0, 16, 4, 3, 2),
(38, 'Australia', 'ODI', 'Away', 10, 8, 115, 260, 30, 12.88, 44.23, 0, 0, 12, 4, 2, 2),
(38, 'Australia', 'T20', 'Neutral', 7, 6, 90, 130, 23, 15.00, 69.23, 0, 0, 10, 3, 2, 1),
(40, 'Sri Lanka', 'Test', 'Away', 9, 12, 120, 370, 32, 10.91, 32.43, 0, 0, 13, 2, 3, 2),
(40, 'Sri Lanka', 'ODI', 'Home', 11, 9, 105, 240, 28, 11.67, 43.75, 0, 0, 11, 3, 2, 2),
(40, 'Sri Lanka', 'T20', 'Neutral', 6, 6, 75, 110, 22, 12.50, 68.18, 0, 0, 8, 3, 2, 1),
(40, 'Pakistan', 'Test', 'Away', 9, 12, 120, 370, 32, 10.91, 32.43, 0, 0, 13, 2, 3, 2),
(40, 'Pakistan', 'ODI', 'Home', 11, 9, 105, 240, 28, 11.67, 43.75, 0, 0, 11, 3, 2, 2),
(40, 'Pakistan', 'T20', 'Away', 7, 7, 90, 130, 25, 12.50, 69.23, 0, 0, 10, 3, 2, 1),
(40, 'India', 'Test', 'Away', 7, 9, 105, 350, 28, 11.67, 30.00, 0, 0, 12, 2, 3, 2),
(40, 'India', 'ODI', 'Home', 8, 7, 95, 220, 26, 10.56, 43.18, 0, 0, 10, 2, 3, 2),
(40, 'India', 'T20', 'Away', 5, 5, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(40, 'Zimbabwe', 'Test', 'Home', 8, 10, 110, 340, 31, 11.00, 32.35, 0, 0, 12, 3, 2, 2),
(40, 'Zimbabwe', 'ODI', 'Away', 9, 7, 100, 240, 28, 14.29, 41.67, 0, 0, 10, 3, 2, 2),
(40, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 75, 100, 20, 15.00, 75.00, 0, 0, 8, 2, 1, 1),
(40, 'Australia', 'Test', 'Home', 9, 10, 125, 380, 35, 12.50, 32.89, 0, 0, 14, 3, 3, 2),
(40, 'Australia', 'ODI', 'Away', 11, 9, 100, 230, 28, 11.11, 43.48, 0, 0, 11, 3, 2, 2),
(40, 'Australia', 'T20', 'Neutral', 6, 6, 80, 120, 22, 13.33, 66.67, 0, 0, 9, 3, 2, 1),
(18, 'Sri Lanka', 'Test', 'Home', 10, 18, 740, 1400, 120, 29.60, 52.86, 1, 4, 85, 15, 2, 4),
(18, 'Sri Lanka', 'ODI', 'Away', 12, 12, 580, 650, 100, 32.22, 89.23, 1, 3, 68, 18, 1, 3),
(18, 'Sri Lanka', 'T20', 'Neutral', 8, 8, 360, 230, 75, 40.00, 156.52, 0, 2, 40, 20, 0, 2),
(18, 'Pakistan', 'Test', 'Away', 9, 15, 680, 1300, 115, 28.33, 52.31, 1, 3, 78, 18, 2, 3),
(18, 'Pakistan', 'ODI', 'Home', 10, 10, 510, 570, 90, 34.00, 89.47, 0, 3, 65, 16, 1, 2),
(18, 'Pakistan', 'T20', 'Neutral', 7, 7, 350, 250, 70, 38.89, 140.00, 0, 2, 40, 18, 0, 2),
(18, 'Zimbabwe', 'Test', 'Home', 8, 14, 720, 1250, 125, 30.00, 57.60, 1, 4, 80, 15, 1, 4),
(18, 'Zimbabwe', 'ODI', 'Away', 9, 9, 490, 550, 85, 32.67, 89.09, 1, 2, 60, 14, 1, 2),
(18, 'Zimbabwe', 'T20', 'Neutral', 6, 6, 310, 220, 60, 35.00, 140.91, 0, 1, 35, 15, 0, 1),
(18, 'India', 'Test', 'Away', 10, 16, 750, 1400, 130, 31.25, 53.57, 1, 3, 85, 17, 2, 4),
(18, 'India', 'ODI', 'Home', 12, 12, 570, 640, 95, 31.67, 89.06, 0, 3, 72, 18, 1, 3),
(18, 'India', 'T20', 'Neutral', 8, 8, 400, 280, 80, 40.00, 142.86, 0, 2, 42, 20, 0, 2),
(18, 'Australia', 'Test', 'Home', 11, 17, 780, 1450, 140, 30.00, 53.79, 1, 3, 90, 19, 2, 3),
(18, 'Australia', 'ODI', 'Away', 13, 13, 600, 670, 100, 33.33, 89.55, 1, 3, 75, 20, 0, 2),
(18, 'Australia', 'T20', 'Neutral', 9, 9, 420, 300, 85, 42.00, 140.00, 0, 2, 45, 22, 0, 2),
(21, 'Pakistan', 'Test', 'Away', 11, 18, 1050, 2100, 170, 36.21, 50.00, 2, 4, 115, 22, 1, 4),
(21, 'Pakistan', 'ODI', 'Home', 14, 14, 700, 780, 125, 35.00, 89.74, 1, 3, 85, 20, 1, 3),
(21, 'Pakistan', 'T20', 'Neutral', 9, 9, 480, 340, 90, 40.00, 141.18, 0, 2, 50, 22, 0, 2),
(21, 'Zimbabwe', 'Test', 'Home', 10, 16, 1020, 1950, 155, 34.00, 52.31, 2, 4, 110, 20, 1, 4),
(21, 'Zimbabwe', 'ODI', 'Away', 12, 12, 650, 720, 110, 32.50, 90.28, 1, 3, 80, 18, 1, 2),
(21, 'Zimbabwe', 'T20', 'Neutral', 8, 8, 460, 330, 85, 38.33, 139.39, 0, 2, 48, 20, 0, 1),
(21, 'India', 'Test', 'Away', 13, 20, 1120, 2200, 185, 37.33, 50.91, 3, 5, 120, 25, 1, 4),
(21, 'India', 'ODI', 'Home', 16, 16, 750, 860, 135, 35.71, 87.21, 1, 4, 95, 22, 0, 3),
(21, 'India', 'T20', 'Neutral', 10, 10, 500, 370, 95, 41.67, 135.14, 0, 3, 55, 23, 0, 2),
(21, 'Australia', 'Test', 'Home', 12, 18, 1080, 2050, 165, 35.00, 52.68, 2, 4, 118, 23, 1, 3),
(21, 'Australia', 'ODI', 'Away', 14, 14, 720, 810, 120, 34.29, 88.89, 1, 3, 88, 22, 0, 2),
(21, 'Australia', 'T20', 'Neutral', 9, 9, 480, 350, 85, 40.00, 137.14, 0, 2, 50, 24, 0, 2),
(21, 'Sri Lanka', 'Test', 'Away', 12, 20, 1100, 2200, 180, 36.67, 50.00, 3, 5, 120, 25, 1, 5),
(21, 'Sri Lanka', 'ODI', 'Home', 15, 15, 750, 850, 130, 37.50, 88.24, 2, 5, 80, 20, 0, 4),
(21, 'Sri Lanka', 'T20', 'Neutral', 10, 10, 500, 350, 90, 41.67, 142.86, 0, 4, 50, 25, 0, 3);
(33, 'Sri Lanka', 'ODI', 'Away', 14, 14, 700, 800, 110, 35.00, 87.50, 1, 4, 75, 22, 1, 3),
(33, 'Sri Lanka', 'T20', 'Neutral', 9, 9, 420, 280, 85, 42.00, 150.00, 0, 3, 45, 25, 0, 3),
(33, 'Pakistan', 'Test', 'Away', 10, 16, 850, 1700, 140, 31.48, 50.00, 1, 4, 100, 18, 1, 3),
(33, 'Pakistan', 'ODI', 'Home', 12, 12, 620, 700, 100, 34.44, 88.57, 1, 3, 78, 19, 0, 3),
(33, 'Pakistan', 'T20', 'Neutral', 8, 8, 400, 280, 80, 40.00, 142.86, 0, 2, 45, 21, 0, 2),
(33, 'Zimbabwe', 'Test', 'Home', 9, 14, 820, 1600, 135, 32.80, 51.25, 1, 3, 95, 17, 1, 4),
(33, 'Zimbabwe', 'ODI', 'Away', 10, 10, 580, 640, 98, 32.22, 90.63, 1, 3, 72, 18, 0, 2),
(33, 'Zimbabwe', 'T20', 'Neutral', 7, 7, 360, 240, 75, 38.89, 150.00, 0, 2, 40, 19, 0, 2),
(33, 'Australia', 'Test', 'Away', 10, 16, 950, 1800, 155, 35.00, 52.78, 2, 5, 110, 25, 1, 5),
(33, 'Australia', 'ODI', 'Home', 13, 13, 750, 850, 120, 38.46, 88.24, 1, 4, 85, 20, 0, 2),
(33, 'Australia', 'T20', 'Neutral', 8, 8, 500, 320, 90, 62.50, 156.25, 0, 4, 55, 30, 0, 3),
(33, 'Zimbabwe', 'Test', 'Away', 8, 12, 780, 1600, 130, 34.00, 48.75, 1, 4, 90, 15, 0, 2),
(33, 'Zimbabwe', 'ODI', 'Home', 11, 11, 600, 720, 105, 36.36, 83.33, 1, 4, 70, 19, 0, 1),
(33, 'Zimbabwe', 'T20', 'Neutral', 6, 6, 450, 290, 85, 45.00, 155.17, 0, 3, 50, 20, 0, 2);




INSERT INTO BowlingCareerAgainst
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(23, 'Australia', 'ODI', 'Away', 11, 9, 75, 450, 350, 10, 4.67, 35.00, 45.00, 0, 0, '3/55', 5),
(23, 'India', 'ODI', 'Home', 10, 8, 70, 420, 320, 12, 4.57, 26.67, 35.00, 0, 0, '4/40', 4),
(23, 'Pakistan', 'ODI', 'Neutral', 9, 7, 60, 360, 290, 9, 4.83, 32.22, 40.00, 0, 0, '2/45', 3),
(23, 'Zimbabwe', 'ODI', 'Away', 8, 7, 55, 330, 260, 8, 4.73, 32.50, 41.25, 0, 0, '3/50', 2),
(23, 'Sri Lanka', 'ODI', 'Home', 10, 8, 80, 480, 370, 14, 4.63, 26.43, 34.29, 0, 0, '5/60', 6),
(14, 'Sri Lanka', 'Test', 'Home', 4, 8, 40, 240, 120, 15, 3.00, 16.00, 16.00, 1, 0, '5/30', 2),
(14, 'Sri Lanka', 'Test', 'Away', 3, 6, 30, 180, 100, 12, 3.33, 25.00, 15.00, 0, 0, '4/45', 1),
(14, 'India', 'Test', 'Home', 5, 10, 60, 360, 150, 20, 2.50, 18.00, 18.00, 1, 0, '5/40', 5),
(14, 'India', 'Test', 'Away', 4, 8, 50, 300, 130, 15, 2.60, 20.00, 20.00, 0, 0, '4/50', 3),
(14, 'Australia', 'Test', 'Neutral', 3, 6, 36, 216, 90, 12, 2.50, 18.00, 18.00, 1, 0, '5/35', 2),
(14, 'Australia', 'Test', 'Home', 3, 6, 36, 216, 110, 13, 3.06, 16.62, 27.33, 0, 0, '4/45', 2),
(14, 'Pakistan', 'Test', 'Home', 3, 6, 36, 216, 120, 10, 3.33, 21.60, 32.40, 0, 0, '3/55', 2),
(14, 'Pakistan', 'Test', 'Away', 2, 4, 24, 144, 80, 8, 3.33, 18.00, 30.00, 0, 0, '4/60', 1),
(14, 'Zimbabwe', 'Test', 'Away', 2, 4, 24, 144, 75, 9, 3.13, 16.00, 28.00, 0, 0, '4/40', 1),
(14, 'Zimbabwe', 'Test', 'Home', 3, 6, 36, 216, 100, 11, 2.78, 19.64, 24.36, 0, 0, '5/30', 2),
(24, 'Australia', 'T20', 'Home', 7, 7, 25, 150, 180, 6, 7.20, 30.00, 25.00, 0, 0, '3/35', 1),
(24, 'India', 'T20', 'Away', 6, 6, 20, 120, 150, 5, 7.50, 30.00, 24.00, 0, 0, '2/30', 0),
(24, 'Pakistan', 'T20', 'Neutral', 5, 5, 18, 108, 140, 4, 7.78, 35.00, 27.00, 0, 0, '2/25', 0),
(24, 'Zimbabwe', 'T20', 'Home', 4, 4, 16, 96, 110, 3, 6.88, 32.33, 18.00, 0, 0, '2/20', 0),
(24, 'Sri Lanka', 'T20', 'Away', 6, 6, 24, 144, 160, 5, 6.67, 32.00, 20.00, 0, 0, '3/40', 0),
(30, 'Australia', 'Test', 'Home', 10, 12, 40, 240, 180, 20, 4.50, 12.00, 12.00, 1, 0, '5/60', 5),
(30, 'India', 'Test', 'Away', 9, 11, 38, 228, 160, 18, 4.21, 11.11, 12.67, 1, 0, '5/50', 4),
(30, 'Pakistan', 'Test', 'Neutral', 8, 10, 35, 210, 150, 16, 4.29, 9.38, 13.13, 1, 0, '5/55', 3),
(30, 'Zimbabwe', 'Test', 'Home', 6, 8, 30, 180, 140, 14, 4.67, 10.00, 12.86, 0, 0, '4/40', 2),
(30, 'Sri Lanka', 'Test', 'Away', 7, 9, 32, 192, 150, 15, 4.69, 10.00, 12.80, 0, 0, '4/45', 2);

INSERT INTO BowlingCareerAgainst
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(10, 'Australia', 'Test', 'Home', 9, 11, 45, 270, 200, 20, 4.44, 10.00, 13.50, 1, 0, '5/50', 4),
(10, 'Australia', 'ODI', 'Away', 10, 8, 42, 252, 190, 16, 4.52, 11.88, 15.75, 0, 0, '4/35', 3),
(10, 'Australia', 'T20', 'Neutral', 6, 6, 30, 180, 150, 10, 5.00, 15.00, 18.00, 0, 0, '3/25', 1),
(10, 'Sri Lanka', 'Test', 'Home', 9, 10, 40, 240, 180, 19, 4.50, 9.47, 12.63, 1, 0, '5/45', 4),
(10, 'Sri Lanka', 'ODI', 'Away', 11, 9, 48, 288, 210, 15, 4.38, 14.40, 19.20, 0, 0, '4/40', 2),
(10, 'Sri Lanka', 'T20', 'Neutral', 7, 6, 32, 192, 140, 12, 4.38, 11.67, 16.00, 0, 0, '3/30', 2),
(10, 'India', 'Test', 'Away', 8, 10, 36, 216, 160, 18, 4.44, 8.89, 12.00, 1, 0, '5/55', 3),
(10, 'India', 'ODI', 'Home', 9, 8, 40, 240, 180, 14, 4.50, 12.00, 18.00, 0, 0, '4/38', 2),
(10, 'India', 'T20', 'Away', 7, 7, 35, 210, 160, 11, 4.57, 13.64, 19.09, 0, 0, '4/42', 1),
(10, 'Pakistan', 'Test', 'Neutral', 8, 9, 39, 234, 185, 17, 4.67, 10.88, 14.00, 0, 0, '4/48', 3),
(10, 'Pakistan', 'ODI', 'Away', 9, 8, 36, 216, 165, 15, 4.58, 11.00, 17.00, 0, 0, '4/30', 2),
(10, 'Pakistan', 'T20', 'Home', 6, 6, 30, 180, 140, 10, 4.67, 12.00, 18.00, 0, 0, '3/35', 1),
(10, 'Zimbabwe', 'Test', 'Away', 7, 8, 30, 180, 140, 14, 4.67, 10.00, 12.86, 0, 0, '4/36', 2),
(10, 'Zimbabwe', 'ODI', 'Home', 8, 7, 28, 168, 130, 12, 4.65, 11.00, 15.00, 0, 0, '3/40', 1),
(10, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 25, 150, 120, 8, 4.80, 11.88, 17.50, 0, 0, '3/30', 1);

INSERT INTO BowlingCareerAgainst
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens)
VALUES
(15, 'Sri Lanka', 'Test', 'Home', 6, 10, 58.2, 350, 380, 18, 6.52, 21.11, 33.33, 1, 0, '5/40', 12),
(15, 'Sri Lanka', 'ODI', 'Away', 8, 10, 41.4, 250, 290, 14, 6.96, 20.71, 35.71, 0, 0, '4/29', 8),
(15, 'Sri Lanka', 'T20', 'Neutral', 5, 6, 23.2, 140, 130, 9, 5.57, 14.44, 31.11, 0, 0, '3/18', 5),
(15, 'Australia', 'Test', 'Away', 5, 8, 51.4, 310, 330, 15, 6.39, 22.00, 32.22, 0, 0, '4/35', 10),
(15, 'Australia', 'ODI', 'Home', 7, 9, 40.0, 240, 280, 12, 7.00, 23.33, 40.00, 0, 0, '3/30', 7),
(15, 'Australia', 'T20', 'Away', 4, 5, 20.0, 120, 115, 7, 5.75, 16.43, 34.29, 0, 0, '3/22', 4),
(15, 'India', 'Test', 'Home', 7, 11, 63.2, 380, 420, 20, 6.63, 21.00, 31.82, 1, 0, '6/45', 13),
(15, 'India', 'ODI', 'Away', 6, 8, 35.0, 210, 250, 11, 7.14, 22.73, 38.18, 0, 0, '3/28', 6),
(15, 'India', 'T20', 'Home', 5, 6, 23.2, 140, 120, 9, 5.14, 13.33, 30.00, 0, 0, '3/20', 5),
(15, 'Pakistan', 'Test', 'Neutral', 4, 7, 43.2, 260, 280, 13, 6.46, 21.54, 33.33, 0, 0, '4/42', 9),
(15, 'Pakistan', 'ODI', 'Neutral', 5, 6, 33.2, 200, 230, 9, 6.90, 25.56, 44.44, 0, 0, '2/34', 6),
(15, 'Pakistan', 'T20', 'Home', 3, 4, 16.4, 100, 95, 6, 5.71, 15.83, 35.71, 0, 0, '2/18', 3),
(15, 'Zimbabwe', 'Test', 'Away', 5, 9, 53.2, 320, 340, 17, 6.38, 20.00, 30.30, 1, 0, '5/38', 11),
(15, 'Zimbabwe', 'ODI', 'Home', 6, 7, 38.2, 230, 260, 11, 6.78, 23.64, 41.82, 0, 0, '3/25', 8),
(15, 'Zimbabwe', 'T20', 'Neutral', 3, 5, 18.2, 110, 105, 7, 5.73, 15.00, 31.43, 0, 0, '2/15', 4);

INSERT INTO BowlingCareerAgainst
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens)
VALUES
(22, 'Sri Lanka', 'Test', 'Away', 8, 9, 115, 350, 30, 11.50, 32.86, 0, 0, 12, 3, 3, 2),
(22, 'Sri Lanka', 'ODI', 'Home', 9, 7, 100, 230, 28, 12.50, 43.48, 1, 0, 11, 3, 2, 1),
(22, 'Sri Lanka', 'T20', 'Neutral', 7, 6, 85, 120, 22, 14.17, 70.83, 0, 0, 9, 3, 2, 1),
(22, 'Australia', 'Test', 'Home', 9, 11, 140, 420, 38, 12.73, 33.33, 1, 0, 15, 4, 2, 2),
(22, 'Australia', 'ODI', 'Away', 10, 8, 125, 275, 35, 13.89, 45.45, 1, 0, 13, 5, 3, 2),
(22, 'Australia', 'T20', 'Neutral', 6, 6, 90, 130, 22, 13.50, 69.23, 0, 0, 10, 3, 2, 1),
(22, 'India', 'Test', 'Away', 8, 10, 135, 400, 37, 13.50, 33.75, 1, 0, 14, 3, 2, 2),
(22, 'India', 'ODI', 'Home', 9, 8, 115, 260, 30, 12.78, 44.23, 1, 0, 12, 4, 2, 2),
(22, 'India', 'T20', 'Away', 7, 7, 85, 125, 21, 12.14, 68.00, 0, 0, 9, 2, 2, 1),
(22, 'Pakistan', 'Test', 'Away', 9, 11, 145, 410, 39, 13.18, 35.37, 1, 0, 16, 4, 3, 2),
(22, 'Pakistan', 'ODI', 'Home', 10, 9, 120, 270, 32, 12.00, 44.44, 1, 0, 13, 4, 3, 2),
(22, 'Pakistan', 'T20', 'Neutral', 6, 6, 88, 130, 23, 14.67, 67.69, 0, 0, 10, 3, 2, 1),
(22, 'Zimbabwe', 'Test', 'Home', 8, 10, 138, 390, 36, 13.80, 35.38, 1, 0, 15, 4, 2, 2),
(22, 'Zimbabwe', 'ODI', 'Away', 9, 8, 110, 250, 29, 12.22, 44.00, 1, 0, 12, 3, 2, 2),
(22, 'Zimbabwe', 'T20', 'Neutral', 7, 6, 80, 115, 20, 13.33, 69.57, 0, 0, 8, 3, 2, 1);

INSERT INTO BowlingCareerAgainst
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(29, 'Sri Lanka', 'Test', 'Away', 7, 9, 105, 320, 28, 11.20, 30.91, 0, 0, 11, 3, 2, 2),
(29, 'Sri Lanka', 'ODI', 'Home', 8, 7, 90, 200, 25, 11.50, 42.00, 0, 0, 9, 3, 2, 1),
(29, 'Sri Lanka', 'T20', 'Neutral', 5, 5, 55, 85, 15, 9.82, 65.00, 0, 0, 6, 2, 1, 1),
(29, 'Pakistan', 'Test', 'Neutral', 7, 8, 120, 360, 32, 12.00, 33.75, 0, 0, 12, 3, 3, 2),
(29, 'Pakistan', 'ODI', 'Away', 8, 7, 95, 220, 26, 10.89, 42.31, 0, 0, 10, 3, 2, 2),
(29, 'Pakistan', 'T20', 'Home', 6, 6, 70, 105, 19, 11.43, 66.32, 0, 0, 7, 2, 1, 1),
(29, 'Zimbabwe', 'Test', 'Away', 6, 7, 110, 320, 30, 11.25, 33.33, 0, 0, 11, 3, 2, 2),
(29, 'Zimbabwe', 'ODI', 'Home', 7, 6, 88, 195, 24, 10.80, 41.88, 0, 0, 9, 2, 3, 2),
(29, 'Zimbabwe', 'T20', 'Neutral', 4, 4, 65, 95, 17, 10.74, 67.06, 0, 0, 6, 2, 2, 1),
(29, 'India', 'Test', 'Away', 7, 8, 115, 350, 31, 11.50, 33.33, 0, 0, 12, 3, 3, 2),
(29, 'India', 'ODI', 'Home', 8, 7, 100, 230, 27, 11.00, 42.59, 0, 0, 10, 3, 2, 2),
(29, 'India', 'T20', 'Neutral', 6, 6, 75, 105, 20, 12.00, 68.75, 0, 0, 8, 2, 2, 1),
(29, 'Australia', 'Test', 'Neutral', 6, 7, 110, 320, 29, 11.38, 33.91, 0, 0, 12, 3, 3, 2),
(29, 'Australia', 'ODI', 'Away', 7, 6, 92, 210, 25, 10.86, 42.00, 0, 0, 9, 3, 2, 2),
(29, 'Australia', 'T20', 'Home', 5, 5, 68, 100, 18, 10.59, 66.67, 0, 0, 7, 2, 2, 1);

INSERT INTO BowlingCareerAgainst
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(36, 'Sri Lanka', 'Test', 'Away', 8, 10, 110, 350, 30, 11.00, 31.43, 0, 0, 12, 3, 3, 2),
(36, 'Sri Lanka', 'ODI', 'Home', 9, 7, 95, 220, 27, 11.88, 43.18, 0, 0, 10, 3, 2, 1),
(36, 'Sri Lanka', 'T20', 'Neutral', 5, 5, 60, 90, 17, 10.00, 66.67, 0, 0, 6, 2, 1, 1),
(36, 'India', 'Test', 'Home', 9, 11, 130, 380, 36, 11.82, 34.21, 0, 1, 14, 3, 4, 3),
(36, 'India', 'ODI', 'Away', 10, 8, 120, 250, 28, 13.33, 48.00, 0, 0, 13, 4, 3, 2),
(36, 'India', 'T20', 'Neutral', 5, 5, 60, 90, 17, 10.00, 66.67, 0, 0, 6, 2, 1, 1),
(36, 'Australia', 'Test', 'Home', 8, 9, 110, 370, 30, 12.22, 29.73, 0, 0, 12, 3, 3, 2),
(36, 'Australia', 'ODI', 'Away', 9, 8, 100, 240, 28, 11.11, 41.67, 0, 0, 11, 3, 2, 2),
(36, 'Australia', 'T20', 'Neutral', 6, 6, 80, 115, 21, 13.33, 69.57, 0, 0, 9, 2, 1, 1),
(36, 'Pakistan', 'Test', 'Neutral', 8, 10, 125, 400, 34, 12.50, 31.25, 0, 0, 14, 4, 3, 2),
(36, 'Pakistan', 'ODI', 'Home', 9, 8, 110, 250, 29, 13.75, 44.00, 0, 0, 12, 4, 3, 2),
(36, 'Pakistan', 'T20', 'Away', 5, 5, 70, 100, 18, 14.00, 70.00, 0, 0, 8, 2, 2, 1),
(36, 'Zimbabwe', 'Test', 'Away', 7, 8, 115, 360, 32, 12.88, 31.94, 0, 0, 13, 3, 2, 2),
(36, 'Zimbabwe', 'ODI', 'Home', 8, 7, 90, 220, 25, 12.50, 40.91, 0, 0, 9, 3, 3, 2),
(36, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 65, 95, 20, 13.00, 68.42, 0, 0, 7, 2, 1, 1);

INSERT INTO BowlingCareerAgainst
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(38, 'Sri Lanka', 'Test', 'Home', 9, 10, 135, 410, 38, 15, 3.04, 10.79, 12.73, 1, 0, '5/60', 4),
(38, 'Sri Lanka', 'ODI', 'Away', 11, 9, 115, 230, 34, 13, 5.00, 25.00, 13.53, 0, 0, '4/45', 3),
(38, 'Sri Lanka', 'T20', 'Neutral', 7, 6, 85, 170, 24, 8, 4.80, 21.25, 16.88, 0, 0, '3/30', 1),
(38, 'Pakistan', 'Test', 'Away', 8, 9, 125, 380, 34, 14, 3.20, 11.12, 13.25, 1, 0, '5/50', 3),
(38, 'Pakistan', 'ODI', 'Home', 10, 8, 115, 260, 30, 12, 4.62, 21.67, 18.00, 0, 0, '4/38', 2),
(38, 'Pakistan', 'T20', 'Neutral', 6, 6, 75, 150, 22, 9, 5.12, 20.00, 16.67, 0, 0, '3/28', 1),
(38, 'Zimbabwe', 'Test', 'Home', 7, 8, 140, 360, 36, 14, 3.00, 10.00, 13.00, 0, 0, '5/55', 4),
(38, 'Zimbabwe', 'ODI', 'Away', 9, 7, 100, 230, 27, 10, 5.00, 24.00, 18.00, 0, 0, '3/35', 1),
(38, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 70, 100, 19, 8, 5.50, 23.75, 20.00, 0, 0, '2/20', 1),
(38, 'India', 'Test', 'Away', 8, 10, 145, 410, 40, 15, 3.45, 10.25, 12.15, 1, 0, '5/45', 4),
(38, 'India', 'ODI', 'Home', 10, 9, 120, 280, 34, 12, 4.40, 23.33, 18.67, 0, 0, '4/36', 3),
(38, 'India', 'T20', 'Neutral', 6, 6, 85, 125, 24, 11, 4.88, 22.00, 19.00, 0, 0, '3/32', 1),
(38, 'Australia', 'Test', 'Home', 9, 11, 140, 450, 39, 15, 3.20, 11.54, 12.68, 0, 0, '5/50', 4),
(38, 'Australia', 'ODI', 'Away', 10, 8, 115, 260, 30, 12, 4.67, 21.67, 19.00, 0, 0, '4/40', 2),
(38, 'Australia', 'T20', 'Neutral', 7, 6, 90, 130, 23, 11, 5.17, 24.00, 20.00, 0, 0, '3/38', 1);

INSERT INTO BowlingCareerAgainst
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(40, 'Sri Lanka', 'Test', 'Away', 9, 12, 120, 370, 32, 10, 2.67, 37.00, 12.50, 0, 0, '4/65', 3),
(40, 'Sri Lanka', 'ODI', 'Home', 11, 9, 105, 240, 28, 11, 4.90, 30.00, 14.00, 0, 0, '3/50', 2),
(40, 'Sri Lanka', 'T20', 'Neutral', 6, 6, 75, 110, 22, 8, 4.53, 29.00, 17.50, 0, 0, '2/24', 1),
(40, 'Pakistan', 'Test', 'Away', 9, 12, 120, 370, 32, 10, 2.67, 37.00, 12.50, 0, 0, '4/65', 3),
(40, 'Pakistan', 'ODI', 'Home', 11, 9, 105, 240, 28, 11, 4.90, 30.00, 14.00, 0, 0, '3/50', 2),
(40, 'Pakistan', 'T20', 'Away', 7, 7, 90, 130, 25, 9, 4.19, 35.00, 15.00, 0, 0, '3/26', 1),
(40, 'India', 'Test', 'Away', 7, 9, 105, 350, 28, 10, 3.52, 35.00, 14.00, 0, 0, '4/70', 3),
(40, 'India', 'ODI', 'Home', 8, 7, 95, 220, 26, 9, 5.00, 24.44, 18.00, 0, 0, '3/40', 2),
(40, 'India', 'T20', 'Away', 5, 5, 70, 100, 19, 6, 5.00, 20.00, 16.67, 0, 0, '2/15', 1),
(40, 'Zimbabwe', 'Test', 'Home', 8, 10, 110, 340, 31, 11, 3.13, 30.91, 15.00, 0, 0, '4/60', 2),
(40, 'Zimbabwe', 'ODI', 'Away', 9, 7, 100, 240, 28, 10, 4.20, 24.00, 20.00, 0, 0, '3/38', 2),
(40, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 75, 100, 20, 8, 5.00, 23.75, 22.50, 0, 0, '2/30', 1),
(40, 'Australia', 'Test', 'Home', 9, 10, 125, 380, 35, 12, 3.80, 31.14, 13.00, 0, 0, '4/68', 3),
(40, 'Australia', 'ODI', 'Away', 11, 9, 100, 230, 28, 11, 4.73, 30.00, 18.00, 0, 0, '3/47', 2),
(40, 'Australia', 'T20', 'Neutral', 6, 6, 80, 120, 22, 9, 6.00, 30.00, 20.00, 0, 0, '2/35', 1);

INSERT INTO BowlingCareerAgainst
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(18, 'Sri Lanka', 'Test', 'Home', 10, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0, 0, '0/0', 0),
(18, 'Sri Lanka', 'ODI', 'Away', 12, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0, 0, '0/0', 0),
(18, 'Sri Lanka', 'T20', 'Neutral', 8, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0, 0, '0/0', 0),
(18, 'Pakistan', 'Test', 'Away', 9, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0, 0, '0/0', 0),
(18, 'Pakistan', 'ODI', 'Home', 10, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0, 0, '0/0', 0),
(18, 'Pakistan', 'T20', 'Neutral', 7, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0, 0, '0/0', 0),
(18, 'Zimbabwe', 'Test', 'Home', 8, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0, 0, '0/0', 0),
(18, 'Zimbabwe', 'ODI', 'Away', 9, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0, 0, '0/0', 0),
(18, 'Zimbabwe', 'T20', 'Neutral', 6, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0, 0, '0/0', 0),
(18, 'India', 'Test', 'Away', 10, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0, 0, '0/0', 0),
(18, 'India', 'ODI', 'Home', 12, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0, 0, '0/0', 0),
(18, 'India', 'T20', 'Neutral', 8, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0, 0, '0/0', 0),
(18, 'Australia', 'Test', 'Home', 11, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0, 0, '0/0', 0),
(18, 'Australia', 'ODI', 'Away', 13, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0, 0, '0/0', 0),
(18, 'Australia', 'T20', 'Neutral', 9, 0, 0, 0, 0, 0, 0.00, 0.00, 0.00, 0, 0, '0/0', 0),
(21, 'Sri Lanka', 'Test', 'Home', 1, 0, 5, 10, 1, 5.00, 0.00, 0, 0, 0, 0, 0, 0),
(21, 'Sri Lanka', 'ODI', 'Away', 1, 0, 5, 10, 1, 5.00, 0.00, 0, 0, 0, 0, 0, 0),
(21, 'Sri Lanka', 'T20', 'Neutral', 1, 0, 5, 5, 1, 5.00, 0.00, 0, 0, 0, 0, 0, 0),
(21, 'Pakistan', 'Test', 'Away', 1, 0, 4, 8, 1, 4.00, 0.00, 0, 0, 0, 0, 0, 0),
(21, 'Pakistan', 'ODI', 'Home', 1, 0, 5, 10, 1, 5.00, 0.00, 0, 0, 0, 0, 0, 0),
(21, 'Pakistan', 'T20', 'Neutral', 1, 0, 3, 5, 1, 5.00, 0.00, 0, 0, 0, 0, 0, 0),
(21, 'Zimbabwe', 'Test', 'Home', 1, 0, 5, 10, 1, 5.00, 0.00, 0, 0, 0, 0, 0, 0),
(21, 'Zimbabwe', 'ODI', 'Away', 1, 0, 4, 8, 1, 4.00, 0.00, 0, 0, 0, 0, 0, 0),
(21, 'Zimbabwe', 'T20', 'Neutral', 1, 0, 3, 5, 1, 5.00, 0.00, 0, 0, 0, 0, 0, 0),
(21, 'India', 'Test', 'Away', 1, 0, 4, 8, 1, 4.00, 0.00, 0, 0, 0, 0, 0, 0),
(21, 'India', 'ODI', 'Home', 1, 0, 5, 10, 1, 5.00, 0.00, 0, 0, 0, 0, 0, 0),
(21, 'India', 'T20', 'Neutral', 1, 0, 3, 5, 1, 5.00, 0.00, 0, 0, 0, 0, 0, 0),
(21, 'Australia', 'Test', 'Home', 1, 0, 5, 10, 1, 5.00, 0.00, 0, 0, 0, 0, 0, 0),
(21, 'Australia', 'ODI', 'Away', 1, 0, 5, 10, 1, 5.00, 0.00, 0, 0, 0, 0, 0, 0),
(21, 'Australia', 'T20', 'Neutral', 1, 0, 3, 5, 1, 5.00, 0.00, 0, 0, 0, 0, 0, 0);

INSERT INTO BowlingCareerAgainst
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(33, 'Sri Lanka', 'Test', 'Home', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 'Sri Lanka', 'ODI', 'Away', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 'Sri Lanka', 'T20', 'Neutral', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 'Pakistan', 'Test', 'Away', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 'Pakistan', 'ODI', 'Home', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 'Pakistan', 'T20', 'Neutral', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 'Zimbabwe', 'Test', 'Home', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 'Zimbabwe', 'ODI', 'Away', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 'Zimbabwe', 'T20', 'Neutral', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 'Australia', 'Test', 'Away', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 'Australia', 'ODI', 'Home', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 'Australia', 'T20', 'Neutral', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 'India', 'Test', 'Home', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 'India', 'ODI', 'Away', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 'India', 'T20', 'Neutral', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);


🏏 Nahid Rana (ODI Specialist - ID 23)

INSERT INTO BattingCareerAgainst
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts)
VALUES
(23, 'Australia', 'ODI', 'Away', 11, 9, 95, 230, 28, 10.56, 41.30, 0, 0, 10, 2, 3, 2),
(23, 'India', 'ODI', 'Home', 10, 8, 85, 210, 26, 10.00, 40.48, 0, 0, 9, 2, 3, 2),
(23, 'Pakistan', 'ODI', 'Neutral', 9, 7, 90, 220, 25, 10.00, 40.91, 0, 0, 10, 2, 3, 2),
(23, 'Zimbabwe', 'ODI', 'Away', 8, 7, 80, 200, 23, 9.71, 40.00, 0, 0, 9, 1, 3, 2),
(23, 'Sri Lanka', 'ODI', 'Home', 10, 8, 100, 230, 28, 11.11, 43.48, 0, 0, 11, 3, 2, 1),
(14, 'Australia', 'Test', 'Home', 5, 6, 60, 180, 20, 10.00, 33.33, 0, 0, 6, 1, 2, 1),
(14, 'India', 'Test', 'Away', 4, 5, 50, 150, 15, 10.00, 33.33, 0, 0, 5, 1, 2, 1),
(14, 'Pakistan', 'Test', 'Neutral', 3, 4, 40, 120, 12, 10.00, 33.33, 0, 0, 4, 0, 1, 0),
(14, 'Zimbabwe', 'Test', 'Home', 2, 3, 30, 90, 10, 10.00, 33.33, 0, 0, 3, 0, 1, 0),
(14, 'Sri Lanka', 'Test', 'Away', 3, 4, 20, 60, 8, 5.00, 33.33, 0, 0, 2, 0, 2, 0),
(24, 'Australia', 'T20', 'Home', 7, 7, 85, 120, 24, 12.14, 70.83, 0, 0, 9, 3, 2, 1),
(24, 'India', 'T20', 'Away', 6, 6, 75, 110, 22, 11.67, 68.18, 0, 0, 8, 2, 2, 1),
(24, 'Pakistan', 'T20', 'Neutral', 5, 5, 80, 115, 21, 12.50, 69.57, 0, 0, 9, 3, 2, 1),
(24, 'Zimbabwe', 'T20', 'Home', 4, 4, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(24, 'Sri Lanka', 'T20', 'Away', 6, 6, 90, 130, 25, 12.50, 69.23, 0, 0, 10, 3, 2, 1),
(30, 'Australia', 'Test', 'Home', 10, 12, 130, 380, 36, 10.83, 34.21, 0, 0, 14, 3, 4, 3),
(30, 'India', 'Test', 'Away', 9, 11, 120, 370, 32, 10.91, 32.43, 0, 0, 13, 2, 3, 2),
(30, 'Pakistan', 'Test', 'Neutral', 8, 10, 110, 350, 30, 11.00, 31.43, 0, 0, 12, 3, 3, 2),
(30, 'Zimbabwe', 'Test', 'Home', 6, 8, 100, 320, 28, 10.71, 31.25, 0, 0, 11, 2, 2, 2),
(30, 'Sri Lanka', 'Test', 'Away', 7, 9, 115, 340, 29, 11.50, 32.35, 0, 0, 12, 3, 2, 2),
(33, 'Sri Lanka', 'Test', 'Home', 11, 19, 900, 1800, 150, 32.14, 50.00, 2, 5, 100, 20, 1, 4),
(33, 'Sri Lanka', 'ODI', 'Away', 14, 14, 700, 800, 110, 35.00, 87.50, 1, 4, 75, 22, 1, 3),
(33, 'Sri Lanka', 'T20', 'Neutral', 9, 9, 420, 280, 85, 42.00, 150.00, 0, 3, 45, 25, 0, 3),
(33, 'Pakistan', 'Test', 'Away', 10, 16, 850, 1700, 140, 31.48, 50.00, 1, 4, 100, 18, 1, 3),
(33, 'Pakistan', 'ODI', 'Home', 12, 12, 620, 700, 100, 34.44, 88.57, 1, 3, 78, 19, 0, 3),
(33, 'Pakistan', 'T20', 'Neutral', 8, 8, 400, 280, 80, 40.00, 142.86, 0, 2, 45, 21, 0, 2),
(33, 'Zimbabwe', 'Test', 'Home', 9, 14, 820, 1600, 135, 32.80, 51.25, 1, 3, 95, 17, 1, 4),
(33, 'Zimbabwe', 'ODI', 'Away', 10, 10, 580, 640, 98, 32.22, 90.63, 1, 3, 72, 18, 0, 2),
(33, 'Zimbabwe', 'T20', 'Neutral', 7, 7, 360, 240, 75, 38.89, 150.00, 0, 2, 40, 19, 0, 2),
(33, 'Australia', 'Test', 'Away', 10, 16, 950, 1800, 155, 35.00, 52.78, 2, 5, 110, 25, 1, 5),
(33, 'Australia', 'ODI', 'Home', 13, 13, 750, 850, 120, 38.46, 88.24, 1, 4, 85, 20, 0, 2),
(33, 'Australia', 'T20', 'Neutral', 8, 8, 500, 320, 90, 62.50, 156.25, 0, 4, 55, 30, 0, 3),
(33, 'Zimbabwe', 'Test', 'Away', 8, 12, 780, 1600, 130, 34.00, 48.75, 1, 4, 90, 15, 0, 2),
(10, 'Australia', 'Test', 'Home', 9, 11, 125, 400, 30, 11.36, 31.25, 0, 0, 13, 3, 3, 2),
(10, 'Australia', 'ODI', 'Away', 10, 8, 110, 250, 28, 13.33, 44.00, 0, 0, 12, 4, 3, 2),
(10, 'Australia', 'T20', 'Neutral', 6, 6, 80, 115, 21, 13.33, 69.57, 0, 0, 9, 2, 1, 1),
(10, 'Sri Lanka', 'Test', 'Home', 9, 10, 125, 400, 35, 13.89, 31.25, 0, 1, 14, 2, 3, 2),
(10, 'Sri Lanka', 'ODI', 'Away', 11, 9, 110, 250, 30, 12.22, 44.00, 0, 0, 12, 3, 2, 1),
(10, 'Sri Lanka', 'T20', 'Neutral', 7, 6, 80, 120, 20, 13.33, 66.67, 0, 0, 9, 3, 2, 1),
(10, 'India', 'Test', 'Away', 8, 10, 115, 370, 32, 11.50, 31.08, 0, 0, 12, 3, 2, 2),
(10, 'India', 'ODI', 'Home', 9, 8, 105, 240, 28, 11.67, 43.75, 0, 0, 11, 3, 2, 2),
(10, 'India', 'T20', 'Away', 7, 7, 85, 130, 22, 12.14, 65.38, 0, 0, 9, 3, 1, 1),
(10, 'Pakistan', 'Test', 'Neutral', 8, 9, 130, 390, 35, 12.50, 33.33, 0, 0, 13, 3, 3, 2),
(10, 'Pakistan', 'ODI', 'Away', 9, 8, 100, 230, 27, 11.11, 43.48, 0, 0, 11, 3, 2, 2),
(10, 'Pakistan', 'T20', 'Home', 6, 6, 75, 110, 21, 12.50, 68.18, 0, 0, 8, 2, 1, 1),
(10, 'Zimbabwe', 'Test', 'Away', 7, 8, 120, 350, 33, 12.00, 34.29, 0, 0, 12, 3, 2, 2),
(10, 'Zimbabwe', 'ODI', 'Home', 8, 7, 95, 220, 26, 10.56, 43.18, 0, 0, 10, 2, 3, 2),
(10, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(15, 'Sri Lanka', 'Test', 'Home', 9, 10, 130, 380, 32, 12.00, 34.21, 0, 1, 13, 2, 3, 2),
(15, 'Sri Lanka', 'ODI', 'Away', 10, 8, 105, 240, 28, 11.67, 43.75, 0, 0, 11, 3, 2, 1),
(15, 'Sri Lanka', 'T20', 'Neutral', 6, 6, 70, 100, 18, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(15, 'Australia', 'Test', 'Home', 8, 9, 110, 370, 30, 12.22, 29.73, 0, 0, 12, 3, 3, 2), 
(15, 'Australia', 'ODI', 'Away', 9, 8, 100, 240, 28, 11.11, 41.67, 0, 0, 11, 3, 2, 2), 
(15, 'Australia', 'T20', 'Neutral', 6, 6, 80, 115, 21, 13.33, 69.57, 0, 0, 9, 2, 1, 1), 
(15, 'India', 'Test', 'Away', 7, 9, 105, 350, 28, 11.67, 30.00, 0, 0, 12, 2, 3, 2), 
(15, 'India', 'ODI', 'Home', 8, 7, 95, 220, 26, 10.56, 43.18, 0, 0, 10, 2, 3, 2), 
(15, 'India', 'T20', 'Away', 5, 5, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1), 
(15, 'Pakistan', 'Test', 'Neutral', 6, 8, 110, 360, 31, 12.50, 30.56, 0, 0, 11, 3, 2, 2), 
(15, 'Pakistan', 'ODI', 'Away', 7, 7, 90, 210, 25, 10.00, 42.86, 0, 0, 10, 2, 3, 2), 
(15, 'Pakistan', 'T20', 'Home', 4, 4, 55, 85, 16, 10.00, 64.71, 0, 0, 6, 2, 1, 1), 
(15, 'Zimbabwe', 'Test', 'Away', 5, 7, 100, 330, 29, 11.43, 30.30, 0, 0, 10, 3, 2, 2), 
(15, 'Zimbabwe', 'ODI', 'Home', 6, 6, 85, 200, 24, 10.63, 42.50, 0, 0, 9, 2, 3, 2), 
(15, 'Zimbabwe', 'T20', 'Neutral', 3, 3, 50, 75, 15, 10.00, 66.67, 0, 0, 5, 1, 1, 1),
(22, 'Sri Lanka', 'Test', 'Away', 8, 9, 115, 350, 30, 11.50, 32.86, 0, 0, 12, 3, 3, 2),
(22, 'Sri Lanka', 'ODI', 'Home', 9, 7, 100, 230, 28, 12.50, 43.48, 0, 0, 11, 3, 2, 1),
(22, 'Sri Lanka', 'T20', 'Neutral', 7, 6, 85, 120, 22, 14.17, 70.83, 0, 0, 9, 3, 2, 1),
(22, 'Australia', 'Test', 'Home', 9, 11, 140, 420, 38, 12.73, 33.33, 0, 0, 15, 4, 2, 2),
(22, 'Australia', 'ODI', 'Away', 10, 8, 125, 275, 35, 13.89, 45.45, 0, 0, 13, 5, 3, 2),
(22, 'Australia', 'T20', 'Neutral', 6, 6, 90, 130, 22, 13.50, 69.23, 0, 0, 10, 3, 2, 1),
(22, 'India', 'Test', 'Away', 8, 10, 135, 400, 37, 13.50, 33.75, 0, 0, 14, 3, 2, 2),
(22, 'India', 'ODI', 'Home', 9, 8, 115, 260, 30, 12.78, 44.23, 0, 0, 12, 4, 2, 2),
(22, 'India', 'T20', 'Away', 7, 7, 85, 125, 21, 12.14, 68.00, 0, 0, 9, 2, 2, 1),
(22, 'Pakistan', 'Test', 'Away', 9, 11, 145, 410, 39, 13.18, 35.37, 0, 0, 16, 4, 3, 2), 
(22, 'Pakistan', 'ODI', 'Home', 10, 9, 120, 270, 32, 12.00, 44.44, 0, 0, 13, 4, 3, 2), 
(22, 'Pakistan', 'T20', 'Neutral', 6, 6, 88, 130, 23, 14.67, 67.69, 0, 0, 10, 3, 2, 1),
(22, 'Zimbabwe', 'Test', 'Home', 8, 10, 138, 390, 36, 13.80, 35.38, 0, 0, 15, 4, 2, 2), 
(22, 'Zimbabwe', 'ODI', 'Away', 9, 8, 110, 250, 29, 12.22, 44.00, 0, 0, 12, 3, 2, 2), 
(22, 'Zimbabwe', 'T20', 'Neutral', 7, 6, 80, 115, 20, 13.33, 69.57, 0, 0, 8, 3, 2, 1),
(29, 'Sri Lanka', 'Test', 'Away', 8, 10, 110, 350, 30, 11.00, 31.43, 0, 0, 12, 3, 3, 2),
(29, 'Sri Lanka', 'ODI', 'Home', 9, 7, 95, 220, 27, 11.88, 43.18, 0, 0, 10, 3, 2, 1),
(29, 'Sri Lanka', 'T20', 'Neutral', 5, 5, 60, 90, 17, 10.00, 66.67, 0, 0, 6, 2, 1, 1),
(29, 'Pakistan', 'Test', 'Neutral', 8, 9, 130, 390, 35, 12.50, 33.33, 0, 0, 13, 3, 3, 2),
(29, 'Pakistan', 'ODI', 'Away', 9, 8, 100, 230, 27, 11.11, 43.48, 0, 0, 11, 3, 2, 2),
(29, 'Pakistan', 'T20', 'Home', 6, 6, 75, 110, 21, 12.50, 68.18, 0, 0, 8, 2, 1, 1),
(29, 'Zimbabwe', 'Test', 'Away', 7, 8, 120, 350, 33, 12.00, 34.29, 0, 0, 12, 3, 2, 2),
(29, 'Zimbabwe', 'ODI', 'Home', 8, 7, 95, 220, 26, 10.56, 43.18, 0, 0, 10, 2, 3, 2),
(29, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(29, 'India', 'Test', 'Away', 8, 9, 125, 370, 34, 11.36, 33.78, 0, 0, 14, 3, 3, 2), 
(29, 'India', 'ODI', 'Home', 9, 8, 105, 240, 29, 11.67, 43.75, 0, 0, 11, 3, 2, 2), 
(29, 'India', 'T20', 'Neutral', 6, 6, 80, 110, 22, 13.33, 72.73, 0, 0, 9, 3, 2, 1), 
(29, 'Australia', 'Test', 'Neutral', 7, 8, 115, 340, 31, 11.50, 33.82, 0, 0, 13, 3, 3, 2), 
(29, 'Australia', 'ODI', 'Away', 8, 7, 98, 225, 28, 10.89, 43.56, 0, 0, 10, 3, 2, 2), 
(29, 'Australia', 'T20', 'Home', 5, 5, 72, 105, 20, 12.00, 68.57, 0, 0, 8, 2, 2, 1),
(36, 'Sri Lanka', 'Test', 'Away', 8, 10, 110, 350, 30, 11.00, 31.43, 0, 0, 12, 3, 3, 2),
(36, 'Sri Lanka', 'ODI', 'Home', 9, 7, 95, 220, 27, 11.88, 43.18, 0, 0, 10, 3, 2, 1),
(36, 'Sri Lanka', 'T20', 'Neutral', 5, 5, 60, 90, 17, 10.00, 66.67, 0, 0, 6, 2, 1, 1),
(36, 'India', 'Test', 'Home', 9, 11, 130, 380, 36, 11.82, 34.21, 0, 1, 14, 3, 4, 3),
(36, 'India', 'ODI', 'Away', 10, 8, 120, 250, 28, 13.33, 48.00, 0, 0, 13, 4, 3, 2),
(36, 'India', 'T20', 'Neutral', 5, 5, 60, 90, 17, 10.00, 66.67, 0, 0, 6, 2, 1, 1),
(36, 'Australia', 'Test', 'Home', 8, 9, 110, 370, 30, 12.22, 29.73, 0, 0, 12, 3, 3, 2),
(36, 'Australia', 'ODI', 'Away', 9, 8, 100, 240, 28, 11.11, 41.67, 0, 0, 11, 3, 2, 2),
(36, 'Australia', 'T20', 'Neutral', 6, 6, 80, 115, 21, 13.33, 69.57, 0, 0, 9, 2, 1, 1),
(36, 'Pakistan', 'Test', 'Neutral', 8, 10, 125, 400, 34, 12.50, 31.25, 0, 0, 14, 4, 3, 2), 
(36, 'Pakistan', 'ODI', 'Home', 9, 8, 110, 250, 29, 13.75, 44.00, 0, 0, 12, 4, 3, 2), 
(36, 'Pakistan', 'T20', 'Away', 5, 5, 70, 100, 18, 14.00, 70.00, 0, 0, 8, 2, 2, 1), 
(36, 'Zimbabwe', 'Test', 'Away', 7, 8, 115, 360, 32, 12.88, 31.94, 0, 0, 13, 3, 2, 2), 
(36, 'Zimbabwe', 'ODI', 'Home', 8, 7, 90, 220, 25, 12.50, 40.91, 0, 0, 9, 3, 3, 2), 
(36, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 65, 95, 20, 13.00, 68.42, 0, 0, 7, 2, 1, 1),
(38, 'Sri Lanka', 'Test', 'Home', 9, 10, 125, 400, 35, 13.89, 31.25, 0, 1, 14, 2, 3, 2),
(38, 'Sri Lanka', 'ODI', 'Away', 11, 9, 110, 250, 30, 12.22, 44.00, 0, 0, 12, 3, 2, 1),
(38, 'Sri Lanka', 'T20', 'Neutral', 7, 6, 80, 120, 20, 13.33, 66.67, 0, 0, 9, 3, 2, 1),
(38, 'Pakistan', 'Test', 'Away', 8, 9, 120, 380, 34, 13.33, 31.58, 0, 0, 13, 3, 2, 2),
(38, 'Pakistan', 'ODI', 'Home', 10, 8, 115, 260, 29, 14.38, 44.23, 0, 0, 12, 4, 2, 2),
(38, 'Pakistan', 'T20', 'Neutral', 6, 6, 75, 110, 22, 12.50, 68.18, 0, 0, 8, 2, 2, 1),
(38, 'Zimbabwe', 'Test', 'Home', 7, 8, 130, 360, 36, 12.86, 36.11, 0, 0, 14, 3, 2, 2),
(38, 'Zimbabwe', 'ODI', 'Away', 9, 7, 100, 230, 27, 14.29, 43.48, 0, 0, 10, 3, 2, 1),
(38, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 70, 100, 19, 14.00, 70.00, 0, 0, 7, 2, 1, 1),
(38, 'India', 'Test', 'Away', 8, 10, 135, 410, 38, 13.50, 32.92, 0, 1, 15, 3, 3, 3),
(38, 'India', 'ODI', 'Home', 10, 9, 120, 280, 34, 13.33, 42.86, 0, 0, 11, 3, 3, 2),
(38, 'India', 'T20', 'Neutral', 6, 6, 85, 125, 24, 14.17, 68.00, 0, 0, 10, 2, 2, 1),
(38, 'Australia', 'Test', 'Home', 9, 11, 140, 450, 39, 12.73, 31.11, 0, 0, 16, 4, 3, 2),
(38, 'Australia', 'ODI', 'Away', 10, 8, 115, 260, 30, 12.88, 44.23, 0, 0, 12, 4, 2, 2),
(38, 'Australia', 'T20', 'Neutral', 7, 6, 90, 130, 23, 15.00, 69.23, 0, 0, 10, 3, 2, 1),
(40, 'Sri Lanka', 'Test', 'Away', 9, 12, 120, 370, 32, 10.91, 32.43, 0, 0, 13, 2, 3, 2),
(40, 'Sri Lanka', 'ODI', 'Home', 11, 9, 105, 240, 28, 11.67, 43.75, 0, 0, 11, 3, 2, 2),
(40, 'Sri Lanka', 'T20', 'Neutral', 6, 6, 75, 110, 22, 12.50, 68.18, 0, 0, 8, 3, 2, 1),
(40, 'Pakistan', 'Test', 'Away', 9, 12, 120, 370, 32, 10.91, 32.43, 0, 0, 13, 2, 3, 2),
(40, 'Pakistan', 'ODI', 'Home', 11, 9, 105, 240, 28, 11.67, 43.75, 0, 0, 11, 3, 2, 2),
(40, 'Pakistan', 'T20', 'Away', 7, 7, 90, 130, 25, 12.50, 69.23, 0, 0, 10, 3, 2, 1),
(40, 'India', 'Test', 'Away', 7, 9, 105, 350, 28, 11.67, 30.00, 0, 0, 12, 2, 3, 2),
(40, 'India', 'ODI', 'Home', 8, 7, 95, 220, 26, 10.56, 43.18, 0, 0, 10, 2, 3, 2),
(40, 'India', 'T20', 'Away', 5, 5, 70, 100, 19, 11.67, 70.00, 0, 0, 7, 2, 2, 1),
(40, 'Zimbabwe', 'Test', 'Home', 8, 10, 110, 340, 31, 11.00, 32.35, 0, 0, 12, 3, 2, 2),
(40, 'Zimbabwe', 'ODI', 'Away', 9, 7, 100, 240, 28, 14.29, 41.67, 0, 0, 10, 3, 2, 2),
(40, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 75, 100, 20, 15.00, 75.00, 0, 0, 8, 2, 1, 1),
(40, 'Australia', 'Test', 'Home', 9, 10, 125, 380, 35, 12.50, 32.89, 0, 0, 14, 3, 3, 2),
(40, 'Australia', 'ODI', 'Away', 11, 9, 100, 230, 28, 11.11, 43.48, 0, 0, 11, 3, 2, 2),
(40, 'Australia', 'T20', 'Neutral', 6, 6, 80, 120, 22, 13.33, 66.67, 0, 0, 9, 3, 2, 1),
(18, 'Sri Lanka', 'Test', 'Home', 10, 18, 740, 1400, 120, 29.60, 52.86, 1, 4, 85, 15, 2, 4),
(18, 'Sri Lanka', 'ODI', 'Away', 12, 12, 580, 650, 100, 32.22, 89.23, 1, 3, 68, 18, 1, 3),
(18, 'Sri Lanka', 'T20', 'Neutral', 8, 8, 360, 230, 75, 40.00, 156.52, 0, 2, 40, 20, 0, 2),
(18, 'Pakistan', 'Test', 'Away', 9, 15, 680, 1300, 115, 28.33, 52.31, 1, 3, 78, 18, 2, 3),
(18, 'Pakistan', 'ODI', 'Home', 10, 10, 510, 570, 90, 34.00, 89.47, 0, 3, 65, 16, 1, 2),
(18, 'Pakistan', 'T20', 'Neutral', 7, 7, 350, 250, 70, 38.89, 140.00, 0, 2, 40, 18, 0, 2),
(18, 'Zimbabwe', 'Test', 'Home', 8, 14, 720, 1250, 125, 30.00, 57.60, 1, 4, 80, 15, 1, 4),
(18, 'Zimbabwe', 'ODI', 'Away', 9, 9, 490, 550, 85, 32.67, 89.09, 1, 2, 60, 14, 1, 2),
(18, 'Zimbabwe', 'T20', 'Neutral', 6, 6, 310, 220, 60, 35.00, 140.91, 0, 1, 35, 15, 0, 1),
(18, 'India', 'Test', 'Away', 10, 16, 750, 1400, 130, 31.25, 53.57, 1, 3, 85, 17, 2, 4),
(18, 'India', 'ODI', 'Home', 12, 12, 570, 640, 95, 31.67, 89.06, 0, 3, 72, 18, 1, 3),
(18, 'India', 'T20', 'Neutral', 8, 8, 400, 280, 80, 40.00, 142.86, 0, 2, 42, 20, 0, 2),
(18, 'Australia', 'Test', 'Home', 11, 17, 780, 1450, 140, 30.00, 53.79, 1, 3, 90, 19, 2, 3),
(18, 'Australia', 'ODI', 'Away', 13, 13, 600, 670, 100, 33.33, 89.55, 1, 3, 75, 20, 0, 2),
(18, 'Australia', 'T20', 'Neutral', 9, 9, 420, 300, 85, 42.00, 140.00, 0, 2, 45, 22, 0, 2),
(21, 'Pakistan', 'Test', 'Away', 11, 18, 1050, 2100, 170, 36.21, 50.00, 2, 4, 115, 22, 1, 4),
(21, 'Pakistan', 'ODI', 'Home', 14, 14, 700, 780, 125, 35.00, 89.74, 1, 3, 85, 20, 1, 3),
(21, 'Pakistan', 'T20', 'Neutral', 9, 9, 480, 340, 90, 40.00, 141.18, 0, 2, 50, 22, 0, 2),
(21, 'Zimbabwe', 'Test', 'Home', 10, 16, 1020, 1950, 155, 34.00, 52.31, 2, 4, 110, 20, 1, 4),
(21, 'Zimbabwe', 'ODI', 'Away', 12, 12, 650, 720, 110, 32.50, 90.28, 1, 3, 80, 18, 1, 2),
(21, 'Zimbabwe', 'T20', 'Neutral', 8, 8, 460, 330, 85, 38.33, 139.39, 0, 2, 48, 20, 0, 1),
(21, 'India', 'Test', 'Away', 13, 20, 1120, 2200, 185, 37.33, 50.91, 3, 5, 120, 25, 1, 4),
(21, 'India', 'ODI', 'Home', 16, 16, 750, 860, 135, 35.71, 87.21, 1, 4, 95, 22, 0, 3),
(21, 'India', 'T20', 'Neutral', 10, 10, 500, 370, 95, 41.67, 135.14, 0, 3, 55, 23, 0, 2),
(21, 'Australia', 'Test', 'Home', 12, 18, 1080, 2050, 165, 35.00, 52.68, 2, 4, 118, 23, 1, 3),
(21, 'Australia', 'ODI', 'Away', 14, 14, 720, 810, 120, 34.29, 88.89, 1, 3, 88, 22, 0, 2),
(21, 'Australia', 'T20', 'Neutral', 9, 9, 480, 350, 85, 40.00, 137.14, 0, 2, 50, 24, 0, 2),
(21, 'Sri Lanka', 'Test', 'Away', 12, 20, 1100, 2200, 180, 36.67, 50.00, 3, 5, 120, 25, 1, 5),
(21, 'Sri Lanka', 'ODI', 'Home', 15, 15, 750, 850, 130, 37.50, 88.24, 2, 5, 80, 20, 0, 4),
(21, 'Sri Lanka', 'T20', 'Neutral', 10, 10, 500, 350, 90, 41.67, 142.86, 0, 4, 50, 25, 0, 3);

INSERT INTO BattingCareerAgainst 
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts) VALUES 
(2, 'India', 'Test', 'Home', 4, 6, 325, 510, 125, 54.17, 63.73, 1, 2, 42, 8, 1, 1),
(2, 'India', 'ODI', 'Away', 6, 6, 285, 310, 97, 47.50, 91.94, 0, 3, 31, 9, 0, 2),
(2, 'India', 'T20', 'Neutral', 4, 4, 130, 100, 62, 32.50, 130.00, 0, 1, 14, 7, 0, 1),
(2, 'Zimbabwe', 'Test', 'Away', 2, 3, 175, 290, 95, 58.33, 60.34, 0, 1, 17, 3, 0, 1),
(2, 'Zimbabwe', 'ODI', 'Neutral', 5, 5, 240, 265, 85, 48.00, 90.57, 0, 2, 24, 4, 0, 2),
(2, 'Zimbabwe', 'T20', 'Home', 3, 3, 110, 85, 56, 36.67, 129.41, 0, 1, 11, 6, 0, 0),
(2, 'Pakistan', 'Test', 'Neutral', 3, 4, 220, 360, 98, 55.00, 61.11, 0, 2, 25, 5, 1, 0),
(2, 'Pakistan', 'ODI', 'Home', 4, 4, 210, 220, 80, 52.50, 95.45, 0, 2, 20, 4, 0, 1),
(2, 'Pakistan', 'T20', 'Away', 4, 4, 120, 95, 55, 30.00, 126.32, 0, 1, 10, 8, 0, 0),
(2, 'Australia', 'Test', 'Home', 3, 5, 270, 440, 115, 54.00, 61.36, 1, 1, 30, 7, 0, 2),
(2, 'Australia', 'ODI', 'Away', 6, 6, 260, 280, 90, 43.33, 92.86, 0, 3, 28, 7, 0, 1),
(2, 'Australia', 'T20', 'Neutral', 4, 4, 130, 105, 60, 32.50, 123.81, 0, 1, 12, 8, 0, 0),
(2, 'Sri Lanka', 'Test', 'Away', 4, 6, 340, 520, 132, 56.67, 65.38, 1, 2, 38, 9, 1, 1),
(2, 'Sri Lanka', 'ODI', 'Neutral', 5, 5, 230, 245, 89, 46.00, 93.88, 0, 2, 22, 5, 0, 2),
(2, 'Sri Lanka', 'T20', 'Home', 3, 3, 140, 110, 68, 46.67, 127.27, 0, 1, 16, 7, 0, 0);

INSERT INTO BowlingCareerAgainst 
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(2, 'India', 'Test', 'Home', 15, 5, 35.0, 210, 130, 3, 3.71, 43.33, 70.00, 0, 0, '2/30', 2),
(2, 'India', 'ODI', 'Away', 20, 4, 15.0, 90, 70, 2, 4.67, 35.00, 45.00, 0, 0, '2/35', 0),
(2, 'India', 'T20', 'Neutral', 10, 2, 6.0, 36, 45, 1, 7.50, 45.00, 36.00, 0, 0, '1/18', 0),
(2, 'Zimbabwe', 'Test', 'Home', 12, 2, 10.0, 60, 30, 1, 3.00, 30.00, 60.00, 0, 0, '1/30', 0),
(2, 'Zimbabwe', 'ODI', 'Neutral', 18, 1, 3.0, 18, 20, 0, 6.67, 0.00, 0, 0, 0, '0/20', 0),
(2, 'Zimbabwe', 'T20', 'Home', 8, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0, '0/0', 0),
(2, 'Pakistan', 'Test', 'Home', 15, 3, 18.0, 108, 65, 2, 3.61, 32.50, 54.00, 0, 0, '1/15', 1),
(2, 'Pakistan', 'ODI', 'Away', 22, 2, 8.0, 48, 40, 1, 5.00, 40.00, 48.00, 0, 0, '1/25', 0),
(2, 'Pakistan', 'T20', 'Neutral', 12, 1, 4.0, 24, 35, 1, 8.75, 35.00, 24.00, 0, 0, '1/35', 0),
(2, 'Australia', 'Test', 'Home', 18, 2, 12.0, 72, 60, 1, 5.00, 60.00, 72.00, 0, 0, '1/30', 0),
(2, 'Australia', 'ODI', 'Away', 25, 3, 12.0, 72, 65, 1, 5.42, 65.00, 72.00, 0, 0, '1/25', 0),
(2, 'Australia', 'T20', 'Neutral', 10, 1, 4.0, 24, 30, 1, 7.50, 30.00, 24.00, 0, 0, '1/30', 0),
(2, 'Sri Lanka', 'Test', 'Home', 16, 2, 10.0, 60, 45, 1, 4.50, 45.00, 60.00, 0, 0, '1/45', 0),
(2, 'Sri Lanka', 'ODI', 'Neutral', 24, 2, 6.0, 36, 50, 1, 8.33, 50.00, 36.00, 0, 0, '1/50', 0),
(2, 'Sri Lanka', 'T20', 'Home', 10, 1, 2.0, 12, 25, 0, 12.50, 0, 0, 0, 0, '0/25', 0);

INSERT INTO FieldingCareer (PlayerID, MatchType, Opponent, LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(2, 'Test', 'India', 'Home', 15, 30, 6, 0, 2, 1),
(2, 'ODI', 'India', 'Away', 20, 40, 12, 0, 4, 2),
(2, 'T20', 'India', 'Neutral', 10, 20, 5, 0, 1, 1),
(2, 'Test', 'Zimbabwe', 'Home', 12, 24, 4, 0, 1, 0),
(2, 'ODI', 'Zimbabwe', 'Neutral', 18, 36, 10, 0, 3, 1),
(2, 'T20', 'Zimbabwe', 'Home', 8, 16, 3, 0, 0, 0),
(2, 'Test', 'Pakistan', 'Home', 15, 30, 5, 0, 2, 1),
(2, 'ODI', 'Pakistan', 'Away', 22, 44, 13, 0, 3, 2),
(2, 'T20', 'Pakistan', 'Neutral', 12, 24, 4, 0, 1, 0),
(2, 'Test', 'Australia', 'Home', 18, 36, 7, 0, 3, 1),
(2, 'ODI', 'Australia', 'Away', 25, 50, 14, 0, 4, 2),
(2, 'T20', 'Australia', 'Neutral', 10, 20, 4, 0, 1, 0),
(2, 'Test', 'Sri Lanka', 'Home', 16, 32, 6, 0, 1, 1),
(2, 'ODI', 'Sri Lanka', 'Neutral', 24, 48, 11, 0, 2, 1),
(2, 'T20', 'Sri Lanka', 'Home', 10, 20, 4, 0, 1, 0);

INSERT INTO BattingCareerAgainst  
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts) VALUES 
(3, 'India', 'Test', 'Home', 10, 15, 350, 550, 85, 23.33, 63.64, 0, 2, 40, 5, 2, 3),
(3, 'India', 'Test', 'Away', 10, 15, 300, 480, 75, 20.00, 62.50, 0, 1, 30, 3, 2, 4),
(3, 'India', 'Test', 'Neutral', 10, 15, 280, 460, 70, 18.67, 60.87, 0, 1, 25, 2, 3, 2),
(3, 'India', 'ODI', 'Home', 15, 15, 410, 400, 96, 27.33, 102.50, 0, 4, 45, 10, 1, 2),
(3, 'India', 'ODI', 'Away', 15, 15, 390, 380, 90, 26.00, 102.63, 0, 3, 35, 8, 1, 3),
(3, 'India', 'ODI', 'Neutral', 15, 15, 420, 390, 105, 28.00, 107.69, 0, 5, 50, 11, 0, 1),
(3, 'India', 'T20', 'Home', 8, 8, 190, 140, 50, 23.75, 135.71, 0, 0, 18, 6, 1, 1),
(3, 'India', 'T20', 'Away', 8, 8, 180, 130, 45, 22.50, 138.46, 0, 0, 16, 5, 1, 2),
(3, 'India', 'T20', 'Neutral', 8, 8, 210, 150, 55, 26.25, 140.00, 0, 1, 20, 7, 0, 0),
(3, 'Zimbabwe', 'Test', 'Home', 8, 12, 290, 460, 80, 24.17, 63.04, 0, 1, 29, 4, 1, 2),
(3, 'Zimbabwe', 'Test', 'Away', 8, 12, 270, 440, 76, 22.50, 61.36, 0, 1, 27, 3, 2, 3),
(3, 'Zimbabwe', 'Test', 'Neutral', 8, 12, 260, 430, 72, 21.67, 60.47, 0, 0, 26, 2, 2, 2),
(3, 'Zimbabwe', 'ODI', 'Home', 12, 12, 320, 300, 74, 26.67, 106.67, 0, 2, 32, 8, 1, 1),
(3, 'Zimbabwe', 'ODI', 'Away', 12, 12, 310, 290, 71, 25.83, 106.90, 0, 2, 30, 7, 0, 2),
(3, 'Zimbabwe', 'ODI', 'Neutral', 12, 12, 330, 310, 77, 27.50, 106.45, 0, 3, 33, 9, 1, 0),
(3, 'Zimbabwe', 'T20', 'Home', 6, 6, 160, 120, 48, 26.67, 133.33, 0, 0, 15, 6, 1, 1),
(3, 'Zimbabwe', 'T20', 'Away', 6, 6, 150, 115, 46, 25.00, 130.43, 0, 0, 14, 5, 0, 2),
(3, 'Zimbabwe', 'T20', 'Neutral', 6, 6, 170, 125, 52, 28.33, 136.00, 0, 1, 16, 7, 0, 0),
(3, 'Pakistan', 'Test', 'Home', 6, 10, 240, 380, 60, 24.00, 63.16, 0, 1, 22, 2, 1, 2),
(3, 'Pakistan', 'Test', 'Away', 6, 10, 230, 360, 58, 23.00, 63.89, 0, 1, 21, 1, 2, 1),
(3, 'Pakistan', 'Test', 'Neutral', 6, 10, 220, 350, 55, 22.00, 62.86, 0, 0, 20, 0, 3, 3),
(3, 'Pakistan', 'ODI', 'Home', 10, 10, 300, 290, 75, 30.00, 103.45, 0, 3, 28, 6, 1, 1),
(3, 'Pakistan', 'ODI', 'Away', 10, 10, 310, 300, 80, 31.00, 103.33, 0, 3, 30, 7, 0, 0),
(3, 'Pakistan', 'ODI', 'Neutral', 10, 10, 280, 270, 70, 28.00, 103.70, 0, 2, 25, 5, 1, 2),
(3, 'Pakistan', 'T20', 'Home', 5, 5, 110, 85, 35, 22.00, 129.41, 0, 0, 10, 3, 1, 0),
(3, 'Pakistan', 'T20', 'Away', 5, 5, 120, 90, 40, 24.00, 133.33, 0, 0, 12, 4, 0, 1),
(3, 'Pakistan', 'T20', 'Neutral', 5, 5, 130, 95, 45, 26.00, 136.84, 0, 1, 14, 5, 0, 1),
(3, 'Australia', 'Test', 'Home', 5, 8, 200, 330, 52, 25.00, 60.61, 0, 0, 18, 2, 1, 1),
(3, 'Australia', 'Test', 'Away', 5, 8, 220, 350, 55, 27.50, 62.86, 0, 1, 20, 3, 2, 2),
(3, 'Australia', 'Test', 'Neutral', 5, 8, 180, 300, 48, 22.50, 60.00, 0, 0, 16, 1, 2, 1),
(3, 'Australia', 'ODI', 'Home', 10, 10, 260, 250, 65, 26.00, 104.00, 0, 2, 23, 5, 1, 1),
(3, 'Australia', 'ODI', 'Away', 10, 10, 250, 240, 60, 25.00, 104.17, 0, 1, 21, 4, 2, 2),
(3, 'Australia', 'ODI', 'Neutral', 10, 10, 270, 260, 68, 27.00, 103.85, 0, 2, 24, 6, 0, 1),
(3, 'Australia', 'T20', 'Home', 6, 6, 150, 110, 45, 25.00, 136.36, 0, 0, 15, 5, 1, 1),
(3, 'Australia', 'T20', 'Away', 6, 6, 140, 105, 40, 23.33, 133.33, 0, 0, 13, 4, 1, 2),
(3, 'Australia', 'T20', 'Neutral', 6, 6, 160, 115, 50, 26.67, 139.13, 0, 1, 17, 6, 0, 0),
(3, 'Sri Lanka', 'Test', 'Home', 6, 10, 235, 370, 59, 23.50, 63.51, 0, 1, 22, 2, 2, 2),
(3, 'Sri Lanka', 'Test', 'Away', 6, 10, 250, 390, 61, 25.00, 64.10, 0, 1, 24, 3, 1, 1),
(3, 'Sri Lanka', 'Test', 'Neutral', 6, 10, 225, 360, 56, 22.50, 62.50, 0, 0, 21, 1, 2, 3),
(3, 'Sri Lanka', 'ODI', 'Home', 10, 10, 310, 290, 78, 31.00, 106.90, 0, 3, 30, 7, 0, 1),
(3, 'Sri Lanka', 'ODI', 'Away', 10, 10, 300, 280, 75, 30.00, 107.14, 0, 3, 28, 6, 1, 0),
(3, 'Sri Lanka', 'ODI', 'Neutral', 10, 10, 320, 300, 80, 32.00, 106.67, 0, 3, 32, 8, 1, 2),
(3, 'Sri Lanka', 'T20', 'Home', 5, 5, 115, 90, 38, 23.00, 127.78, 0, 0, 11, 4, 0, 1),
(3, 'Sri Lanka', 'T20', 'Away', 5, 5, 120, 85, 40, 24.00, 141.18, 0, 0, 12, 5, 1, 0),
(3, 'Sri Lanka', 'T20', 'Neutral', 5, 5, 130, 100, 45, 26.00, 130.00, 0, 1, 13, 6, 0, 1);

INSERT INTO BowlingCareerAgainst 
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(3, 'India', 'Test', 'Home', 10, 20, 350, 2100, 1050, 40, 3.00, 26.25, 52.5, 2, 0, '5/50', 10),
(3, 'India', 'Test', 'Away', 10, 20, 340, 2040, 1100, 38, 3.24, 28.95, 53.68, 1, 0, '5/60', 8),
(3, 'India', 'Test', 'Neutral', 10, 20, 330, 1980, 980, 35, 2.97, 28.00, 56.57, 1, 0, '5/45', 9),
(3, 'India', 'ODI', 'Home', 15, 15, 120, 720, 540, 25, 4.50, 21.60, 28.8, 0, 0, '4/40', 4),
(3, 'India', 'ODI', 'Away', 15, 15, 118, 708, 560, 23, 4.75, 24.35, 30.78, 0, 0, '4/44', 3),
(3, 'India', 'ODI', 'Neutral', 15, 15, 115, 690, 510, 27, 4.43, 18.89, 25.56, 0, 0, '4/38', 5),
(3, 'India', 'T20', 'Home', 8, 8, 30, 180, 150, 12, 5.00, 12.50, 15.0, 0, 0, '3/20', 1),
(3, 'India', 'T20', 'Away', 8, 8, 28, 168, 140, 10, 5.00, 14.00, 16.8, 0, 0, '3/18', 2),
(3, 'India', 'T20', 'Neutral', 8, 8, 32, 192, 160, 14, 5.00, 11.43, 13.71, 0, 0, '3/15', 1),
(3, 'Zimbabwe', 'Test', 'Home', 6, 12, 200, 1200, 580, 30, 2.90, 19.33, 40.0, 2, 0, '5/55', 12),
(3, 'Zimbabwe', 'Test', 'Away', 6, 12, 190, 1140, 600, 28, 3.16, 21.43, 40.71, 2, 0, '5/50', 10),
(3, 'Zimbabwe', 'Test', 'Neutral', 6, 12, 180, 1080, 560, 25, 3.11, 22.40, 43.2, 1, 0, '5/45', 9),
(3, 'Zimbabwe', 'ODI', 'Home', 10, 10, 80, 480, 360, 18, 4.50, 20.00, 26.67, 0, 0, '4/30', 3),
(3, 'Zimbabwe', 'ODI', 'Away', 10, 10, 78, 468, 380, 15, 4.87, 25.33, 31.2, 0, 0, '4/35', 2),
(3, 'Zimbabwe', 'ODI', 'Neutral', 10, 10, 75, 450, 340, 20, 4.53, 17.00, 22.5, 0, 0, '4/28', 4),
(3, 'Zimbabwe', 'T20', 'Home', 5, 5, 18, 108, 90, 8, 5.00, 11.25, 13.5, 0, 0, '3/12', 0),
(3, 'Zimbabwe', 'T20', 'Away', 5, 5, 16, 96, 85, 6, 5.31, 14.17, 16.0, 0, 0, '3/14', 1),
(3, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 20, 120, 100, 10, 5.00, 10.00, 12.0, 0, 0, '3/10', 1),
(3, 'Pakistan', 'Test', 'Home', 7, 14, 220, 1320, 650, 32, 2.95, 20.31, 41.25, 3, 0, '6/48', 11),
(3, 'Pakistan', 'Test', 'Away', 7, 14, 210, 1260, 680, 30, 3.24, 22.67, 42.00, 2, 0, '6/52', 10),
(3, 'Pakistan', 'Test', 'Neutral', 7, 14, 200, 1200, 620, 28, 3.10, 22.14, 42.86, 1, 0, '5/46', 9),
(3, 'Pakistan', 'ODI', 'Home', 12, 12, 100, 600, 450, 24, 4.50, 18.75, 25.00, 0, 0, '4/34', 4),
(3, 'Pakistan', 'ODI', 'Away', 12, 12, 98, 588, 480, 22, 4.90, 21.82, 26.73, 0, 0, '4/37', 3),
(3, 'Pakistan', 'ODI', 'Neutral', 12, 12, 95, 570, 430, 25, 4.53, 17.20, 22.80, 1, 0, '4/31', 5),
(3, 'Pakistan', 'T20', 'Home', 7, 7, 25, 150, 180, 12, 7.20, 15.00, 12.50, 0, 0, '3/19', 1),
(3, 'Pakistan', 'T20', 'Away', 7, 7, 24, 144, 170, 10, 7.08, 17.00, 14.40, 0, 0, '3/22', 0),
(3, 'Pakistan', 'T20', 'Neutral', 7, 7, 28, 168, 160, 14, 5.71, 11.43, 12.00, 0, 0, '3/18', 1),
(3, 'Australia', 'Test', 'Home', 6, 12, 240, 1440, 700, 35, 2.92, 20.00, 41.14, 3, 1, '7/54', 12),
(3, 'Australia', 'Test', 'Away', 6, 12, 230, 1380, 720, 33, 3.13, 21.82, 41.82, 2, 0, '6/47', 11),
(3, 'Australia', 'Test', 'Neutral', 6, 12, 220, 1320, 690, 30, 3.14, 23.00, 44.00, 1, 0, '5/50', 10),
(3, 'Australia', 'ODI', 'Home', 12, 12, 110, 660, 500, 28, 4.55, 17.86, 23.57, 0, 0, '4/33', 5),
(3, 'Australia', 'ODI', 'Away', 12, 12, 108, 648, 520, 26, 4.81, 20.00, 24.92, 0, 0, '4/36', 4),
(3, 'Australia', 'ODI', 'Neutral', 12, 12, 105, 630, 480, 27, 4.57, 17.78, 23.33, 1, 0, '4/29', 6),
(3, 'Australia', 'T20', 'Home', 8, 8, 30, 180, 140, 15, 4.67, 9.33, 12.00, 0, 0, '3/16', 2),
(3, 'Australia', 'T20', 'Away', 8, 8, 28, 168, 150, 13, 5.36, 11.54, 12.92, 0, 0, '3/20', 1),
(3, 'Australia', 'T20', 'Neutral', 8, 8, 32, 192, 160, 16, 5.00, 10.00, 12.00, 0, 0, '3/14', 1),
(3, 'Sri Lanka', 'Test', 'Home', 6, 12, 210, 1260, 600, 30, 2.86, 20.00, 42.00, 3, 0, '6/49', 11),
(3, 'Sri Lanka', 'Test', 'Away', 6, 12, 200, 1200, 630, 28, 3.15, 22.50, 42.86, 2, 0, '6/51', 9),
(3, 'Sri Lanka', 'Test', 'Neutral', 6, 12, 190, 1140, 580, 25, 3.05, 23.20, 45.60, 1, 0, '5/45', 8),
(3, 'Sri Lanka', 'ODI', 'Home', 12, 12, 95, 570, 420, 24, 4.42, 17.50, 23.75, 0, 0, '4/32', 4),
(3, 'Sri Lanka', 'ODI', 'Away', 12, 12, 92, 552, 440, 22, 4.78, 20.00, 25.09, 0, 0, '4/38', 3),
(3, 'Sri Lanka', 'ODI', 'Neutral', 12, 12, 90, 540, 400, 25, 4.44, 16.00, 21.60, 1, 0, '4/28', 5),
(3, 'Sri Lanka', 'T20', 'Home', 6, 6, 22, 132, 110, 10, 5.00, 11.00, 13.20, 0, 0, '3/17', 0),
(3, 'Sri Lanka', 'T20', 'Away', 6, 6, 20, 120, 100, 8, 5.00, 12.50, 15.00, 0, 0, '3/18', 1),
(3, 'Sri Lanka', 'T20', 'Neutral', 6, 6, 24, 144, 120, 12, 5.00, 10.00, 12.00, 0, 0, '3/15', 1);

INSERT INTO FieldingCareer 
(PlayerID, MatchType, Opponent, LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(3, 'Test', 'India', 'Home', 10, 20, 12, 0, 5, 2),
(3, 'Test', 'India', 'Away', 10, 20, 10, 0, 3, 1),
(3, 'Test', 'India', 'Neutral', 10, 20, 11, 0, 4, 2),
(3, 'ODI', 'India', 'Home', 15, 15, 15, 0, 2, 3),
(3, 'ODI', 'India', 'Away', 15, 15, 13, 0, 3, 1),
(3, 'ODI', 'India', 'Neutral', 15, 15, 14, 0, 1, 2),
(3, 'T20', 'India', 'Home', 8, 8, 8, 0, 0, 1),
(3, 'T20', 'India', 'Away', 8, 8, 7, 0, 2, 0),
(3, 'T20', 'India', 'Neutral', 8, 8, 6, 0, 1, 1),
(3, 'Test', 'Zimbabwe', 'Home', 6, 12, 9, 0, 2, 2),
(3, 'Test', 'Zimbabwe', 'Away', 6, 12, 8, 0, 3, 1),
(3, 'Test', 'Zimbabwe', 'Neutral', 6, 12, 7, 0, 2, 1),
(3, 'ODI', 'Zimbabwe', 'Home', 10, 10, 10, 0, 1, 2),
(3, 'ODI', 'Zimbabwe', 'Away', 10, 10, 9, 0, 2, 1),
(3, 'ODI', 'Zimbabwe', 'Neutral', 10, 10, 11, 0, 1, 3),
(3, 'T20', 'Zimbabwe', 'Home', 5, 5, 5, 0, 1, 0),
(3, 'T20', 'Zimbabwe', 'Away', 5, 5, 4, 0, 0, 1),
(3, 'T20', 'Zimbabwe', 'Neutral', 5, 5, 3, 0, 2, 0),
(3, 'Test', 'Pakistan', 'Home', 7, 14, 10, 0, 4, 3),
(3, 'Test', 'Pakistan', 'Away', 7, 14, 11, 0, 3, 2),
(3, 'Test', 'Pakistan', 'Neutral', 7, 14, 9, 0, 2, 1),
(3, 'ODI', 'Pakistan', 'Home', 12, 12, 12, 0, 3, 4),
(3, 'ODI', 'Pakistan', 'Away', 12, 12, 13, 0, 2, 3),
(3, 'ODI', 'Pakistan', 'Neutral', 12, 12, 14, 0, 1, 2),
(3, 'T20', 'Pakistan', 'Home', 7, 7, 6, 0, 1, 1),
(3, 'T20', 'Pakistan', 'Away', 7, 7, 7, 0, 0, 2),
(3, 'T20', 'Pakistan', 'Neutral', 7, 7, 8, 0, 2, 1),
(3, 'Test', 'Australia', 'Home', 6, 12, 12, 0, 2, 2),
(3, 'Test', 'Australia', 'Away', 6, 12, 13, 0, 4, 1),
(3, 'Test', 'Australia', 'Neutral', 6, 12, 11, 0, 3, 2),
(3, 'ODI', 'Australia', 'Home', 12, 12, 15, 0, 2, 3),
(3, 'ODI', 'Australia', 'Away', 12, 12, 14, 0, 1, 2),
(3, 'ODI', 'Australia', 'Neutral', 12, 12, 13, 0, 3, 1),
(3, 'T20', 'Australia', 'Home', 8, 8, 7, 0, 1, 2),
(3, 'T20', 'Australia', 'Away', 8, 8, 8, 0, 2, 0),
(3, 'T20', 'Australia', 'Neutral', 8, 8, 9, 0, 0, 1),
(3, 'Test', 'Sri Lanka', 'Home', 6, 12, 10, 0, 3, 2),
(3, 'Test', 'Sri Lanka', 'Away', 6, 12, 11, 0, 2, 3),
(3, 'Test', 'Sri Lanka', 'Neutral', 6, 12, 9, 0, 1, 1),
(3, 'ODI', 'Sri Lanka', 'Home', 12, 12, 12, 0, 4, 2),
(3, 'ODI', 'Sri Lanka', 'Away', 12, 12, 13, 0, 2, 3),
(3, 'ODI', 'Sri Lanka', 'Neutral', 12, 12, 14, 0, 1, 4),
(3, 'T20', 'Sri Lanka', 'Home', 7, 7, 6, 0, 1, 1),
(3, 'T20', 'Sri Lanka', 'Away', 7, 7, 7, 0, 2, 1),
(3, 'T20', 'Sri Lanka', 'Neutral', 7, 7, 8, 0, 0, 2);

INSERT INTO BattingCareerAgainst  
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts) VALUES 
(4, 'India', 'Test', 'Home', 12, 24, 950, 1750, 158, 39.58, 54.29, 2, 6, 120, 15, 1, 3),
(4, 'India', 'Test', 'Away', 12, 24, 870, 1650, 143, 36.25, 52.73, 1, 5, 110, 10, 2, 2),
(4, 'India', 'Test', 'Neutral', 12, 24, 900, 1700, 137, 37.50, 52.94, 2, 4, 100, 12, 3, 4),
(4, 'India', 'ODI', 'Home', 18, 18, 840, 900, 134, 46.67, 93.33, 1, 7, 85, 20, 0, 1),
(4, 'India', 'ODI', 'Away', 18, 18, 820, 880, 121, 45.56, 93.18, 2, 6, 75, 18, 1, 2),
(4, 'India', 'ODI', 'Neutral', 18, 18, 850, 910, 138, 47.22, 93.41, 3, 5, 90, 22, 0, 3),
(4, 'India', 'T20', 'Home', 10, 10, 310, 250, 75, 31.00, 124.00, 0, 2, 35, 10, 0, 1),
(4, 'India', 'T20', 'Away', 10, 10, 290, 230, 70, 29.00, 126.09, 0, 1, 30, 8, 1, 2),
(4, 'India', 'T20', 'Neutral', 10, 10, 320, 260, 80, 32.00, 123.08, 0, 3, 40, 12, 0, 0),
(4, 'Zimbabwe', 'Test', 'Home', 8, 16, 720, 1200, 152, 45.00, 60.00, 1, 4, 80, 8, 1, 2),
(4, 'Zimbabwe', 'Test', 'Away', 8, 16, 680, 1150, 140, 42.50, 59.13, 2, 3, 70, 6, 2, 3),
(4, 'Zimbabwe', 'Test', 'Neutral', 8, 16, 650, 1100, 135, 40.63, 59.09, 1, 2, 65, 7, 3, 4),
(4, 'Zimbabwe', 'ODI', 'Home', 14, 14, 750, 700, 115, 53.57, 107.14, 2, 4, 75, 15, 0, 2),
(4, 'Zimbabwe', 'ODI', 'Away', 14, 14, 730, 680, 110, 52.14, 107.35, 1, 5, 70, 12, 1, 3),
(4, 'Zimbabwe', 'ODI', 'Neutral', 14, 14, 770, 720, 125, 55.00, 106.94, 3, 3, 80, 18, 0, 1),
(4, 'Zimbabwe', 'T20', 'Home', 6, 6, 220, 180, 65, 36.67, 122.22, 0, 1, 25, 7, 0, 1),
(4, 'Zimbabwe', 'T20', 'Away', 6, 6, 210, 170, 60, 35.00, 123.53, 0, 2, 20, 6, 1, 0),
(4, 'Zimbabwe', 'T20', 'Neutral', 6, 6, 230, 190, 70, 38.33, 121.05, 0, 2, 30, 9, 0, 1),
(4, 'Pakistan', 'Test', 'Home', 10, 20, 800, 1500, 130, 40.00, 53.33, 1, 5, 90, 10, 2, 3),
(4, 'Pakistan', 'Test', 'Away', 10, 20, 780, 1450, 125, 39.00, 53.79, 1, 4, 85, 9, 3, 4),
(4, 'Pakistan', 'Test', 'Neutral', 10, 20, 750, 1400, 120, 37.50, 53.57, 0, 6, 80, 8, 2, 2),
(4, 'Pakistan', 'ODI', 'Home', 15, 15, 690, 720, 112, 46.00, 95.83, 1, 6, 65, 16, 1, 2),
(4, 'Pakistan', 'ODI', 'Away', 15, 15, 670, 700, 105, 44.67, 95.71, 2, 4, 60, 14, 0, 3),
(4, 'Pakistan', 'ODI', 'Neutral', 15, 15, 710, 730, 118, 47.33, 97.26, 2, 5, 70, 18, 0, 1),
(4, 'Pakistan', 'T20', 'Home', 8, 8, 240, 200, 60, 30.00, 120.00, 0, 2, 25, 8, 1, 1),
(4, 'Pakistan', 'T20', 'Away', 8, 8, 230, 190, 55, 28.75, 121.05, 0, 1, 23, 7, 0, 2),
(4, 'Pakistan', 'T20', 'Neutral', 8, 8, 250, 210, 65, 31.25, 119.05, 0, 3, 21, 7, 0, 4), 
(4, 'Sri Lanka', 'Test', 'Home', 10, 20, 950, 1600, 165, 47.50, 59.38, 3, 4, 120, 10, 1, 4),
(4, 'Sri Lanka', 'Test', 'Away', 10, 20, 870, 1500, 150, 43.50, 58.00, 2, 5, 100, 8, 2, 3),
(4, 'Sri Lanka', 'Test', 'Neutral', 10, 20, 800, 1400, 140, 40.00, 57.14, 1, 6, 95, 7, 3, 2),
(4, 'Sri Lanka', 'ODI', 'Home', 18, 18, 880, 900, 140, 48.89, 97.78, 2, 7, 90, 20, 0, 2),
(4, 'Sri Lanka', 'ODI', 'Away', 18, 18, 850, 880, 135, 47.22, 96.59, 1, 8, 85, 18, 1, 1),
(4, 'Sri Lanka', 'ODI', 'Neutral', 18, 18, 900, 920, 145, 50.00, 97.83, 3, 6, 95, 22, 0, 3),
(4, 'Sri Lanka', 'T20', 'Home', 10, 10, 320, 270, 80, 32.00, 118.52, 0, 3, 35, 12, 0, 1),
(4, 'Sri Lanka', 'T20', 'Away', 10, 10, 300, 250, 75, 30.00, 120.00, 0, 2, 30, 10, 1, 2),
(4, 'Sri Lanka', 'T20', 'Neutral', 10, 10, 330, 280, 85, 33.00, 117.86, 0, 4, 40, 13, 0, 0),
(4, 'Australia', 'Test', 'Home', 8, 16, 780, 1350, 160, 48.75, 57.78, 2, 5, 90, 12, 1, 3),
(4, 'Australia', 'Test', 'Away', 8, 16, 720, 1300, 145, 45.00, 55.38, 1, 6, 85, 10, 2, 4),
(4, 'Australia', 'Test', 'Neutral', 8, 16, 700, 1250, 135, 43.75, 56.00, 1, 4, 80, 9, 3, 2),
(4, 'Australia', 'ODI', 'Home', 14, 14, 790, 800, 132, 56.43, 98.75, 2, 6, 75, 17, 0, 1),
(4, 'Australia', 'ODI', 'Away', 14, 14, 770, 780, 128, 55.00, 98.72, 1, 7, 70, 15, 1, 2),
(4, 'Australia', 'ODI', 'Neutral', 14, 14, 800, 820, 135, 57.14, 97.56, 3, 5, 80, 19, 0, 3),
(4, 'Australia', 'T20', 'Home', 6, 6, 220, 190, 70, 36.67, 115.79, 0, 2, 20, 8, 1, 0),
(4, 'Australia', 'T20', 'Away', 6, 6, 210, 180, 65, 35.00, 116.67, 0, 1, 18, 7, 0, 1),
(4, 'Australia', 'T20', 'Neutral', 6, 6, 230, 200, 75, 38.33, 115.00, 0, 3, 25, 9, 0, 1);

INSERT INTO BowlingCareerAgainst 
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(4, 'India', 'Test', 'Home', 12, 5, 22, 132, 110, 2, 5.00, 55.00, 66.00, 0, 0, '1/30', 1),
(4, 'India', 'Test', 'Away', 12, 3, 18, 108, 92, 1, 5.11, 92.00, 108.00, 0, 0, '1/40', 0),
(4, 'India', 'Test', 'Neutral', 12, 2, 10, 60, 58, 1, 5.80, 58.00, 60.00, 0, 0, '1/18', 0),
(4, 'India', 'ODI', 'Home', 18, 3, 12, 72, 65, 1, 5.42, 65.00, 72.00, 0, 0, '1/25', 0),
(4, 'India', 'ODI', 'Away', 18, 1, 6, 36, 40, 0, 6.67, 0, 0, 0, 0, '0/40', 0),
(4, 'India', 'ODI', 'Neutral', 18, 2, 10, 60, 55, 1, 5.50, 55.00, 60.00, 0, 0, '1/15', 0),
(4, 'India', 'T20', 'Home', 10, 1, 2, 12, 20, 0, 10.00, 0, 0, 0, 0, '0/20', 0),
(4, 'India', 'T20', 'Away', 10, 1, 2, 12, 18, 0, 9.00, 0, 0, 0, 0, '0/18', 0),
(4, 'India', 'T20', 'Neutral', 10, 1, 3, 18, 25, 0, 8.33, 0, 0, 0, 0, '0/25', 0),
(4, 'Zimbabwe', 'Test', 'Home', 8, 1, 6, 36, 22, 0, 3.67, 0, 0, 0, 0, '0/22', 0),
(4, 'Zimbabwe', 'Test', 'Away', 8, 2, 12, 72, 45, 1, 3.75, 45.00, 72.00, 0, 0, '1/45', 1),
(4, 'Zimbabwe', 'Test', 'Neutral', 8, 1, 4, 24, 30, 0, 7.50, 0, 0, 0, 0, '0/30', 0),
(4, 'Zimbabwe', 'ODI', 'Home', 14, 2, 8, 48, 38, 1, 4.75, 38.00, 48.00, 0, 0, '1/38', 0),
(4, 'Zimbabwe', 'ODI', 'Away', 14, 1, 4, 24, 36, 0, 9.00, 0, 0, 0, 0, '0/36', 0),
(4, 'Zimbabwe', 'ODI', 'Neutral', 14, 2, 10, 60, 50, 1, 5.00, 50.00, 60.00, 0, 0, '1/25', 0),
(4, 'Zimbabwe', 'T20', 'Home', 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '0/0', 0),
(4, 'Zimbabwe', 'T20', 'Away', 6, 1, 3, 18, 30, 0, 10.00, 0, 0, 0, 0, '0/30', 0),
(4, 'Zimbabwe', 'T20', 'Neutral', 6, 1, 2, 12, 25, 0, 12.50, 0, 0, 0, 0, '0/25', 0),
(4, 'Pakistan', 'Test', 'Home', 10, 2, 10, 60, 48, 1, 4.80, 48.00, 60.00, 0, 0, '1/48', 0),
(4, 'Pakistan', 'Test', 'Away', 10, 1, 8, 48, 46, 0, 5.75, 0, 0, 0, 0, '0/46', 0),
(4, 'Pakistan', 'Test', 'Neutral', 10, 1, 6, 36, 35, 0, 5.83, 0, 0, 0, 0, '0/35', 0),
(4, 'Pakistan', 'ODI', 'Home', 15, 3, 14, 84, 70, 2, 5.00, 35.00, 42.00, 0, 0, '1/20', 1),
(4, 'Pakistan', 'ODI', 'Away', 15, 2, 10, 60, 58, 1, 5.80, 58.00, 60.00, 0, 0, '1/30', 0),
(4, 'Pakistan', 'ODI', 'Neutral', 15, 1, 5, 30, 33, 0, 6.60, 0, 0, 0, 0, '0/33', 0),
(4, 'Pakistan', 'T20', 'Home', 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '0/0', 0),
(4, 'Pakistan', 'T20', 'Away', 8, 1, 3, 18, 24, 0, 8.00, 0, 0, 0, 0, '0/24', 0),
(4, 'Pakistan', 'T20', 'Neutral', 8, 1, 4, 24, 29, 1, 7.25, 29.00, 24.00, 0, 0, '1/29', 0),
(4, 'Sri Lanka', 'Test', 'Home', 10, 2, 12, 72, 65, 1, 5.42, 65.00, 72.00, 0, 0, '1/25', 0),
(4, 'Sri Lanka', 'Test', 'Away', 10, 1, 6, 36, 45, 0, 7.50, 0, 0, 0, 0, '0/45', 0),
(4, 'Sri Lanka', 'Test', 'Neutral', 10, 1, 8, 48, 50, 0, 6.25, 0, 0, 0, 0, '0/50', 0),
(4, 'Sri Lanka', 'ODI', 'Home', 18, 2, 10, 60, 52, 1, 5.20, 52.00, 60.00, 0, 0, '1/30', 0),
(4, 'Sri Lanka', 'ODI', 'Away', 18, 1, 4, 24, 36, 0, 9.00, 0, 0, 0, 0, '0/36', 0),
(4, 'Sri Lanka', 'ODI', 'Neutral', 18, 2, 8, 48, 45, 1, 5.63, 45.00, 48.00, 0, 0, '1/25', 0),
(4, 'Sri Lanka', 'T20', 'Home', 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '0/0', 0),
(4, 'Sri Lanka', 'T20', 'Away', 10, 1, 2, 12, 20, 0, 10.00, 0, 0, 0, 0, '0/20', 0),
(4, 'Sri Lanka', 'T20', 'Neutral', 10, 1, 3, 18, 28, 0, 9.33, 0, 0, 0, 0, '0/28', 0),
(4, 'Australia', 'Test', 'Home', 8, 1, 4, 24, 32, 0, 8.00, 0, 0, 0, 0, '0/32', 0),
(4, 'Australia', 'Test', 'Away', 8, 2, 10, 60, 54, 1, 5.40, 54.00, 60.00, 0, 0, '1/20', 1),
(4, 'Australia', 'Test', 'Neutral', 8, 1, 6, 36, 39, 0, 6.50, 0, 0, 0, 0, '0/39', 0),
(4, 'Australia', 'ODI', 'Home', 14, 3, 14, 84, 70, 2, 5.00, 35.00, 42.00, 0, 0, '1/20', 1),
(4, 'Australia', 'ODI', 'Away', 14, 2, 10, 60, 58, 1, 5.80, 58.00, 60.00, 0, 0, '1/30', 0),
(4, 'Australia', 'ODI', 'Neutral', 14, 1, 5, 30, 33, 0, 6.60, 0, 0, 0, 0, '0/33', 0),
(4, 'Australia', 'T20', 'Home', 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '0/0', 0),
(4, 'Australia', 'T20', 'Away', 6, 1, 3, 18, 30, 0, 10.00, 0, 0, 0, 0, '0/30', 0),
(4, 'Australia', 'T20', 'Neutral', 6, 1, 4, 24, 35, 0, 8.75, 0, 0, 0, 0, '0/35', 0);

INSERT INTO FieldingCareer 
(PlayerID, MatchType, Opponent, LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(4, 'Test', 'India', 'Home', 12, 24, 12, 0, 3, 2),
(4, 'Test', 'India', 'Away', 12, 24, 10, 0, 2, 1),
(4, 'Test', 'India', 'Neutral', 12, 24, 11, 0, 1, 2),
(4, 'ODI', 'India', 'Home', 18, 18, 8, 0, 4, 3),
(4, 'ODI', 'India', 'Away', 18, 18, 9, 0, 3, 2),
(4, 'ODI', 'India', 'Neutral', 18, 18, 10, 0, 5, 4),
(4, 'T20', 'India', 'Home', 10, 10, 5, 0, 2, 1),
(4, 'T20', 'India', 'Away', 10, 10, 4, 0, 1, 1),
(4, 'T20', 'India', 'Neutral', 10, 10, 6, 0, 2, 1),
(4, 'Test', 'Zimbabwe', 'Home', 8, 16, 8, 0, 2, 2),
(4, 'Test', 'Zimbabwe', 'Away', 8, 16, 7, 0, 1, 1),
(4, 'Test', 'Zimbabwe', 'Neutral', 8, 16, 9, 0, 3, 2),
(4, 'ODI', 'Zimbabwe', 'Home', 14, 14, 7, 0, 2, 3),
(4, 'ODI', 'Zimbabwe', 'Away', 14, 14, 6, 0, 3, 1),
(4, 'ODI', 'Zimbabwe', 'Neutral', 14, 14, 8, 0, 4, 2),
(4, 'T20', 'Zimbabwe', 'Home', 6, 6, 3, 0, 1, 0),
(4, 'T20', 'Zimbabwe', 'Away', 6, 6, 2, 0, 0, 1),
(4, 'T20', 'Zimbabwe', 'Neutral', 6, 6, 4, 0, 2, 1),
(4, 'Test', 'Pakistan', 'Home', 10, 20, 10, 0, 2, 1),
(4, 'Test', 'Pakistan', 'Away', 10, 20, 9, 0, 1, 1),
(4, 'Test', 'Pakistan', 'Neutral', 10, 20, 11, 0, 3, 2),
(4, 'ODI', 'Pakistan', 'Home', 15, 15, 8, 0, 2, 2),
(4, 'ODI', 'Pakistan', 'Away', 15, 15, 7, 0, 4, 3),
(4, 'ODI', 'Pakistan', 'Neutral', 15, 15, 9, 0, 3, 2),
(4, 'T20', 'Pakistan', 'Home', 8, 8, 4, 0, 1, 1),
(4, 'T20', 'Pakistan', 'Away', 8, 8, 5, 0, 2, 1),
(4, 'T20', 'Pakistan', 'Neutral', 8, 8, 6, 0, 1, 0),
(4, 'Test', 'Australia', 'Home', 8, 16, 9, 0, 3, 2),
(4, 'Test', 'Australia', 'Away', 8, 16, 10, 0, 2, 1),
(4, 'Test', 'Australia', 'Neutral', 8, 16, 8, 0, 1, 2),
(4, 'ODI', 'Australia', 'Home', 14, 14, 7, 0, 3, 2),
(4, 'ODI', 'Australia', 'Away', 14, 14, 9, 0, 2, 3),
(4, 'ODI', 'Australia', 'Neutral', 14, 14, 8, 0, 4, 1),
(4, 'T20', 'Australia', 'Home', 6, 6, 3, 0, 1, 1),
(4, 'T20', 'Australia', 'Away', 6, 6, 4, 0, 2, 0),
(4, 'T20', 'Australia', 'Neutral', 6, 6, 5, 0, 1, 1),
(4, 'Test', 'Sri Lanka', 'Home', 10, 20, 10, 0, 3, 1),
(4, 'Test', 'Sri Lanka', 'Away', 10, 20, 11, 0, 2, 2),
(4, 'Test', 'Sri Lanka', 'Neutral', 10, 20, 12, 0, 4, 3),
(4, 'ODI', 'Sri Lanka', 'Home', 18, 18, 9, 0, 3, 2),
(4, 'ODI', 'Sri Lanka', 'Away', 18, 18, 10, 0, 2, 1),
(4, 'ODI', 'Sri Lanka', 'Neutral', 18, 18, 11, 0, 4, 3),
(4, 'T20', 'Sri Lanka', 'Home', 10, 10, 4, 0, 1, 0),
(4, 'T20', 'Sri Lanka', 'Away', 10, 10, 5, 0, 2, 1),
(4, 'T20', 'Sri Lanka', 'Neutral', 10, 10, 6, 0, 3, 2);

INSERT INTO FieldingCareer 
(PlayerID, Opponent,  MatchType,  LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(1, 'India', 'Test', 'Home', 10, 18, 15, 0, 5, 3),
(1, 'India', 'Test', 'Away', 10, 18, 14, 0, 4, 2),
(1, 'India', 'Test', 'Neutral', 10, 18, 13, 0, 3, 1),
(1, 'India', 'ODI', 'Home', 15, 15, 12, 0, 6, 4),
(1, 'India', 'ODI', 'Away', 15, 15, 10, 0, 5, 3),
(1, 'India', 'ODI', 'Neutral', 15, 15, 11, 0, 7, 5),
(1, 'India', 'T20', 'Home', 8, 8, 6, 0, 2, 1),
(1, 'India', 'T20', 'Away', 8, 8, 5, 0, 1, 0),
(1, 'India', 'T20', 'Neutral', 8, 8, 7, 0, 3, 2),
(1, 'Zimbabwe', 'Test', 'Home', 6, 12, 8, 0, 3, 2),
(1, 'Zimbabwe', 'Test', 'Away', 6, 12, 9, 0, 2, 1),
(1, 'Zimbabwe', 'Test', 'Neutral', 6, 12, 7, 0, 1, 0),
(1, 'Zimbabwe', 'ODI', 'Home', 12, 12, 10, 0, 4, 3),
(1, 'Zimbabwe', 'ODI', 'Away', 12, 12, 9, 0, 3, 2),
(1, 'Zimbabwe', 'ODI', 'Neutral', 12, 12, 11, 0, 5, 4),
(1, 'Zimbabwe', 'T20', 'Home', 5, 5, 4, 0, 1, 0),
(1, 'Zimbabwe', 'T20', 'Away', 5, 5, 3, 0, 0, 1),
(1, 'Zimbabwe', 'T20', 'Neutral', 5, 5, 5, 0, 2, 1),
(1, 'Pakistan', 'Test', 'Home', 8, 16, 10, 0, 3, 2),
(1, 'Pakistan', 'Test', 'Away', 8, 16, 11, 0, 2, 1),
(1, 'Pakistan', 'Test', 'Neutral', 8, 16, 9, 0, 1, 0),
(1, 'Pakistan', 'ODI', 'Home', 10, 10, 8, 0, 4, 2),
(1, 'Pakistan', 'ODI', 'Away', 10, 10, 7, 0, 3, 1),
(1, 'Pakistan', 'ODI', 'Neutral', 10, 10, 9, 0, 5, 3),
(1, 'Pakistan', 'T20', 'Home', 6, 6, 4, 0, 1, 1),
(1, 'Pakistan', 'T20', 'Away', 6, 6, 5, 0, 2, 0),
(1, 'Pakistan', 'T20', 'Neutral', 6, 6, 6, 0, 3, 2),
(1, 'Australia', 'ODI', 'Home', 14, 14, 9, 0, 3, 2),
(1, 'Australia', 'ODI', 'Away', 14, 14, 11, 0, 4, 3),
(1, 'Australia', 'ODI', 'Neutral', 14, 14, 10, 0, 2, 1),
(1, 'Australia', 'T20', 'Home', 6, 6, 4, 0, 1, 0),
(1, 'Australia', 'T20', 'Away', 6, 6, 5, 0, 2, 1),
(1, 'Australia', 'T20', 'Neutral', 6, 6, 3, 0, 1, 1),
(1, 'Sri Lanka', 'Test', 'Home', 10, 20, 12, 0, 3, 2),
(1, 'Sri Lanka', 'Test', 'Away', 10, 20, 11, 0, 4, 3),
(1, 'Sri Lanka', 'Test', 'Neutral', 10, 20, 13, 0, 2, 1),
(1, 'Sri Lanka', 'ODI', 'Home', 18, 18, 10, 0, 3, 2),
(1, 'Sri Lanka', 'ODI', 'Away', 18, 18, 9, 0, 2, 1),
(1, 'Sri Lanka', 'ODI', 'Neutral', 18, 18, 12, 0, 4, 3),
(1, 'Sri Lanka', 'T20', 'Home', 10, 10, 6, 0, 1, 1),
(1, 'Sri Lanka', 'T20', 'Away', 10, 10, 5, 0, 2, 2),
(1, 'Sri Lanka', 'T20', 'Neutral', 10, 10, 7, 0, 3, 2);

INSERT INTO BattingCareerAgainst  
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts) VALUES 
(1, 'India', 'Test', 'Home', 15, 28, 2200, 3800, 210, 55.00, 57.89, 7, 10, 240, 30, 2, 5),
(1, 'India', 'Test', 'Away', 15, 28, 2000, 3600, 185, 50.00, 55.56, 5, 12, 210, 25, 3, 4),
(1, 'India', 'Test', 'Neutral', 15, 28, 1800, 3400, 160, 45.00, 52.94, 4, 9, 190, 20, 4, 6),
(1, 'India', 'ODI', 'Home', 30, 30, 1400, 1500, 134, 46.67, 93.33, 3, 12, 150, 40, 1, 7),
(1, 'India', 'ODI', 'Away', 30, 30, 1300, 1400, 128, 43.33, 92.86, 2, 15, 130, 35, 2, 6),
(1, 'India', 'ODI', 'Neutral', 30, 30, 1500, 1600, 152, 50.00, 93.75, 4, 10, 160, 45, 1, 8),
(1, 'India', 'T20', 'Home', 20, 20, 600, 500, 90, 30.00, 120.00, 0, 5, 60, 25, 1, 2),
(1, 'India', 'T20', 'Away', 20, 20, 550, 450, 85, 27.50, 122.22, 0, 4, 50, 20, 2, 1),
(1, 'India', 'T20', 'Neutral', 20, 20, 650, 550, 95, 32.50, 118.18, 0, 6, 70, 30, 0, 3),
(1, 'Australia', 'Test', 'Home', 12, 24, 1900, 3300, 205, 60.00, 57.58, 6, 9, 220, 28, 1, 6),
(1, 'Australia', 'Test', 'Away', 12, 24, 1750, 3100, 195, 54.69, 56.45, 5, 8, 200, 22, 2, 5),
(1, 'Australia', 'Test', 'Neutral', 12, 24, 1600, 2900, 180, 50.00, 55.17, 4, 7, 180, 18, 3, 4),
(1, 'Australia', 'ODI', 'Home', 25, 25, 1200, 1250, 138, 48.00, 96.00, 3, 9, 120, 38, 1, 4),
(1, 'Australia', 'ODI', 'Away', 25, 25, 1150, 1200, 132, 46.00, 95.83, 2, 11, 110, 34, 2, 3),
(1, 'Australia', 'ODI', 'Neutral', 25, 25, 1250, 1300, 145, 50.00, 96.15, 4, 8, 130, 40, 0, 6),
(1, 'Australia', 'T20', 'Away', 15, 15, 430, 350, 80, 28.67, 122.86, 0, 4, 40, 18, 1, 2),
(1, 'Australia', 'T20', 'Neutral', 15, 15, 500, 400, 85, 33.33, 125.00, 0, 5, 45, 20, 0, 3),
(1, 'Pakistan', 'Test', 'Home', 12, 24, 2100, 3700, 185, 52.50, 56.76, 5, 11, 230, 24, 2, 4),
(1, 'Pakistan', 'Test', 'Away', 12, 24, 2000, 3500, 170, 50.00, 57.14, 6, 9, 210, 20, 3, 5),
(1, 'Pakistan', 'Test', 'Neutral', 12, 24, 1900, 3400, 160, 47.50, 55.88, 4, 10, 190, 18, 4, 6),
(1, 'Pakistan', 'ODI', 'Home', 20, 20, 900, 950, 125, 45.00, 94.74, 2, 7, 85, 25, 1, 5),
(1, 'Pakistan', 'ODI', 'Away', 20, 20, 850, 900, 118, 42.50, 94.44, 1, 8, 75, 22, 2, 4),
(1, 'Pakistan', 'ODI', 'Neutral', 20, 20, 1000, 1050, 135, 50.00, 95.24, 3, 6, 90, 30, 0, 7),
(1, 'Pakistan', 'T20', 'Home', 12, 12, 350, 300, 70, 29.17, 116.67, 0, 3, 30, 15, 1, 2),
(1, 'Pakistan', 'T20', 'Away', 12, 12, 330, 280, 65, 27.50, 117.86, 0, 2, 28, 12, 2, 1),
(1, 'Pakistan', 'T20', 'Neutral', 12, 12, 370, 320, 75, 30.83, 115.63, 0, 4, 35, 18, 0, 3),
(1, 'Sri Lanka', 'Test', 'Home', 10, 20, 1800, 3200, 160, 45.00, 56.25, 3, 8, 180, 15, 3, 5),
(1, 'Sri Lanka', 'Test', 'Away', 10, 20, 1700, 3100, 150, 42.50, 54.84, 4, 7, 170, 10, 4, 6),
(1, 'Sri Lanka', 'Test', 'Neutral', 10, 20, 1650, 3000, 140, 41.25, 55.00, 2, 9, 160, 12, 5, 7),
(1, 'Sri Lanka', 'ODI', 'Home', 18, 18, 800, 850, 130, 44.44, 94.12, 2, 6, 80, 20, 1, 6),
(1, 'Sri Lanka', 'ODI', 'Away', 18, 18, 750, 800, 120, 41.67, 93.75, 1, 7, 70, 18, 2, 5),
(1, 'Sri Lanka', 'ODI', 'Neutral', 18, 18, 850, 900, 140, 47.22, 94.44, 3, 5, 85, 23, 0, 8),
(1, 'Sri Lanka', 'T20', 'Home', 10, 10, 280, 240, 60, 28.00, 116.67, 0, 2, 25, 10, 1, 2),
(1, 'Sri Lanka', 'T20', 'Away', 10, 10, 260, 220, 55, 26.00, 118.18, 0, 1, 23, 8, 2, 1),
(1, 'Sri Lanka', 'T20', 'Neutral', 10, 10, 300, 250, 65, 30.00, 120.00, 0, 3, 28, 12, 0, 3),
(1, 'Zimbabwe', 'Test', 'Home', 8, 16, 1200, 2000, 180, 50.00, 60.00, 3, 5, 150, 12, 2, 4),
(1, 'Zimbabwe', 'Test', 'Away', 8, 16, 1100, 1900, 165, 45.83, 57.89, 2, 6, 140, 10, 3, 3),
(1, 'Zimbabwe', 'Test', 'Neutral', 8, 16, 1050, 1800, 150, 43.75, 58.33, 1, 7, 130, 8, 4, 5),
(1, 'Zimbabwe', 'ODI', 'Home', 14, 14, 800, 850, 125, 57.14, 94.12, 2, 6, 85, 20, 0, 3),
(1, 'Zimbabwe', 'ODI', 'Away', 14, 14, 750, 800, 120, 53.57, 93.75, 1, 7, 75, 18, 1, 4),
(1, 'Zimbabwe', 'ODI', 'Neutral', 14, 14, 850, 900, 135, 60.71, 94.44, 3, 5, 90, 25, 1, 5),
(1, 'Zimbabwe', 'T20', 'Home', 6, 6, 250, 210, 65, 41.67, 119.05, 0, 2, 30, 10, 0, 2),
(1, 'Zimbabwe', 'T20', 'Away', 6, 6, 240, 200, 60, 40.00, 120.00, 0, 1, 25, 9, 1, 1),
(1, 'Zimbabwe', 'T20', 'Neutral', 6, 6, 280, 230, 70, 46.67, 121.74, 0, 3, 35, 12, 0, 3);

INSERT INTO BowlingCareerAgainst 
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(1, 'India', 'Test', 'Home', 12, 10, 150, 900, 450, 18, 3.00, 25.00, 50.00, 0, 0, '4/50', 5),
(1, 'India', 'Test', 'Away', 12, 10, 140, 840, 420, 15, 3.00, 28.00, 56.00, 0, 0, '3/45', 4),
(1, 'India', 'Test', 'Neutral', 12, 10, 130, 780, 390, 13, 3.00, 30.00, 60.00, 0, 0, '3/50', 3),
(1, 'India', 'ODI', 'Home', 30, 20, 140, 840, 600, 25, 4.29, 24.00, 33.60, 0, 0, '4/44', 2),
(1, 'India', 'ODI', 'Away', 30, 20, 130, 780, 580, 22, 4.46, 26.36, 35.45, 0, 0, '3/40', 1),
(1, 'India', 'ODI', 'Neutral', 30, 20, 150, 900, 650, 30, 4.33, 21.67, 30.00, 1, 0, '5/38', 3),
(1, 'India', 'T20', 'Home', 20, 10, 30, 180, 150, 15, 5.00, 10.00, 12.00, 0, 0, '3/25', 0),
(1, 'India', 'T20', 'Away', 20, 10, 28, 168, 140, 12, 5.00, 11.67, 14.00, 0, 0, '2/22', 0),
(1, 'India', 'T20', 'Neutral', 20, 10, 35, 210, 170, 18, 4.86, 9.44, 11.67, 0, 0, '3/20', 1),
(1, 'Zimbabwe', 'Test', 'Home', 8, 6, 90, 540, 270, 12, 3.00, 22.50, 45.00, 0, 0, '4/60', 3),
(1, 'Zimbabwe', 'Test', 'Away', 8, 6, 80, 480, 240, 10, 3.00, 24.00, 48.00, 0, 0, '3/55', 2),
(1, 'Zimbabwe', 'Test', 'Neutral', 8, 6, 85, 510, 255, 11, 3.00, 23.18, 46.36, 0, 0, '3/45', 3),
(1, 'Zimbabwe', 'ODI', 'Home', 14, 10, 60, 360, 220, 18, 3.67, 12.22, 20.00, 0, 0, '4/35', 1),
(1, 'Zimbabwe', 'ODI', 'Away', 14, 10, 58, 348, 210, 15, 3.62, 14.00, 23.20, 0, 0, '3/30', 1),
(1, 'Zimbabwe', 'ODI', 'Neutral', 14, 10, 65, 390, 240, 20, 3.69, 12.00, 19.50, 1, 0, '5/28', 2),
(1, 'Zimbabwe', 'T20', 'Home', 6, 4, 12, 72, 55, 6, 4.58, 9.17, 12.00, 0, 0, '2/18', 0),
(1, 'Zimbabwe', 'T20', 'Away', 6, 4, 14, 84, 65, 7, 4.64, 9.29, 12.00, 0, 0, '3/20', 0),
(1, 'Zimbabwe', 'T20', 'Neutral', 6, 4, 15, 90, 70, 8, 4.67, 8.75, 11.25, 0, 0, '3/15', 1),
(1, 'Pakistan', 'Test', 'Home', 10, 8, 120, 720, 360, 16, 3.00, 22.50, 45.00, 0, 0, '4/58', 4),
(1, 'Pakistan', 'Test', 'Away', 10, 8, 110, 660, 330, 14, 3.00, 23.57, 47.14, 0, 0, '4/54', 3),
(1, 'Pakistan', 'Test', 'Neutral', 10, 8, 115, 690, 345, 15, 3.00, 23.00, 46.00, 0, 0, '3/48', 2),
(1, 'Pakistan', 'ODI', 'Home', 18, 12, 90, 540, 360, 24, 4.00, 15.00, 22.50, 0, 0, '4/42', 1),
(1, 'Pakistan', 'ODI', 'Away', 18, 12, 85, 510, 340, 22, 4.00, 15.45, 23.18, 0, 0, '3/39', 0),
(1, 'Pakistan', 'ODI', 'Neutral', 18, 12, 95, 570, 380, 26, 4.00, 14.62, 21.92, 1, 0, '5/35', 2),
(1, 'Pakistan', 'T20', 'Home', 12, 6, 20, 120, 100, 10, 5.00, 10.00, 12.00, 0, 0, '3/22', 0),
(1, 'Pakistan', 'T20', 'Away', 12, 6, 18, 108, 90, 8, 5.00, 11.25, 13.50, 0, 0, '2/20', 0),
(1, 'Pakistan', 'T20', 'Neutral', 12, 6, 22, 132, 110, 12, 5.00, 9.17, 11.00, 0, 0, '3/18', 1),
(1, 'Sri Lanka', 'Test', 'Home', 10, 8, 130, 780, 390, 17, 3.00, 22.94, 45.88, 0, 0, '4/60', 5),
(1, 'Sri Lanka', 'Test', 'Away', 10, 8, 125, 750, 375, 15, 3.00, 25.00, 50.00, 0, 0, '4/62', 4),
(1, 'Sri Lanka', 'Test', 'Neutral', 10, 8, 120, 720, 360, 13, 3.00, 27.69, 55.38, 0, 0, '3/53', 3),
(1, 'Sri Lanka', 'ODI', 'Home', 18, 12, 100, 600, 420, 28, 4.20, 15.00, 21.43, 1, 0, '5/40', 3),
(1, 'Sri Lanka', 'ODI', 'Away', 18, 12, 95, 570, 400, 25, 4.21, 16.00, 22.80, 0, 0, '4/46', 2),
(1, 'Sri Lanka', 'ODI', 'Neutral', 18, 12, 105, 630, 450, 30, 4.29, 15.00, 21.00, 1, 0, '5/38', 4),
(1, 'Sri Lanka', 'T20', 'Home', 10, 5, 18, 108, 90, 9, 5.00, 10.00, 12.00, 0, 0, '3/24', 0),
(1, 'Sri Lanka', 'T20', 'Away', 10, 5, 16, 96, 80, 8, 5.00, 10.00, 12.00, 0, 0, '2/18', 0),
(1, 'Sri Lanka', 'T20', 'Neutral', 10, 5, 20, 120, 100, 10, 5.00, 10.00, 12.00, 0, 0, '3/20', 1),
(1, 'Australia', 'Test', 'Home', 8, 6, 100, 600, 300, 12, 3.00, 25.00, 50.00, 0, 0, '4/55', 3),
(1, 'Australia', 'Test', 'Away', 8, 6, 95, 570, 285, 10, 3.00, 28.50, 57.00, 0, 0, '3/50', 2),
(1, 'Australia', 'Test', 'Neutral', 8, 6, 90, 540, 270, 9, 3.00, 30.00, 60.00, 0, 0, '3/48', 1),
(1, 'Australia', 'ODI', 'Home', 14, 8, 70, 420, 280, 20, 4.00, 14.00, 21.00, 0, 0, '4/44', 1),
(1, 'Australia', 'ODI', 'Away', 14, 8, 65, 390, 260, 18, 4.00, 14.44, 21.67, 0, 0, '4/42', 0),
(1, 'Australia', 'ODI', 'Neutral', 14, 8, 75, 450, 300, 22, 4.00, 13.64, 20.45, 1, 0, '5/36', 2),
(1, 'Australia', 'T20', 'Home', 6, 3, 12, 72, 60, 6, 5.00, 10.00, 12.00, 0, 0, '2/20', 0),
(1, 'Australia', 'T20', 'Away', 6, 3, 11, 66, 55, 5, 5.00, 11.00, 13.20, 0, 0, '2/18', 0),
(1, 'Australia', 'T20', 'Neutral', 6, 3, 15, 90, 75, 8, 5.00, 9.38, 11.25, 0, 0, '3/15', 1);

INSERT INTO BattingCareerAgainst  
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts) VALUES 
(7, 'India', 'Test', 'Home', 5, 10, 350, 700, 120, 35.00, 50.00, 1, 1, 45, 5, 1, 2),
(7, 'India', 'Test', 'Away', 5, 10, 320, 650, 115, 32.00, 49.23, 0, 2, 40, 4, 2, 1),
(7, 'India', 'ODI', 'Home', 8, 8, 280, 360, 95, 35.00, 77.78, 0, 2, 25, 8, 0, 1),
(7, 'India', 'ODI', 'Away', 8, 8, 260, 340, 90, 32.50, 76.47, 0, 1, 20, 7, 1, 0),
(7, 'India', 'T20', 'Neutral', 6, 6, 200, 150, 70, 33.33, 133.33, 0, 1, 15, 10, 0, 1),
(7, 'Australia', 'Test', 'Home', 4, 8, 280, 600, 105, 35.00, 46.67, 0, 2, 35, 3, 1, 1),
(7, 'Australia', 'Test', 'Away', 4, 8, 250, 580, 98, 31.25, 43.10, 0, 1, 30, 2, 2, 0),
(7, 'Australia', 'ODI', 'Neutral', 7, 7, 220, 270, 80, 31.43, 81.48, 0, 1, 18, 6, 1, 1),
(7, 'Australia', 'T20', 'Home', 5, 5, 160, 120, 65, 32.00, 133.33, 0, 2, 12, 8, 0, 0),
(7, 'Pakistan', 'Test', 'Neutral', 3, 6, 220, 500, 90, 36.67, 44.00, 0, 1, 20, 1, 1, 1),
(7, 'Pakistan', 'ODI', 'Home', 6, 6, 240, 300, 85, 40.00, 80.00, 0, 2, 22, 5, 0, 2),
(7, 'Pakistan', 'T20', 'Away', 4, 4, 130, 100, 55, 32.50, 130.00, 0, 1, 10, 7, 0, 1),
(7, 'Sri Lanka', 'Test', 'Away', 4, 8, 270, 580, 110, 33.75, 46.55, 1, 0, 25, 2, 2, 1),
(7, 'Sri Lanka', 'ODI', 'Home', 7, 7, 310, 350, 100, 44.29, 88.57, 1, 2, 30, 10, 0, 1),
(7, 'Sri Lanka', 'T20', 'Neutral', 5, 5, 180, 140, 60, 36.00, 128.57, 0, 2, 16, 9, 0, 0);

INSERT INTO BattingCareerAgainst  
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts) VALUES 
(7, 'Zimbabwe', 'Test', 'Home', 3, 6, 280, 450, 140, 46.67, 62.22, 1, 1, 30, 5, 0, 2),
(7, 'Zimbabwe', 'Test', 'Away', 3, 6, 250, 430, 120, 41.67, 58.14, 1, 0, 25, 4, 1, 1),
(7, 'Zimbabwe', 'ODI', 'Home', 5, 5, 330, 320, 115, 66.00, 103.13, 1, 2, 35, 8, 0, 2),
(7, 'Zimbabwe', 'ODI', 'Away', 5, 5, 310, 300, 105, 62.00, 103.33, 1, 1, 32, 7, 0, 1),
(7, 'Zimbabwe', 'T20', 'Neutral', 4, 4, 200, 160, 75, 50.00, 125.00, 0, 2, 20, 10, 0, 1),
(7, 'Zimbabwe', 'T20', 'Home', 4, 4, 180, 140, 70, 45.00, 128.57, 0, 1, 18, 9, 0, 1),
(7, 'Zimbabwe', 'T20', 'Away', 4, 4, 190, 150, 80, 47.50, 126.67, 0, 2, 16, 11, 0, 1);

INSERT INTO BowlingCareerAgainst 
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(7, 'India', 'Test', 'Home', 5, 3, 18, 108, 95, 2, 5.28, 47.50, 54.00, 0, 0, '2/35', 1),
(7, 'India', 'Test', 'Away', 5, 2, 12, 72, 70, 1, 5.83, 70.00, 72.00, 0, 0, '1/40', 0),
(7, 'India', 'ODI', 'Neutral', 8, 4, 20, 120, 110, 4, 5.50, 27.50, 30.00, 0, 0, '2/25', 0),
(7, 'India', 'T20', 'Home', 6, 1, 4, 24, 45, 1, 11.25, 45.00, 24.00, 0, 0, '1/45', 0),
(7, 'Australia', 'Test', 'Neutral', 4, 1, 6, 36, 40, 0, 6.67, 0, 0, 0, 0, '0/40', 0),
(7, 'Australia', 'ODI', 'Home', 7, 2, 10, 60, 55, 2, 5.50, 27.50, 30.00, 0, 0, '2/30', 0),
(7, 'Australia', 'T20', 'Away', 5, 1, 2, 12, 20, 1, 10.00, 20.00, 12.00, 0, 0, '1/20', 0),
(7, 'Pakistan', 'Test', 'Home', 3, 1, 8, 48, 50, 1, 6.25, 50.00, 48.00, 0, 0, '1/50', 0),
(7, 'Pakistan', 'ODI', 'Away', 6, 2, 12, 72, 68, 3, 5.67, 22.67, 24.00, 0, 0, '2/28', 0),
(7, 'Pakistan', 'T20', 'Neutral', 4, 1, 3, 18, 30, 2, 10.00, 15.00, 9.00, 0, 0, '2/30', 0),
(7, 'Zimbabwe', 'Test', 'Away', 3, 2, 10, 60, 30, 2, 3.00, 15.00, 30.00, 0, 0, '2/15', 1),
(7, 'Zimbabwe', 'ODI', 'Home', 5, 3, 15, 90, 70, 5, 4.67, 14.00, 18.00, 0, 0, '3/20', 1),
(7, 'Zimbabwe', 'T20', 'Neutral', 4, 2, 6, 36, 50, 3, 8.33, 16.67, 12.00, 0, 0, '2/25', 0),
(7, 'Zimbabwe', 'Test', 'Home', 3, 2, 10, 60, 40, 2, 4.00, 20.00, 30.00, 0, 0, '2/20', 0),
(7, 'Zimbabwe', 'Test', 'Neutral', 3, 1, 5, 30, 25, 1, 5.00, 25.00, 30.00, 0, 0, '1/25', 0),
(7, 'Zimbabwe', 'ODI', 'Away', 5, 3, 15, 90, 80, 3, 5.33, 26.67, 30.00, 0, 0, '2/35', 0),
(7, 'Zimbabwe', 'ODI', 'Neutral', 5, 2, 10, 60, 55, 2, 5.50, 27.50, 30.00, 0, 0, '2/30', 0),
(7, 'Zimbabwe', 'T20', 'Home', 4, 2, 7, 42, 36, 3, 5.14, 12.00, 14.00, 0, 0, '2/16', 0),
(7, 'Zimbabwe', 'T20', 'Away', 4, 1, 3, 18, 20, 1, 6.67, 20.00, 18.00, 0, 0, '1/20', 0),
(7, 'Sri Lanka', 'Test', 'Home', 4, 3, 12, 72, 65, 2, 5.42, 32.50, 36.00, 0, 0, '2/32', 1),
(7, 'Sri Lanka', 'Test', 'Away', 4, 2, 8, 48, 55, 1, 6.88, 55.00, 48.00, 0, 0, '1/55', 0),
(7, 'Sri Lanka', 'Test', 'Neutral', 4, 1, 4, 24, 30, 0, 7.50, 0, 0, 0, 0, '0/30', 0),
(7, 'Sri Lanka', 'ODI', 'Home', 6, 3, 14, 84, 70, 3, 5.00, 23.33, 28.00, 0, 0, '2/23', 0),
(7, 'Sri Lanka', 'ODI', 'Away', 6, 2, 8, 48, 45, 2, 5.63, 22.50, 24.00, 0, 0, '2/22', 0),
(7, 'Sri Lanka', 'ODI', 'Neutral', 6, 3, 12, 72, 60, 4, 5.00, 15.00, 18.00, 0, 0, '3/15', 1),
(7, 'Sri Lanka', 'T20', 'Home', 5, 2, 6, 36, 50, 2, 8.33, 25.00, 18.00, 0, 0, '2/25', 0),
(7, 'Sri Lanka', 'T20', 'Away', 5, 1, 2, 12, 18, 1, 9.00, 18.00, 12.00, 0, 0, '1/18', 0),
(7, 'Sri Lanka', 'T20', 'Neutral', 5, 2, 7, 42, 40, 3, 5.71, 13.33, 14.00, 0, 0, '2/20', 0);

INSERT INTO FieldingCareer 
(PlayerID, Opponent, MatchType,  LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(7, 'India', 'Test', 'Home', 5, 10, 8, 0, 2, 1),
(7, 'India', 'Test', 'Away', 5, 10, 6, 0, 1, 0),
(7, 'India', 'ODI', 'Neutral', 8, 8, 7, 0, 3, 2),
(7, 'India', 'T20', 'Home', 6, 6, 5, 0, 2, 1),
(7, 'Australia', 'Test', 'Neutral', 4, 8, 5, 0, 1, 0),
(7, 'Australia', 'ODI', 'Home', 7, 7, 6, 0, 1, 1),
(7, 'Australia', 'T20', 'Away', 5, 5, 4, 0, 0, 0),
(7, 'Pakistan', 'Test', 'Home', 3, 6, 4, 0, 0, 0),
(7, 'Pakistan', 'ODI', 'Away', 6, 6, 5, 0, 2, 1),
(7, 'Pakistan', 'T20', 'Neutral', 4, 4, 3, 0, 1, 1),
(7, 'Zimbabwe', 'Test', 'Away', 3, 6, 4, 0, 1, 1),
(7, 'Zimbabwe', 'ODI', 'Home', 5, 5, 5, 0, 1, 2),
(7, 'Zimbabwe', 'T20', 'Neutral', 4, 4, 3, 0, 2, 2),
(7, 'Sri Lanka', 'Test', 'Home', 4, 8, 7, 0, 2, 2),
(7, 'Sri Lanka', 'Test', 'Away', 4, 8, 5, 0, 1, 1),
(7, 'Sri Lanka', 'Test', 'Neutral', 4, 8, 6, 0, 0, 0),
(7, 'Sri Lanka', 'ODI', 'Home', 6, 6, 4, 0, 2, 1),
(7, 'Sri Lanka', 'ODI', 'Away', 6, 6, 6, 0, 3, 3),
(7, 'Sri Lanka', 'ODI', 'Neutral', 6, 6, 5, 0, 1, 2),
(7, 'Sri Lanka', 'T20', 'Home', 5, 5, 4, 0, 1, 1),
(7, 'Sri Lanka', 'T20', 'Away', 5, 5, 3, 0, 2, 1),
(7, 'Sri Lanka', 'T20', 'Neutral', 5, 5, 5, 0, 1, 2),
(7, 'Pakistan', 'Test', 'Home', 3, 6, 4, 0, 1, 1),
(7, 'Pakistan', 'Test', 'Away', 3, 6, 3, 0, 0, 0),
(7, 'Pakistan', 'Test', 'Neutral', 3, 6, 5, 0, 2, 1),
(7, 'Pakistan', 'ODI', 'Home', 6, 6, 5, 0, 3, 2),
(7, 'Pakistan', 'ODI', 'Away', 6, 6, 4, 0, 1, 1),
(7, 'Pakistan', 'ODI', 'Neutral', 6, 6, 6, 0, 2, 2),
(7, 'Pakistan', 'T20', 'Home', 4, 4, 3, 0, 1, 1),
(7, 'Pakistan', 'T20', 'Away', 4, 4, 2, 0, 1, 0),
(7, 'Pakistan', 'T20', 'Neutral', 4, 4, 4, 0, 2, 2);

INSERT INTO BattingCareerAgainst  
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts) VALUES 
(9, 'India', 'Test', 'Home', 4, 8, 200, 400, 60, 25.00, 50.00, 0, 1, 25, 2, 1, 2),
(9, 'India', 'Test', 'Away', 4, 8, 180, 370, 55, 22.50, 48.65, 0, 0, 18, 1, 2, 1),
(9, 'India', 'ODI', 'Home', 5, 5, 150, 180, 45, 30.00, 83.33, 0, 1, 15, 3, 0, 1),
(9, 'India', 'ODI', 'Away', 5, 5, 130, 160, 40, 26.00, 81.25, 0, 0, 12, 2, 1, 0),
(9, 'India', 'T20', 'Neutral', 3, 3, 90, 70, 35, 30.00, 128.57, 0, 0, 9, 4, 0, 1),
(9, 'Australia', 'Test', 'Home', 3, 6, 160, 350, 75, 26.67, 45.71, 0, 1, 20, 1, 1, 1),
(9, 'Australia', 'Test', 'Away', 3, 6, 140, 320, 50, 23.33, 43.75, 0, 0, 14, 0, 1, 1),
(9, 'Australia', 'ODI', 'Neutral', 4, 4, 120, 140, 45, 30.00, 85.71, 0, 0, 10, 2, 0, 0),
(9, 'Australia', 'T20', 'Home', 3, 3, 80, 60, 40, 26.67, 133.33, 0, 0, 8, 3, 0, 1),
(9, 'Pakistan', 'Test', 'Neutral', 2, 4, 110, 250, 65, 27.50, 44.00, 0, 1, 10, 1, 0, 1),
(9, 'Pakistan', 'ODI', 'Home', 3, 3, 95, 110, 50, 31.67, 86.36, 0, 1, 7, 2, 0, 1),
(9, 'Pakistan', 'T20', 'Away', 2, 2, 60, 45, 35, 30.00, 133.33, 0, 0, 5, 3, 0, 1),
(9, 'Zimbabwe', 'Test', 'Away', 2, 4, 180, 300, 80, 45.00, 60.00, 0, 2, 18, 3, 0, 2),
(9, 'Zimbabwe', 'ODI', 'Home', 4, 4, 170, 190, 65, 42.50, 89.47, 0, 2, 16, 4, 0, 2),
(9, 'Zimbabwe', 'T20', 'Neutral', 3, 3, 110, 90, 55, 36.67, 122.22, 0, 1, 11, 5, 0, 1),
(9, 'Australia', 'ODI', 'Home', 4, 4, 130, 150, 50, 32.50, 86.67, 0, 1, 12, 2, 1, 0),
(9, 'Australia', 'T20', 'Away', 3, 3, 70, 50, 30, 23.33, 140.00, 0, 0, 6, 2, 0, 0),
(9, 'Pakistan', 'Test', 'Home', 2, 4, 120, 240, 55, 30.00, 50.00, 0, 1, 12, 1, 1, 1),
(9, 'Pakistan', 'ODI', 'Neutral', 3, 3, 85, 100, 45, 28.33, 85.00, 0, 0, 8, 1, 0, 0),
(9, 'Pakistan', 'T20', 'Home', 2, 2, 55, 40, 30, 27.50, 137.50, 0, 0, 4, 2, 1, 0),
(9, 'Zimbabwe', 'Test', 'Home', 2, 4, 150, 280, 70, 37.50, 53.57, 0, 1, 15, 1, 0, 2),
(9, 'Zimbabwe', 'ODI', 'Away', 4, 4, 160, 180, 60, 40.00, 88.89, 0, 1, 14, 3, 0, 1),
(9, 'Zimbabwe', 'T20', 'Home', 3, 3, 100, 80, 45, 33.33, 125.00, 0, 0, 10, 4, 0, 1),
(9, 'Sri Lanka', 'Test', 'Home', 3, 6, 220, 400, 85, 36.67, 55.00, 0, 2, 28, 4, 1, 2),
(9, 'Sri Lanka', 'Test', 'Away', 3, 6, 210, 380, 80, 35.00, 55.26, 0, 1, 26, 3, 1, 1),
(9, 'Sri Lanka', 'ODI', 'Neutral', 5, 5, 200, 230, 75, 40.00, 86.96, 0, 2, 20, 5, 0, 2),
(9, 'Sri Lanka', 'T20', 'Home', 4, 4, 130, 110, 55, 32.50, 118.18, 0, 1, 12, 6, 0, 0),
(9, 'Sri Lanka', 'T20', 'Away', 4, 4, 120, 100, 50, 30.00, 120.00, 0, 0, 10, 5, 0, 1);

INSERT INTO BowlingCareerAgainst 
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(9, 'India', 'Test', 'Home', 5, 8, 150, 900, 420, 18, 2.80, 23.33, 50.00, 0, 0, '4/65', 10),
(9, 'India', 'Test', 'Away', 5, 8, 148, 888, 460, 16, 3.10, 28.75, 55.50, 0, 0, '3/78', 8),
(9, 'India', 'ODI', 'Home', 8, 8, 64, 384, 310, 12, 4.84, 25.83, 32.00, 0, 0, '3/54', 2),
(9, 'India', 'ODI', 'Away', 8, 8, 62, 372, 290, 10, 4.68, 29.00, 37.20, 0, 0, '3/50', 1),
(9, 'India', 'T20', 'Neutral', 6, 6, 22, 132, 160, 7, 7.27, 22.86, 18.86, 0, 0, '2/30', 0),
(9, 'Pakistan', 'Test', 'Neutral', 4, 7, 130, 780, 360, 15, 2.77, 24.00, 52.00, 1, 0, '5/80', 6),
(9, 'Pakistan', 'Test', 'Home', 4, 7, 126, 756, 340, 13, 2.70, 26.15, 58.15, 0, 0, '4/72', 5),
(9, 'Pakistan', 'ODI', 'Away', 6, 6, 54, 324, 250, 11, 4.63, 22.73, 29.45, 0, 0, '3/45', 1),
(9, 'Pakistan', 'ODI', 'Neutral', 6, 6, 52, 312, 270, 9, 5.19, 30.00, 34.67, 0, 0, '3/50', 0),
(9, 'Pakistan', 'T20', 'Home', 4, 4, 14, 84, 110, 5, 7.86, 22.00, 16.80, 0, 0, '2/28', 0),
(9, 'Zimbabwe', 'Test', 'Away', 3, 5, 80, 480, 220, 10, 2.75, 22.00, 48.00, 0, 0, '4/56', 3),
(9, 'Zimbabwe', 'Test', 'Home', 3, 5, 82, 492, 210, 12, 2.56, 17.50, 41.00, 1, 0, '5/49', 4),
(9, 'Zimbabwe', 'ODI', 'Neutral', 4, 4, 32, 192, 140, 8, 4.38, 17.50, 24.00, 0, 0, '3/32', 1),
(9, 'Zimbabwe', 'ODI', 'Home', 4, 4, 30, 180, 135, 7, 4.50, 19.29, 25.71, 0, 0, '3/35', 0),
(9, 'Zimbabwe', 'T20', 'Away', 3, 3, 10, 60, 80, 4, 8.00, 20.00, 15.00, 0, 0, '2/25', 0);

INSERT INTO BowlingCareerAgainst 
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(9, 'Sri Lanka', 'Test', 'Home', 3, 6, 120, 720, 330, 14, 2.75, 23.57, 51.43, 1, 0, '5/60', 7),
(9, 'Sri Lanka', 'Test', 'Away', 3, 6, 118, 708, 320, 13, 2.71, 24.62, 54.46, 0, 0, '4/70', 6),
(9, 'Sri Lanka', 'Test', 'Neutral', 3, 6, 110, 660, 300, 11, 2.73, 27.27, 60.00, 0, 0, '4/75', 5),
(9, 'Sri Lanka', 'ODI', 'Home', 6, 6, 48, 288, 220, 9, 4.58, 24.44, 32.00, 0, 0, '3/45', 2),
(9, 'Sri Lanka', 'ODI', 'Away', 6, 6, 46, 276, 210, 8, 4.57, 26.25, 34.50, 0, 0, '3/50', 1),
(9, 'Sri Lanka', 'ODI', 'Neutral', 6, 6, 50, 300, 230, 10, 4.60, 23.00, 30.00, 0, 0, '3/40', 2),
(9, 'Sri Lanka', 'T20', 'Home', 4, 4, 14, 84, 95, 6, 6.79, 15.83, 14.00, 0, 0, '3/20', 0),
(9, 'Sri Lanka', 'T20', 'Away', 4, 4, 13, 78, 90, 5, 6.92, 18.00, 15.60, 0, 0, '2/22', 0),
(9, 'Sri Lanka', 'T20', 'Neutral', 4, 4, 15, 90, 105, 7, 7.00, 15.00, 12.86, 0, 0, '3/18', 0),
(9, 'Australia', 'Test', 'Home', 4, 7, 138, 828, 400, 17, 2.90, 23.53, 48.71, 1, 0, '5/68', 8),
(9, 'Australia', 'Test', 'Away', 4, 7, 136, 816, 420, 15, 3.08, 28.00, 54.40, 0, 0, '4/76', 7),
(9, 'Australia', 'Test', 'Neutral', 4, 7, 130, 780, 390, 13, 3.00, 30.00, 60.00, 0, 0, '4/82', 6),
(9, 'Australia', 'ODI', 'Home', 5, 5, 40, 240, 180, 8, 4.50, 22.50, 30.00, 0, 0, '3/35', 1),
(9, 'Australia', 'ODI', 'Away', 5, 5, 38, 228, 200, 7, 5.26, 28.57, 32.57, 0, 0, '3/40', 0),
(9, 'Australia', 'ODI', 'Neutral', 5, 5, 42, 252, 210, 9, 5.00, 23.33, 28.00, 0, 0, '4/45', 2),
(9, 'Australia', 'T20', 'Home', 3, 3, 10, 60, 80, 5, 8.00, 16.00, 12.00, 0, 0, '3/25', 0),
(9, 'Australia', 'T20', 'Away', 3, 3, 9, 54, 70, 4, 7.78, 17.50, 13.50, 0, 0, '2/28', 0),
(9, 'Australia', 'T20', 'Neutral', 3, 3, 11, 66, 85, 6, 7.73, 14.17, 11.00, 0, 0, '3/20', 0);

INSERT INTO FieldingCareer 
(PlayerID, Opponent,  MatchType,  LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(9, 'India', 'Test', 'Home', 5, 10, 6, 0, 2, 1),
(9, 'India', 'Test', 'Away', 5, 10, 5, 0, 1, 0),
(9, 'India', 'ODI', 'Neutral', 8, 8, 7, 0, 3, 2),
(9, 'India', 'T20', 'Home', 6, 6, 4, 0, 2, 1),
(9, 'Pakistan', 'Test', 'Neutral', 4, 8, 6, 0, 1, 0),
(9, 'Pakistan', 'Test', 'Home', 4, 8, 7, 0, 2, 1),
(9, 'Pakistan', 'ODI', 'Away', 6, 6, 5, 0, 2, 1),
(9, 'Pakistan', 'ODI', 'Neutral', 6, 6, 6, 0, 1, 2),
(9, 'Pakistan', 'T20', 'Home', 4, 4, 3, 0, 1, 1),
(9, 'Zimbabwe', 'Test', 'Away', 3, 6, 5, 0, 0, 0),
(9, 'Zimbabwe', 'Test', 'Home', 3, 6, 4, 0, 1, 1),
(9, 'Zimbabwe', 'ODI', 'Neutral', 4, 4, 3, 0, 2, 2),
(9, 'Zimbabwe', 'ODI', 'Home', 4, 4, 4, 0, 1, 1),
(9, 'Zimbabwe', 'T20', 'Away', 3, 3, 2, 0, 1, 0);

INSERT INTO BattingCareerAgainst  
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts) VALUES 
(12, 'India', 'Test', 'Home', 2, 4, 120, 300, 70, 30.00, 40.00, 0, 1, 10, 2, 0, 1),
(12, 'India', 'ODI', 'Away', 3, 3, 85, 100, 45, 28.33, 85.00, 0, 0, 7, 1, 0, 0),
(12, 'India', 'T20', 'Neutral', 2, 2, 60, 50, 35, 30.00, 120.00, 0, 0, 5, 2, 0, 0),
(12, 'Australia', 'Test', 'Home', 1, 2, 55, 150, 35, 27.50, 36.67, 0, 0, 4, 0, 1, 0),
(12, 'Australia', 'ODI', 'Neutral', 2, 2, 75, 90, 50, 37.50, 83.33, 0, 1, 6, 2, 0, 0),
(12, 'Australia', 'T20', 'Away', 1, 1, 30, 25, 30, 30.00, 120.00, 0, 0, 2, 1, 0, 0),
(12, 'Pakistan', 'Test', 'Away', 2, 4, 130, 280, 80, 32.50, 46.43, 0, 1, 11, 1, 0, 1),
(12, 'Pakistan', 'ODI', 'Home', 2, 2, 50, 65, 30, 25.00, 76.92, 0, 0, 4, 0, 1, 0),
(12, 'Pakistan', 'T20', 'Neutral', 2, 2, 40, 35, 25, 20.00, 114.29, 0, 0, 3, 1, 1, 0),
(12, 'Zimbabwe', 'Test', 'Neutral', 2, 4, 180, 350, 90, 45.00, 51.43, 0, 2, 15, 2, 0, 2),
(12, 'Zimbabwe', 'ODI', 'Home', 3, 3, 110, 125, 60, 36.67, 88.00, 0, 1, 10, 3, 0, 1),
(12, 'Zimbabwe', 'T20', 'Away', 2, 2, 75, 60, 45, 37.50, 125.00, 0, 0, 6, 3, 0, 0),
(12, 'Sri Lanka', 'Test', 'Home', 2, 4, 150, 300, 80, 37.50, 50.00, 0, 2, 12, 1, 0, 1),
(12, 'Sri Lanka', 'ODI', 'Away', 3, 3, 95, 110, 55, 31.67, 86.36, 0, 1, 8, 2, 0, 1),
(12, 'Sri Lanka', 'T20', 'Neutral', 2, 2, 55, 45, 30, 27.50, 122.22, 0, 0, 4, 2, 0, 0);

INSERT INTO BowlingCareerAgainst 
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(12, 'India', 'Test', 'Home', 2, 3, 30, 180, 110, 4, 3.67, 27.50, 45.00, 0, 0, '3/40', 2),
(12, 'India', 'Test', 'Away', 2, 3, 28, 168, 105, 3, 3.75, 35.00, 56.00, 0, 0, '2/55', 1),
(12, 'India', 'ODI', 'Neutral', 3, 3, 20, 120, 100, 2, 5.00, 50.00, 60.00, 0, 0, '1/30', 0),
(12, 'India', 'T20', 'Home', 2, 2, 7, 42, 60, 2, 8.57, 30.00, 21.00, 0, 0, '1/30', 0),
(12, 'Australia', 'Test', 'Home', 1, 2, 22, 132, 70, 2, 3.18, 35.00, 66.00, 0, 0, '2/35', 1),
(12, 'Australia', 'ODI', 'Neutral', 2, 2, 15, 90, 80, 3, 5.33, 26.67, 30.00, 0, 0, '2/40', 0),
(12, 'Australia', 'T20', 'Away', 1, 1, 4, 24, 35, 1, 8.75, 35.00, 24.00, 0, 0, '1/35', 0),
(12, 'Pakistan', 'Test', 'Away', 2, 4, 35, 210, 120, 5, 3.43, 24.00, 42.00, 0, 0, '3/45', 2),
(12, 'Pakistan', 'ODI', 'Home', 2, 2, 18, 108, 90, 3, 5.00, 30.00, 36.00, 0, 0, '2/45', 0),
(12, 'Pakistan', 'T20', 'Neutral', 2, 2, 8, 48, 55, 2, 6.88, 27.50, 24.00, 0, 0, '2/28', 0),
(12, 'Zimbabwe', 'Test', 'Neutral', 2, 3, 24, 144, 80, 6, 3.33, 13.33, 24.00, 0, 0, '4/50', 1),
(12, 'Zimbabwe', 'ODI', 'Home', 3, 3, 25, 150, 110, 5, 4.40, 22.00, 30.00, 0, 0, '3/30', 1),
(12, 'Zimbabwe', 'T20', 'Away', 2, 2, 8, 48, 40, 3, 5.00, 13.33, 16.00, 0, 0, '2/20', 0);

INSERT INTO FieldingCareer 
(PlayerID, Opponent, MatchType,  LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(12, 'India', 'Test', 'Home', 2, 4, 3, 0, 1, 1),
(12, 'India', 'ODI', 'Away', 3, 3, 2, 0, 0, 0),
(12, 'India', 'T20', 'Neutral', 2, 2, 1, 0, 0, 0),
(12, 'Australia', 'Test', 'Home', 1, 2, 2, 0, 1, 1),
(12, 'Australia', 'ODI', 'Neutral', 2, 2, 1, 0, 1, 0),
(12, 'Australia', 'T20', 'Away', 1, 1, 0, 0, 0, 0),
(12, 'Pakistan', 'Test', 'Away', 2, 4, 4, 0, 1, 0),
(12, 'Pakistan', 'ODI', 'Home', 2, 2, 1, 0, 1, 1),
(12, 'Pakistan', 'T20', 'Neutral', 2, 2, 1, 0, 0, 0),
(12, 'Zimbabwe', 'Test', 'Neutral', 2, 4, 3, 0, 0, 1),
(12, 'Zimbabwe', 'ODI', 'Home', 3, 3, 2, 0, 0, 1),
(12, 'Zimbabwe', 'T20', 'Away', 2, 2, 1, 0, 1, 0),
(12, 'Sri Lanka', 'Test', 'Home', 2, 4, 4, 0, 2, 1),
(12, 'Sri Lanka', 'ODI', 'Away', 3, 3, 3, 0, 1, 1),
(12, 'Sri Lanka', 'ODI', 'Neutral', 3, 3, 2, 0, 0, 1),
(12, 'Sri Lanka', 'T20', 'Home', 2, 2, 1, 0, 1, 1),
(12, 'Sri Lanka', 'T20', 'Away', 2, 2, 1, 0, 0, 0),
(12, 'Sri Lanka', 'T20', 'Neutral', 2, 2, 2, 0, 1, 0);

INSERT INTO BattingCareerAgainst  
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts) VALUES 
(13, 'India', 'Test', 'Home', 2, 4, 210, 280, 120, 52.50, 75.00, 1, 0, 24, 5, 0, 1),
(13, 'India', 'ODI', 'Away', 3, 3, 180, 150, 90, 60.00, 120.00, 0, 2, 20, 8, 0, 0),
(13, 'India', 'T20', 'Neutral', 2, 2, 80, 50, 45, 40.00, 160.00, 0, 0, 8, 4, 0, 0),
(13, 'Australia', 'Test', 'Home', 1, 2, 150, 220, 95, 75.00, 68.18, 0, 1, 15, 2, 0, 1),
(13, 'Australia', 'ODI', 'Neutral', 2, 2, 130, 100, 75, 65.00, 130.00, 0, 1, 12, 6, 0, 0),
(13, 'Australia', 'T20', 'Away', 1, 1, 60, 35, 60, 60.00, 171.43, 0, 1, 4, 5, 0, 0),
(13, 'Pakistan', 'Test', 'Away', 2, 4, 190, 300, 110, 47.50, 63.33, 1, 0, 22, 3, 0, 1),
(13, 'Pakistan', 'ODI', 'Home', 2, 2, 95, 85, 55, 47.50, 111.76, 0, 1, 10, 3, 0, 0),
(13, 'Pakistan', 'T20', 'Neutral', 2, 2, 75, 60, 45, 37.50, 125.00, 0, 0, 6, 4, 0, 0),
(13, 'Zimbabwe', 'Test', 'Neutral', 2, 4, 240, 380, 130, 60.00, 63.16, 1, 1, 30, 4, 0, 2),
(13, 'Zimbabwe', 'ODI', 'Home', 3, 3, 220, 180, 115, 73.33, 122.22, 1, 0, 25, 10, 0, 1),
(13, 'Zimbabwe', 'T20', 'Away', 2, 2, 110, 80, 70, 55.00, 137.50, 0, 1, 10, 6, 0, 0),
(13, 'Sri Lanka', 'Test', 'Home', 2, 4, 230, 350, 140, 57.50, 65.71, 1, 1, 28, 6, 0, 1),
(13, 'Sri Lanka', 'ODI', 'Away', 3, 3, 210, 190, 105, 70.00, 110.53, 1, 0, 18, 9, 0, 1),
(13, 'Sri Lanka', 'T20', 'Neutral', 2, 2, 85, 55, 50, 42.50, 154.55, 0, 1, 7, 5, 0, 0);

INSERT INTO BowlingCareerAgainst 
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(13, 'India', 'Test', 'Home', 2, 2, 10, 60, 35, 1, 3.50, 35.00, 60.00, 0, 0, '1/35', 1),
(13, 'India', 'ODI', 'Away', 3, 1, 5, 30, 28, 0, 5.60, 0, 0, 0, 0, '0/28', 0),
(13, 'India', 'T20', 'Neutral', 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '0/0', 0),
(13, 'Australia', 'Test', 'Home', 1, 1, 6, 36, 22, 0, 3.67, 0, 0, 0, 0, '0/22', 0),
(13, 'Australia', 'ODI', 'Neutral', 2, 1, 4, 24, 20, 1, 5.00, 20.00, 24.00, 0, 0, '1/20', 0),
(13, 'Australia', 'T20', 'Away', 1, 1, 2, 12, 15, 1, 7.50, 15.00, 12.00, 0, 0, '1/15', 0),
(13, 'Pakistan', 'Test', 'Away', 2, 1, 8, 48, 30, 1, 3.75, 30.00, 48.00, 0, 0, '1/30', 1),
(13, 'Pakistan', 'ODI', 'Home', 2, 1, 3, 18, 25, 0, 8.33, 0, 0, 0, 0, '0/25', 0),
(13, 'Pakistan', 'T20', 'Neutral', 2, 1, 2, 12, 18, 1, 9.00, 18.00, 12.00, 0, 0, '1/18', 0),
(13, 'Zimbabwe', 'Test', 'Neutral', 2, 2, 12, 72, 40, 2, 3.33, 20.00, 36.00, 0, 0, '2/20', 1),
(13, 'Zimbabwe', 'ODI', 'Home', 3, 2, 6, 36, 27, 2, 4.50, 13.50, 18.00, 0, 0, '2/15', 0),
(13, 'Zimbabwe', 'T20', 'Away', 2, 1, 2, 12, 10, 1, 5.00, 10.00, 12.00, 0, 0, '1/10', 0),
(13, 'Sri Lanka', 'Test', 'Home', 2, 2, 14, 84, 50, 2, 3.57, 25.00, 42.00, 0, 0, '2/25', 1),
(13, 'Sri Lanka', 'ODI', 'Away', 3, 2, 8, 48, 36, 2, 4.50, 18.00, 24.00, 0, 0, '2/18', 0),
(13, 'Sri Lanka', 'T20', 'Neutral', 2, 1, 3, 18, 22, 1, 7.33, 22.00, 18.00, 0, 0, '1/22', 0);

INSERT INTO FieldingCareer 
(PlayerID, Opponent, MatchType,  LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(13, 'India', 'Test', 'Home', 2, 4, 3, 0, 1, 1),
(13, 'India', 'ODI', 'Away', 3, 3, 2, 0, 0, 0),
(13, 'India', 'T20', 'Neutral', 2, 2, 1, 0, 0, 0),
(13, 'Australia', 'Test', 'Home', 1, 2, 1, 0, 1, 1),
(13, 'Australia', 'ODI', 'Neutral', 2, 2, 2, 0, 1, 1),
(13, 'Australia', 'T20', 'Away', 1, 1, 1, 0, 0, 0),
(13, 'Pakistan', 'Test', 'Away', 2, 4, 4, 0, 1, 1),
(13, 'Pakistan', 'ODI', 'Home', 2, 2, 1, 0, 1, 1),
(13, 'Pakistan', 'T20', 'Neutral', 2, 2, 2, 0, 1, 1),
(13, 'Zimbabwe', 'Test', 'Neutral', 2, 4, 3, 0, 2, 2),
(13, 'Zimbabwe', 'ODI', 'Home', 3, 3, 3, 0, 2, 2),
(13, 'Zimbabwe', 'T20', 'Away', 2, 2, 2, 0, 1, 1),
(13, 'Sri Lanka', 'Test', 'Home', 2, 4, 3, 0, 1, 1),
(13, 'Sri Lanka', 'ODI', 'Away', 3, 3, 2, 0, 1, 1),
(13, 'Sri Lanka', 'ODI', 'Neutral', 3, 3, 2, 0, 0, 1),
(13, 'Sri Lanka', 'T20', 'Home', 2, 2, 2, 0, 1, 1),
(13, 'Sri Lanka', 'T20', 'Away', 2, 2, 1, 0, 1, 1),
(13, 'Sri Lanka', 'T20', 'Neutral', 2, 2, 1, 0, 0, 1);

INSERT INTO BattingCareerAgainst  
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts) VALUES 
(17, 'India', 'Test', 'Home', 4, 8, 350, 560, 120, 43.75, 62.50, 1, 2, 45, 6, 1, 1),
(17, 'India', 'Test', 'Away', 4, 8, 300, 500, 110, 37.50, 60.00, 1, 1, 30, 4, 1, 0),
(17, 'Australia', 'Test', 'Home', 3, 6, 280, 450, 100, 46.67, 62.22, 1, 1, 25, 3, 0, 1),
(17, 'Australia', 'Test', 'Away', 3, 6, 250, 430, 95, 41.67, 58.14, 0, 2, 20, 2, 0, 1),
(17, 'Pakistan', 'Test', 'Neutral', 3, 6, 220, 390, 85, 36.67, 56.41, 0, 2, 22, 2, 1, 0),
(17, 'Pakistan', 'Test', 'Home', 3, 6, 240, 420, 90, 40.00, 57.14, 0, 3, 24, 1, 1, 1),
(17, 'Zimbabwe', 'Test', 'Neutral', 2, 4, 260, 380, 140, 65.00, 68.42, 1, 1, 27, 5, 0, 1),
(17, 'Zimbabwe', 'Test', 'Home', 2, 4, 220, 340, 130, 55.00, 64.71, 1, 0, 21, 4, 0, 1),
(17, 'Sri Lanka', 'Test', 'Home', 3, 6, 310, 520, 135, 51.67, 59.62, 1, 2, 32, 6, 0, 2);
(17, 'Sri Lanka', 'Test', 'Away', 3, 6, 290, 480, 125, 48.33, 60.42, 1, 1, 28, 3, 0, 1);

INSERT INTO BattingCareerAgainst  
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts) VALUES 
(17, 'India', 'Test', 'Neutral', 3, 6, 270, 450, 105, 45.00, 60.00, 1, 0, 33, 2, 0, 1),
(17, 'Australia', 'Test', 'Neutral', 2, 4, 200, 360, 80, 50.00, 55.56, 0, 2, 22, 1, 0, 2),
(17, 'Pakistan', 'Test', 'Away', 4, 8, 330, 560, 115, 41.25, 58.93, 1, 2, 35, 3, 1, 2),
(17, 'Zimbabwe', 'Test', 'Away', 3, 6, 290, 480, 120, 48.33, 60.42, 1, 1, 25, 3, 0, 2),
(17, 'Sri Lanka', 'Test', 'Neutral', 3, 6, 280, 500, 110, 46.67, 56.00, 0, 3, 30, 2, 0, 2);

INSERT INTO BowlingCareerAgainst 
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(17, 'India', 'Test', 'Home', 4, 2, 12, 72, 50, 1, 4.17, 50.00, 72.00, 0, 0, '1/30', 1),
(17, 'India', 'Test', 'Away', 4, 2, 10, 60, 40, 0, 4.00, 0, 0, 0, 0, '0/40', 0),
(17, 'Pakistan', 'Test', 'Neutral', 3, 1, 6, 36, 20, 1, 3.33, 20.00, 36.00, 0, 0, '1/20', 0),
(17, 'Pakistan', 'Test', 'Home', 3, 1, 8, 48, 30, 2, 3.75, 15.00, 24.00, 0, 0, '2/30', 1),
(17, 'Zimbabwe', 'Test', 'Neutral', 2, 1, 5, 30, 10, 2, 2.00, 5.00, 15.00, 0, 0, '2/10', 1),
(17, 'Zimbabwe', 'Test', 'Home', 2, 1, 7, 42, 25, 3, 3.57, 8.33, 14.00, 0, 0, '3/25', 0);

INSERT INTO BowlingCareerAgainst 
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(17, 'Australia', 'Test', 'Home', 3, 1, 5, 30, 24, 0, 4.80, 0, 0, 0, 0, '0/24', 0),
(17, 'Australia', 'Test', 'Away', 3, 1, 6, 36, 32, 0, 5.33, 0, 0, 0, 0, '0/32', 0),
(17, 'Australia', 'Test', 'Neutral', 2, 1, 4, 24, 18, 1, 4.50, 18.00, 24.00, 0, 0, '1/18', 0),
(17, 'Sri Lanka', 'Test', 'Home', 3, 1, 8, 48, 28, 1, 3.50, 28.00, 48.00, 0, 0, '1/28', 1),
(17, 'Sri Lanka', 'Test', 'Away', 3, 1, 7, 42, 26, 1, 3.71, 26.00, 42.00, 0, 0, '1/26', 0),
(17, 'Sri Lanka', 'Test', 'Neutral', 2, 1, 5, 30, 20, 0, 4.00, 0, 0, 0, 0, '0/20', 0);

INSERT INTO BattingCareerAgainst  
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts) VALUES 
(17, 'India', 'ODI', 'Home', 5, 5, 220, 205, 90, 44.00, 107.32, 0, 2, 20, 4, 0, 1),
(17, 'India', 'ODI', 'Away', 5, 5, 180, 170, 75, 36.00, 105.88, 0, 1, 15, 3, 1, 0),
(17, 'Australia', 'ODI', 'Home', 4, 4, 160, 150, 65, 40.00, 106.67, 0, 1, 14, 2, 0, 1),
(17, 'Australia', 'ODI', 'Neutral', 4, 4, 170, 160, 70, 42.50, 106.25, 0, 1, 16, 3, 0, 0),
(17, 'Pakistan', 'ODI', 'Away', 4, 4, 150, 140, 60, 37.50, 107.14, 0, 1, 13, 1, 0, 1),
(17, 'Zimbabwe', 'ODI', 'Home', 3, 3, 200, 180, 85, 66.67, 111.11, 0, 2, 18, 5, 0, 1),
(17, 'Sri Lanka', 'ODI', 'Neutral', 5, 5, 230, 220, 80, 46.00, 104.55, 0, 2, 22, 4, 0, 2),
(17, 'India', 'T20', 'Neutral', 4, 4, 120, 90, 50, 30.00, 133.33, 0, 1, 10, 6, 0, 1),
(17, 'Australia', 'T20', 'Away', 3, 3, 95, 70, 45, 31.67, 135.71, 0, 0, 7, 4, 0, 0),
(17, 'Pakistan', 'T20', 'Home', 3, 3, 110, 80, 55, 36.67, 137.50, 0, 1, 8, 5, 0, 1),
(17, 'Zimbabwe', 'T20', 'Neutral', 2, 2, 85, 60, 55, 42.50, 141.67, 0, 1, 5, 4, 0, 0),
(17, 'Sri Lanka', 'T20', 'Home', 4, 4, 150, 110, 70, 37.50, 136.36, 0, 1, 12, 7, 0, 1);

INSERT INTO BowlingCareerAgainst 
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(17, 'India', 'ODI', 'Home', 5, 2, 8, 48, 42, 1, 5.25, 42.00, 48.00, 0, 0, '1/42', 0),
(17, 'India', 'T20', 'Neutral', 4, 1, 2, 12, 18, 0, 9.00, 0, 0, 0, 0, '0/18', 0),
(17, 'Australia', 'ODI', 'Neutral', 4, 1, 6, 36, 33, 2, 5.50, 16.50, 18.00, 0, 0, '2/33', 0),
(17, 'Australia', 'T20', 'Away', 3, 1, 3, 18, 28, 1, 9.33, 28.00, 18.00, 0, 0, '1/28', 0),
(17, 'Pakistan', 'ODI', 'Home', 4, 2, 10, 60, 54, 3, 5.40, 18.00, 20.00, 0, 0, '2/30', 0),
(17, 'Pakistan', 'T20', 'Neutral', 3, 1, 2, 12, 24, 1, 12.00, 24.00, 12.00, 0, 0, '1/24', 0),
(17, 'Zimbabwe', 'ODI', 'Home', 3, 1, 5, 30, 20, 1, 4.00, 20.00, 30.00, 0, 0, '1/20', 0),
(17, 'Zimbabwe', 'T20', 'Neutral', 2, 1, 2, 12, 15, 1, 7.50, 15.00, 12.00, 0, 0, '1/15', 0),
(17, 'Sri Lanka', 'ODI', 'Neutral', 5, 2, 12, 72, 65, 2, 5.42, 32.50, 36.00, 0, 0, '2/35', 0),
(17, 'Sri Lanka', 'T20', 'Home', 4, 1, 3, 18, 30, 1, 10.00, 30.00, 18.00, 0, 0, '1/30', 0);

INSERT INTO BattingCareerAgainst  
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts) VALUES 
(25, 'India', 'ODI', 'Home', 5, 5, 240, 200, 90, 48.00, 120.00, 0, 2, 30, 5, 0, 0),
(25, 'Australia', 'ODI', 'Away', 4, 4, 160, 140, 65, 40.00, 114.29, 0, 1, 20, 3, 1, 0),
(25, 'Pakistan', 'ODI', 'Neutral', 3, 3, 130, 115, 60, 43.33, 113.04, 0, 1, 15, 2, 0, 1),
(25, 'Zimbabwe', 'ODI', 'Home', 4, 4, 180, 150, 75, 45.00, 120.00, 0, 2, 18, 4, 0, 0),
(25, 'Sri Lanka', 'ODI', 'Away', 3, 3, 110, 95, 55, 36.67, 115.79, 0, 1, 12, 1, 0, 0),
(25, 'India', 'Test', 'Home', 2, 4, 120, 250, 70, 30.00, 48.00, 0, 1, 15, 0, 1, 1),
(25, 'Australia', 'Test', 'Away', 1, 2, 55, 130, 35, 27.50, 42.31, 0, 0, 7, 0, 0, 0),
(25, 'Pakistan', 'Test', 'Neutral', 2, 4, 100, 200, 55, 25.00, 50.00, 0, 1, 10, 1, 1, 1),
(25, 'Zimbabwe', 'Test', 'Home', 1, 2, 90, 170, 90, 45.00, 52.94, 0, 1, 9, 2, 0, 1),
(25, 'Sri Lanka', 'Test', 'Away', 2, 4, 130, 240, 75, 32.50, 54.17, 0, 1, 16, 2, 0, 1),
(25, 'India', 'T20', 'Neutral', 2, 2, 70, 50, 45, 35.00, 140.00, 0, 0, 6, 3, 0, 0),
(25, 'Australia', 'T20', 'Home', 1, 1, 30, 20, 30, 30.00, 150.00, 0, 0, 3, 2, 0, 0),
(25, 'Pakistan', 'T20', 'Away', 2, 2, 50, 40, 30, 25.00, 125.00, 0, 0, 4, 2, 0, 0),
(25, 'Zimbabwe', 'T20', 'Neutral', 2, 2, 60, 45, 35, 30.00, 133.33, 0, 0, 5, 3, 0, 0),
(25, 'Sri Lanka', 'T20', 'Home', 3, 3, 80, 60, 40, 26.67, 133.33, 0, 0, 8, 4, 0, 0);

INSERT INTO BowlingCareerAgainst 
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(25, 'India', 'ODI', 'Home', 5, 1, 2, 12, 15, 0, 7.50, 0, 0, 0, 0, '0/15', 0),
(25, 'Australia', 'ODI', 'Away', 4, 1, 3, 18, 20, 1, 6.67, 20.00, 18.00, 0, 0, '1/20', 0),
(25, 'Pakistan', 'ODI', 'Neutral', 3, 1, 4, 24, 30, 1, 7.50, 30.00, 24.00, 0, 0, '1/30', 0),
(25, 'Zimbabwe', 'ODI', 'Home', 4, 2, 6, 36, 25, 2, 4.17, 12.50, 18.00, 0, 0, '2/25', 1),
(25, 'Sri Lanka', 'ODI', 'Away', 3, 1, 3, 18, 22, 0, 7.33, 0, 0, 0, 0, '0/22', 0),
(25, 'India', 'T20', 'Neutral', 2, 1, 1, 6, 10, 0, 10.00, 0, 0, 0, 0, '0/10', 0),
(25, 'Australia', 'T20', 'Home', 1, 1, 1, 6, 8, 0, 8.00, 0, 0, 0, 0, '0/8', 0),
(25, 'Pakistan', 'T20', 'Away', 2, 1, 1, 6, 12, 0, 12.00, 0, 0, 0, 0, '0/12', 0),
(25, 'Zimbabwe', 'T20', 'Neutral', 2, 1, 1, 6, 9, 0, 9.00, 0, 0, 0, 0, '0/9', 0),
(25, 'Sri Lanka', 'T20', 'Home', 3, 1, 2, 12, 18, 1, 9.00, 18.00, 12.00, 0, 0, '1/18', 0);

INSERT INTO BowlingCareerAgainst 
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(25, 'India', 'Test', 'Home', 2, 1, 4, 24, 20, 0, 5.00, 0, 0, 0, 0, '0/20', 0),
(25, 'Australia', 'Test', 'Away', 1, 1, 3, 18, 15, 1, 5.00, 15.00, 18.00, 0, 0, '1/15', 0),
(25, 'Pakistan', 'Test', 'Neutral', 2, 1, 5, 30, 22, 0, 4.40, 0, 0, 0, 0, '0/22', 0),
(25, 'Zimbabwe', 'Test', 'Home', 1, 1, 6, 36, 18, 1, 3.00, 18.00, 36.00, 0, 0, '1/18', 1),
(25, 'Sri Lanka', 'Test', 'Away', 2, 1, 8, 48, 24, 1, 3.00, 24.00, 48.00, 0, 0, '1/24', 1);

INSERT INTO FieldingCareer 
(PlayerID, Opponent, MatchType,  LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(25, 'India', 'ODI', 'Home', 5, 5, 3, 0, 1, 1),
(25, 'Australia', 'ODI', 'Away', 4, 4, 2, 0, 0, 0),
(25, 'Pakistan', 'ODI', 'Neutral', 3, 3, 2, 0, 1, 0),
(25, 'Zimbabwe', 'ODI', 'Home', 4, 4, 4, 0, 2, 1),
(25, 'Sri Lanka', 'ODI', 'Away', 3, 3, 1, 0, 1, 1),
(25, 'India', 'Test', 'Home', 2, 4, 2, 0, 0, 0),
(25, 'Australia', 'Test', 'Away', 1, 2, 1, 0, 0, 0),
(25, 'Pakistan', 'Test', 'Neutral', 2, 4, 2, 0, 1, 0),
(25, 'Zimbabwe', 'Test', 'Home', 1, 2, 2, 0, 0, 0),
(25, 'Sri Lanka', 'Test', 'Away', 2, 4, 3, 0, 1, 1),
(25, 'India', 'T20', 'Neutral', 2, 2, 1, 0, 0, 0),
(25, 'Australia', 'T20', 'Home', 1, 1, 0, 0, 0, 0),
(25, 'Pakistan', 'T20', 'Away', 2, 2, 1, 0, 1, 1),
(25, 'Zimbabwe', 'T20', 'Neutral', 2, 2, 1, 0, 1, 0),
(25, 'Sri Lanka', 'T20', 'Home', 3, 3, 2, 0, 1, 1);

INSERT INTO BattingCareerAgainst  
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts) VALUES 
(26, 'India', 'Test', 'Home', 8, 14, 650, 1120, 120, 46.43, 58.04, 1, 5, 65, 10, 0, 2),
(26, 'India', 'ODI', 'Away', 10, 10, 360, 410, 85, 36.00, 87.80, 0, 3, 40, 5, 1, 0),
(26, 'India', 'T20', 'Neutral', 6, 6, 180, 130, 60, 30.00, 138.46, 0, 1, 18, 8, 0, 1),
(26, 'Australia', 'Test', 'Away', 6, 12, 480, 900, 100, 40.00, 53.33, 2, 2, 45, 7, 1, 1),
(26, 'Australia', 'ODI', 'Home', 7, 7, 210, 230, 70, 30.00, 91.30, 0, 2, 25, 3, 1, 0),
(26, 'Australia', 'T20', 'Neutral', 5, 5, 160, 100, 55, 32.00, 160.00, 0, 0, 12, 6, 0, 1),
(26, 'Pakistan', 'Test', 'Neutral', 7, 13, 540, 980, 110, 41.54, 55.10, 1, 4, 50, 6, 0, 3),
(26, 'Pakistan', 'ODI', 'Home', 8, 8, 250, 270, 65, 31.25, 92.59, 0, 2, 20, 4, 0, 1),
(26, 'Pakistan', 'T20', 'Away', 6, 6, 150, 110, 50, 25.00, 136.36, 0, 1, 15, 5, 0, 1),
(26, 'Zimbabwe', 'Test', 'Home', 4, 8, 350, 600, 115, 43.75, 58.33, 1, 2, 35, 4, 0, 2),
(26, 'Zimbabwe', 'ODI', 'Neutral', 5, 5, 240, 200, 90, 48.00, 120.00, 0, 3, 24, 6, 0, 1),
(26, 'Zimbabwe', 'T20', 'Away', 3, 3, 110, 70, 60, 36.67, 157.14, 0, 1, 10, 7, 0, 0),
(26, 'Sri Lanka', 'Test', 'Away', 5, 10, 400, 720, 105, 40.00, 55.56, 1, 3, 40, 5, 1, 2),
(26, 'Sri Lanka', 'ODI', 'Home', 6, 6, 220, 240, 80, 36.67, 91.67, 0, 2, 18, 4, 0, 2),
(26, 'Sri Lanka', 'T20', 'Neutral', 4, 4, 130, 90, 55, 32.50, 144.44, 0, 0, 13, 6, 0, 1);

INSERT INTO BowlingCareerAgainst 
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(26, 'India', 'Test', 'Home', 6, 4, 20, 120, 110, 3, 5.50, 36.67, 40.00, 0, 0, '2/30', 1),
(26, 'India', 'ODI', 'Away', 10, 5, 18, 108, 95, 2, 5.28, 47.50, 54.00, 0, 0, '1/20', 0),
(26, 'India', 'T20', 'Neutral', 6, 3, 6, 36, 45, 1, 7.50, 45.00, 36.00, 0, 0, '1/15', 0),
(26, 'Australia', 'Test', 'Away', 4, 2, 15, 90, 70, 2, 4.67, 35.00, 45.00, 0, 0, '2/25', 1),
(26, 'Australia', 'ODI', 'Home', 7, 3, 10, 60, 50, 1, 5.00, 50.00, 60.00, 0, 0, '1/18', 0),
(26, 'Australia', 'T20', 'Neutral', 5, 2, 4, 24, 35, 1, 8.75, 35.00, 24.00, 0, 0, '1/12', 0),
(26, 'Pakistan', 'Test', 'Neutral', 5, 3, 22, 132, 90, 3, 4.09, 30.00, 44.00, 0, 0, '2/20', 2),
(26, 'Pakistan', 'ODI', 'Home', 8, 4, 12, 72, 65, 2, 5.42, 32.50, 36.00, 0, 0, '1/22', 0),
(26, 'Pakistan', 'T20', 'Away', 6, 3, 8, 48, 60, 2, 7.50, 30.00, 24.00, 0, 0, '1/15', 0),
(26, 'Zimbabwe', 'Test', 'Home', 3, 2, 18, 108, 80, 4, 4.44, 20.00, 27.00, 0, 0, '3/30', 1),
(26, 'Zimbabwe', 'ODI', 'Neutral', 4, 2, 8, 48, 40, 1, 5.00, 40.00, 48.00, 0, 0, '1/20', 0),
(26, 'Zimbabwe', 'T20', 'Away', 3, 1, 3, 18, 25, 1, 8.33, 25.00, 18.00, 0, 0, '1/25', 0),
(26, 'Sri Lanka', 'Test', 'Away', 4, 2, 16, 96, 75, 3, 4.69, 25.00, 32.00, 0, 0, '2/18', 2),
(26, 'Sri Lanka', 'ODI', 'Home', 5, 3, 10, 60, 55, 2, 5.50, 27.50, 30.00, 0, 0, '1/17', 0),
(26, 'Sri Lanka', 'T20', 'Neutral', 4, 2, 6, 36, 45, 2, 7.50, 22.50, 18.00, 0, 0, '2/15', 0);

INSERT INTO FieldingCareer 
(PlayerID, Opponent, MatchType,  LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(26, 'India', 'Test', 'Home', 8, 16, 12, 0, 3, 2),
(26, 'India', 'ODI', 'Away', 10, 10, 8, 0, 2, 1),
(26, 'India', 'T20', 'Neutral', 6, 6, 3, 0, 1, 0),
(26, 'Australia', 'Test', 'Away', 6, 12, 9, 0, 1, 1),
(26, 'Australia', 'ODI', 'Home', 7, 7, 5, 0, 2, 1),
(26, 'Australia', 'T20', 'Neutral', 5, 5, 2, 0, 1, 1),
(26, 'Pakistan', 'Test', 'Neutral', 5, 10, 8, 0, 2, 2),
(26, 'Pakistan', 'ODI', 'Home', 8, 8, 7, 0, 2, 2),
(26, 'Pakistan', 'T20', 'Away', 6, 6, 4, 0, 0, 0),
(26, 'Zimbabwe', 'Test', 'Home', 3, 6, 6, 0, 3, 1),
(26, 'Zimbabwe', 'ODI', 'Neutral', 4, 4, 4, 0, 1, 1),
(26, 'Zimbabwe', 'T20', 'Away', 3, 3, 2, 0, 1, 1),
(26, 'Sri Lanka', 'Test', 'Away', 4, 8, 7, 0, 1, 1),
(26, 'Sri Lanka', 'ODI', 'Home', 5, 5, 5, 0, 1, 1),
(26, 'Sri Lanka', 'T20', 'Neutral', 4, 4, 3, 0, 2, 1);

INSERT INTO BattingCareerAgainst  
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Runs, BallsFaced, HighestScore, Average, StrikeRate, Hundreds, Fifties, Fours, Sixes, Ducks, NotOuts) VALUES 
(28, 'India', 'Test', 'Home', 12, 24, 1150, 2000, 165, 47.92, 57.50, 3, 6, 135, 20, 2, 3),
(28, 'India', 'ODI', 'Away', 15, 15, 600, 650, 112, 40.00, 92.31, 1, 5, 50, 15, 1, 0),
(28, 'India', 'T20', 'Neutral', 10, 10, 280, 220, 75, 28.00, 127.27, 0, 2, 25, 10, 0, 1),
(28, 'Australia', 'Test', 'Away', 10, 20, 850, 1500, 140, 42.50, 56.67, 2, 5, 100, 12, 1, 2),
(28, 'Australia', 'ODI', 'Home', 12, 12, 480, 440, 105, 40.00, 109.09, 1, 3, 45, 18, 0, 1),
(28, 'Australia', 'T20', 'Neutral', 8, 8, 220, 180, 60, 27.50, 122.22, 0, 1, 20, 8, 1, 0),
(28, 'Pakistan', 'Test', 'Neutral', 8, 16, 720, 1300, 120, 45.00, 55.38, 2, 4, 75, 8, 1, 3),
(28, 'Pakistan', 'ODI', 'Home', 10, 10, 450, 400, 98, 45.00, 112.50, 1, 4, 40, 10, 0, 2),
(28, 'Pakistan', 'T20', 'Away', 6, 6, 180, 150, 55, 30.00, 120.00, 0, 1, 15, 6, 0, 1),
(28, 'Zimbabwe', 'Test', 'Home', 6, 12, 650, 1100, 135, 54.17, 59.09, 2, 3, 60, 7, 0, 2),
(28, 'Zimbabwe', 'ODI', 'Neutral', 8, 8, 350, 300, 95, 43.75, 116.67, 0, 4, 35, 12, 1, 1),
(28, 'Zimbabwe', 'T20', 'Away', 4, 4, 160, 120, 65, 40.00, 133.33, 0, 2, 14, 7, 0, 1),
(28, 'Sri Lanka', 'Test', 'Away', 10, 20, 900, 1600, 150, 45.00, 56.25, 3, 5, 110, 15, 1, 4),
(28, 'Sri Lanka', 'ODI', 'Home', 12, 12, 520, 480, 110, 43.33, 108.33, 1, 4, 45, 15, 0, 2),
(28, 'Sri Lanka', 'T20', 'Neutral', 8, 8, 250, 200, 75, 31.25, 125.00, 0, 2, 20, 10, 0, 2);

INSERT INTO BowlingCareerAgainst 
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, OversBowled, BallsBowled, RunsConceded, Wickets, Economy, Average, StrikeRate, FiveWicketHauls, TenWicketHauls, BestBowlingFigures, Maidens) VALUES
(28, 'India', 'Test', 'Home', 10, 5, 40, 240, 180, 6, 4.50, 30.00, 40.00, 0, 0, '3/45', 1),
(28, 'India', 'ODI', 'Away', 12, 4, 16, 96, 82, 3, 5.13, 27.33, 32.00, 0, 0, '2/20', 0),
(28, 'India', 'T20', 'Neutral', 8, 2, 6, 36, 45, 2, 7.50, 22.50, 18.00, 0, 0, '2/15', 0),
(28, 'Australia', 'Test', 'Away', 8, 3, 22, 132, 110, 4, 5.00, 27.50, 33.00, 0, 0, '3/30', 2),
(28, 'Australia', 'ODI', 'Home', 10, 3, 12, 72, 68, 2, 5.67, 34.00, 36.00, 0, 0, '1/18', 0),
(28, 'Australia', 'T20', 'Neutral', 6, 1, 3, 18, 25, 1, 8.33, 25.00, 18.00, 0, 0, '1/25', 0),
(28, 'Pakistan', 'Test', 'Neutral', 6, 2, 18, 108, 90, 2, 5.00, 45.00, 54.00, 0, 0, '2/35', 1),
(28, 'Pakistan', 'ODI', 'Home', 8, 2, 10, 60, 50, 2, 5.00, 25.00, 30.00, 0, 0, '1/22', 0),
(28, 'Pakistan', 'T20', 'Away', 4, 1, 2, 12, 20, 1, 10.00, 20.00, 12.00, 0, 0, '1/20', 0),
(28, 'Zimbabwe', 'Test', 'Home', 4, 1, 10, 60, 40, 2, 4.00, 20.00, 30.00, 0, 0, '2/20', 1),
(28, 'Zimbabwe', 'ODI', 'Neutral', 6, 2, 8, 48, 36, 1, 4.50, 36.00, 48.00, 0, 0, '1/36', 0),
(28, 'Zimbabwe', 'T20', 'Away', 3, 1, 3, 18, 28, 1, 9.33, 28.00, 18.00, 0, 0, '1/28', 0),
(28, 'Sri Lanka', 'Test', 'Away', 6, 2, 12, 72, 65, 2, 5.42, 32.50, 36.00, 0, 0, '2/32', 0),
(28, 'Sri Lanka', 'ODI', 'Home', 8, 2, 6, 36, 30, 1, 5.00, 30.00, 36.00, 0, 0, '1/30', 0),
(28, 'Sri Lanka', 'T20', 'Neutral', 6, 1, 2, 12, 18, 1, 9.00, 18.00, 12.00, 0, 0, '1/18', 0);

INSERT INTO FieldingCareer 
(PlayerID, Opponent, MatchType, LocationType, Matches, Innings, Catches, Stumpings, RunOuts, DirectHits) VALUES
(28, 'India', 'Test', 'Home', 12, 24, 15, 0, 3, 2),
(28, 'India', 'ODI', 'Away', 15, 15, 8, 0, 2, 1),
(28, 'India', 'T20', 'Neutral', 10, 10, 5, 0, 2, 1),
(28, 'Australia', 'Test', 'Away', 10, 20, 12, 0, 1, 1),
(28, 'Australia', 'ODI', 'Home', 12, 12, 7, 0, 1, 0),
(28, 'Australia', 'T20', 'Neutral', 8, 8, 4, 0, 1, 0),
(28, 'Pakistan', 'Test', 'Neutral', 8, 16, 10, 0, 2, 2),
(28, 'Pakistan', 'ODI', 'Home', 10, 10, 9, 0, 1, 2),
(28, 'Pakistan', 'T20', 'Away', 6, 6, 3, 0, 0, 1),
(28, 'Zimbabwe', 'Test', 'Home', 6, 12, 11, 0, 2, 2),
(28, 'Zimbabwe', 'ODI', 'Neutral', 8, 8, 6, 0, 2, 1),
(28, 'Zimbabwe', 'T20', 'Away', 4, 4, 2, 0, 1, 1),
(28, 'Sri Lanka', 'Test', 'Away', 10, 20, 14, 0, 3, 3),
(28, 'Sri Lanka', 'ODI', 'Home', 12, 12, 8, 0, 2, 2),
(28, 'Sri Lanka', 'T20', 'Neutral', 8, 8, 5, 0, 1, 1);

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

  -- 1) map sortBy to actual column
  IF in_sortBy = 'date' THEN
    SET order_col = 's.ID';
  ELSEIF in_sortBy = 'ranking' THEN
    SET order_col = 'p.RANKING';
  END IF;

  -- 2) sanitize sortOrder
  IF UPPER(in_sortOrder) = 'DESC' THEN
    SET order_dir = 'DESC';
  ELSE
    SET order_dir = 'ASC';
  END IF;

  -- 3) build the dynamic SQL
  SET @sql_text = CONCAT(
    'SELECT ',
      'p.ID, p.Name, p.PlayerRole, p.BattingStyle, p.BowlingStyle, p.RANKING,',
      'c.Name AS CoachName, s.Span ',
    'FROM Squads s ',
      'JOIN SquadPlayers sp ON s.ID = sp.SquadID ',
      'JOIN Players p       ON sp.PlayerID = p.ID ',
      'LEFT JOIN Coaches c  ON s.CoachID  = c.ID ',
    'WHERE s.MatchType = ? ',
      'AND s.Span      = ? ',
      'AND s.ID = (',
        'SELECT MAX(ID) ',
          'FROM Squads ',
         'WHERE MatchType = ? ',
           'AND Span      = ?',
      ') ',
    'ORDER BY ', order_col, ' ', order_dir
  );

  PREPARE stmt FROM @sql_text;

  -- 4) copy IN params into user-variables
  SET @fmt1  = in_format;
  SET @span1 = in_span;
  SET @fmt2  = in_format;
  SET @span2 = in_span;

  -- 5) execute with four binds
  EXECUTE stmt USING @fmt1, @span1, @fmt2, @span2;
  DEALLOCATE PREPARE stmt;
END;
//
DELIMITER ;

-- test the query
CALL GetSquad('ODI','2024-2025', ' ranking', 'ASC');




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
CALL GetPlayers('playing','ALL','Bowler','runs','DESC');

