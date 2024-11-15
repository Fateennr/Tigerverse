import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPlayer()
{
    let players = [];
    try{
        players = await prisma.player.findMany();
    }
    catch(err)
    {
        console.error('error fetching the player data', err);
        players = [];
    }

    return {
        props: {
            players,
        },
    };
}

export default function SquadInfo( { players} )
{
    return (
        <div> players </div>
    )
}

