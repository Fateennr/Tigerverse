"use client";

import { useEffect, useState } from 'react';
import styles from "../home.module.css";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SquadPage() {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Function to toggle the drawer state
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching the API data
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

    <div className={styles.Container}>
      <button onClick={toggleDrawer} className={styles.DrawerToggle}>
        ☰
      </button>

      {/* Drawer */}
      <aside className={`${styles.Sidebar} ${isDrawerOpen ? styles.Open : ""}`}>
        <div className={styles.Title}>
          <h2>TigerVerse</h2>
        </div>
        <div className={styles.Spacer}></div> {/* Grey spacer */}
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/squad">Squad</a></li>
          <li><a href="/halloffame">Player</a></li>
          <li><a href="/match">Coach</a></li>
          <li><a href="/squad">Match</a></li>
          
        </ul>
      </aside>

      {/* Main Content */}
      <main className={styles.MainContent}>
        <nav className={styles.NavigationBar}>
          <ul className={styles.navLinks}>
            <li className={styles.navItem}>
              <a href="/">Home</a>
            </li>
            <li className={styles.navItem}>
              <a href="/head2head">Head2Head</a>
            </li>
            <li className={styles.navItem}>
              <a href="/halloffame">Hall of Fame</a>
            </li>
            <li className={styles.navItem}>
              <a href="/match">Match</a>
            </li>
            <li className={styles.navItem}>
              <a href="/squad">Squad</a>
            </li>
            <li className={styles.navItem}>
              <a href="/bestofbd">Best Of BD</a>
            </li>
            <li className={styles.navItem}>
              <a href="/gallery">Gallery</a>
            </li>
          </ul>
        </nav>

      <div style= {{display : "flex", 
                    flexWrap : "wrap",
                    gap : "16px",
                    justifyContent : "center"
                    }}> 
      {players.map(player => (
        
        <Card style={{
                      flex: "1 1 calc(20% - 16px)", 
                      maxWidth: "calc(20% - 16px)",
                      boxSizing: "border-box", 
                      }} >
          
          <CardHeader>
            <CardTitle>{ player.Name }</CardTitle>
            <CardDescription># {player.ID} </CardDescription>
          </CardHeader>
          <CardContent>
            <img src={`/players/${player.Name}.png`} alt = "no pic" style = {{ height: "200px", width: "200px"}} />
            <p>{player.BattingStyle} </p>
            <p> #{player.ICCRanking} </p>
          </CardContent>
          <CardFooter>
            <p>{player.PlayerRole} </p>
          </CardFooter>
        </Card>
      ))}
      </div>

      </main>
    </div>
  );
}