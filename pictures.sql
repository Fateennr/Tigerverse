USE TIGERVERSE;

DROP TABLE IF EXISTS Picture;

CREATE TABLE Picture (
    PictureID INT           AUTO_INCREMENT PRIMARY KEY,
    Category  VARCHAR(50)    NOT NULL,                     -- e.g. 'player', 'coach', 'squad', 'match', etc.
    EntityID  INT            NOT NULL,                     -- the ID in the corresponding table
    ImageURL  VARCHAR(255)   NOT NULL DEFAULT '-1'         -- link to the image file, defaults to '-1' if none provided
);


INSERT INTO Picture (Category, EntityID, ImageURL) VALUES
  ('player',  3,  'https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/385700/385792.1.png'),  -- Tamim Iqbal
  ('player',  8,  'https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/323100/323155.1.png'),  -- Najmul Hossain Shanto
  ('player', 10,  'https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/382800/382809.1.png'),  -- Rishad Hossain
  ('player', 15,  'https://d1af7m13b2f34i.cloudfront.net/players/AnamulHaqueBijoy24-08-2022-08-42-22.png'),  -- Anamul Haque
  ('player', 17,  'https://api.bdcrictime.com/players/346.png'),  -- Mahmudullah Riyad
  ('player', 21,  'https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/319700/319728.3.png'),  -- Mehidy Hasan Miraz
  ('player', 22,  'https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/385800/385821.1.png'),  -- Soumya Sarkar
  ('player', 23,  'https://api.bdcrictime.com/players/348.png'),  -- Shakib Al Hasan
  ('player', 25,  'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/316500/316529.1.png'),  -- Mashrafe Mortaza
  ('player', 26,  'https://api.bdcrictime.com/players/37413.png'),  -- Nasum Ahmed
  ('player', 30,  'https://starsunfolded.com/wp-content/uploads/2016/04/Mustafizur-Rahman-in-Bangladesh-jersey-for-the-2023-ODI-World-Cup.jpg'),  -- Mustafizur Rahman
  ('player', 34,  'https://a1.espncdn.com/combiner/i?img=/i/headshots/cricket/players/full/538506.png&h=168&w=168&scale=crop&transparent=true'),  -- Taskin Ahmed
  ('player', 37,  'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/319700/319739.png'),  -- Shahadat Hossain
  ('player', 39,  'https://static.india.com/wp-content/uploads/2015/01/mushfiqur-rahim.jpg'),  -- Mushfiqur Rahim
  ('player', 40,  'https://www.cricbuzz.com/a/img/v1/152x152/i1/c170914/liton-das.jpg');  -- Liton Das


INSERT INTO Picture (Category, EntityID, ImageURL) VALUES
  ('coach',  3, 'https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200/lsci/db/PICTURES/CMS/78700/78743.jpg'),                                                                  -- Trevor Bayliss
  ('coach',  5, 'https://images.hindustantimes.com/img/2021/10/09/1600x900/Andy_Flower_1633766729048_1633766729207.jpg'),                                                      -- Andy Flower
  ('coach',  2, 'https://www.sportzcraazy.com/wp-content/uploads/2019/09/gary-kirsten-photo.jpg'),                                                                                 -- Gary Kirsten
  ('coach',  4, 'https://e0.365dm.com/17/12/2048x1152/skysports-darren-lehmann-australia-coach-adelaide_4193414.jpg?20171228101047'),                                              -- Darren Lehmann
  ('coach', 12, 'https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_640,q_50/lsci/db/PICTURES/CMS/316500/316509.png'),                                                      -- Brendon McCullum
  ('coach', 10, 'https://www.livehindustan.com/lh-img/smart/img/2025/04/21/1200x900/PTI03-28-2025-000310B-0_1745233849668_1745233942516.jpg'),                                      -- Mahela Jayawardene
  ('coach', 11, 'https://e0.365dm.com/21/09/1600x900/skysports-ravi-shastri-india_5501356.jpg?20210905112518');                                                                   -- Ravi Shastri
