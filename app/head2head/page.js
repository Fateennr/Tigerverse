'use client';

import { useEffect, useState } from "react";

export default function Head2Head() {
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

        // Extract stats from the response, if it exists
        const stats = data[`GetOpponentStats(?)`];

        if (stats) {
          setOpponentStats(stats); // Save the stats in state
        }
      } catch (error) {
        console.error("Error fetching opponent stats:", error);
      }
    }

    fetchOpponentStats();
  }, [selectedOpponent]);

  return (
    <div>
      <h1>Head2Head Page</h1>

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
      {selectedOpponent && <p>Showing details for {selectedOpponent}...</p>}

      {/* Display opponent statistics */}
      {opponentStats && (
        <div>
          <h2>Statistics for {selectedOpponent}</h2>
          <p>Total Matches Played: {opponentStats.totalMatchesPlayed}</p>
          <p>Matches Won: {opponentStats.won}</p>
          <p>Matches Lost: {opponentStats.lost}</p>
          <p>Matches Tied: {opponentStats.tied}</p>
          <p>Highest Innings: {opponentStats.highestInnings}</p>
          <p>Lowest Innings: {opponentStats.lowestInnings}</p>
          <p>Total Runs Against: {opponentStats.totalRunsAgainst}</p>
        </div>
      )}
    </div>
  );
}
