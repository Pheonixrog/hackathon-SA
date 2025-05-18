"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Menu, X, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"

interface NavbarProps {
  isNavSticky: boolean
  headerRef: React.RefObject<HTMLElement>
  scrollToSection: (ref: React.RefObject<HTMLElement>) => void
  featuresRef: React.RefObject<HTMLElement>
  productsRef: React.RefObject<HTMLElement>
  pricingRef: React.RefObject<HTMLElement>
  calendarRef: React.RefObject<HTMLElement>
  contactRef: React.RefObject<HTMLElement>
}

export default function Navbar({
  isNavSticky,
  headerRef,
  scrollToSection,
  featuresRef,
  productsRef,
  pricingRef,
  calendarRef,
  contactRef,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { openCart, totalItems } = useCart()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = (ref: React.RefObject<HTMLElement>) => {
    setIsMenuOpen(false)
    scrollToSection(ref)
  }

  const startProject = () => {
    setIsMenuOpen(false)
    scrollToSection(contactRef)
  }

  return (
    <>
      {isNavSticky && isMounted && (
        <header ref={headerRef} className="sticky-nav py-3 sm:py-4 fade-in visible">
          <div className="container mx-auto px-4 sm:px-6">
            <nav className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-7 w-7 sm:h-8 sm:w-8 bg-[#644caa] rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-base">R</span>
                </div>
                <span className="font-bold text-lg sm:text-xl text-white">ReachOut</span>
              </div>

              <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
                <button
                  onClick={() => handleNavClick(featuresRef)}
                  className="text-white hover:text-white/80 transition-colors text-sm lg:text-base"
                >
                  Features
                </button>
                <button
                  onClick={() => handleNavClick(productsRef)}
                  className="text-white hover:text-white/80 transition-colors text-sm lg:text-base"
                >
                  Products
                </button>
                <button
                  onClick={() => handleNavClick(pricingRef)}
                  className="text-white hover:text-white/80 transition-colors text-sm lg:text-base"
                >
                  Pricing
                </button>
                <button
                  onClick={() => handleNavClick(calendarRef)}
                  className="text-white hover:text-white/80 transition-colors text-sm lg:text-base"
                >
                  Book Now
                </button>
                <button
                  onClick={() => handleNavClick(contactRef)}
                  className="text-white hover:text-white/80 transition-colors text-sm lg:text-base"
                >
                  Contact
                </button>
                <button
                  onClick={startProject}
                  className="bg-[#644caa] text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors text-sm lg:text-base"
                >
                  Join Now
                </button>
                <button onClick={openCart} className="text-white hover:text-white/80 transition-colors relative p-2">
                  <ShoppingCart size={20} />
                  {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                </button>
              </div>

              <div className="md:hidden flex items-center gap-4">
                <button onClick={openCart} className="text-white hover:text-white/80 transition-colors relative p-2">
                  <ShoppingCart size={20} />
                  {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                </button>
                <button className="text-white p-1" onClick={toggleMenu}>
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </nav>

            {isMenuOpen && (
              <div
                className="md:hidden fixed top-0 right-0 bottom-0 w-[250px] glass-card-dark shadow-lg z-50 overflow-y-auto fade-in visible"
                style={{ transitionDelay: "0s" }}
              >
                <div className="flex justify-end p-4">
                  <button onClick={toggleMenu} className="text-white p-1">
                    <X size={24} />
                  </button>
                </div>
                <div className="flex flex-col space-y-4 p-6">
                  <button
                    onClick={() => handleNavClick(featuresRef)}
                    className="text-white hover:text-white/80 transition-colors text-base py-2"
                  >
                    Features
                  </button>
                  <button
                    onClick={() => handleNavClick(productsRef)}
                    className="text-white hover:text-white/80 transition-colors text-base py-2"
                  >
                    Products
                  </button>
                  <button
                    onClick={() => handleNavClick(pricingRef)}
                    className="text-white hover:text-white/80 transition-colors text-base py-2"
                  >
                    Pricing
                  </button>
                  <button
                    onClick={() => handleNavClick(calendarRef)}
                    className="text-white hover:text-white/80 transition-colors text-base py-2"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => handleNavClick(contactRef)}
                    className="text-white hover:text-white/80 transition-colors text-base py-2"
                  >
                    Contact
                  </button>
                  <button
                    onClick={startProject}
                    className="bg-[#644caa] text-white px-5 py-2 rounded-full hover:bg-opacity-90 transition-colors text-center text-base w-full mt-2"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            )}
            {isMenuOpen && (
              <div
                className="md:hidden fixed inset-0 bg-black/50 z-40 fade-in visible"
                style={{ transitionDelay: "0s" }}
                onClick={toggleMenu}
              />
            )}
          </div>
        </header>
      )}

      <header className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-7 w-7 sm:h-8 sm:w-8 bg-[#04050c] rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-base" style={{ fontFamily: "var(--font)" }}>
                R
              </span>
            </div>
            <span className="font-bold text-lg sm:text-xl text-white" style={{ fontFamily: "var(--font)" }}>
              ReachOut
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <button
              onClick={() => handleNavClick(featuresRef)}
              className="text-white hover:text-white/80 transition-colors text-sm lg:text-base"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick(productsRef)}
              className="text-white hover:text-white/80 transition-colors text-sm lg:text-base"
            >
              Products
            </button>
            <button
              onClick={() => handleNavClick(pricingRef)}
              className="text-white hover:text-white/80 transition-colors text-sm lg:text-base"
            >
              Pricing
            </button>
            <button
              onClick={() => handleNavClick(calendarRef)}
              className="text-white hover:text-white/80 transition-colors text-sm lg:text-base"
            >
              Book Now
            </button>
            <button
              onClick={() => handleNavClick(contactRef)}
              className="text-white hover:text-white/80 transition-colors text-sm lg:text-base"
            >
              Contact
            </button>
            <button
              onClick={startProject}
              className="text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors text-sm lg:text-base"
              style={{ background: "#04050c" }}
            >
              Join Now
            </button>
            <button onClick={openCart} className="text-white hover:text-white/80 transition-colors relative p-2">
              <ShoppingCart size={20} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={openCart} className="text-white hover:text-white/80 transition-colors relative p-2">
              <ShoppingCart size={20} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </button>
            <button className="md:hidden text-white p-1" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && isMounted && (
          <div
            className="md:hidden fixed top-0 right-0 bottom-0 w-[250px] glass-card-dark shadow-lg z-50 overflow-y-auto fade-in visible"
            style={{ transitionDelay: "0s" }}
          >
            <div className="flex justify-end p-4">
              <button onClick={toggleMenu} className="text-white p-1">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col space-y-4 p-6">
              <button
                onClick={() => handleNavClick(featuresRef)}
                className="text-white hover:text-white/80 transition-colors text-base py-2"
              >
                Features
              </button>
              <button
                onClick={() => handleNavClick(productsRef)}
                className="text-white hover:text-white/80 transition-colors text-base py-2"
              >
                Products
              </button>
              <button
                onClick={() => handleNavClick(pricingRef)}
                className="text-white hover:text-white/80 transition-colors text-base py-2"
              >
                Pricing
              </button>
              <button
                onClick={() => handleNavClick(calendarRef)}
                className="text-white hover:text-white/80 transition-colors text-base py-2"
              >
                Book Now
              </button>
              <button
                onClick={() => handleNavClick(contactRef)}
                className="text-white hover:text-white/80 transition-colors text-base py-2"
              >
                Contact
              </button>
              <button
                onClick={startProject}
                className="bg-[#644caa] text-white px-5 py-2 rounded-full hover:bg-opacity-90 transition-colors text-center text-base w-full mt-2"
                style={{ background: "#04050c" }}
              >
                Join Now
              </button>
            </div>
          </div>
        )}
        {isMenuOpen && isMounted && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40 fade-in visible"
            style={{ transitionDelay: "0s" }}
            onClick={toggleMenu}
          />
        )}
      </header>
    </>
  )
}
