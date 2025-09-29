"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, ChevronLeft, ChevronRight, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { flatItems, expandQueryTokens, scoreItem, groupResults, highlight, suggestCorrection, aiRerank, vendors, scoreVendor } from "@/lib/search-utils"
import { ServicePopup } from "./service-popup"
import { LoginPopup } from "./login-popup"
import Image from "next/image"

export function SmartSearch({ query }: { query: string }){
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(query)
  const [correction, setCorrection] = useState<null | { corrected: string; token: string; replacement: string }>(null)
  const [results, setResults] = useState<(typeof flatItems[number] & { score: number })[]>([])
  const [vendorResults, setVendorResults] = useState<{ name:string; rating:number; city?:string; image?:string; score:number }[]>([])
  const [selectedService, setSelectedService] = useState<{ label: string; category: string; description?: string; images?: string[] } | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [showEnquiryForm, setShowEnquiryForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    preferredDate: "",
    serviceSpecific: {} as { [key: string]: string }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLoginPopup, setShowLoginPopup] = useState(false)

  useEffect(()=>{ run(searchQuery) }, [searchQuery])
  // sync when query in URL changes (from header search)
  useEffect(()=>{ setSearchQuery(query) }, [query])

  async function run(q: string){
    const c = suggestCorrection(q); setCorrection(c);
    const effective = c ? c.corrected : q;
    const qTokens = expandQueryTokens(effective);
    let matches = flatItems.map(item => ({ ...item, score: effective ? scoreItem(item as any, qTokens) : 0 }));
    if(effective && effective.length>=3){
      matches = matches.filter(m=>m.score>0).sort((a,b)=>b.score-a.score);
      if(c){ matches.forEach(m=>{ if((m as any).tokens.includes(c.replacement)) (m as any).score += 3 }); matches.sort((a,b)=>b.score-a.score); }
      matches = await aiRerank(effective, matches);
      const top = matches[0] ? matches[0].score : 0; const minAbs = 5; const ratio = 0.45;
      matches = matches.filter(m=>m.score >= Math.max(minAbs, top*ratio));
      // vendors
      const v = vendors.map(vd=>({ ...vd, score: scoreVendor(vd, qTokens) }))
        .filter(x=>x.score>0)
        .sort((a,b)=>b.score-a.score)
        .slice(0,12);
      setVendorResults(v);
    } else {
      matches = matches.slice(0, 24);
      setVendorResults([]);
    }
    setResults(matches);
  }

  const handleServiceClick = (service: typeof flatItems[number]) => {
    setSelectedService({
      label: service.label,
      category: service.category,
      description: service.description,
      images: service.images
    })
    setShowEnquiryForm(true)
    // Scroll to the enquiry form
    setTimeout(() => {
      const enquiryForm = document.getElementById('enquiry-form')
      if (enquiryForm) {
        enquiryForm.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
    setSelectedService(null)
  }

  const handleCloseEnquiryForm = () => {
    setShowEnquiryForm(false)
    setSelectedService(null)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
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
      service: selectedService?.label,
      category: selectedService?.category,
      ...formData
    })
    
    // Close login popup and enquiry form
    setShowLoginPopup(false)
    setShowEnquiryForm(false)
    setSelectedService(null)
    
    // Show success message
    alert("Thank you! Your enquiry has been submitted. Our team will contact you within 24 hours.")
  }

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

  const grouped = useMemo(()=> groupResults(results).map(g=>({ meta: g.meta, items: g.items.slice(0,6) })).filter(g=>g.items.length>0), [results]);

  function handleSearch(e: React.FormEvent){
    e.preventDefault(); router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  function scrollContainer(direction: "left"|"right", id: string){
    const el = document.getElementById(id); if(!el) return; const amt = 400; el.scrollBy({ left: direction==='left' ? -amt : amt, behavior: 'smooth' });
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="mb-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-tatva-gray text-sm">About {results.length} results for "{searchQuery}"</p>
          {correction && correction.corrected.toLowerCase() !== searchQuery.toLowerCase() && (
            <button className="text-sm text-blue-600 hover:underline" onClick={()=>setSearchQuery(correction.corrected)}>Did you mean {correction.corrected}?</button>
          )}
        </div>
      </div>

      {/* Search Results */}
      {grouped.length>0 && (
        <h2 className="text-xl font-bold text-tatva-charcoal mb-3">Search relevant services and vendors</h2>
      )}
      {grouped.map(group=> (
        <div key={group.meta.category} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-tatva-charcoal flex items-center gap-2"><span>{group.meta.emoji}</span>{group.meta.category} <span className="px-2 py-0.5 text-xs rounded-full border">AI</span></h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={()=>scrollContainer('left', `scroll-${group.meta.category}`)} className="p-2 border-tatva-light-gray hover:bg-tatva-charcoal/10 rounded-full"><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm" onClick={()=>scrollContainer('right', `scroll-${group.meta.category}`)} className="p-2 border-tatva-light-gray hover:bg-tatva-charcoal/10 rounded-full"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
          <div id={`scroll-${group.meta.category}`} className="flex gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {group.items.map((it, idx)=> {
              const imagePool = [
                "/modern-kitchen-design.png",
                "/luxury-living-room-marble.png",
                "/modern-bedroom-design.png",
                "/modern-bathroom-design.png"
              ];
              const slides = imagePool.slice(0,3);
              return (
                <Card 
                  key={`${it.label}-${idx}`} 
                  className="flex-shrink-0 w-96 bg-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-tatva-light-gray/20 rounded-3xl overflow-hidden"
                  onClick={() => handleServiceClick(it)}
                >
                  <div className="relative">
                    <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar" style={{scrollbarWidth:'none', msOverflowStyle:'none'}}>
                      {slides.map((src,i)=>(
                        <div key={i} className="relative w-96 h-40 flex-shrink-0 snap-center">
                          <Image src={src} alt={it.label} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                        </div>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
                      <div className="text-white font-semibold text-base" dangerouslySetInnerHTML={{ __html: highlight(it.label, expandQueryTokens(searchQuery)) }} />
                      <div className="text-white/80 text-xs">{it.category}</div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      ))}

      {/* Vendors - Hidden when enquiry form is shown */}
      {vendorResults.length>0 && !showEnquiryForm && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-tatva-charcoal mb-6">Vendors</h2>
          <div className="flex gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth:'none', msOverflowStyle:'none' }}>
            {vendorResults.map((v,idx)=> (
              <Card key={idx} className="flex-shrink-0 w-80 h-44 bg-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-tatva-light-gray/20 rounded-3xl overflow-hidden">
                <div className="relative h-full flex flex-col justify-center px-6">
                  <div className="text-lg font-semibold text-tatva-charcoal">{v.name}</div>
                  <div className="text-sm text-tatva-gray">⭐ {v.rating} {v.city ? `• ${v.city}` : ''}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Enquiry Form - Shown when service is selected */}
      {showEnquiryForm && selectedService && (
        <div id="enquiry-form" className="mb-12 bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-tatva-charcoal">Get a Quote for {selectedService.label}</h2>
            <button
              onClick={handleCloseEnquiryForm}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Service Specific Questions - First */}
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 text-lg">
                Help us understand your requirements better
              </h3>
              <div className="space-y-4">
                {[
                  "What is the size of the space you want to work on?",
                  "What is your preferred style or design approach?",
                  "What is your budget range for this project?",
                  "Do you have any specific requirements or must-have features?",
                  "When would you like to start the project?"
                ].map((question, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {question} *
                    </label>
                    <textarea
                      value={formData.serviceSpecific[`question_${index}`] || ""}
                      onChange={(e) => handleServiceSpecificChange(index, e.target.value)}
                      required
                      className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tatva-orange focus:border-transparent"
                      placeholder="Please provide details..."
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Phone Number OTP - Second */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4 text-gray-900 text-lg">Verify Your Phone Number</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <div className="flex gap-2">
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                      required
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      className="bg-tatva-orange hover:bg-tatva-orange-hover text-white px-4"
                    >
                      Send OTP
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP *</label>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    required
                    className="w-full"
                    maxLength={6}
                  />
                </div>
              </div>
            </div>

            {/* Name and Location - Third */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4 text-gray-900 text-lg">Your Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="City, Area"
                    required
                    className="w-full"
                  />
                </div>
              </div>
            </div>


            {/* Submit Button */}
            <div className="flex justify-center pt-6 pb-4">
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
      )}

      {/* Service Popup Modal */}
      <ServicePopup 
        service={selectedService}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />

      {/* Login Popup */}
      <LoginPopup 
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        onLogin={handleLogin}
      />
    </div>
  )
}


