"use client"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import Tiger from "../Tiger"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <div className="hero" ref={heroRef}>
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

      <motion.div
        className="tiger-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Tiger />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="text-white">Tiger</span>
          <span className="text-[#f42a41]">Ver</span>
          <span className="text-[#ffde00]">se</span>
        </h1>
        <motion.p
          className="text-xl md:text-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          The Legacy of Bangladesh Cricket
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.button
            className="px-6 py-3 bg-[#006a4e] text-white rounded-full hover:bg-[#005a42] transition-all"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Team
          </motion.button>
          <motion.button
            className="px-6 py-3 bg-[#f42a41] text-white rounded-full hover:bg-[#d42238] transition-all"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            Match Schedule
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Bangladesh flag colors stripe */}
      <div className="absolute bottom-0 left-0 w-full h-8 flex">
        <div className="w-full h-full bg-[#006a4e]"></div>
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#f42a41]"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        ></motion.div>
      </div>
    </>
  )
}
