"use client"

import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function BangladeshCricketTeam() {
  const welcomeRef = useRef(null)
  const statsRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    // Simple animation for elements when they come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    // Observe all sections
    if (welcomeRef.current) observer.observe(welcomeRef.current)
    if (statsRef.current) observer.observe(statsRef.current)
    if (timelineRef.current) observer.observe(timelineRef.current)

    // Cleanup
    return () => {
      if (welcomeRef.current) observer.unobserve(welcomeRef.current)
      if (statsRef.current) observer.unobserve(statsRef.current)
      if (timelineRef.current) observer.unobserve(timelineRef.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#1c1c1c] font-lexend">
      <style jsx global>{`
        .bg-bangladesh-gradient {
          background: linear-gradient(to bottom, #006a4e 0%, #181f18 60%, #293325 100%, #1c1c1c 100%);
        }
        
        .bg-bangladesh-gradient-reverse {
          background: linear-gradient(to top, #006a4e 0%, #181f18 60%, #293325 80%, #1c1c1c 100%);
        }
        
        .bg-bangladesh-dark {
          background-color: #1c1c1c;
        }
        
        .text-bangladesh-green {
          color: #006a4e;
        }
        
        .border-bangladesh-green {
          border-color: #006a4e;
        }

        /* Red circle overlay - Bangladesh flag inspired */
        .bangladesh-flag-overlay {
          position: absolute;
          width: 150px;
          height: 150px;
          background-color: #f42a41;
          border-radius: 50%;
          opacity: 0.7;
          z-index: 1;
          right: 10%;
          top: 20%;
          transition: transform 0.5s ease-in-out;
        }

        .bangladesh-flag-overlay:hover {
          transform: scale(1.1);
        }

        /* Yellow accent line */
        .yellow-accent-line {
          height: 3px;
          background: linear-gradient(90deg, transparent, #ffc107 50%, transparent);
          width: 80%;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }

        .yellow-accent-line::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          100% {
            left: 100%;
          }
        }

        /* Animation classes */
        .animate-in {
          animation: fadeIn 0.8s ease forwards;
        }

        .animate-in-delay-1 {
          opacity: 0;
          animation: fadeIn 0.8s ease forwards;
          animation-delay: 0.2s;
        }

        .animate-in-delay-2 {
          opacity: 0;
          animation: fadeIn 0.8s ease forwards;
          animation-delay: 0.4s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Stats item hover effect */
        .stats-item {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .stats-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        }

        /* Timeline item hover effect */
        .timeline-item {
          transition: background-color 0.3s ease;
        }

        .timeline-item:hover {
          background-color: rgba(24, 31, 24, 0.9);
        }
      `}</style>

      {/* Welcome Section */}
      <section className="py-14 bg-bangladesh-gradient-reverse opacity-1 relative overflow-hidden" ref={welcomeRef}>
        {/* Bangladesh flag inspired red circle */}
        <div className="bangladesh-flag-overlay"></div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center opacity-0 animate-in">
            <div className="space-y-5 relative z-10">
              <h2 className="text-3xl font-bold text-yellow-400">Welcome to the Home of the Tigers</h2>
              <div className="yellow-accent-line my-4"></div>
              <p className="text-base text-green-50">
                The Bangladesh national cricket team, known as "The Tigers," represents Bangladesh in international
                cricket. Since gaining Test status in 2000, Bangladesh has emerged as a competitive force in world
                cricket, known for their passionate fans and fighting spirit.
              </p>
              <p className="text-base text-green-50">
                With a blend of experienced players and exciting young talent, Bangladesh continues to make strides in
                all formats of the game, particularly in limited-overs cricket where they have achieved notable
                victories against cricket's elite nations.
              </p>
              <div className="flex space-x-4 mt-6 opacity-0 animate-in-delay-2">
                <Link
                  href="/squad"
                  className="inline-block bg-red-600 hover:bg-red-700 text-yellow-50 font-medium text-sm py-2.5 px-5 rounded-lg transition-all duration-300 hover:scale-105" 
                >
                  Explore Team
                </Link>
              </div>
            </div>
            <div className="relative h-[350px] rounded-xl overflow-hidden shadow-xl opacity-0 animate-in-delay-1">
              <div className="absolute inset-0 border-2 border-yellow-500 rounded-xl z-20 pointer-events-none"></div>
              <div className="absolute -right-4 -bottom-4 w-full h-full bg-red-600 rounded-xl transition-transform duration-500 hover:translate-x-1 hover:translate-y-1"></div>
              <Image
                src="/hero.jpeg"
                alt="Bangladesh Cricket Team"
                fill
                className="object-cover relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-14 bg-bangladesh-gradient" ref={timelineRef}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 opacity-0 animate-in">
            <h2 className="text-2xl font-bold text-yellow-400">The History of Bangladesh Cricket</h2>
            <div className="yellow-accent-line mt-4"></div>
          </div>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto opacity-0 animate-in-delay-1">
            <AccordionItem value="item-1" className="border-[#293325] mb-3 timeline-item">
              <AccordionTrigger className="text-base font-medium text-yellow-300 bg-[#181f18] bg-opacity-70 px-4 rounded-t-lg transition-colors duration-300 hover:bg-[#1e261e]">
                <div className="flex items-center">
                  <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
                  Early Days (Pre-1970s)
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-green-50 space-y-2 px-4 bg-[#181f18] bg-opacity-70 rounded-b-lg border-l-2 border-red-600">
                <p>
                  Cricket was introduced to the region during the British colonial period. The game was primarily played
                  in what was then East Pakistan, with matches organized at club level.
                </p>
                <p>
                  The sport gained popularity among the educated elite and gradually spread to educational institutions
                  across the region.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-[#293325] mb-3 timeline-item">
              <AccordionTrigger className="text-base font-medium text-yellow-300 bg-[#181f18] bg-opacity-70 px-4 rounded-t-lg transition-colors duration-300 hover:bg-[#1e261e]">
                <div className="flex items-center">
                  <span className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></span>
                  Post-Independence Era (1971-1985)
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-green-50 space-y-2 px-4 bg-[#181f18] bg-opacity-70 rounded-b-lg border-l-2 border-yellow-500">
                <p>
                  Following Bangladesh's independence in 1971, cricket began to develop as a national sport. The
                  Bangladesh Cricket Control Board (BCCB) was established in 1972.
                </p>
                <p>
                  Bangladesh played its first international match against MCC in January 1977, marking the country's
                  entry into the international cricket arena.
                </p>
                <p>
                  The national team participated in the ICC Trophy for the first time in 1979, taking initial steps
                  toward international recognition.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-[#293325] mb-3 timeline-item">
              <AccordionTrigger className="text-base font-medium text-yellow-300 bg-[#181f18] bg-opacity-70 px-4 rounded-t-lg transition-colors duration-300 hover:bg-[#1e261e]">
                <div className="flex items-center">
                  <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
                  Associate Member Status (1986-1999)
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-green-50 space-y-2 px-4 bg-[#181f18] bg-opacity-70 rounded-b-lg border-l-2 border-red-600">
                <p>
                  Bangladesh became an Associate Member of the International Cricket Council (ICC) in 1986, a
                  significant milestone in the country's cricket journey.
                </p>
                <p>The team won the ICC Trophy in 1997, qualifying for their first Cricket World Cup in 1999.</p>
                <p>
                  Bangladesh's victory over Pakistan in the 1999 World Cup was a watershed moment, demonstrating the
                  team's potential on the global stage.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-[#293325] mb-3 timeline-item">
              <AccordionTrigger className="text-base font-medium text-yellow-300 bg-[#181f18] bg-opacity-70 px-4 rounded-t-lg transition-colors duration-300 hover:bg-[#1e261e]">
                <div className="flex items-center">
                  <span className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></span>
                  Test Status and Early Struggles (2000-2009)
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-green-50 space-y-2 px-4 bg-[#181f18] bg-opacity-70 rounded-b-lg border-l-2 border-yellow-500">
                <p>Bangladesh was granted Test status in 2000, becoming the tenth Test-playing nation.</p>
                <p>The team played its first Test match against India in November 2000 in Dhaka.</p>
                <p>
                  This period was characterized by learning and development, with Bangladesh securing their first Test
                  victory against Zimbabwe in 2005.
                </p>
                <p>
                  The team achieved their first ODI series win against Zimbabwe in 2004 and recorded a historic victory
                  over Australia in 2005.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-[#293325] mb-3 timeline-item">
              <AccordionTrigger className="text-base font-medium text-yellow-300 bg-[#181f18] bg-opacity-70 px-4 rounded-t-lg transition-colors duration-300 hover:bg-[#1e261e]">
                <div className="flex items-center">
                  <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
                  Rise in Limited Overs Cricket (2010-2019)
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-green-50 space-y-2 px-4 bg-[#181f18] bg-opacity-70 rounded-b-lg border-l-2 border-red-600">
                <p>
                  Bangladesh hosted the 2011 World Cup alongside India and Sri Lanka, reaching the quarter-finals of the
                  2015 World Cup.
                </p>
                <p>
                  The team recorded significant ODI series victories against Pakistan, India, and South Africa in 2015.
                </p>
                <p>
                  Bangladesh reached the semi-finals of the 2017 ICC Champions Trophy, defeating New Zealand and
                  England.
                </p>
                <p>
                  The emergence of players like Shakib Al Hasan, Tamim Iqbal, and Mushfiqur Rahim established Bangladesh
                  as a competitive force in world cricket.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-[#293325] timeline-item">
              <AccordionTrigger className="text-base font-medium text-yellow-300 bg-[#181f18] bg-opacity-70 px-4 rounded-t-lg transition-colors duration-300 hover:bg-[#1e261e]">
                <div className="flex items-center">
                  <span className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></span>
                  Modern Era (2020-Present)
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-green-50 space-y-2 px-4 bg-[#181f18] bg-opacity-70 rounded-b-lg border-l-2 border-yellow-500">
                <p>
                  Bangladesh continues to develop as a cricketing nation, with improved performances across all formats.
                </p>
                <p>The team secured historic Test victories against England, Australia, and New Zealand.</p>
                <p>
                  Bangladesh won their first multi-nation tournament by winning the 2022 T20 tri-series involving New
                  Zealand and Pakistan.
                </p>
                <p>
                  The emergence of young talents like Litton Das, Mehidy Hasan Miraz, and Mustafizur Rahman signals a
                  bright future for Bangladesh cricket.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1c1c1c] text-yellow-100 py-6 border-t border-red-600">
          <div className="mt-6 pt-4 border-t border-[#293325] text-center">
            <p className="text-xs">&copy; {new Date().getFullYear()} Bangladesh Cricket Board.</p>
          </div>
      </footer>
    </div>
  )
}
