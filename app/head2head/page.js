'use client';

import { useEffect, useState } from "react";
import PieChart from '/components/PieChart';
import LineChart from "@/components/LineChart";
import HorizontalBarChart from "@/components/HorizontalBarChart";
import NavigationBar from "@/components/NavigationBar"; // Import the reusable NavigationBar
import styles from "../Home.module.css";

export default function Head2Head() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Function to toggle the drawer state
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const [opponents, setOpponents] = useState([]);
  const [selectedOpponent, setSelectedOpponent] = useState("");
  const [opponentStats, setOpponentStats] = useState(null);

  // Fetch the list of opponents
  useEffect(() => {
    async function fetchOpponents() {
      try {
        const response = await fetch("/api/matches");
        const data = await response.json();
        setOpponents(data);
      } catch (error) {
        console.error("Error fetching opponents:", error);
      }
    }
    fetchOpponents();
  }, []);

  // Fetch opponent stats when an opponent is selected
  useEffect(() => {
    if (!selectedOpponent) return;

    async function fetchOpponentStats() {
      try {
        const response = await fetch(`/api/matches/stats?opponent=${encodeURIComponent(selectedOpponent)}`);
        const data = await response.json();

        const stats = data[`GetOpponentStats(?)`];
        if (stats) {
          setOpponentStats(stats);
        }
      } catch (error) {
        console.error("Error fetching opponent stats:", error);
      }
    }
    fetchOpponentStats();
  }, [selectedOpponent]);

  return (
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
          <li><a href="/head2head">Squad</a></li>
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
        {/* Dropdown Menu */}
        <select
          value={selectedOpponent}
          onChange={(e) => setSelectedOpponent(e.target.value)}
        >
          <option value="">Select Opponent</option>
          {opponents.map((match) => (
            <option key={match.Opponent} value={match.Opponent}>
              {match.Opponent}
            </option>
          ))}
        </select>




        {/* Display selected opponent */}


        {selectedOpponent && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>{selectedOpponent}</h1>
          </div>
        )}


        {/* Display opponent statistics */}
        {opponentStats && (
          <div>
             {selectedOpponent && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <h1 style={{ fontSize: "1rem", fontWeight: "bold" }}>Statistics for {selectedOpponent}</h1>
          </div>
        )}
            <div
              style={{
                backgroundColor: "#557869",
                borderRadius: "8px",
                padding: "20px",
                color: "#ffffff",
                maxWidth: "400px",
                margin: "20px auto",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                <strong>Total Matches Played:</strong> {opponentStats.totalMatchesPlayed}
              </p>
              <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                <strong>Matches Won:</strong> {opponentStats.won}
              </p>
              <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                <strong>Matches Lost:</strong> {opponentStats.lost}
              </p>
              <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                <strong>Matches Tied:</strong> {opponentStats.tied}
              </p>
              <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                <strong>Highest Innings:</strong> {opponentStats.highestInnings}
              </p>
              <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                <strong>Lowest Innings:</strong> {opponentStats.lowestInnings}
              </p>
              <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
                <strong>Total Runs Against:</strong> {opponentStats.totalRunsAgainst}
              </p>
            </div>


          </div>
        )}

        {/* Charts */}
        {opponentStats && (
          <>
            {selectedOpponent && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <h1 style={{ fontSize: "1rem", fontWeight: "bold" }}>Win Loss Distribution</h1>
          </div>
        )}
            {opponentStats ? (
              <div style={{ width: '300px', height: '300px', margin: 'auto' }}> {/* Adjusted size */}
                <PieChart stats={opponentStats} />
              </div>
            ) : (
              <p>Pie Chart</p>
            )}

{selectedOpponent && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <h1 style={{ fontSize: "1rem", fontWeight: "bold" }}>Innings Perfomance</h1>
          </div>
        )}
            {opponentStats ? (
              <div style={{ width: '400px', height: '250px', margin: 'auto' }}> {/* Adjusted size */}
                <LineChart stats={opponentStats} />
              </div>
            ) : (
              <p>Line Chart</p>
            )}

{selectedOpponent && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <h1 style={{ fontSize: "1rem", fontWeight: "bold" }}>Match Stats Overview</h1>
          </div>
        )}
            {opponentStats ? (
              <div style={{ width: '450px', height: '250px', margin: 'auto' }}> {/* Adjusted size */}
                <HorizontalBarChart stats={opponentStats} />
              </div>
            ) : (
              <p>HorizontalBarChart</p>
            )}

          </>
        )}
      </main>





    </div>

  );
}


