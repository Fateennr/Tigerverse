const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const csv = require('csv-parser');
const players = [
    {
        "ID": 1,
        "Name": "Afif Hossain Dhrubo",
        "DOB": "1999-09-22T00:00:00Z",
        "BattingStyle": "Left hand Bat",
        "ICCRanking": 1000,
        "IntDebut": "2020-01-01T00:00:00Z",
        "Profile": "Afif Hossain Dhrubo is a promising allrounder for Bangladesh known for his versatility in batting and bowling.",
        "CaptainStatus": false,
        "PlayerRole": "Allrounder"
    },
    {
        "ID": 2,
        "Name": "Mohammad Anamul Haque Bijoy",
        "DOB": "1992-12-16",
        "BattingStyle": "Right-hand bat",
        "ICCRanking": 212,
        "IntDebut": "2012-11-30",
        "Profile": "Anamul Haque is a technically sound right-handed batsman and occasional wicketkeeper with solid international experience.",
        "CaptainStatus": false,
        "PlayerRole": "WicketKeeper"
    },
    {
        "ID": 3,
        "Name": "Shakib Al Hasan",
        "DOB": "1987-03-24",
        "BattingStyle": "Left-hand bat",
        "BowlingStyle": "Slow left-arm orthodox",
        "ICCRanking": 1,
        "IntDebut": "2006-08-06",
        "Profile": "Shakib Al Hasan, a world-class allrounder, has led Bangladesh to historic wins with his aggressive batting and sharp bowling.",
        "CaptainStatus": true,
        "PlayerRole": "Allrounder"
    },
    {
        "ID": 4,
        "Name": "Tamim Iqbal",
        "DOB": "1989-03-20",
        "BattingStyle": "Left-hand bat",
        "BowlingStyle": "Right-arm offbreak",
        "ICCRanking": 12,
        "IntDebut": "2007-02-09",
        "Profile": "Tamim Iqbal, a reliable left-handed opener, is known for aggressive stroke play and holds numerous batting records for Bangladesh.",
        "CaptainStatus": true,
        "PlayerRole": "Batsman"
    },
    {
        "ID": 5,
        "Name": "Mushfiqur Rahim",
        "DOB": "1987-09-09",
        "BattingStyle": "Right-hand bat",
        "BowlingStyle": "Right-arm offbreak",
        "ICCRanking": 1,
        "IntDebut": "2005-05-26",
        "Profile": "Mushfiqur Rahim, a skilled batsman and wicketkeeper, is known for his resilience and being the first Bangladeshi with a Test double century.",
        "CaptainStatus": true,
        "PlayerRole": "Batsman"
    },
    {
        "ID": 6,
        "Name": "Imrul Kayes",
        "DOB": "1987-02-02",
        "BattingStyle": "Left-hand bat",
        "BowlingStyle": "Slow left-arm orthodox",
        "ICCRanking": 85,
        "IntDebut": "2008-10-14",
        "Profile": "Imrul Kayes is a consistent left-handed batsman known for his steady partnerships and resilience in challenging conditions.",
        "CaptainStatus": false,
        "PlayerRole": "Batsman"
    },
    {
        "ID": 7,
        "Name": "Mohammad Ashraful",
        "DOB": "1984-07-07",
        "BattingStyle": "Right-hand bat",
        "BowlingStyle": "Right-arm offbreak",
        "ICCRanking": 128,
        "IntDebut": "2001-04-11",
        "Profile": "Mohammad Ashraful is a right-handed batsman and youngest Test centurion, known for match-winning knocks and early career brilliance.",
        "CaptainStatus": false,
        "PlayerRole": "Batsman"
    },
    {
        "ID": 8,
        "Name": "Mustafizur Rahman",
        "DOB": "1995-09-06",
        "BattingStyle": "Left-hand bat",
        "BowlingStyle": "Left-arm fast-medium",
        "ICCRanking": 15,
        "IntDebut": "2015-06-18",
        "Profile": "Mustafizur Rahman is a skilled left-arm pacer famed for his cutters and clutch performances in ODIs and T20s.",
        "CaptainStatus": false,
        "PlayerRole": "Bowler"
    },
    {
        "ID": 9,
        "Name": "Taskin Ahmed",
        "DOB": "1995-04-03",
        "BattingStyle": "Left-hand bat",
        "BowlingStyle": "Right-arm fast",
        "ICCRanking": 18,
        "IntDebut": "2014-04-01",
        "Profile": "Taskin Ahmed is a right-arm fast bowler with pace and bounce, making him a key player in Bangladesh's bowling lineup.",
        "CaptainStatus": false,
        "PlayerRole": "Bowler"
    },
    {
        "ID": 10,
        "Name": "Nasum Ahmed",
        "DOB": "1994-12-05",
        "BattingStyle": "Left-hand bat",
        "BowlingStyle": "Slow left-arm orthodox",
        "ICCRanking": 133,
        "IntDebut": "2021-03-28",
        "Profile": "Nasum Ahmed is an economical left-arm spinner known for taking crucial wickets in T20Is for Bangladesh.",
        "CaptainStatus": false,
        "PlayerRole": "Bowler"
    },
    {
        "ID": 11,
        "Name": "Rishad Hossain",
        "DOB": "2002-07-15",
        "BattingStyle": "Right-hand bat",
        "BowlingStyle": "Legbreak googly",
        "ICCRanking": 250,
        "IntDebut": "2023-03-31",
        "Profile": "Rishad Hossain is a leg-spinner known for his googlies and a promising addition to Bangladesh's bowling arsenal.",
        "CaptainStatus": false,
        "PlayerRole": "Bowler"
    }
];

const matches = [
            {
                "ID": 2,
                "Opponent": "India",
                "Type": "ODI",
                "Date": "2024-10-15T00:00:00Z",
                "Venue": "Eden Gardens, Kolkata",
                "Result": "India",
                "Wonbywicket": true,
                "Wonbyrun": false,
                "Winrun": 0,
                "Winwicket": 6,
                "Score_BD_Run": 220,
                "Score_BD_Over_Played": 50,
                "Score_BD_wicket": 9,
                "Score_Opp_Run": 221,
                "Score_Opp_Over_Played": 44.2,
                "Score_Opp_wicket": 4
            },
            {
                "ID": 3,
                "Opponent": "India",
                "Type": "Test",
                "Date": "2024-09-21T00:00:00Z",
                "Venue": "M. Chinnaswamy Stadium, Bengaluru",
                "Result": "India",
                "Wonbywicket": true,
                "Wonbyrun": false,
                "Winrun": 0,
                "Winwicket": 3,
                "Score_BD_Run": 310,
                "Score_BD_Over_Played": 98.5,
                "Score_BD_wicket": 10,
                "Score_Opp_Run": 312,
                "Score_Opp_Over_Played": 95.2,
                "Score_Opp_wicket": 7
            },
            {
                "ID": 4,
                "Opponent": "India",
                "Type": "ODI",
                "Date": "2024-08-11T00:00:00Z",
                "Venue": "Sher-e-Bangla National Stadium, Dhaka",
                "Result": "Bangladesh",
                "Wonbywicket": false,
                "Wonbyrun": true,
                "Winrun": 25,
                "Winwicket": 0,
                "Score_BD_Run": 250,
                "Score_BD_Over_Played": 47.5,
                "Score_BD_wicket": 8,
                "Score_Opp_Run": 225,
                "Score_Opp_Over_Played": 50,
                "Score_Opp_wicket": 10
            },
            {
                "ID": 5,
                "Opponent": "India",
                "Type": "ODI",
                "Date": "2024-07-18T00:00:00Z",
                "Venue": "Rajiv Gandhi International Cricket Stadium, Hyderabad",
                "Result": "Bangladesh",
                "Wonbywicket": true,
                "Wonbyrun": false,
                "Winrun": 0,
                "Winwicket": 2,
                "Score_BD_Run": 290,
                "Score_BD_Over_Played": 49.4,
                "Score_BD_wicket": 8,
                "Score_Opp_Run": 289,
                "Score_Opp_Over_Played": 50,
                "Score_Opp_wicket": 9
            },
            {
                "ID": 6,
                "Opponent": "India",
                "Type": "Test",
                "Date": "2024-06-02T00:00:00Z",
                "Venue": "Wankhede Stadium, Mumbai",
                "Result": "India",
                "Wonbywicket": false,
                "Wonbyrun": true,
                "Winrun": 120,
                "Winwicket": 0,
                "Score_BD_Run": 280,
                "Score_BD_Over_Played": 89.4,
                "Score_BD_wicket": 10,
                "Score_Opp_Run": 400,
                "Score_Opp_Over_Played": 120.2,
                "Score_Opp_wicket": 10
            },
            {
                "ID": 7,
                "Opponent": "India",
                "Type": "ODI",
                "Date": "2024-05-25T00:00:00Z",
                "Venue": "Narendra Modi Stadium, Ahmedabad",
                "Result": "Bangladesh",
                "Wonbywicket": false,
                "Wonbyrun": true,
                "Winrun": 35,
                "Winwicket": 0,
                "Score_BD_Run": 270,
                "Score_BD_Over_Played": 50,
                "Score_BD_wicket": 7,
                "Score_Opp_Run": 235,
                "Score_Opp_Over_Played": 48.5,
                "Score_Opp_wicket": 10
            },
            {
                "ID": 8,
                "Opponent": "India",
                "Type": "Test",
                "Date": "2024-03-14T00:00:00Z",
                "Venue": "MA Chidambaram Stadium, Chennai",
                "Result": "India",
                "Wonbywicket": false,
                "Wonbyrun": true,
                "Winrun": 180,
                "Winwicket": 0,
                "Score_BD_Run": 210,
                "Score_BD_Over_Played": 75.4,
                "Score_BD_wicket": 10,
                "Score_Opp_Run": 390,
                "Score_Opp_Over_Played": 110.3,
                "Score_Opp_wicket": 10
            },
            {
                "ID": 9,
                "Opponent": "India",
                "Type": "ODI",
                "Date": "2024-02-19T00:00:00Z",
                "Venue": "Holkar Cricket Stadium, Indore",
                "Result": "India",
                "Wonbywicket": true,
                "Wonbyrun": false,
                "Winrun": 0,
                "Winwicket": 5,
                "Score_BD_Run": 200,
                "Score_BD_Over_Played": 47.3,
                "Score_BD_wicket": 10,
                "Score_Opp_Run": 202,
                "Score_Opp_Over_Played": 44.1,
                "Score_Opp_wicket": 5
            },
            {
                "ID": 10,
                "Opponent": "India",
                "Type": "ODI",
                "Date": "2024-01-07T00:00:00Z",
                "Venue": "Barabati Stadium, Cuttack",
                "Result": "Bangladesh",
                "Wonbywicket": true,
                "Wonbyrun": false,
                "Winrun": 0,
                "Winwicket": 3,
                "Score_BD_Run": 280,
                "Score_BD_Over_Played": 48.2,
                "Score_BD_wicket": 8,
                "Score_Opp_Run": 278,
                "Score_Opp_Over_Played": 50,
                "Score_Opp_wicket": 10
            },
            {
                "ID": 11,
                "Opponent": "India",
                "Type": "T20",
                "Date": "2024-11-10T00:00:00Z",
                "Venue": "Arun Jaitley Stadium, Delhi",
                "Result": "India",
                "Wonbywicket": true,
                "Wonbyrun": false,
                "Winrun": 0,
                "Winwicket": 4,
                "Score_BD_Run": 145,
                "Score_BD_Over_Played": 19.5,
                "Score_BD_wicket": 10,
                "Score_Opp_Run": 146,
                "Score_Opp_Over_Played": 18.3,
                "Score_Opp_wicket": 6
            },
            {
                "ID": 12,
                "Opponent": "India",
                "Type": "T20",
                "Date": "2024-10-28T00:00:00Z",
                "Venue": "Sylhet International Cricket Stadium, Sylhet",
                "Result": "Bangladesh",
                "Wonbywicket": false,
                "Wonbyrun": true,
                "Winrun": 15,
                "Winwicket": 0,
                "Score_BD_Run": 170,
                "Score_BD_Over_Played": 20,
                "Score_BD_wicket": 7,
                "Score_Opp_Run": 155,
                "Score_Opp_Over_Played": 19.4,
                "Score_Opp_wicket": 10
            },
            {
                "ID": 13,
                "Opponent": "India",
                "Type": "T20",
                "Date": "2024-09-05T00:00:00Z",
                "Venue": "Saurashtra Cricket Association Stadium, Rajkot",
                "Result": "India",
                "Wonbywicket": false,
                "Wonbyrun": true,
                "Winrun": 35,
                "Winwicket": 0,
                "Score_BD_Run": 135,
                "Score_BD_Over_Played": 18.5,
                "Score_BD_wicket": 10,
                "Score_Opp_Run": 170,
                "Score_Opp_Over_Played": 20,
                "Score_Opp_wicket": 6
            },
            {
                "ID": 14,
                "Opponent": "India",
                "Type": "T20",
                "Date": "2024-07-22T00:00:00Z",
                "Venue": "Greenfield International Stadium, Thiruvananthapuram",
                "Result": "Bangladesh",
                "Wonbywicket": true,
                "Wonbyrun": false,
                "Winrun": 0,
                "Winwicket": 2,
                "Score_BD_Run": 175,
                "Score_BD_Over_Played": 19.4,
                "Score_BD_wicket": 8,
                "Score_Opp_Run": 174,
                "Score_Opp_Over_Played": 20,
                "Score_Opp_wicket": 9
            },
            {
                "ID": 15,
                "Opponent": "India",
                "Type": "T20",
                "Date": "2024-06-30T00:00:00Z",
                "Venue": "Zahur Ahmed Chowdhury Stadium, Chattogram",
                "Result": "India",
                "Wonbywicket": false,
                "Wonbyrun": true,
                "Winrun": 25,
                "Winwicket": 0,
                "Score_BD_Run": 160,
                "Score_BD_Over_Played": 19.3,
                "Score_BD_wicket": 10,
                "Score_Opp_Run": 185,
                "Score_Opp_Over_Played": 20,
                "Score_Opp_wicket": 6
            },
        
            {
                "ID": 16,
                "Opponent": "Zimbabwe",
                "Type": "ODI",
                "Date": "2024-10-02T00:00:00Z",
                "Venue": "Queens Sports Club, Bulawayo",
                "Result": "Bangladesh",
                "Wonbywicket": true,
                "Wonbyrun": false,
                "Winrun": 0,
                "Winwicket": 5,
                "Score_BD_Run": 220,
                "Score_BD_Over_Played": 47.2,
                "Score_BD_wicket": 5,
                "Score_Opp_Run": 219,
                "Score_Opp_Over_Played": 50,
                "Score_Opp_wicket": 10
            },
            {
                "ID": 17,
                "Opponent": "Zimbabwe",
                "Type": "Test",
                "Date": "2024-09-15T00:00:00Z",
                "Venue": "Harare Sports Club, Harare",
                "Result": "Zimbabwe",
                "Wonbywicket": false,
                "Wonbyrun": true,
                "Winrun": 80,
                "Winwicket": 0,
                "Score_BD_Run": 310,
                "Score_BD_Over_Played": 95.4,
                "Score_BD_wicket": 10,
                "Score_Opp_Run": 390,
                "Score_Opp_Over_Played": 98.2,
                "Score_Opp_wicket": 8
            },
            {
                "ID": 18,
                "Opponent": "Zimbabwe",
                "Type": "T20",
                "Date": "2024-08-28T00:00:00Z",
                "Venue": "Sher-e-Bangla National Stadium, Dhaka",
                "Result": "Bangladesh",
                "Wonbywicket": true,
                "Wonbyrun": false,
                "Winrun": 0,
                "Winwicket": 6,
                "Score_BD_Run": 165,
                "Score_BD_Over_Played": 18.4,
                "Score_BD_wicket": 4,
                "Score_Opp_Run": 164,
                "Score_Opp_Over_Played": 20,
                "Score_Opp_wicket": 9
            },
            {
                "ID": 19,
                "Opponent": "Zimbabwe",
                "Type": "ODI",
                "Date": "2024-07-19T00:00:00Z",
                "Venue": "Zahur Ahmed Chowdhury Stadium, Chattogram",
                "Result": "Bangladesh",
                "Wonbywicket": false,
                "Wonbyrun": true,
                "Winrun": 45,
                "Winwicket": 0,
                "Score_BD_Run": 260,
                "Score_BD_Over_Played": 50,
                "Score_BD_wicket": 6,
                "Score_Opp_Run": 215,
                "Score_Opp_Over_Played": 48.1,
                "Score_Opp_wicket": 10
            },
            {
                "ID": 20,
                "Opponent": "Zimbabwe",
                "Type": "T20",
                "Date": "2024-06-23T00:00:00Z",
                "Venue": "Queens Sports Club, Bulawayo",
                "Result": "Zimbabwe",
                "Wonbywicket": false,
                "Wonbyrun": true,
                "Winrun": 10,
                "Winwicket": 0,
                "Score_BD_Run": 150,
                "Score_BD_Over_Played": 19.5,
                "Score_BD_wicket": 10,
                "Score_Opp_Run": 160,
                "Score_Opp_Over_Played": 19.2,
                "Score_Opp_wicket": 8
            },
            {
                "ID": 21,
                "Opponent": "Zimbabwe",
                "Type": "ODI",
                "Date": "2024-05-10T00:00:00Z",
                "Venue": "Sylhet International Cricket Stadium, Sylhet",
                "Result": "Bangladesh",
                "Wonbywicket": true,
                "Wonbyrun": false,
                "Winrun": 0,
                "Winwicket": 8,
                "Score_BD_Run": 185,
                "Score_BD_Over_Played": 39.2,
                "Score_BD_wicket": 2,
                "Score_Opp_Run": 184,
                "Score_Opp_Over_Played": 47.5,
                "Score_Opp_wicket": 10
            },
            {
                "ID": 22,
                "Opponent": "Zimbabwe",
                "Type": "Test",
                "Date": "2024-04-05T00:00:00Z",
                "Venue": "Harare Sports Club, Harare",
                "Result": "Bangladesh",
                "Wonbywicket": true,
                "Wonbyrun": false,
                "Winrun": 0,
                "Winwicket": 2,
                "Score_BD_Run": 350,
                "Score_BD_Over_Played": 110.2,
                "Score_BD_wicket": 8,
                "Score_Opp_Run": 340,
                "Score_Opp_Over_Played": 115.1,
                "Score_Opp_wicket": 10
            },
            {
                "ID": 23,
                "Opponent": "Zimbabwe",
                "Type": "T20",
                "Date": "2024-03-18T00:00:00Z",
                "Venue": "Sher-e-Bangla National Stadium, Dhaka",
                "Result": "Bangladesh",
                "Wonbywicket": false,
                "Wonbyrun": true,
                "Winrun": 22,
                "Winwicket": 0,
                "Score_BD_Run": 175,
                "Score_BD_Over_Played": 20,
                "Score_BD_wicket": 7,
                "Score_Opp_Run": 153,
                "Score_Opp_Over_Played": 19.3,
                "Score_Opp_wicket": 10
            },
            {
                "ID": 24,
                "Opponent": "Zimbabwe",
                "Type": "ODI",
                "Date": "2024-02-15T00:00:00Z",
                "Venue": "Zahur Ahmed Chowdhury Stadium, Chattogram",
                "Result": "Bangladesh",
                "Wonbywicket": false,
                "Wonbyrun": true,
                "Winrun": 62,
                "Winwicket": 0,
                "Score_BD_Run": 255,
                "Score_BD_Over_Played": 49.3,
                "Score_BD_wicket": 9,
                "Score_Opp_Run": 193,
                "Score_Opp_Over_Played": 47.4,
                "Score_Opp_wicket": 10
            },
            {
                "ID": 25,
                "Opponent": "Zimbabwe",
                "Type": "T20",
                "Date": "2024-01-22T00:00:00Z",
                "Venue": "Queens Sports Club, Bulawayo",
                "Result": "Zimbabwe",
                "Wonbywicket": true,
                "Wonbyrun": false,
                "Winrun": 0,
                "Winwicket": 4,
                "Score_BD_Run": 140,
                "Score_BD_Over_Played": 19.1,
                "Score_BD_wicket": 10,
                "Score_Opp_Run": 143,
                "Score_Opp_Over_Played": 18.3,
                "Score_Opp_wicket": 6
            },
            {
                "ID": 26,
                "Opponent": "Zimbabwe",
                "Type": "Test",
                "Date": "2023-12-30T00:00:00Z",
                "Venue": "Harare Sports Club, Harare",
                "Result": "Bangladesh",
                "Wonbywicket": false,
                "Wonbyrun": true,
                "Winrun": 135,
                "Winwicket": 0,
                "Score_BD_Run": 400,
                "Score_BD_Over_Played": 120.5,
                "Score_BD_wicket": 10,
                "Score_Opp_Run": 265,
                "Score_Opp_Over_Played": 80.4,
                "Score_Opp_wicket": 10
            },
            {
                "ID": 27,
                "Opponent": "Zimbabwe",
                "Type": "ODI",
                "Date": "2023-12-10T00:00:00Z",
                "Venue": "Sylhet International Cricket Stadium, Sylhet",
                "Result": "Zimbabwe",
                "Wonbywicket": false,
                "Wonbyrun": true,
                "Winrun": 12,
                "Winwicket": 0,
                "Score_BD_Run": 188,
                "Score_BD_Over_Played": 48.1,
                "Score_BD_wicket": 10,
                "Score_Opp_Run": 200,
                "Score_Opp_Over_Played": 49.2,
                "Score_Opp_wicket": 8
            },
            {
                "ID": 28,
                "Opponent": "Zimbabwe",
                "Type": "T20",
                "Date": "2023-11-20T00:00:00Z",
                "Venue": "Sher-e-Bangla National Stadium, Dhaka",
                "Result": "Bangladesh",
                "Wonbywicket": true,
                "Wonbyrun": false,
                "Winrun": 0,
                "Winwicket": 3,
                "Score_BD_Run": 170,
                "Score_BD_Over_Played": 19.2,
                "Score_BD_wicket": 7,
                "Score_Opp_Run": 169,
                "Score_Opp_Over_Played": 20,
                "Score_Opp_wicket": 9
            },
            {
                "ID": 29,
                "Opponent": "Zimbabwe",
                "Type": "ODI",
                "Date": "2023-10-05T00:00:00Z",
                "Venue": "Queens Sports Club, Bulawayo",
                "Result": "Bangladesh",
                "Wonbywicket": true,
                "Wonbyrun": false,
                "Winrun": 0,
                "Winwicket": 6,
                "Score_BD_Run": 200,
                "Score_BD_Over_Played": 42.4,
                "Score_BD_wicket": 4,
                "Score_Opp_Run": 198,
                "Score_Opp_Over_Played": 50,
                "Score_Opp_wicket": 10
            },
            {
                "ID": 30,
                "Opponent": "Zimbabwe",
                "Type": "Test",
                "Date": "2023-09-15T00:00:00Z",
                "Venue": "Zahur Ahmed Chowdhury Stadium, Chattogram",
                "Result": "Zimbabwe",
                "Wonbywicket": false,
                "Wonbyrun": true,
                "Winrun": 45,
                "Winwicket": 0,
                "Score_BD_Run": 250,
                "Score_BD_Over_Played": 85.3,
                "Score_BD_wicket": 10,
                "Score_Opp_Run": 295,
                "Score_Opp_Over_Played": 90.1,
                "Score_Opp_wicket": 7
            }

        ];
    
    
    
const batting_career = [];
    
    
    
const prisma = new PrismaClient();
    
    
    // Batch insertion for players
// for (const player of players) {
//   try {
//     const createdPlayer = await prisma.player.create({
//       data: {
//         Name: player.Name,
//         DOB: new Date(player.DOB),
//         BattingStyle: player.BattingStyle,
//         ICCRanking: player.ICCRanking,
//         IntDebut: new Date(player.IntDebut),
//         Profile: player.Profile,
//         CaptainStatus: player.CaptainStatus,
//         PlayerRole: player.PlayerRole
//       },
//     });

//     console.log("Player Created:", createdPlayer);
//   } catch (error) {
//     console.error("Error creating player:", error);
//   }
// }

async function main() {
    // Batch insertion for matches
    for (const match of matches) {
      try {
        const createdMatch = await prisma.matches.create({
          data: {
            Opponent: match.Opponent,
            Type: match.Type,
            Date: new Date(match.Date),
            Venue: match.Venue,
            Result: match.Result,
            Wonbywicket: match.Wonbywicket,
            Wonbyrun: match.Wonbyrun,
            Winrun: match.Winrun,
            Winwicket: match.Winwicket,
            Score_BD_Run: match.Score_BD_Run,
            Score_BD_Over_Played: match.Score_BD_Over_Played,
            Score_BD_wicket: match.Score_BD_wicket,
            Score_Opp_Run: match.Score_Opp_Run,
            Score_Opp_Over_Played: match.Score_Opp_Over_Played,
            Score_Opp_wicket: match.Score_Opp_wicket,
          }
        });
        console.log("Match Created:", createdMatch);
      } catch (error) {
        console.error("Error creating match:", error);
      }
    }
    for (const player of players) {
    try {
        const createdPlayer = await prisma.player.create({
        data: {
            Name: player.Name,
            DOB: new Date(player.DOB),
            BattingStyle: player.BattingStyle,
            ICCRanking: player.ICCRanking,
            IntDebut: new Date(player.IntDebut),
            Profile: player.Profile,
            CaptainStatus: player.CaptainStatus,
            PlayerRole: player.PlayerRole
        },
        });

        console.log("Player Created:", createdPlayer);
    } catch (error) {
        console.error("Error creating player:", error);
    }
}
}
  
main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });

// // const filePath = 'players.csv';
// const filePath = 'battingcareer.csv';
// // const filePath = 'players.csv';
// // const filePath = 'players.csv';

// // console.log(`${ filePath }`);

// fs.createReadStream(filePath)
// .pipe(csv())
// .on('data', (row) => 
// {       //for player data

//         // players.push(data);
//         // players.push({
//         //     Name : row['Name'],
//         //     DOB : new Date(row['DOB']), // using new Date() to convert the date into ISO-8601 format
//         //     BattingStyle : row['BattingStyle'],
//         //     ICCRanking : parseInt(row['ICCRanking'], 10), // have to parse to int as we are getting string from the csv, 10 is the radix
//         //     IntDebut : new Date(row['IntDebut']),
//         //     Profile : row['Profile'],
//         //     CaptainStatus : row['CaptainStatus'] === true, //converting the String to boolean
//         //     PlayerRole : row['PlayerRole']
//         // });

//         batting_career.push({
//             PlayerID : parseInt(row['PlayerID']),
//             Mathches : parseInt(row['Matches']),
//             Innings : parseInt(row['Innings']),
//             Runs : parseInt(row['Runs']),
//             Average : parseFloat(row['Average']),
//             High_Score : parseInt(row['High_Score']),
//             B_F : parseFloat(row['B_F']),
//             S_R : parseFloat(row['S_R']),
//             Hundreds : parseInt(row['Hundreds']),
//             Fifties : parseInt(row['Fifties']),
//             Format : row['Format']
//         })


// })
// .on('end', async () =>
// {
//     // console.log(players); 
//     // for (const player of players) {
//     //     await prisma.player.create( { data: player } ); //parsing from csv, to prisma
//     // }

//     console.log(batting_career);
//     for (const career of batting_career) {
//         await prisma.player.create( { data: career} );
//     }

//     await prisma.$disconnect();
// })
// .on('error', (err) =>{
//     console.error('Error while parsing CSV', err);
// });


