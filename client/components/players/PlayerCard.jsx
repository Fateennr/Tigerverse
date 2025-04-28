"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

export default function PlayerCard({ player, onClick }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, []);

  const specs = (player.Specialist ?? 'Test,ODI,T20')
  .split(',')
  .map(s => s.trim());

  // Determine which format badges to show
  const formatBadges = {
    TEST: { bg: "bg-[#006a4e]", text: "Test" },
    ODI: { bg: "bg-[#f42a41]", text: "ODI" },
    T20: { bg: "bg-[#ffde00] text-[#1c1c1c]", text: "T20" },
  }

  return (
    <div
      ref={cardRef}
      className={`bg-[#1c1c1c]/90 rounded-lg overflow-hidden shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      onClick={onClick}
      style={{ transitionDelay: `${Math.random() * 0.3}s`, width: "180px" }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={
              `/players/${player.Name}.png`
              || '/placeholder.jpg'
          }
          alt={player.Name}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

        {/* Rank Badge */}
        <div className="absolute top-3 right-3 bg-[#ffde00] text-[#1c1c1c] rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md">
          {player.rank}
        </div>

        {/* Format Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
        {specs.map((fmt, idx) => {
          const badge = formatBadges[fmt] || { bg: 'bg-gray-200', text: fmt };
          return (
            <span
              key={idx}
              className={`${badge.bg} text-xs px-2 py-1 rounded-full font-medium`}
            >
              {badge.text}
            </span>
          );
        })}
        </div>


        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-base font-bold text-white mb-0 truncate">{player.name}</h3>
          <p className="text-xs text-gray-300 truncate">{player.role}</p>
        </div>
      </div>

      <div className="p-2 border-t border-[#006a4e]">
        <div className="flex justify-between items-center text-xs">
          <div>
            <p className="text-gray-400">Highest</p>
            <p className="font-bold text-[#ffde00]">{player.highestrun}</p>
          </div>
          <button className="px-2 py-1 bg-[#006a4e] hover:bg-[#005a42] text-white rounded-md transition-colors duration-300 text-xs">
            View
          </button>
        </div>
      </div>
    </div>
  )
}
