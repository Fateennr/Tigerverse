import { NextResponse } from "next/server";
import { getAllPlayers } from "../queries/queries";
// const { getAllPlayers } = require('../queries/queries');

export default async function handleGetAllPlayersRequest(req) {
// async function handleGetAllPlayersRequest(req, res) {
    if(req.method === 'GET') {
        try {

            const players = await getAllPlayers();
            // console.log(players);
            return NextResponse.json(players, { status: 200 });

        } 
        catch (error) 
        {
            console.error('Error fetching players: ', error); //error in databases
            return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
        } 
    }
    else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}

// to test the methods individually

// const testReq = {
//     method: 'GET',
// };

// const testRes = {
//     status: jest.fn(() => testRes),
//     json: jest.fn(),
// };


// const testPlayers = async () => {
//   try {
//     const players = await handleGetAllPlayersRequest(testReq, testRes);
//     console.log("Players:", players);
//   } catch (error) {
//     console.error("Error fetching players:", error); // to get the promist and print it
//   } finally {
//     await prisma.$disconnect();
//   }
// };

// testPlayers();
