// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require('@prisma/client');
// import test from "node:test";

// const { PrismaClient } = require('@prisma/client'); // to test individually with node js, i need to use require cz import is under ES module, to run with import 
// I have to make the file extension to .mjs

const prisma = new PrismaClient();

// export const getAllPlayers = async () => {
// // const getAllPlayers = async () => {
//     return await prisma.player.findMany();
// }



// export const generateHeadtoHeadFunction = async (opponentCountry, matchType) => {
const generateHeadtoHeadFunction = async (opponentCountry, matchType) => {

    const result = await prisma.$queryRaw`SELECT GetStats(${opponentCountry}, ${matchType});`;
    return result;
};

// const testResult = async () => {
//     const result = await prisma.$queryRaw`SELECT * FROM Player` // Player is case sensitive, PLAYER or player doesnot work

//     return result; // it is working 
// }

const main = async () => {
    const result = await generateHeadtoHeadFunction("Zimbabwe", "ODI");
    console.log(result, " its working");
}

main();


// const list = getAllPlayers(); // this will return Promise{ <pending> } as the function returns a promise without getting the resolve or answer first,
// console.log(list.Name); // i have to fetch and test it with another asynchronous function 


// const testPlayers = async () => {
//   try {
//     const players = await getAllPlayers();
//     console.log("Players:", players);
//   } catch (error) {
//     console.error("Error fetching players:", error); // to get the promist and print it
//   } finally {
//     await prisma.$disconnect();
//   }
// };

// testPlayers();

// module.exports = { getAllPlayers }; // to export in nodejs