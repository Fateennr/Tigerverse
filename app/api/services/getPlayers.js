// import { getAllPlayers } from "../queries/queries";
const { getAllPlayers } = require('../queries/queries');

// export default async function handleGetAllPlayersRequest(req, res) {
async function handleGetAllPlayersRequest(req, res) {
    
    if(req.method === 'GET') {
        try {
            const players = await getAllPlayers();
            console.log(players);
            res.status(200).json(players);
        } catch (error) {
            console.error('Error fetching players: ', error); //error in databases
            res.status(500).json({ error: 'Failed to fetch players' });
        } 
    }
    else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}


const testPlayers = async () => {
  try {
    const players = await handleGetAllPlayersRequest();
    console.log("Players:", players);
  } catch (error) {
    console.error("Error fetching players:", error); // to get the promist and print it
  } finally {
    await prisma.$disconnect();
  }
};

testPlayers();
