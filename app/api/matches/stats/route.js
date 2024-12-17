import { PrismaClient } from '@prisma/client';

// const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export async function GET(req) {
  // console.log("is the function alive");
  console.log(req.url);
  try {
    const { searchParams } = new URL(req.url);
    // const { searchParams } = new URL("http://localhost:3000/api/matches/stats?opponent=India");
    const opponent = searchParams.get("opponent");

    console.log("the opponent is ",opponent);

    if (!opponent) {
      return new Response(
        JSON.stringify({ error: "Opponent query parameter is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Use parameterized queries to safely inject opponent into the SQL query
    const stats = await prisma.$queryRaw`SELECT GetOpponentStats(${opponent})`;
  
    console.log(stats);
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



// main()
//     .then(async () => {
//       await prisma.$disconnect();
//     })
//     .catch(async (e) => {
//       console.error(e);
//       await prisma.$disconnect();
//       process.exit(1);
//     });