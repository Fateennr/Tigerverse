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
    
    
    
    const batting_career = []
    
    
    
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
            Score_BD: match.Score_BD,
            Score_Opponent: match.Score_Opponent,
          },
        });
  
        console.log("Match Created:", createdMatch);
      } catch (error) {
        console.error("Error creating match:", error);
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


