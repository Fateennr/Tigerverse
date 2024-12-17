import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
    console.log(req.url);
    try{
        // const { searchparams } = new URL(req.url);
        const searchparams  = req.nextUrl.searchParams;
        // const { careerurl } = new URL("http://localhost:3000/api/players/stats?id=1");

        const playerid = searchparams.get("id");
        // console.log("player id is ", playerid);
        
        // const playerid = 4;

        if (!playerid) {
            return new Response(
              JSON.stringify({ error: "No player id is found" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const playerstats = await prisma.$queryRaw`SELECT GetPlayerCareerDetails(${playerid})`;

        console.log(playerstats);

        if (!playerstats || playerstats.length === 0) 
        {
            return new Response(
              JSON.stringify({ error: "No stats found for the specified opponent." }),
              { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }
      
        return new Response(JSON.stringify( playerstats[0]), 
            {
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
