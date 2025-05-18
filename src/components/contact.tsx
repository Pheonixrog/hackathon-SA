"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Check, X, Mail, Phone, MapPin, AlertCircle } from "lucide-react"

interface ContactProps {
  visibleSections: string[]
  contactRef: React.RefObject<HTMLElement>
}

export default function Contact({ visibleSections, contactRef }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    plan: "",
  })

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formError, setFormError] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (visibleSections.includes("contact")) {
      setIsVisible(true)
    }
  }, [visibleSections])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters"
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        errors.email = "Please enter a valid email address"
      }
    }

    // Phone validation (optional)
    if (formData.phone.trim()) {
      const phoneRegex = /^\+?[0-9]{10,15}$/
      if (!phoneRegex.test(formData.phone.replace(/\s+/g, ""))) {
        errors.phone = "Please enter a valid phone number"
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required"
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setFormError("Please correct the errors in the form")
      return
    }

    console.log("Form submitted:", formData)
    setFormSubmitted(true)
    setFormError("")

    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        plan: "",
      })
    }, 3000)
  }

  return (
    <section ref={contactRef} className="py-12 md:py-20 scroll-mt-20 section-spacing overflow-fix">
      <div className="container mx-auto px-4 sm:px-6">
        <div
          className={`text-center mb-8 md:mb-16 fade-in ${isVisible ? "visible" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          <h2 className="mb-4 text-white">Contact Us</h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Have questions or ready to get started? Reach out to our team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          <div
            className={`glass-card p-4 sm:p-5 md:p-8 rounded-xl shadow-md border-white/20 fade-in ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: "0.3s" }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-white">Get in Touch</h3>

            {formSubmitted ? (
              <div className="bg-[#644caa]/20 border border-[#644caa] rounded-lg p-4 sm:p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-[#644caa]/30 flex items-center justify-center">
                    <Check size={20} className="sm:w-6 sm:h-6 text-[#644caa]" />
                  </div>
                  <p className="font-medium text-lg sm:text-xl">Thank you for your message!</p>
                </div>
                <p className="text-white/80 mt-2 text-base sm:text-lg">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {formError && (
                  <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 sm:p-6 text-white">
                    <p className="flex items-center gap-2">
                      <X size={16} className="sm:w-5 sm:h-5 text-red-400" />
                      {formError}
                    </p>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-white mb-2 text-base sm:text-lg">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full bg-white/10 border ${formErrors.name ? "border-red-500" : "border-white/20"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#644caa] text-base sm:text-lg`}
                    placeholder="Your name"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-red-400 flex items-center gap-1 text-sm">
                      <AlertCircle size={12} className="sm:w-4 sm:h-4" />
                      <span>{formErrors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-white mb-2 text-base sm:text-lg">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-white/10 border ${formErrors.email ? "border-red-500" : "border-white/20"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#644caa] text-base sm:text-lg`}
                    placeholder="your.email@example.com"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-red-400 flex items-center gap-1 text-sm">
                      <AlertCircle size={12} className="sm:w-4 sm:h-4" />
                      <span>{formErrors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white mb-2 text-base sm:text-lg">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full bg-white/10 border ${formErrors.phone ? "border-red-500" : "border-white/20"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#644caa] text-base sm:text-lg`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-red-400 flex items-center gap-1 text-sm">
                      <AlertCircle size={12} className="sm:w-4 sm:h-4" />
                      <span>{formErrors.phone}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white mb-2 text-base sm:text-lg">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full bg-white/10 border ${formErrors.subject ? "border-red-500" : "border-white/20"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#644caa] text-base sm:text-lg`}
                  >
                    <option value="" className="bg-[#04050c]">
                      Select a subject
                    </option>
                    <option value="General Inquiry" className="bg-[#04050c]">
                      General Inquiry
                    </option>
                    <option value="Sales Question" className="bg-[#04050c]">
                      Sales Question
                    </option>
                    <option value="Technical Support" className="bg-[#04050c]">
                      Technical Support
                    </option>
                    <option value="Partnership" className="bg-[#04050c]">
                      Partnership
                    </option>
                  </select>
                  {formErrors.subject && (
                    <p className="mt-1 text-red-400 flex items-center gap-1 text-sm">
                      <AlertCircle size={12} className="sm:w-4 sm:h-4" />
                      <span>{formErrors.subject}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-white mb-2 text-base sm:text-lg">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full bg-white/10 border ${formErrors.message ? "border-red-500" : "border-white/20"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#644caa] text-base sm:text-lg`}
                    placeholder="How can we help you?"
                  ></textarea>
                  {formErrors.message && (
                    <p className="mt-1 text-red-400 flex items-center gap-1 text-sm">
                      <AlertCircle size={12} className="sm:w-4 sm:h-4" />
                      <span>{formErrors.message}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-[#644caa] text-white px-6 py-3 rounded-full hover:bg-[#ba93d1] transition-colors w-full flex items-center justify-center gap-2 text-base sm:text-lg"
                >
                  Send Message <span className="ml-2">→</span>
                </button>
              </form>
            )}
          </div>

          <div
            className={`space-y-4 sm:space-y-6 md:space-y-8 fade-in ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="glass-card p-6 sm:p-8 rounded-xl shadow-md border-white/20">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Contact Information</h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-[#644caa]/20 p-2 sm:p-3 rounded-full flex items-center justify-center">
                    <Mail className="text-[#644caa] w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-base sm:text-lg">Email</p>
                    <p className="text-white/70 text-sm sm:text-lg">contact@reachout.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-[#644caa]/20 p-2 sm:p-3 rounded-full flex items-center justify-center">
                    <Phone className="text-[#644caa] w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-base sm:text-lg">Phone</p>
                    <p className="text-white/70 text-sm sm:text-lg">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-[#644caa]/20 p-2 sm:p-3 rounded-full flex items-center justify-center">
                    <MapPin className="text-[#644caa] w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-base sm:text-lg">Office</p>
                    <p className="text-white/70 text-sm sm:text-lg">
                      123 Marketing St, Suite 456
                      <br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 sm:p-8 rounded-xl shadow-md border-white/20">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Business Hours</h3>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between">
                  <span className="text-white text-base sm:text-lg">Monday - Friday</span>
                  <span className="text-white/70 text-sm sm:text-lg">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white text-base sm:text-lg">Saturday</span>
                  <span className="text-white/70 text-sm sm:text-lg">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white text-base sm:text-lg">Sunday</span>
                  <span className="text-white/70 text-sm sm:text-lg">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
