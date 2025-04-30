"use client"
import { useEffect, useState } from "react"
import NavigationBar from "@/components/NavigationBar.jsx"
import Tiger from "./Tiger.jsx"
import Link from "next/link"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <div className="hero">
        <svg width="100%" height="900px" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#006a4e" /> {/* Bangladesh green */}
              <stop offset="60%" stopColor="#181f18" />
              <stop offset="80%" stopColor="#293325" />
              <stop offset="100%" stopColor="#1c1c1c" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGradient)" mask="url(#fadeMask)" />
        </svg>
        <svg
          width="100%"
          height="400px"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "relative", top: "-400px" }}
        >
          <defs>
            <radialGradient id="circularFade" cx="50%" cy="0%" r="100%" fx="50%" fy="0%">
              <stop offset="0%" stopColor="#1c1c1c" stopOpacity="0" />
              <stop offset="10%" stopColor="#293325" stopOpacity="0.01" />
              <stop offset="40%" stopColor="#293325" stopOpacity="0.02" />
              <stop offset="50%" stopColor="#293325" stopOpacity="0.05" />
              <stop offset="60%" stopColor="#181f18" stopOpacity="0.2" />
              <stop offset="70%" stopColor="#181f18" stopOpacity="0.3" />
              <stop offset="80%" stopColor="#006a4e" stopOpacity="0.5" /> {/* Bangladesh green */}
              <stop offset="90%" stopColor="#f42a41" stopOpacity="0.3" /> {/* Bangladesh red */}
              <stop offset="95%" stopColor="#ffde00" stopOpacity="0.2" /> {/* Bangladesh yellow */}
              <stop offset="100%" stopColor="white" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#circularFade)" />
        </svg>
      </div>
      <div
  className={`tiger-container transition-opacity duration-1000 ${
    isLoaded ? "opacity-100 visible" : "opacity-0 invisible"
  }`}
>
  <Tiger />
</div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
  <img src="/tiger_home.png" alt="Tiger" className="w-[400px] h-auto mr-12" />
</div>
      <div className="absolute top-0 left-0 w-full">
        <NavigationBar />
      </div>
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-20 ${isLoaded ? "animate-slideInUp" : "opacity-0"}`}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="text-white">Tiger</span>
          <span className="text-[#f42a41]">Ver</span>
          <span className="text-[#ffde00]">se</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8">The Legacy of Bangladesh Cricket</p>
        <div className="flex justify-center space-x-4">
        <Link href="/squad">
  
</Link>
          
        </div>
      </div>

      {/* Bangladesh flag colors stripe */}
      {/* <div className="absolute bottom-1 left-0 w-full h-8 flex">
        <div className="w-full h-full bg-[#006a4e]"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#f42a41] animate-pulse-slow"></div>
      </div> */}
    </>
  )
}
