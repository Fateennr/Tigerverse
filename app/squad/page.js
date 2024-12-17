"use client";

import { useEffect, useState } from 'react';
import NavigationBar from '@/components/NavigationBar';


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SquadPage() {


  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Function to handle card click
  const handleCardHandler = (player) => {
    setSelectedPlayer(player);
  };

  // Function to close floating card
  const closeFloatingCard = () => {
    setSelectedPlayer(null);
  };

  useEffect(() => {
    async function fetchPlayers() {
      try {
        console.log('rihila');
        const response = await fetch("/api/players"); // Replace with your API endpoint
        const data = await response.json();
        setPlayers(data);
        setLoading(false);
        
      } catch (error) {
        console.error("Error fetching players:", error);
        setLoading(false);
      }
    }

    fetchPlayers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <NavigationBar/>

      <div style= {{display : "flex", 
                    flexWrap : "wrap",
                    gap : "16px",
                    justifyContent : "center"
                    }}>  
      {players.map(player => (
          <Card
              onClick = {() => handleCardHandler(player)} 
              style={{
                flex: "1 1 calc(20% - 16px)", 
                maxWidth: "calc(20% - 16px)",
                boxSizing: "border-box", 
              }}>
            
            <CardHeader>

                <CardTitle>{ player.Name }</CardTitle>
                <CardDescription># {player.ID} </CardDescription>
            </CardHeader>

            <CardContent>
                <div style={{display:"flex", justifyContent:"center"}} > <img src={`/players/${player.Name}.png`} alt = "no pic" style = {{ height: "200px", width: "200px"}} /> </div>
                <p>{player.BattingStyle} </p>
                <p> #{player.ICCRanking} </p>
            </CardContent>

            <CardFooter>
                <p>{player.PlayerRole} </p>
            </CardFooter>

          </Card>
        ))}

      </div>

      {selectedPlayer && (
        <>
            <div
            onClick={closeFloatingCard}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 999,
            }}
          > </div>

          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "300px",
              backgroundColor: "#FFF",
              borderRadius: "8px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              zIndex: 1000,
              padding: "16px",
              textAlign: "center",
            }}
          >
            <h2 style={{ marginBottom: "8px" }}>{selectedPlayer.Name}</h2>
            <div style={{display:"flex", justifyContent: "center"}}>
              <img
                src={`/players/${selectedPlayer.Name}.png`}
                alt="Player Image"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "8px",
                }}
              /> 
            </div>
            <p><strong>Batting Style:</strong> {selectedPlayer.BattingStyle}</p>
            <p><strong>ICC Ranking:</strong> #{selectedPlayer.ICCRanking}</p>
            <p><strong>Role:</strong> {selectedPlayer.PlayerRole}</p>
            <button
              onClick={closeFloatingCard}
              style={{
                marginTop: "12px",
                padding: "8px 12px",
                backgroundColor: "#DC3545",
                color: "#FFF",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </>

      )} 

      </>
    );
}