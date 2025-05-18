"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Products from "@/components/products"
import Pricing from "@/components/pricing"
import Calendar from "@/components/calendar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Cart from "@/components/cart"
import { CartProvider } from "@/context/cart-context"

export default function Page() {
  const [isNavSticky, setIsNavSticky] = useState(false)
  const [visibleSections, setVisibleSections] = useState<string[]>([])
  const [windowWidth, setWindowWidth] = useState(0)

  const featuresRef = useRef<HTMLElement>(null)
  const productsRef = useRef<HTMLElement>(null)
  const pricingRef = useRef<HTMLElement>(null)
  const calendarRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  // Effect to safely handle window-related operations
  useEffect(() => {
    // Update window width state
    setWindowWidth(window.innerWidth)

    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update the useEffect for visibility detection to be more sensitive
  useEffect(() => {
    // Skip if we're not in a browser environment
    if (typeof window === "undefined") return

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsNavSticky(true)
      } else {
        setIsNavSticky(false)
      }

      const sections = [
        { ref: featuresRef, id: "features" },
        { ref: productsRef, id: "products" },
        { ref: pricingRef, id: "pricing" },
        { ref: calendarRef, id: "calendar" },
        { ref: contactRef, id: "contact" },
      ]

      // More sensitive intersection detection
      const visible = sections
        .filter((section) => {
          if (!section.ref.current) return false
          const rect = section.ref.current.getBoundingClientRect()
          // Consider a section visible when just a small part is visible (20% threshold)
          return rect.top < window.innerHeight * 0.8 && rect.bottom > 0
        })
        .map((section) => section.id)

      setVisibleSections(visible)
    }

    window.addEventListener("scroll", handleScroll)

    // Run detection immediately and on component mount
    handleScroll()
    setTimeout(handleScroll, 100) // Extra check after a slight delay

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [windowWidth])

  // Also force visibility of all sections on initial load
  useEffect(() => {
    // Force visibility of all sections after a short delay for smoother loading
    const timer = setTimeout(() => {
      setVisibleSections(["features", "products", "pricing", "calendar", "contact"])
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#04050c]">
        <Navbar
          isNavSticky={isNavSticky}
          headerRef={headerRef}
          scrollToSection={scrollToSection}
          featuresRef={featuresRef}
          productsRef={productsRef}
          pricingRef={pricingRef}
          calendarRef={calendarRef}
          contactRef={contactRef}
        />

        <Hero windowWidth={windowWidth} scrollToSection={scrollToSection} contactRef={contactRef} />

        <div className="main-content">
          <Features visibleSections={visibleSections} featuresRef={featuresRef} />

          <Products visibleSections={visibleSections} productsRef={productsRef} />

          <Pricing
            visibleSections={visibleSections}
            pricingRef={pricingRef}
            scrollToSection={scrollToSection}
            contactRef={contactRef}
          />

          <Calendar visibleSections={visibleSections} calendarRef={calendarRef} />

          <Contact visibleSections={visibleSections} contactRef={contactRef} />
        </div>

        <Footer
          scrollToSection={scrollToSection}
          featuresRef={featuresRef}
          productsRef={productsRef}
          pricingRef={pricingRef}
          calendarRef={calendarRef}
          contactRef={contactRef}
        />

        {/* Add the Cart component */}
        <Cart />
      </div>
    </CartProvider>
  )
}
