"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { ArrowRight, Globe, MessageSquare, BarChart3 } from "lucide-react"

interface HeroProps {
  windowWidth: number
  scrollToSection: (ref: React.RefObject<HTMLElement>) => void
  contactRef: React.RefObject<HTMLElement>
}

export default function Hero({ windowWidth, scrollToSection, contactRef }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen overflow-fix"
      style={{
        background: `linear-gradient(135deg, #f6d2b0 0%, #ba93d1 25%, #644caa 50%, #242d5d 75%, #04050c 100%)`,
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-white/10 animate-float-${i + 1}`}
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.1 + Math.random() * 0.1,
            }}
          ></div>
        ))}
      </div>

      <section
        className="container mx-auto px-4 sm:px-6 flex items-center py-12 md:py-0 relative z-10"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
          <div
            className={`space-y-4 md:space-y-6 text-center md:text-left fade-in ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: "0.2s" }}
          >
            <h1 className="font-bold leading-tight text-[#000001] tracking-tight animate-fade-in-up">
              AI-Powered Outreach Across All Your Platforms
              <span className="text-white block mt-2 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                Seamlessly connect with your audience everywhere they are.
              </span>
            </h1>

            <div
              className="flex flex-wrap gap-4 pt-6 justify-center md:justify-start animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <button
                onClick={() => scrollToSection(contactRef)}
                className="bg-[#04050c] text-white px-4 sm:px-6 py-3 rounded-full hover:bg-opacity-90 transition-all hover:scale-105 flex items-center gap-2 text-base sm:text-lg group"
              >
                Try for Free
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

            
            </div>
          </div>

          <div className={`relative fade-in ${isVisible ? "visible" : ""}`} style={{ transitionDelay: "0.4s" }}>
            <div className="w-full h-64 sm:h-80 md:h-[450px] relative flex items-center justify-center">
              <div className="absolute w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] md:w-[380px] md:h-[380px] rounded-full border-2 border-white/20 animate-slow-spin"></div>
              <div className="absolute w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] rounded-full border-2 border-white/30 animate-slow-spin-reverse"></div>
              <div className="absolute w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:w-[180px] md:h-[180px] rounded-full border-2 border-white/40 animate-slow-spin"></div>

              <div className="absolute bg-[#04050c]/70 backdrop-blur-md text-white z-10 text-center glow p-4 rounded-xl animate-float">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold">20k+</span>
                <div className="text-xs sm:text-sm font-medium">Specialists</div>
              </div>

              {/* Platform icons */}
              <div className="absolute top-[20%] left-[20%] bg-[#04050c] p-2 rounded-lg shadow-lg animate-float-delay-1">
                <Globe size={24} className="text-[#f6d2b0]" />
              </div>

              <div className="absolute bottom-[30%] right-[25%] bg-[#04050c] p-2 rounded-lg shadow-lg animate-float-delay-2">
                <MessageSquare size={24} className="text-[#ba93d1]" />
              </div>

              <div className="absolute top-[60%] left-[30%] bg-[#04050c] p-2 rounded-lg shadow-lg animate-float-delay-3">
                <BarChart3 size={24} className="text-[#644caa]" />
              </div>

              {[...Array(8)].map((_, i) => {
                const isProfileImage = i % 2 === 0

                const orbitSize = i < 4 ? (windowWidth < 768 ? 80 : 150) : windowWidth < 768 ? 120 : 190
                const angle = (i * Math.PI * 2) / (i < 4 ? 4 : 4) + (i < 4 ? 0 : Math.PI / 4)
                const top =
                  50 +
                  (Math.sin(angle) * orbitSize) / (i < 4 ? (windowWidth < 768 ? 2 : 3) : windowWidth < 768 ? 1.8 : 2.5)
                const left =
                  50 +
                  (Math.cos(angle) * orbitSize) / (i < 4 ? (windowWidth < 768 ? 2 : 3) : windowWidth < 768 ? 1.8 : 2.5)

                return (
                  <div
                    key={i}
                    className={`absolute ${
                      isProfileImage ? "rounded-full" : "rounded-lg bg-[#04050c]"
                    } overflow-hidden border-2 border-white h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 shadow-lg fade-in ${
                      isVisible ? "visible" : ""
                    } animate-float-delay-${i}`}
                    style={{
                      top: `${top}%`,
                      left: `${left}%`,
                      zIndex: isProfileImage ? 5 : 0,
                      transitionDelay: `${0.1 * i + 0.5}s`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  >
                    {!isProfileImage && (
                      <div className="flex items-center justify-center h-full w-full text-white">
                        <span className="text-xs">AI</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <div
        className={`container mx-auto px-4 sm:px-6 pb-8 sm:pb-12 fade-in ${isVisible ? "visible" : ""}`}
        style={{ transitionDelay: "0.6s" }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-8 items-center justify-items-center">
          {[
            { name: "Dreamure", icon: "▼" },
            { name: "SWITCH.WIN", icon: "S" },
            { name: "Sphere", icon: "◎" },
            { name: "PinSpace", icon: "📍" },
            { name: "Visionix", icon: "👁️" },
          ].map((brand, i) => (
            <div
              key={i}
              className="text-white opacity-80 hover:opacity-100 transition-all hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${0.7 + i * 0.1}s` }}
            >
              <div className="flex items-center gap-1 sm:gap-2 font-semibold text-xs sm:text-sm md:text-base">
                <div className="h-4 w-4 sm:h-6 sm:w-6 flex items-center justify-center">{brand.icon}</div>
                {brand.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
