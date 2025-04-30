"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`py-4 px-6 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#006a4e]/90 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold flex items-center">
          <span className="text-white">Tiger</span>
          <span className="text-[#f42a41]">Ver</span>
          <span className="text-[#ffde00]">se</span>
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-white hover:text-[#ffde00] transition-colors relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f42a41] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/squad" className="text-white hover:text-[#ffde00] transition-colors relative group">
            Squad
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f42a41] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/my-squad" className="text-white hover:text-[#ffde00] transition-colors relative group">
            Generate My Own Squad !
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f42a41] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/h2h" className="text-white hover:text-[#ffde00] transition-colors relative group">
            Head2Head
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f42a41] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/best-of-bd" className="text-white hover:text-[#ffde00] transition-colors relative group">
            Best of BD
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f42a41] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/hall-of-fame" className="text-white hover:text-[#ffde00] transition-colors relative group">
            Hall of Fame
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f42a41] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/gallary" className="text-white hover:text-[#ffde00] transition-colors relative group">
            Gallery
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f42a41] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-0 left-0 bg-[#006a4e]/95 p-4 animate-slideInUp">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white hover:text-[#ffde00] transition-colors py-2 px-4 border-l-2 border-[#f42a41]"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/squad"
                className="text-white hover:text-[#ffde00] transition-colors py-2 px-4 border-l-2 border-[#f42a41]"
                onClick={() => setIsMenuOpen(false)}
              >
                Squad
              </Link>
              <Link
                href="/my-squad"
                className="text-white hover:text-[#ffde00] transition-colors py-2 px-4 border-l-2 border-[#f42a41]"
                onClick={() => setIsMenuOpen(false)}
              >
                Generate My Own Squad !
              </Link>
              <Link
                href="/h2h"
                className="text-white hover:text-[#ffde00] transition-colors py-2 px-4 border-l-2 border-[#f42a41]"
                onClick={() => setIsMenuOpen(false)}
              >
                Head to Head
              </Link>
              <Link
                href="/best-of-bd"
                className="text-white hover:text-[#ffde00] transition-colors py-2 px-4 border-l-2 border-[#f42a41]"
                onClick={() => setIsMenuOpen(false)}
              >
                Best of BD
              </Link>
              <Link
                href="/hall-of-fame"
                className="text-white hover:text-[#ffde00] transition-colors py-2 px-4 border-l-2 border-[#f42a41]"
                onClick={() => setIsMenuOpen(false)}
              >
                Hall of Fame
              </Link>
              <Link
                href="/gallary"
                className="text-white hover:text-[#ffde00] transition-colors py-2 px-4 border-l-2 border-[#f42a41]"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallary
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
