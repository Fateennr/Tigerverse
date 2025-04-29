"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`py-4 px-6 z-50 transition-all duration-300 ${
        "bg-gradient-to-r from-[#006a4e]+5 to-[#1c1c1c] backdrop-blur-sm shadow-lg"

      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold flex items-center">
          <span>Tiger</span>
          <span className="text-[#f42a41]">Ver</span>
          <span className="text-[#ffde00]">se</span>
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8">
          {['Home','Squad','Generate My Own Squad !','Head2Head','Best of BD','Hall of Fame','Gallery'].map((label, idx) => (
            <Link
              key={idx}
              href={
                label === 'Home' ? '/' :
                label === 'Squad' ? '/squad' :
                label === 'Generate My Own Squad !' ? '/my-squad' :
                label === 'Head2Head' ? '/h2h' :
                label === 'Best of BD' ? '/best-of-bd' :
                label === 'Hall of Fame' ? '/hall-of-fame' :
                '/gallery'
              }
              className="text-white hover:text-[#ffde00] transition-colors relative group"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f42a41] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-0 left-0 bg-gradient-to-b from-[#041309]/95 to-[#18230f]/95 p-4 animate-slideInUp">
            <div className="flex flex-col space-y-4">
              {['Home','Squad','Generate My Own Squad !','Head to Head','Best of BD','Hall of Fame','Gallery'].map((label, idx) => (
                <Link
                  key={idx}
                  href={
                    label === 'Home' ? '/' :
                    label === 'Squad' ? '/squad' :
                    label === 'Generate My Own Squad !' ? '/my-squad' :
                    label === 'Head to Head' ? '/h2h' :
                    label === 'Best of BD' ? '/best-of-bd' :
                    label === 'Hall of Fame' ? '/hall-of-fame' :
                    '/gallery'
                  }
                  className="text-white hover:text-[#ffde00] transition-colors py-2 px-4 border-l-2 border-[#f42a41]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
