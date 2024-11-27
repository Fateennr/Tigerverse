const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function main() {
  await prisma.player.createMany({
    data:  [
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
