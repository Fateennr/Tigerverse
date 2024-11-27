// app/api/matches/route.js

// const { PrismaClient } = require("@prisma/client");

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

 
export async function GET(req) {
  console.log("function invoked");
  try {
    // Fetch distinct opponents from the Matches table
    const opponents = await prisma.matches.findMany({
      distinct: ['Opponent'],
      select: {
        Opponent: true
      }
    });

    console.log("prisma is working or not ", opponents);

    return new Response(JSON.stringify(opponents), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch match data' }), { status: 500 });
  } finally {
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
 

