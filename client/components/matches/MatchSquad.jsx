"use client"
import { useState } from "react"
import Image from "next/image"
import PlayerStats from "./PlayerStats"

export default function MatchSquad({ squad }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [showPlayerStats, setShowPlayerStats] = useState(false)

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player)
    setShowPlayerStats(true)
  }

  const closePlayerStats = () => {
    setShowPlayerStats(false)
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-6">Bangladesh Squad</h3>

      <div className="relative">
        {/* Cricket field background */}
        <div
          className="absolute inset-0 bg-[#006a4e]/30 rounded-full mx-auto my-8"
          style={{ width: "90%", height: "90%", maxWidth: "1200px", zIndex: 0 }}
        ></div>
        <div
          className="absolute inset-0 border-2 border-white/20 rounded-full mx-auto my-8"
          style={{ width: "70%", height: "70%", maxWidth: "900px", zIndex: 0 }}
        ></div>
        <div
          className="absolute inset-0 border-2 border-white/20 rounded-full mx-auto my-8"
          style={{ width: "40%", height: "40%", maxWidth: "500px", zIndex: 0 }}
        ></div>

        {/* First row - 3 players */}
        <div className="flex justify-center mb-16 z-10 relative">
          {squad.slice(0, 3).map((player) => (
            <div key={player.id} className="mx-4 transform hover:scale-105 transition-all duration-300">
              <PlayerCard player={player} onClick={() => handlePlayerClick(player)} />
            </div>
          ))}
        </div>

        {/* Second row - 5 players */}
        <div className="flex justify-center mb-16 z-10 relative">
          {squad.slice(3, 8).map((player) => (
            <div key={player.id} className="mx-4 transform hover:scale-105 transition-all duration-300">
              <PlayerCard player={player} onClick={() => handlePlayerClick(player)} />
            </div>
          ))}
        </div>

        {/* Third row - 3 players */}
        <div className="flex justify-center z-10 relative">
          {squad.slice(8, 11).map((player) => (
            <div key={player.id} className="mx-4 transform hover:scale-105 transition-all duration-300">
              <PlayerCard player={player} onClick={() => handlePlayerClick(player)} />
            </div>
          ))}
        </div>
      </div>

      {/* Player Stats Modal */}
      {showPlayerStats && selectedPlayer && <PlayerStats player={selectedPlayer} onClose={closePlayerStats} />}
    </div>
  )
}

const PlayerCard = ({ player, onClick }) => {
  return (
    <div
      className="bg-[#1c1c1c]/90 rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer"
      onClick={onClick}
      style={{ width: "160px" }}
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={player.image || "/placeholder.svg?height=300&width=300"}
          alt={player.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-base font-bold text-white mb-0 truncate">{player.name}</h3>
          <p className="text-xs text-gray-300 truncate">{player.role}</p>
        </div>
      </div>

      <div className="p-2 border-t border-[#006a4e]">
        {player.stats.runs ? (
          <div className="flex justify-between items-center text-xs">
            <div>
              <p className="text-gray-400">Runs</p>
              <p className="font-bold text-[#ffde00]">{player.stats.runs}</p>
            </div>
            {player.stats.wickets && (
              <div>
                <p className="text-gray-400">Wickets</p>
                <p className="font-bold text-[#ffde00]">{player.stats.wickets}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-between items-center text-xs">
            <div>
              <p className="text-gray-400">Wickets</p>
              <p className="font-bold text-[#ffde00]">{player.stats.wickets}</p>
            </div>
            <div>
              <p className="text-gray-400">Economy</p>
              <p className="font-bold text-white">{player.stats.economy}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
