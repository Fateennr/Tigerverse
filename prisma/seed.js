const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function main() {
  await prisma.matches.createMany({
    data: [
        {
           
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
    
       
    ],
  });
  console.log("Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
