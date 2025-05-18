"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle } from "lucide-react"

interface Address {
  fullName: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
}

interface ShippingFormProps {
  onSubmit: (address: Address) => void
  initialValues: Address | null
}

const defaultAddress: Address = {
  fullName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States",
  phone: "",
}

export default function ShippingAddressForm({ onSubmit, initialValues }: ShippingFormProps) {
  const [address, setAddress] = useState<Address>(initialValues || defaultAddress)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setAddress((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!address.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!address.addressLine1.trim()) newErrors.addressLine1 = "Address is required"
    if (!address.city.trim()) newErrors.city = "City is required"
    if (!address.state.trim()) newErrors.state = "State is required"
    if (!address.postalCode.trim()) newErrors.postalCode = "Postal code is required"
    if (!address.country.trim()) newErrors.country = "Country is required"

    // Basic phone validation
    if (!address.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(address.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(address)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-white mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={address.fullName}
          onChange={handleChange}
          className={`w-full bg-white/10 border ${errors.fullName ? "border-red-500" : "border-white/20"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#644caa]`}
          placeholder="John Doe"
        />
        {errors.fullName && (
          <p className="mt-1 text-red-400 flex items-center gap-1 text-sm">
            <AlertCircle size={12} />
            <span>{errors.fullName}</span>
          </p>
        )}
      </div>

      <div>
        <label htmlFor="addressLine1" className="block text-white mb-1">
          Address Line 1
        </label>
        <input
          type="text"
          id="addressLine1"
          name="addressLine1"
          value={address.addressLine1}
          onChange={handleChange}
          className={`w-full bg-white/10 border ${errors.addressLine1 ? "border-red-500" : "border-white/20"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#644caa]`}
          placeholder="123 Main St"
        />
        {errors.addressLine1 && (
          <p className="mt-1 text-red-400 flex items-center gap-1 text-sm">
            <AlertCircle size={12} />
            <span>{errors.addressLine1}</span>
          </p>
        )}
      </div>

      <div>
        <label htmlFor="addressLine2" className="block text-white mb-1">
          Address Line 2 (Optional)
        </label>
        <input
          type="text"
          id="addressLine2"
          name="addressLine2"
          value={address.addressLine2}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#644caa]"
          placeholder="Apartment, suite, etc."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-white mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            className={`w-full bg-white/10 border ${errors.city ? "border-red-500" : "border-white/20"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#644caa]`}
            placeholder="San Francisco"
          />
          {errors.city && (
            <p className="mt-1 text-red-400 flex items-center gap-1 text-sm">
              <AlertCircle size={12} />
              <span>{errors.city}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="state" className="block text-white mb-1">
            State / Province
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={address.state}
            onChange={handleChange}
            className={`w-full bg-white/10 border ${errors.state ? "border-red-500" : "border-white/20"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#644caa]`}
            placeholder="California"
          />
          {errors.state && (
            <p className="mt-1 text-red-400 flex items-center gap-1 text-sm">
              <AlertCircle size={12} />
              <span>{errors.state}</span>
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="postalCode" className="block text-white mb-1">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={address.postalCode}
            onChange={handleChange}
            className={`w-full bg-white/10 border ${errors.postalCode ? "border-red-500" : "border-white/20"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#644caa]`}
            placeholder="94103"
          />
          {errors.postalCode && (
            <p className="mt-1 text-red-400 flex items-center gap-1 text-sm">
              <AlertCircle size={12} />
              <span>{errors.postalCode}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="country" className="block text-white mb-1">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={address.country}
            onChange={handleChange}
            className={`w-full bg-white/10 border ${errors.country ? "border-red-500" : "border-white/20"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#644caa]`}
          >
            <option value="United States" className="bg-[#04050c]">
              United States
            </option>
            <option value="Canada" className="bg-[#04050c]">
              Canada
            </option>
            <option value="United Kingdom" className="bg-[#04050c]">
              United Kingdom
            </option>
            <option value="Australia" className="bg-[#04050c]">
              Australia
            </option>
            <option value="Germany" className="bg-[#04050c]">
              Germany
            </option>
            <option value="France" className="bg-[#04050c]">
              France
            </option>
            <option value="Japan" className="bg-[#04050c]">
              Japan
            </option>
            <option value="Other" className="bg-[#04050c]">
              Other
            </option>
          </select>
          {errors.country && (
            <p className="mt-1 text-red-400 flex items-center gap-1 text-sm">
              <AlertCircle size={12} />
              <span>{errors.country}</span>
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-white mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={address.phone}
          onChange={handleChange}
          className={`w-full bg-white/10 border ${errors.phone ? "border-red-500" : "border-white/20"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#644caa]`}
          placeholder="+1 (555) 123-4567"
        />
        {errors.phone && (
          <p className="mt-1 text-red-400 flex items-center gap-1 text-sm">
            <AlertCircle size={12} />
            <span>{errors.phone}</span>
          </p>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-[#644caa] text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  )
}
