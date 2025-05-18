"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Rocket, Star, Trophy } from "lucide-react"

interface PricingProps {
  visibleSections: string[]
  pricingRef: React.RefObject<HTMLElement>
  scrollToSection: (ref: React.RefObject<HTMLElement>) => void
  contactRef: React.RefObject<HTMLElement>
}

export default function Pricing({ visibleSections, pricingRef, scrollToSection, contactRef }: PricingProps) {
  const [isYearly, setIsYearly] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (visibleSections.includes("pricing")) {
      setIsVisible(true)
    }
  }, [visibleSections])

  const getStarted = (plan: string) => {
    scrollToSection(contactRef)
  }

  const pricingPlans = [
    {
      name: "Basic",
      monthlyPrice: "$29",
      yearlyPrice: "$290",
      period: isYearly ? "per year" : "per month",
      description: "Perfect for individuals and small teams just getting started.",
      features: ["3 platform connections", "50 AI-generated messages/month", "Basic analytics", "Email support"],
      cta: "Start Free Trial",
      popular: false,
      icon: <Rocket size={20} className="sm:w-6 sm:h-6" />,
      discount: isYearly ? "Save $58" : null,
    },
    {
      name: "Pro",
      monthlyPrice: "$99",
      yearlyPrice: "$990",
      period: isYearly ? "per year" : "per month",
      description: "Ideal for growing businesses with established outreach needs.",
      features: [
        "10 platform connections",
        "500 AI-generated messages/month",
        "Advanced analytics",
        "Priority support",
        "Audience segmentation",
      ],
      cta: "Start Free Trial",
      popular: true,
      icon: <Star size={20} className="sm:w-6 sm:h-6" />,
      discount: isYearly ? "Save $198" : null,
    },
    {
      name: "Enterprise",
      monthlyPrice: "$249",
      yearlyPrice: "$2490",
      period: isYearly ? "per year" : "per month",
      description: "Comprehensive solution for large teams with complex requirements.",
      features: [
        "Unlimited platform connections",
        "Unlimited AI-generated messages",
        "Custom reporting & API access",
        "Dedicated account manager",
        "24/7 priority support",
        "Custom AI training",
      ],
      cta: "Contact Sales",
      popular: false,
      icon: <Trophy size={20} className="sm:w-6 sm:h-6" />,
      discount: isYearly ? "Save $498" : null,
    },
  ]

  return (
    <section ref={pricingRef} className="py-12 md:py-20 scroll-mt-20 section-spacing overflow-fix">
      <div className="container mx-auto px-4 sm:px-6">
        <div
          className={`text-center mb-8 md:mb-16 fade-in ${isVisible ? "visible" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          <span className="inline-block px-4 py-1 bg-white/10 rounded-full text-[#f6d2b0] text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="mb-4 section-title">Flexible Pricing Plans</h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Choose the perfect plan to meet your marketing needs and scale as you grow.
          </p>

          <div className="flex items-center justify-center mt-6 sm:mt-8 bg-white/5 backdrop-blur-sm p-2 rounded-full inline-flex">
            <span
              className={`px-4 py-2 rounded-full transition-colors cursor-pointer ${!isYearly ? "bg-[#f6d2b0] text-[#04050c] font-medium" : "text-white"}`}
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </span>

            <label className="toggle-switch mx-2">
              <input type="checkbox" checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
              <span className="toggle-slider"></span>
            </label>

            <span
              className={`px-4 py-2 rounded-full transition-colors cursor-pointer flex items-center gap-1 ${isYearly ? "bg-[#f6d2b0] text-[#04050c] font-medium" : "text-white"}`}
              onClick={() => setIsYearly(true)}
            >
              Yearly
              <span className="bg-[#644caa] text-white text-xs px-2 py-1 rounded-full ml-1">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pricingPlans.map((plan, i) => (
            <div
              key={i}
              className={`pricing-card glass-card p-4 sm:p-6 md:p-8 rounded-xl shadow-lg transition-all border-white/20 relative fade-in ${
                isVisible ? "visible" : ""
              } ${plan.popular ? "border-[#f6d2b0]" : ""}`}
              style={{ transitionDelay: `${0.2 * (i + 1) + 0.3}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <div className="bg-[#f6d2b0] text-[#04050c] font-medium px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-white/70 text-sm sm:text-base">{plan.description}</p>
                </div>
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-[#04050c] rounded-lg flex items-center justify-center text-[#f6d2b0]">
                  {plan.icon}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-end">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-white/70 ml-1 mb-1 text-sm sm:text-base">{plan.period}</span>
                </div>
                {plan.discount && (
                  <div className="mt-1 inline-block bg-[#644caa]/20 text-[#644caa] px-2 py-1 rounded text-xs sm:text-sm">
                    {plan.discount}
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 pt-4 mb-6">
                <ul className="space-y-2 sm:space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm sm:text-base">
                      <div className="mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#f6d2b0]"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => getStarted(plan.name)}
                className={`w-full rounded-full px-4 py-2 sm:py-3 text-sm sm:text-base transition-colors ${
                  plan.popular
                    ? "bg-[#f6d2b0] text-[#04050c] hover:bg-opacity-90 font-medium"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
