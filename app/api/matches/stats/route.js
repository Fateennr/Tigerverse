

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const opponent = searchParams.get("opponent");

    if (!opponent) {
      return new Response(
        JSON.stringify({ error: "Opponent query parameter is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Use parameterized queries to safely inject opponent into the SQL query
    const stats = await prisma.$queryRaw`
      SELECT GetOpponentStats(${opponent})
    `;
  

    if (!stats || stats.length === 0) {
      return new Response(
        JSON.stringify({ error: "No stats found for the specified opponent." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(stats[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching opponent stats:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch opponent stats." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await prisma.$disconnect();
  }
}
