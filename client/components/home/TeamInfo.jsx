"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import styles from "../../app/home.module.css"

export default function TeamInfo() {
  const infoRef = useRef(null)
  const statsRef = useRef(null)
  const achievementsRef = useRef(null)

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
      { threshold: 0.1 },
    )

    if (infoRef.current) observer.observe(infoRef.current)
    if (statsRef.current) observer.observe(statsRef.current)
    if (achievementsRef.current) observer.observe(achievementsRef.current)

    return () => {
      if (infoRef.current) observer.unobserve(infoRef.current)
      if (statsRef.current) observer.unobserve(statsRef.current)
      if (achievementsRef.current) observer.unobserve(achievementsRef.current)
    }
  }, [])

  return (
    <section className={styles.teamInfoSection}>
      <h2 className={styles.sectionTitle}>Bangladesh Cricket Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8" ref={infoRef}>
        <div className="opacity-0">
          <p className="text-lg mb-4">
            The Bangladesh national cricket team, nicknamed "The Tigers", represents Bangladesh in international
            cricket. The team is administered by the Bangladesh Cricket Board (BCB) and is a Full Member of the
            International Cricket Council (ICC).
          </p>

          <p className="text-lg mb-4">
            Bangladesh's first official foray into international cricket came in the 1979 ICC Trophy in England. Cricket
            has gradually become very popular in Bangladesh, and is now one of the most popular sports in the country.
          </p>

          <div className="mt-6 space-y-4" ref={statsRef}>
            <div className={`${styles.statCard} opacity-0`} style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center">
                <div className="w-32 font-bold text-[#ffde00]">ICC Status:</div>
                <div>Full Member (Test, ODI and T20I)</div>
              </div>
            </div>
            <div className={`${styles.statCard} opacity-0`} style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center">
                <div className="w-32 font-bold text-[#ffde00]">Founded:</div>
                <div>1979</div>
              </div>
            </div>
            <div className={`${styles.statCard} opacity-0`} style={{ animationDelay: "0.6s" }}>
              <div className="flex items-center">
                <div className="w-32 font-bold text-[#ffde00]">Test Status:</div>
                <div>2000 - present</div>
              </div>
            </div>
            <div className={`${styles.statCard} opacity-0`} style={{ animationDelay: "0.8s" }}>
              <div className="flex items-center">
                <div className="w-32 font-bold text-[#ffde00]">Captain:</div>
                <div>Najmul Hossain Shanto (Test & T20I), Shakib Al Hasan (ODI)</div>
              </div>
            </div>
            <div className={`${styles.statCard} opacity-0`} style={{ animationDelay: "1s" }}>
              <div className="flex items-center">
                <div className="w-32 font-bold text-[#ffde00]">Coach:</div>
                <div>Chandika Hathurusingha</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center opacity-0">
          <div className="relative w-full h-[300px] rounded-lg overflow-hidden hover-scale">
            <div className="absolute inset-0 bg-gradient-to-r from-[#006a4e]/50 to-transparent z-10"></div>
            <Image
              src="/placeholder.svg?height=300&width=500"
              alt="Bangladesh Cricket Team"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-xl font-bold text-white">The Tigers</h3>
              <p className="text-sm text-[#ffde00]">Pride of Bangladesh</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-6 bg-[#006a4e]/20 rounded-lg border-l-4 border-[#f42a41] opacity-0" ref={achievementsRef}>
        <h3 className="text-xl font-bold mb-4 text-[#ffde00]">Team Achievements</h3>
        <ul className="space-y-2">
          <li className={styles.achievementItem}>
            <span className="text-[#f42a41] mr-2">▶</span> Qualified for the Super 8 stage in the 2007 Cricket World Cup
          </li>
          <li className={styles.achievementItem}>
            <span className="text-[#f42a41] mr-2">▶</span> Reached the quarter-finals of the 2015 Cricket World Cup
          </li>
          <li className={styles.achievementItem}>
            <span className="text-[#f42a41] mr-2">▶</span> Won their first Test match against Zimbabwe in 2005
          </li>
          <li className={styles.achievementItem}>
            <span className="text-[#f42a41] mr-2">▶</span> Defeated Australia in a Test match for the first time in 2017
          </li>
          <li className={styles.achievementItem}>
            <span className="text-[#f42a41] mr-2">▶</span> Reached the final of the Asia Cup in 2012 and 2018
          </li>
          <li className={styles.achievementItem}>
            <span className="text-[#f42a41] mr-2">▶</span> Won the 2019 Ireland Tri-Nation Series, their first
            multi-team ODI tournament
          </li>
        </ul>
      </div>
    </section>
  )
}
