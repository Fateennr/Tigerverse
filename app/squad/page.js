"use client";

import { useEffect, useState } from 'react';
import styles from "../Home.module.css";

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
   /*  <div style={{ padding: '20px' }}>
      <h1>Squad</h1>
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Batting Style</th>
            <th>ICC Ranking</th>
            <th>Int Debut</th>
            <th>Profile</th>
            <th>Captain Status</th>
            <th>Player Role</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.ID}>
              <td>{player.ID}</td>
              <td>{player.Name}</td>
              <td>{new Date(player.DOB).toLocaleDateString()}</td>
              <td>{player.BattingStyle}</td>
              <td>{player.ICCRanking}</td>
              <td>{new Date(player.IntDebut).toLocaleDateString()}</td>
              <td>{player.Profile}</td>
              <td>{player.CaptainStatus ? 'Yes' : 'No'}</td>
              <td>{player.PlayerRole}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */

    <div className={styles.Container}>
      {/* Button to open/close the drawer */}
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

        
        
        <div style={{ textAlign: "center", margin: "20px 0" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Squad</h1>
          </div>
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Batting Style</th>
            <th>ICC Ranking</th>
            <th>Int Debut</th>
            <th>Profile</th>
            <th>Captain Status</th>
            <th>Player Role</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.ID}>
              <td>{player.ID}</td>
              <td>{player.Name}</td>
              <td>{new Date(player.DOB).toLocaleDateString()}</td>
              <td>{player.BattingStyle}</td>
              <td>{player.ICCRanking}</td>
              <td>{new Date(player.IntDebut).toLocaleDateString()}</td>
              <td>{player.Profile}</td>
              <td>{player.CaptainStatus ? 'Yes' : 'No'}</td>
              <td>{player.PlayerRole}</td>
            </tr>
          ))}
        </tbody>
      </table>


      </main>
    </div>
  );
}