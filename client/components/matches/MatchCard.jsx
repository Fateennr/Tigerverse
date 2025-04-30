"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Calendar, MapPin, Trophy } from "lucide-react"

export default function MatchCard({ match, onClick }) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)

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
  }, [])

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Format badge based on match format
  const getFormatBadge = (format) => {
    switch (format) {
      case "Test":
        return "bg-[#006a4e]"
      case "ODI":
        return "bg-[#f42a41]"
      case "T20":
        return "bg-[#ffde00] text-[#1c1c1c]"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div
      ref={cardRef}
      className={`bg-[#1c1c1c]/80 rounded-lg overflow-hidden shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      onClick={onClick}
      style={{ transitionDelay: `${Math.random() * 0.3}s` }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
         
          src={`/${match.opponent.toLowerCase().replace(/\./g, '').replace(/\s+/g, '_')}.jpg` || '/stadium.webp'}
          alt={`Bangladesh vs ${match.opponent}`}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

        {/* Format Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getFormatBadge(match.format)}`}>
            {match.format}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold text-white mb-1">Bangladesh vs {match.opponent}</h3>
          <p className="text-sm text-[#ffde00]">{match.result}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center text-gray-300 text-sm mb-2">
          <Calendar size={14} className="mr-1" />
          <span>{formatDate(match.date)}</span>
        </div>

        <div className="flex items-center text-gray-300 text-sm mb-3">
          <MapPin size={14} className="mr-1" />
          <span className="truncate">{match.venue}</span>
        </div>

        <div className="flex justify-between items-center border-t border-[#333] pt-3">
          <div>
            <p className="text-xs text-gray-400">Score</p>
            <div className="flex space-x-2">
              <p className="text-sm font-bold text-white">BD: {match.bdScore}</p>
              <p className="text-sm text-gray-400">vs</p>
              <p className="text-sm font-bold text-white">
                {match.opponent}: {match.opponentScore}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <Trophy size={16} className="text-[#ffde00] mr-1" />
            <span className="text-sm text-white">{match.motm}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
