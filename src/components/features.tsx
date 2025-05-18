"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Globe, MessageSquare, BarChart3, Zap, Users, Layers } from "lucide-react"

interface FeaturesProps {
  visibleSections: string[]
  featuresRef: React.RefObject<HTMLElement>
}

export default function Features({ visibleSections, featuresRef }: FeaturesProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (visibleSections.includes("features")) {
      setIsVisible(true)
    }
  }, [visibleSections])

  const features = [
    {
      title: "Multi-Platform Integration",
      description: "Connect to social media, email, messaging apps, and more from a single dashboard.",
      icon: <Globe size={24} className="text-[#f6d2b0]" />,
    },
    {
      title: "AI-Powered Messaging",
      description: "Generate personalized outreach content optimized for each platform.",
      icon: <MessageSquare size={24} className="text-[#ba93d1]" />,
    },
    {
      title: "Advanced Analytics",
      description: "Track performance across all channels with detailed insights and reports.",
      icon: <BarChart3 size={24} className="text-[#644caa]" />,
    },
    {
      title: "Automated Campaigns",
      description: "Schedule and automate your cross-platform communication with smart timing.",
      icon: <Zap size={24} className="text-[#f6d2b0]" />,
    },
    {
      title: "Audience Segmentation",
      description: "Target specific audience segments with tailored messaging for better engagement.",
      icon: <Users size={24} className="text-[#ba93d1]" />,
    },
    {
      title: "Content Library",
      description: "Store and organize your marketing assets in one centralized location.",
      icon: <Layers size={24} className="text-[#644caa]" />,
    },
  ]

  return (
    <section ref={featuresRef} className="py-12 md:py-20 scroll-mt-20 section-spacing overflow-fix">
      <div className="container mx-auto px-4 sm:px-6">
        <div
          className={`text-center mb-8 md:mb-16 fade-in ${isVisible ? "visible" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          <span className="inline-block px-4 py-1 bg-white/10 rounded-full text-[#f6d2b0] text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="mb-4 section-title">Key Features</h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Connect with your audience seamlessly across all platforms with our AI technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`glass-card p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all border-white/20 hover:-translate-y-1 duration-300 fade-in ${isVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${0.2 * (i + 1) + 0.2}s` }}
            >
              <div className="h-12 w-12 sm:h-14 sm:w-14 bg-[#04050c] rounded-lg mb-4 sm:mb-6 flex items-center justify-center text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white">{feature.title}</h3>
              <p className="text-white/80 text-base sm:text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
