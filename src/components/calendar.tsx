"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  CalendarIcon,
  Clock,
  Check,
  X,
  Mail,
  CalendarIcon as CalendarLucide,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface CalendarProps {
  visibleSections: string[]
  calendarRef: React.RefObject<HTMLElement>
}

export default function Calendar({ visibleSections, calendarRef }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    service: "consultation",
  })
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (visibleSections.includes("calendar")) {
      setIsVisible(true)
    }
  }, [visibleSections])

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay()

    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek

    // Calculate total days to show (previous month days + current month days)
    const totalDays = daysFromPrevMonth + lastDay.getDate()

    // Calculate rows needed (7 days per row)
    const rows = Math.ceil(totalDays / 7)

    // Generate calendar days
    const days = []
    let dayCount = 1 - daysFromPrevMonth

    for (let i = 0; i < rows * 7; i++) {
      const date = new Date(year, month, dayCount)
      const isCurrentMonth = date.getMonth() === month
      const isToday =
        isCurrentMonth &&
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))
      const isSelected =
        selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()

      days.push({
        date,
        dayOfMonth: date.getDate(),
        isCurrentMonth,
        isToday,
        isPast,
        isSelected,
      })

      dayCount++
    }

    return days
  }

  const days = generateCalendarDays()

  // Available time slots
  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

  // Handle month navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    setSelectedDate(null)
    setSelectedTime(null)
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    setSelectedDate(null)
    setSelectedTime(null)
  }

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (date < new Date(new Date().setHours(0, 0, 0, 0))) return
    setSelectedDate(date)
    setSelectedTime(null)
  }

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setBookingDetails((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!bookingDetails.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!bookingDetails.email.trim()) {
      newErrors.email = "Email is required"
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(bookingDetails.email)) {
        newErrors.email = "Please enter a valid email address"
      }
    }

    if (!selectedDate) {
      newErrors.date = "Please select a date"
    }

    if (!selectedTime) {
      newErrors.time = "Please select a time slot"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle booking submission
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    console.log("Booking confirmed:", {
      ...bookingDetails,
      date: selectedDate,
      time: selectedTime,
    })

    setBookingConfirmed(true)
  }

  // Reset booking form
  const resetBooking = () => {
    setSelectedDate(null)
    setSelectedTime(null)
    setBookingDetails({
      name: "",
      email: "",
      service: "consultation",
    })
    setBookingConfirmed(false)
    setErrors({})
  }

  return (
    <section ref={calendarRef} className="py-12 md:py-20 scroll-mt-20 section-spacing overflow-fix">
      <div className="container mx-auto px-4 sm:px-6">
        <div
          className={`text-center mb-8 md:mb-16 fade-in ${isVisible ? "visible" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          <span className="inline-block px-4 py-1 bg-white/10 rounded-full text-[#f6d2b0] text-sm font-medium mb-4">
            Schedule
          </span>
          <h2 className="mb-4 section-title">Book an Appointment</h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Schedule a consultation with our marketing specialists to discuss your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Calendar Section */}
          <div
            className={`glass-card p-4 sm:p-6 rounded-xl shadow-md border-white/20 fade-in ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: "0.3s" }}
          >
            {bookingConfirmed ? (
              <div className="flex flex-col items-center justify-center h-full py-6 sm:py-8">
                <div className="h-12 w-12 sm:h-16 sm:w-16 bg-[#f6d2b0]/30 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <Check size={24} className="sm:w-8 sm:h-8 text-[#f6d2b0]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
                <p className="text-white/80 text-center mb-4 sm:mb-6 text-sm sm:text-base">
                  Your appointment has been scheduled for{" "}
                  {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at{" "}
                  {selectedTime}.
                </p>
                <p className="text-white/80 text-center mb-6 sm:mb-8 text-sm sm:text-base">
                  We've sent a confirmation email to {bookingDetails.email} with all the details.
                </p>
                <button
                  onClick={resetBooking}
                  className="bg-[#f6d2b0] text-[#04050c] px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-opacity-90 transition-colors text-sm sm:text-base font-medium"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <CalendarLucide size={20} className="text-[#f6d2b0]" />
                    Select a Date
                  </h3>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button
                      onClick={prevMonth}
                      className="p-1 sm:p-2 rounded-full hover:bg-white/10 transition-colors"
                      aria-label="Previous month"
                    >
                      <ChevronLeft size={20} className="text-white" />
                    </button>
                    <span className="text-white font-medium text-sm sm:text-base">
                      {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </span>
                    <button
                      onClick={nextMonth}
                      className="p-1 sm:p-2 rounded-full hover:bg-white/10 transition-colors"
                      aria-label="Next month"
                    >
                      <ChevronRight size={20} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="mb-4 sm:mb-6">
                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 mb-1 sm:mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                      <div key={i} className="text-center text-white/60 text-xs sm:text-sm py-1 sm:py-2 font-medium">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {days.map((day, i) => (
                      <div
                        key={i}
                        onClick={() => !day.isPast && day.isCurrentMonth && handleDateSelect(day.date)}
                        className={`
                          calendar-day
                          ${!day.isCurrentMonth ? "text-white/30" : ""}
                          ${day.isPast ? "disabled" : ""}
                          ${day.isToday ? "today" : ""}
                          ${day.isSelected ? "selected" : ""}
                        `}
                      >
                        {day.dayOfMonth}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                      <Clock size={20} className="text-[#f6d2b0]" />
                      Select a Time
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlots.map((time, i) => (
                        <div
                          key={i}
                          onClick={() => handleTimeSelect(time)}
                          className={`
                            p-2 rounded-lg border text-center cursor-pointer transition-colors text-xs sm:text-sm
                            ${
                              selectedTime === time
                                ? "bg-[#f6d2b0] border-[#f6d2b0] text-[#04050c] font-medium"
                                : "border-white/20 text-white hover:bg-white/10"
                            }
                          `}
                        >
                          {time}
                        </div>
                      ))}
                    </div>

                    {errors.time && (
                      <p className="mt-2 text-red-400 text-xs sm:text-sm flex items-center gap-1">
                        <X size={12} className="sm:w-4 sm:h-4" />
                        <span>{errors.time}</span>
                      </p>
                    )}
                  </div>
                )}

                {errors.date && !selectedDate && (
                  <p className="mt-2 text-red-400 text-xs sm:text-sm flex items-center gap-1">
                    <X size={12} className="sm:w-4 sm:h-4" />
                    <span>{errors.date}</span>
                  </p>
                )}
              </>
            )}
          </div>

          {/* Booking Form */}
          <div
            className={`glass-card p-4 sm:p-6 rounded-xl shadow-md border-white/20 fade-in ${isVisible ? "visible" : ""}`}
            style={{ transitionDelay: "0.4s" }}
          >
            {bookingConfirmed ? (
              <div className="h-full flex flex-col justify-center">
                <div className="bg-[#04050c]/50 p-4 sm:p-6 rounded-lg border border-white/10">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Appointment Details</h3>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <CalendarIcon size={16} className="sm:w-5 sm:h-5 text-[#f6d2b0] mt-1" />
                      <div>
                        <p className="text-white/60 text-xs sm:text-sm">Date</p>
                        <p className="text-white text-sm sm:text-base">
                          {selectedDate?.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3">
                      <Clock size={16} className="sm:w-5 sm:h-5 text-[#f6d2b0] mt-1" />
                      <div>
                        <p className="text-white/60 text-xs sm:text-sm">Time</p>
                        <p className="text-white text-sm sm:text-base">{selectedTime}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3">
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
                        className="sm:w-5 sm:h-5 text-[#f6d2b0] mt-1"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <div>
                        <p className="text-white/60 text-xs sm:text-sm">Name</p>
                        <p className="text-white text-sm sm:text-base">{bookingDetails.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3">
                      <Mail className="sm:w-5 sm:h-5 text-[#f6d2b0] mt-1" />
                      <div>
                        <p className="text-white/60 text-xs sm:text-sm">Email</p>
                        <p className="text-white text-sm sm:text-base">{bookingDetails.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 sm:gap-3">
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
                        className="sm:w-5 sm:h-5 text-[#f6d2b0] mt-1"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <div>
                        <p className="text-white/60 text-xs sm:text-sm">Service</p>
                        <p className="text-white text-sm sm:text-base capitalize">{bookingDetails.service}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#f6d2b0]"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Your Information
                </h3>

                <form onSubmit={handleBooking} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-1 sm:mb-2 text-sm sm:text-base">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={bookingDetails.name}
                      onChange={handleInputChange}
                      className={`w-full bg-white/10 border ${errors.name ? "border-red-500" : "border-white/20"} rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#f6d2b0] text-sm sm:text-base`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-red-400 text-xs sm:text-sm flex items-center gap-1">
                        <X size={12} className="sm:w-4 sm:h-4" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white mb-1 sm:mb-2 text-sm sm:text-base">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={bookingDetails.email}
                      onChange={handleInputChange}
                      className={`w-full bg-white/10 border ${errors.email ? "border-red-500" : "border-white/20"} rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#f6d2b0] text-sm sm:text-base`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-red-400 text-xs sm:text-sm flex items-center gap-1">
                        <X size={12} className="sm:w-4 sm:h-4" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-white mb-1 sm:mb-2 text-sm sm:text-base">
                      Service
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={bookingDetails.service}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#f6d2b0] text-sm sm:text-base"
                    >
                      <option value="consultation" className="bg-[#04050c]">
                        Marketing Consultation
                      </option>
                      <option value="strategy" className="bg-[#04050c]">
                        Marketing Strategy
                      </option>
                      <option value="content" className="bg-[#04050c]">
                        Content Creation
                      </option>
                      <option value="analytics" className="bg-[#04050c]">
                        Analytics Review
                      </option>
                    </select>
                  </div>

                  <div className="pt-2 sm:pt-4">
                    <h4 className="text-white font-medium mb-1 sm:mb-2 text-sm sm:text-base flex items-center gap-2">
                      <CalendarIcon size={16} className="text-[#f6d2b0]" />
                      Selected Date & Time
                    </h4>
                    {selectedDate && selectedTime ? (
                      <div className="bg-[#04050c]/50 p-3 sm:p-4 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <CalendarIcon size={16} className="sm:w-5 sm:h-5 text-[#f6d2b0]" />
                          <span className="text-white text-sm sm:text-base">
                            {selectedDate.toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="sm:w-5 sm:h-5 text-[#f6d2b0]" />
                          <span className="text-white text-sm sm:text-base">{selectedTime}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-white/60 italic text-xs sm:text-sm">
                        Please select a date and time from the calendar
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="bg-[#f6d2b0] text-[#04050c] px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-opacity-90 transition-colors w-full flex items-center justify-center gap-2 mt-4 sm:mt-8 text-sm sm:text-base font-medium"
                    disabled={!selectedDate || !selectedTime}
                  >
                    Confirm Booking
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
