"use client"

import { useState, useEffect } from "react"
import { X, Send, Calendar, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { LoginPopup } from "./login-popup"

interface ServicePopupProps {
  service: {
    label: string
    category: string
    description?: string
    images?: string[]
  } | null
  isOpen: boolean
  onClose: () => void
}

interface EnquiryForm {
  name: string
  email: string
  phone: string
  location: string
  preferredDate: string
  serviceSpecific: {
    [key: string]: string
  }
}

// AI-generated diagnostic questions using our server-side API
const generateDiagnosticQuestions = async (serviceLabel: string, category: string): Promise<string[]> => {
  try {
    console.log('🤖 Generating AI questions for:', serviceLabel, 'in category:', category)
    
    const response = await fetch('/api/generate-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serviceLabel,
        category
      })
    })

    console.log('📡 API Response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('❌ API Error:', errorData)
      throw new Error(`API request failed: ${response.status}`)
    }

    const data = await response.json()
    console.log('📊 API Response data:', data)
    
    const questions = data.questions || []
    console.log('✅ Generated questions:', questions)
    
    return questions.length > 0 ? questions : getFallbackQuestions(category)
  } catch (error) {
    console.error('❌ Error generating questions with AI:', error)
    console.log('🔄 Falling back to static questions')
    return getFallbackQuestions(category)
  }
}

// Fallback questions if AI fails
const getFallbackQuestions = (category: string) => {
  const baseQuestions = {
    "Interior Design & Renovation": [
      "What is the size of the space you want to renovate?",
      "What is your preferred design style?",
      "What is your budget range for this project?",
      "Do you have any specific requirements or must-have features?",
      "When would you like to start the project?"
    ],
    "Painting & Wall Treatment": [
      "What type of surface needs painting?",
      "What is the approximate area to be painted?",
      "Do you have a preferred color scheme?",
      "Are there any special requirements?",
      "What is your preferred timeline for completion?"
    ],
    "Plumbing & Water Solutions": [
      "What is the specific plumbing issue you're facing?",
      "Is this an emergency repair or planned maintenance?",
      "What is the age of your current plumbing system?",
      "Have you experienced this issue before?",
      "When would you like the service to be scheduled?"
    ],
    "Electrical & Lighting": [
      "What type of electrical work do you need?",
      "Is this for a new construction or existing property?",
      "What is the scope of electrical work required?",
      "Do you have any specific electrical requirements?",
      "What is your preferred timeline for the work?"
    ],
    "Furniture & Setup": [
      "What type of furniture do you need help with?",
      "What is the quantity and approximate size of items?",
      "Do you have the furniture already or need assistance with selection?",
      "What is your preferred timeline for completion?",
      "Are there any specific requirements or challenges with the space?"
    ]
  }

  return baseQuestions[category as keyof typeof baseQuestions] || [
    "What specific requirements do you have for this service?",
    "What is your preferred timeline for completion?",
    "What is your budget range for this project?",
    "Do you have any specific preferences or constraints?",
    "When would you like to start the project?"
  ]
}

export function ServicePopup({ service, isOpen, onClose }: ServicePopupProps) {
  const [formData, setFormData] = useState<EnquiryForm>({
    name: "",
    email: "",
    phone: "",
    location: "",
    preferredDate: "",
    serviceSpecific: {}
  })
  const [diagnosticQuestions, setDiagnosticQuestions] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false)
  const [isAiGenerated, setIsAiGenerated] = useState(false)

  useEffect(() => {
    if (service) {
      const loadQuestions = async () => {
        setIsLoadingQuestions(true)
        try {
          const questions = await generateDiagnosticQuestions(service.label, service.category)
          console.log('🎯 Setting questions in UI:', questions)
          setDiagnosticQuestions(questions)
          setIsAiGenerated(true)
          
          // Initialize service-specific answers
          const serviceSpecific: { [key: string]: string } = {}
          questions.forEach((_, index) => {
            serviceSpecific[`question_${index}`] = ""
          })
          setFormData(prev => ({ ...prev, serviceSpecific }))
          console.log('🎯 Questions set successfully, should re-render now')
        } catch (error) {
          console.error('Error loading questions:', error)
          // Fallback to static questions
          const fallbackQuestions = getFallbackQuestions(service.category)
          console.log('🎯 Setting fallback questions:', fallbackQuestions)
          setDiagnosticQuestions(fallbackQuestions)
          setIsAiGenerated(false)
          
          const serviceSpecific: { [key: string]: string } = {}
          fallbackQuestions.forEach((_, index) => {
            serviceSpecific[`question_${index}`] = ""
          })
          setFormData(prev => ({ ...prev, serviceSpecific }))
        } finally {
          setIsLoadingQuestions(false)
        }
      }
      
      loadQuestions()
    }
  }, [service])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleServiceSpecificChange = (questionIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      serviceSpecific: {
        ...prev.serviceSpecific,
        [`question_${questionIndex}`]: value
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form validation
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    
    // Show login popup instead of submitting directly
    setShowLoginPopup(true)
  }

  const handleLogin = (email: string, password: string) => {
    console.log("User logged in:", { email, password })
    console.log("Enquiry submitted:", {
      service: service?.label,
      category: service?.category,
      ...formData
    })
    
    // Close both popups
    setShowLoginPopup(false)
    onClose()
    
    // Show success message
    alert("Thank you! Your enquiry has been submitted. Our team will contact you within 24 hours.")
  }

  if (!isOpen || !service) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-[80vw] h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{service.label}</h2>
            <p className="text-gray-600">{service.category}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex h-full">
          {/* Service Brief */}
          <div className="w-1/2 p-6 border-r border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Service Overview</h3>
            <div className="space-y-4">
              {/* Scrollable Images */}
              <div className="relative">
                <div className="flex overflow-x-auto gap-3 pb-2 snap-x snap-mandatory" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                  {service.images && service.images.length > 0 ? (
                    service.images.map((image, index) => (
                      <div key={index} className="flex-shrink-0 w-64 h-40 snap-center">
                        <img
                          src={image}
                          alt={`${service.label} ${index + 1}`}
                          className="w-full h-full object-cover rounded-xl shadow-md hover:shadow-lg transition-shadow"
                        />
                      </div>
                    ))
                  ) : (
                    // Default images if no service images provided
                    [
                      "/modern-kitchen-design.png",
                      "/luxury-living-room-marble.png", 
                      "/modern-bedroom-design.png",
                      "/modern-bathroom-design.png",
                      "/modern-living-room-city-view.png"
                    ].map((image, index) => (
                      <div key={index} className="flex-shrink-0 w-64 h-40 snap-center">
                        <img
                          src={image}
                          alt={`${service.label} example ${index + 1}`}
                          className="w-full h-full object-cover rounded-xl shadow-md hover:shadow-lg transition-shadow"
                        />
                      </div>
                    ))
                  )}
                </div>
                {/* Scroll indicators */}
                <div className="flex justify-center mt-2 space-x-1">
                  {Array.from({ length: service.images?.length || 5 }).map((_, index) => (
                    <div key={index} className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                {service.description || `Professional ${service.label.toLowerCase()} services with expert consultation and quality execution. Our experienced team ensures your project is completed to the highest standards with attention to detail and customer satisfaction.`}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Flexible scheduling</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>All locations</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>24/7 support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="w-1/2 p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Get a Quote</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="City, Area"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* AI-Generated Diagnostic Questions */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">
                    Help us understand your requirements better
                  </h4>
                  {isAiGenerated && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                      🤖 AI Generated
                    </span>
                  )}
                </div>
                <div className="space-y-4">
                  {isLoadingQuestions ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tatva-orange"></div>
                      <span className="ml-3 text-gray-600">Generating personalized questions...</span>
                    </div>
                  ) : (
                    (() => {
                      console.log('🎯 Rendering questions:', diagnosticQuestions)
                      return diagnosticQuestions.map((question, index) => (
                      <div key={index}>
                        <Label htmlFor={`question_${index}`}>
                          {question} *
                        </Label>
                        <Textarea
                        id={`question_${index}`}
                        value={formData.serviceSpecific[`question_${index}`] || ""}
                        onChange={(e) => handleServiceSpecificChange(index, e.target.value)}
                        required
                        className="mt-1 min-h-[80px]"
                        placeholder="Please provide details..."
                      />
                    </div>
                    ))
                    })()
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6 pb-8">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-tatva-orange hover:bg-tatva-orange-hover text-white px-12 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Submit Enquiry
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Login Popup */}
      <LoginPopup 
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        onLogin={handleLogin}
      />
    </div>
  )
}
