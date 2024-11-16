"use client"

import { useEffect, useState } from "react";
import handleGetAllPlayersRequest from "../api/services/getPlayers";

const SquadInfo = () => 
{
    const [players, setPlayers] = useState([]);

    useEffect( () => {

        const fetchPlayers = async () => {
            try{
                const response = await fetch('/api/players');
                
                if (!response.ok)
                {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setPlayers(data);
                console.log(players);
            }
            catch(err)
            {
                console.error('Error: ', err);
            }
        };
        
        fetchPlayers(); // creating the fetchPlayers and calling it
    }, []); // second parameter in useEffect means, after the page is loaded it will run only once
 // if the 2nd parameter is ignored, it will run every time when the page renders
// if the 2nd parameter is given with values i.e: [statevariable, anotherState], it will run whenever the dependency value changes
    return (
        <>
            Hello
            { players.length > 0 ? (
                <ul>
                    {players.map((player, index) => (
                        <li key={index}> {player.Name} </li>
                    ))}
                </ul>
            ) : (
                <p> No Players Found. </p>
            )}
        </>
    ); 

};


export default SquadInfo;


