"use client"

import type React from "react"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

interface FooterProps {
  scrollToSection: (ref: React.RefObject<HTMLElement>) => void
  featuresRef: React.RefObject<HTMLElement>
  productsRef: React.RefObject<HTMLElement>
  pricingRef: React.RefObject<HTMLElement>
  calendarRef: React.RefObject<HTMLElement>
  contactRef: React.RefObject<HTMLElement>
}

export default function Footer({
  scrollToSection,
  featuresRef,
  productsRef,
  pricingRef,
  calendarRef,
  contactRef,
}: FooterProps) {
  return (
    <footer className="bg-[#04050c] py-8 sm:py-12 md:py-16 overflow-fix">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-[#644caa] rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl" style={{ fontFamily: "var(--font)" }}>
                  R
                </span>
              </div>
              <span className="font-bold text-xl sm:text-2xl text-white" style={{ fontFamily: "var(--font)" }}>
                ReachOut
              </span>
            </div>
            <p className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-lg">
              Connecting businesses with their audience through AI-powered outreach across all platforms.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors h-8 w-8 sm:h-10 sm:w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#1877f2]/20 group"
              >
                <Facebook size={16} className="sm:w-5 sm:h-5 group-hover:facebook-color" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors h-8 w-8 sm:h-10 sm:w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#1da1f2]/20 group"
              >
                <Twitter size={16} className="sm:w-5 sm:h-5 group-hover:twitter-color" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors h-8 w-8 sm:h-10 sm:w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#e1306c]/20 group"
              >
                <Instagram size={16} className="sm:w-5 sm:h-5 group-hover:instagram-color" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors h-8 w-8 sm:h-10 sm:w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#0a66c2]/20 group"
              >
                <Linkedin size={16} className="sm:w-5 sm:h-5 group-hover:linkedin-color" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-4 sm:mb-6">Company</h3>
            <ul className="space-y-2 sm:space-y-4">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm sm:text-lg">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm sm:text-lg">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm sm:text-lg">
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-4 sm:mb-6">Resources</h3>
            <ul className="space-y-2 sm:space-y-4">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm sm:text-lg">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm sm:text-lg">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm sm:text-lg">
                  Case Studies
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-4 sm:mb-6">Legal</h3>
            <ul className="space-y-2 sm:space-y-4">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm sm:text-lg">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm sm:text-lg">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm sm:text-lg">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1a1b2e] pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/70 mb-4 md:mb-0 text-xs sm:text-base md:text-lg">
            © {new Date().getFullYear()} ReachOut. All rights reserved.
          </div>

          <div className="flex flex-wrap gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-2 sm:gap-y-4 justify-center">
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="text-white/70 hover:text-white transition-colors text-xs sm:text-base md:text-lg"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection(productsRef)}
              className="text-white/70 hover:text-white transition-colors text-xs sm:text-base md:text-lg"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection(pricingRef)}
              className="text-white/70 hover:text-white transition-colors text-xs sm:text-base md:text-lg"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection(calendarRef)}
              className="text-white/70 hover:text-white transition-colors text-xs sm:text-base md:text-lg"
            >
              Book Now
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="text-white/70 hover:text-white transition-colors text-xs sm:text-base md:text-lg"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
