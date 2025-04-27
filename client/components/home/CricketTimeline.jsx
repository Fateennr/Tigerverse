"use client"
import { useEffect, useRef } from "react"
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
  const itemRefs = useRef([])

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

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item)
    })

    return () => {
      if (timelineRef.current) observer.unobserve(timelineRef.current)

      itemRefs.current.forEach((item) => {
        if (item) observer.unobserve(item)
      })
    }
  }, [])

  return (
    <section className="mt-16" ref={timelineRef}>
      <h2 className={`${styles.sectionTitle} opacity-0`}>Bangladesh Cricket Timeline</h2>

      <div className={styles.timelineContainer}>
        <div className="absolute left-[50px] top-0 bottom-0 w-0.5 bg-[#006a4e] hidden md:block"></div>

        {timelineEvents.map((event, index) => (
          <div
            key={index}
            className={`${styles.timelineItem} relative opacity-0`}
            ref={(el) => (itemRefs.current[index] = el)}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="hidden md:block absolute left-[46px] top-2 w-[10px] h-[10px] rounded-full bg-[#f42a41] border-2 border-[#ffde00]"></div>

            <div className={styles.timelineYear}>
              <span className="text-xl font-bold text-[#ffde00]">{event.year}</span>
            </div>

            <div className={styles.timelineContent}>
              <h3 className="text-lg font-bold mb-2 text-white">{event.title}</h3>
              <p className="text-gray-200">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
