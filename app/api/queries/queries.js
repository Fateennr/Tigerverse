import { PrismaClient } from "@prisma/client";

// const { PrismaClient } = require('@prisma/client'); // to test individually with node js, i need to use require cz import is under ES module, to run with import 
// I have to make the file extension to .mjs

const prisma = new PrismaClient();

export const getAllPlayers = async () => {
// const getAllPlayers = async () => {
    return await prisma.player.findMany();
}

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