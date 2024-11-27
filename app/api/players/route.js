// app/api/players/route.js


import { PrismaClient } from '@prisma/client';
// const { PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // Fetch all players
    const players = await prisma.player.findMany();
    console.log("players are", players);
    return new Response(JSON.stringify(players), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {

    console.error('Error fetching players:', error);
    return new Response('Internal Server Error', { status: 500 });
  } 
  finally {
    await prisma.$disconnect();
  }
}

// main()
//     .then(async () => {
//       await prisma.$disconnect();
//     })
//     .catch(async (e) => {
//       console.error(e);
//       await prisma.$disconnect();
//       process.exit(1);
//     });
 
