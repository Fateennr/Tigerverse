// app/api/players/route.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all players
    const players = await prisma.player.findMany();
    return new Response(JSON.stringify(players), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching players:', error);
    return new Response('Internal Server Error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
