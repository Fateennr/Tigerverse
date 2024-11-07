const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

const csv = require('csv-parser');
const players = [];

const filePath = 'players.csv';

// console.log(`${ filePath }`);

fs.createReadStream(filePath)
    .pipe(csv())
//     .on('data', (row) => {

//         if(players.length === 0)
//             {
//                 console.log('no player found');
//             }
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
//     })
    .on('end', async () =>{

        console.log('Parsed Data: ');
        console.log(players);



        for (const player of players) {
            await prisma.player.create( { data: player } );
        }
        console.log('Data Imported!');
        await prisma.$disconnect();
    })
    .on('error', (err) =>{
        console.error('Error while parsing CSV', err);
    });