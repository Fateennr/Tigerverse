"use client"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import styles from "../../app/home.module.css"

const timelineEvents = [
  {
    year: "1979",
    title: "First International Tournament",
    description: "Bangladesh participated in the ICC Trophy for the first time.",
  },
  {
    year: "1986",
    title: "First ODI Match",
    description: "Bangladesh played their first ODI against Pakistan in the Asia Cup.",
  },
  {
    year: "1997",
    title: "ICC Trophy Champions",
    description: "Bangladesh won the ICC Trophy, qualifying for their first World Cup.",
  },
  {
    year: "1999",
    title: "World Cup Debut",
    description: "Bangladesh made their World Cup debut and secured a memorable victory against Pakistan.",
  },
  {
    year: "2000",
    title: "Test Status Granted",
    description: "Bangladesh was granted Test status by the ICC, becoming the 10th Test-playing nation.",
  },
  {
    year: "2005",
    title: "First Test Victory",
    description: "Bangladesh achieved their first Test victory against Zimbabwe in Chittagong.",
  },
  {
    year: "2007",
    title: "World Cup Success",
    description: "Bangladesh defeated India and South Africa to reach the Super 8 stage of the World Cup.",
  },
  {
    year: "2015",
    title: "World Cup Quarter-Finals",
    description: "Bangladesh reached the quarter-finals of the World Cup for the first time.",
  },
  {
    year: "2017",
    title: "Historic Test Win",
    description: "Bangladesh defeated Australia in a Test match for the first time.",
  },
  {
    year: "2021",
    title: "First T20I Series Win Against Australia and New Zealand",
    description: "Bangladesh secured their first T20I series victories against Australia (4-1) and New Zealand (3-2).",
  },
]

export default function CricketTimeline() {
  const timelineRef = useRef(null)
  const [expandedItems, setExpandedItems] = useState({})
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )

    if (timelineRef.current) observer.observe(timelineRef.current)

    return () => {
      if (timelineRef.current) observer.unobserve(timelineRef.current)
    }
  }, [])

  const toggleItem = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const toggleTimeline = () => {
    setIsTimelineExpanded(!isTimelineExpanded)
  }

  return (
    <section className="mt-16 relative" ref={timelineRef}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`${styles.sectionTitle} opacity-0`}>Bangladesh Cricket Timeline</h2>
        <button
          onClick={toggleTimeline}
          className="flex items-center space-x-2 bg-[#006a4e]/30 hover:bg-[#006a4e]/50 text-white px-4 py-2 rounded-md transition-all"
        >
          <span>{isTimelineExpanded ? "Collapse" : "Expand"} Timeline</span>
          {isTimelineExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      <div className={`${styles.timelineContainer} bg-[#006a4e]/10 rounded-lg p-4`}>
        <div className="absolute left-[50px] top-0 bottom-0 w-0.5 bg-[#006a4e] hidden md:block"></div>

        <AnimatePresence>
          {isTimelineExpanded ? (
            timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                className={`${styles.timelineItem} relative opacity-0`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="hidden md:block absolute left-[46px] top-2 w-[10px] h-[10px] rounded-full bg-[#f42a41] border-2 border-[#ffde00]"></div>

                <div className={styles.timelineYear}>
                  <span className="text-xl font-bold text-[#ffde00]">{event.year}</span>
                </div>

                <div className={`${styles.timelineContent} cursor-pointer`} onClick={() => toggleItem(index)}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold mb-0 text-white">{event.title}</h3>
                    <ChevronDown
                      size={18}
                      className={`text-[#ffde00] transition-transform ${expandedItems[index] ? "rotate-180" : ""}`}
                    />
                  </div>

                  <AnimatePresence>
                    {expandedItems[index] && (
                      <motion.p
                        className="text-gray-200 mt-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {event.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-white">
                Click "Expand Timeline" to view Bangladesh cricket's journey through the years.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
