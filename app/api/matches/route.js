// app/api/matches/route.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

 
export async function GET(req) {
  try {
    // Fetch distinct opponents from the Matches table
    const opponents = await prisma.matches.findMany({
      distinct: ['Opponent'],
      select: {
        Opponent: true
      }
    });

    return new Response(JSON.stringify(opponents), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch match data' }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
 

