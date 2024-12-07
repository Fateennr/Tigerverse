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
        "ID": 1,
        "Opponent": "Afghanistan",
        "Type": "ODI",
        "Date": "2024-11-06T00:00:00Z",
        "Venue": "Sharjah Cricket Stadium, Sharjah",
        "Result": "Afghanistan",
        "Wonbywicket": false,
        "Wonbyrun": true,
        "Winrun": 92,
        "Winwicket": 0,
        "Score_BD": "143 all out in 34.3 overs",
        "Score_Opponent": "235 all out in 49.4 overs"
    },
    
    {
        "ID": 2,
        "Opponent": "South Africa",
        "Type": "Test",
        "Date": "2024-10-29T00:00:00Z", 
        "Venue": "Zahur Ahmed Chowdhury Stadium, Chattogram",
        "Result": "South Africa",
        "Wonbywicket": false,
        "Wonbyrun": true,
        "Winrun": 273,
        "Winwicket": 0,
        "Score_BD": "159 f/o & 143 all out in 43.4 overs",
        "Score_Opponent": "575/6 declared"
    },
    
    {
        "ID": 3,
        "Opponent": "South Africa",
            "Type": "Test",
            "Date": "2024-10-21T00:00:00Z",
            "Venue": "Sher-e-Bangla National Stadium, Mirpur, Dhaka",
            "Result": "South Africa",
            "Wonbywicket": true,
            "Wonbyrun": false,
            "Winrun": 0,
            "Winwicket": 7,
            "Score_BD": "106 & 307 all out in 89.5 overs",
            "Score_Opponent": "308 & 106/3 in 22 overs"
        },
        
        {
            "ID": 4,
            "Opponent": "India",
            "Type": "T20",
            "Date": "2024-10-09T00:00:00Z",
            "Venue": "Arun Jaitley Stadium, Delhi",
            "Result": "India",
            "Wonbywicket": false,
            "Wonbyrun": true,
            "Winrun": 133,
            "Winwicket": 0,
            "Score_BD": "164/7 in 20 overs",
            "Score_Opponent": "297/6 in 20 overs"
        },
        
        {
            "ID": 5,
            "Opponent": "India",
            "Type": "T20",
            "Date": "2024-10-06T00:00:00Z",
            "Venue": "Shrimant Madhavrao Scindia Cricket Stadium, Gwalior",
            "Result": "India",
            "Wonbywicket": false,
            "Wonbyrun": true,
            "Winrun": 86,
            "Winwicket": 0,
            "Score_BD": "135/9 in 20 overs",
            "Score_Opponent": "221/9 in 20 overs"
        },
        
        {
            "ID": 6,
            "Opponent": "Pakistan",
            "Type": "Test",
            "Date": "2024-08-30T00:00:00Z",
            "Venue": "Rawalpindi Cricket Stadium, Rawalpindi",
            "Result": "Bangladesh",
            "Wonbywicket": true,
            "Wonbyrun": false,
            "Winrun": 0,
            "Winwicket": 6,
            "Score_BD": "262 & 185/4 in 56 overs",
            "Score_Opponent": "274 & 172 all out in 46.4 overs"
        },
        {
            "ID": 7,
            "Opponent": "Pakistan",
            "Type": "Test",
            "Date": "2024-08-21T00:00:00Z",
            "Venue": "Rawalpindi Cricket Stadium, Rawalpindi",
            "Result": "Bangladesh",
            "Wonbywicket": true,
            "Wonbyrun": false,
            "Winrun": 0,
            "Winwicket": 10,
            "Score_BD": "565 & 30/0 in 6.3 overs",
            "Score_Opponent": "448/6 declared & 146 all out in 55.5 overs"
        }
        
        
    ]
    
    
    
    const batting_career = [
        {
            "player_id": 4,
            "Type": "Country",
            "Value": "Australia",
            "Span": "2017-2017",
            "Mat": 2,
            "Inns": 4,
            "NO": 0,
            "Runs": 170,
            "HS": 78,
            "Avg": 42.50,
            "BF": 371,
            "SR": 45.82,
            "Hundred": 0,
            "Fifty": 2,
            "Duck": 0,
            "Fours": 15,
            "Sixes": 3
        },
        {
            "player_id": 4,
            "Type": "Country",
            "Value": "England",
            "Span": "2010-2016",
            "Mat": 6,
            "Inns": 12,
            "NO": 0,
            "Runs": 736,
            "HS": 108,
            "Avg": 61.33,
            "BF": 996,
            "SR": 73.89,
            "Hundred": 3,
            "Fifty": 5,
            "Duck": 0,
            "Fours": 93,
            "Sixes": 5
        },
        {
            "player_id": 4,
            "Type": "Country",
            "Value": "India",
            "Span": "2010-2017",
            "Mat": 4,
            "Inns": 8,
            "NO": 1,
            "Runs": 296,
            "HS": 151,
            "Avg": 42.28,
            "BF": 484,
            "SR": 61.15,
            "Hundred": 1,
            "Fifty": 1,
            "Duck": 1,
            "Fours": 39,
            "Sixes": 3
        },
        {
            "player_id": 4,
            "Type": "Country",
            "Value": "New Zealand",
            "Span": "2008-2019",
            "Mat": 11,
            "Inns": 20,
            "NO": 0,
            "Runs": 908,
            "HS": 126,
            "Avg": 45.40,
            "BF": 1523,
            "SR": 59.61,
            "Hundred": 1,
            "Fifty": 8,
            "Duck": 1,
            "Fours": 136,
            "Sixes": 4
        },
        {
            "player_id": 4,
            "Type": "Country",
            "Value": "Pakistan",
            "Span": "2011-2020",
            "Mat": 5,
            "Inns": 10,
            "NO": 0,
            "Runs": 373,
            "HS": 206,
            "Avg": 37.30,
            "BF": 577,
            "SR": 64.64,
            "Hundred": 1,
            "Fifty": 0,
            "Duck": 0,
            "Fours": 44,
            "Sixes": 8
        },
        {
            "player_id": 4,
            "Type": "Country",
            "Value": "South Africa",
            "Span": "2008-2022",
            "Mat": 8,
            "Inns": 14,
            "NO": 0,
            "Runs": 265,
            "HS": 57,
            "Avg": 18.92,
            "BF": 567,
            "SR": 46.73,
            "Hundred": 0,
            "Fifty": 1,
            "Duck": 2,
            "Fours": 35,
            "Sixes": 1
        },
        {
            "player_id": 4,
            "Type": "Country",
            "Value": "Sri Lanka",
            "Span": "2008-2022",
            "Mat": 13,
            "Inns": 25,
            "NO": 1,
            "Runs": 917,
            "HS": 133,
            "Avg": 38.20,
            "BF": 1519,
            "SR": 60.36,
            "Hundred": 1,
            "Fifty": 7,
            "Duck": 4,
            "Fours": 114,
            "Sixes": 7
        },
        {
            "player_id": 4,
            "Type": "Country",
            "Value": "West Indies",
            "Span": "2009-2022",
            "Mat": 14,
            "Inns": 28,
            "NO": 0,
            "Runs": 954,
            "HS": 128,
            "Avg": 34.07,
            "BF": 1763,
            "SR": 54.11,
            "Hundred": 1,
            "Fifty": 6,
            "Duck": 2,
            "Fours": 119,
            "Sixes": 8
        },
        {
            "player_id": 4,
            "Type": "Country",
            "Value": "Zimbabwe",
            "Span": "2011-2020",
            "Mat": 6,
            "Inns": 11,
            "NO": 0,
            "Runs": 463,
            "HS": 109,
            "Avg": 42.09,
            "BF": 951,
            "SR": 48.68,
            "Hundred": 2,
            "Fifty": 1,
            "Duck": 1,
            "Fours": 55,
            "Sixes": 1
        },
        {
            "Type": "Country",
            "Value": "Afghanistan",
            "Span": "2022-2023",
            "Mat": 7,
            "Inns": 6,
            "NO": 3,
            "Runs": 119,
            "HS": 93,
            "Avg": 39.66,
            "BF": 145,
            "SR": 82.06,
            "100s": 0,
            "50s": 1,
            "0s": 1,
            "4s": 13,
            "6s": 1,
            "player_id": 1
        },
        {
            "Type": "Country",
            "Value": "England",
            "Span": "2023-2023",
            "Mat": 3,
            "Inns": 3,
            "NO": 0,
            "Runs": 47,
            "HS": 23,
            "Avg": 15.66,
            "BF": 69,
            "SR": 68.11,
            "100s": 0,
            "50s": 0,
            "0s": 0,
            "4s": 5,
            "6s": 1,
            "player_id": 1
        },
        {
            "Type": "Country",
            "Value": "India",
            "Span": "2022-2022",
            "Mat": 3,
            "Inns": 3,
            "NO": 0,
            "Runs": 14,
            "HS": 8,
            "Avg": 4.66,
            "BF": 25,
            "SR": 56.00,
            "100s": 0,
            "50s": 0,
            "0s": 1,
            "4s": 1,
            "6s": 0,
            "player_id": 1
        },
        {
            "Type": "Country",
            "Value": "New Zealand",
            "Span": "2023-2023",
            "Mat": 1,
            "Inns": 1,
            "NO": 0,
            "Runs": 38,
            "HS": 38,
            "Avg": 38.00,
            "BF": 28,
            "SR": 135.71,
            "100s": 0,
            "50s": 0,
            "0s": 0,
            "4s": 5,
            "6s": 1,
            "player_id": 1
        },
        {
            "Type": "Country",
            "Value": "Pakistan",
            "Span": "2023-2023",
            "Mat": 1,
            "Inns": 1,
            "NO": 0,
            "Runs": 12,
            "HS": 12,
            "Avg": 12.00,
            "BF": 11,
            "SR": 109.09,
            "100s": 0,
            "50s": 0,
            "0s": 0,
            "4s": 0,
            "6s": 1,
            "player_id": 1
        },
        {
            "Type": "Country",
            "Value": "South Africa",
            "Span": "2022-2022",
            "Mat": 3,
            "Inns": 2,
            "NO": 0,
            "Runs": 89,
            "HS": 72,
            "Avg": 44.50,
            "BF": 120,
            "SR": 74.16,
            "100s": 0,
            "50s": 1,
            "0s": 0,
            "4s": 10,
            "6s": 1,
            "player_id": 1
        },
        {
            "Type": "Country",
            "Value": "Sri Lanka",
            "Span": "2021-2021",
            "Mat": 3,
            "Inns": 3,
            "NO": 1,
            "Runs": 53,
            "HS": 27,
            "Avg": 26.50,
            "BF": 48,
            "SR": 110.41,
            "100s": 0,
            "50s": 0,
            "0s": 0,
            "4s": 5,
            "6s": 0,
            "player_id": 1
        },
        {
            "Type": "Country",
            "Value": "West Indies",
            "Span": "2022-2022",
            "Mat": 3,
            "Inns": 2,
            "NO": 0,
            "Runs": 9,
            "HS": 9,
            "Avg": 4.50,
            "BF": 19,
            "SR": 47.36,
            "100s": 0,
            "50s": 0,
            "0s": 1,
            "4s": 1,
            "6s": 0,
            "player_id": 1
        },
        {
            "Type": "Country",
            "Value": "Zimbabwe",
            "Span": "2020-2022",
            "Mat": 7,
            "Inns": 6,
            "NO": 2,
            "Runs": 219,
            "HS": 85,
            "Avg": 54.75,
            "BF": 201,
            "SR": 108.95,
            "100s": 0,
            "50s": 1,
            "0s": 0,
            "4s": 15,
            "6s": 5,
            "player_id": 1
        },
        {
            "Span": "2020-2023",
            "Mat": 16,
            "Inns": 15,
            "NO": 3,
            "Runs": 236,
            "HS": 93,
            "Avg": 19.66,
            "BF": 288,
            "SR": 81.94,
            "100s": 0,
            "50s": 1,
            "0s": 2,
            "4s": 25,
            "6s": 2,
            "Value": "Bangladesh",
            "Type": "Country",
            "player_id": 1
        },
        {
            "Span": "2023-2023",
            "Mat": 1,
            "Inns": 1,
            "NO": 0,
            "Runs": 38,
            "HS": 38,
            "Avg": 38.00,
            "BF": 28,
            "SR": 135.71,
            "100s": 0,
            "50s": 0,
            "0s": 0,
            "4s": 5,
            "6s": 1,
            "Value": "New Zealand",
            "Type": "Country",
            "player_id": 1
        },
        {
            "Span": "2023-2023",
            "Mat": 2,
            "Inns": 2,
            "NO": 1,
            "Runs": 16,
            "HS": 12,
            "Avg": 16.00,
            "BF": 14,
            "SR": 114.28,
            "100s": 0,
            "50s": 0,
            "0s": 0,
            "4s": 0,
            "6s": 1,
            "Value": "Pakistan",
            "Type": "Country",
            "player_id": 1
        },
        {
            "Span": "2022-2022",
            "Mat": 3,
            "Inns": 2,
            "NO": 0,
            "Runs": 89,
            "HS": 72,
            "Avg": 44.50,
            "BF": 120,
            "SR": 74.16,
            "100s": 0,
            "50s": 1,
            "0s": 0,
            "4s": 10,
            "6s": 1,
            "Value": "South Africa",
            "Type": "Country",
            "player_id": 1
        },
        {
            "Span": "2022-2022",
            "Mat": 3,
            "Inns": 2,
            "NO": 0,
            "Runs": 9,
            "HS": 9,
            "Avg": 4.50,
            "BF": 19,
            "SR": 47.36,
            "100s": 0,
            "50s": 0,
            "0s": 1,
            "4s": 1,
            "6s": 0,
            "Value": "West Indies",
            "Type": "Country",
            "player_id": 1
        },
        {
            "Span": "2021-2022",
            "Mat": 6,
            "Inns": 5,
            "NO": 2,
            "Runs": 212,
            "HS": 85,
            "Avg": 70.66,
            "BF": 197,
            "SR": 107.61,
            "100s": 0,
            "50s": 1,
            "0s": 0,
            "4s": 14,
            "6s": 5,
            "Value": "Zimbabwe",
            "Type": "Country",
            "player_id": 1
        }
    ];
    
    
    
const prisma = new PrismaClient();
    
    
    // Batch insertion for players


// model Matches {
//     ID              Int       @id @default(autoincrement())
//     Opponent        String
//     Type            String
//     Date            DateTime
//     Venue           String
//     Result          String
//     Wonbywicket     Boolean @default(false) 
//     Wonbyrun        Boolean @default(false) 
//     Winrun          Float
//     Winwicket       Float
//     Score_BD        String
//     Score_Opponent  String
//   }

async function main() {

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

    // for (const player of players) {
    //     try {
    //       const createdPlayer = await prisma.player.create({
    //         data: {
    //           Name: player.Name,
    //           DOB: new Date(player.DOB),
    //           BattingStyle: player.BattingStyle,
    //           ICCRanking: player.ICCRanking,
    //           IntDebut: new Date(player.IntDebut),
    //           Profile: player.Profile,
    //           CaptainStatus: player.CaptainStatus,
    //           PlayerRole: player.PlayerRole
    //         },
    //       });
      
    //       console.log("Player Created:", createdPlayer);
    //     } catch (error) {
    //       console.error("Error creating player:", error);
    //     }
    //   }
    // // Batch insertion for matches
    // for (const match of matches) {
    //   try {
    //     const createdMatch = await prisma.matches.create({
    //       data: {
    //         Opponent: match.Opponent,
    //         Type: match.Type,
    //         Date: new Date(match.Date),
    //         Venue: match.Venue,
    //         Result: match.Result,
    //         Wonbywicket: match.Wonbywicket,
    //         Wonbyrun: match.Wonbyrun,
    //         Winrun: match.Winrun,
    //         Winwicket: match.Winwicket,
    //         Score_BD: match.Score_BD,
    //         Score_Opponent: match.Score_Opponent,
    //       },
    //     });
  
    //     console.log("Match Created:", createdMatch);
    //   } catch (error) {
    //     console.error("Error creating match:", error);
    //   }
    // }
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


