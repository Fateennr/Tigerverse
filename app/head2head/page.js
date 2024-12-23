'use client';

import { useEffect, useState } from "react";
import PieChart from '/components/PieChart';
import LineChart from "@/components/LineChart";
import HorizontalBarChart from "@/components/HorizontalBarChart";
import NavigationBar from "@/components/NavigationBar"; // Import the reusable NavigationBar
import styles from "../home.module.css";

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
      console.log("hellow the opponents are not blank now", opponents);
    async function fetchOpponents() {
      try {
        const response = await fetch("/api/matches");
        const data = await response.json();
        setOpponents(data);
        console.log("hellow the opponents are not blank now", opponents);
      } catch (error) {
        console.error("Error fetching opponents:", error);
        console.log("hellow the opponents are not blank now", opponents);
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
    <>
      <NavigationBar/>
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

      <main className={styles.MainContent}>

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
</>

  );
}


