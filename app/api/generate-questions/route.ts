import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { serviceLabel, category } = await request.json()
    
    if (!serviceLabel || !category) {
      return NextResponse.json({ error: 'Service label and category are required' }, { status: 400 })
    }

    console.log('🤖 Server-side AI request for:', serviceLabel, 'in category:', category)

    // For now, let's use a simple rule-based approach that generates better questions
    // This will work reliably while we debug the AI API
    const questions = generateSmartQuestions(serviceLabel, category)
    
    console.log('✅ Generated questions:', questions)
    
    return NextResponse.json({ questions })
  } catch (error) {
    console.error('❌ Server error generating questions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Smart question generation based on service type
function generateSmartQuestions(serviceLabel: string, category: string): string[] {
  const serviceKey = serviceLabel.toLowerCase()
  
  // Interior Design & Renovation
  if (category === 'Interior Design & Renovation' || serviceKey.includes('interior') || serviceKey.includes('design')) {
    return [
      `What is the size and layout of the space you want to redesign for ${serviceLabel}?`,
      `What is your preferred design style and aesthetic for this ${serviceLabel} project?`,
      `What is your budget range for this ${serviceLabel} project?`,
      `Do you have any specific functional requirements or must-have features for ${serviceLabel}?`,
      `When would you like to start and complete this ${serviceLabel} project?`
    ]
  }
  
  // Painting & Wall Treatment
  if (category === 'Painting & Wall Treatment' || serviceKey.includes('paint') || serviceKey.includes('wall')) {
    return [
      `What type of surface needs painting for your ${serviceLabel} project?`,
      `What is the approximate area to be painted for ${serviceLabel}?`,
      `Do you have a preferred color scheme or specific colors in mind for ${serviceLabel}?`,
      `Are there any special requirements like waterproofing or texture for ${serviceLabel}?`,
      `What is your preferred timeline for completing the ${serviceLabel} work?`
    ]
  }
  
  // Plumbing & Water Solutions
  if (category === 'Plumbing & Water Solutions' || serviceKey.includes('plumb') || serviceKey.includes('water')) {
    return [
      `What is the specific plumbing issue you're facing with ${serviceLabel}?`,
      `Is this an emergency repair or planned maintenance for ${serviceLabel}?`,
      `What is the age and condition of your current plumbing system?`,
      `Have you experienced this ${serviceLabel} issue before?`,
      `When would you like the ${serviceLabel} service to be scheduled?`
    ]
  }
  
  // Electrical & Lighting
  if (category === 'Electrical & Lighting' || serviceKey.includes('electric') || serviceKey.includes('light')) {
    return [
      `What type of electrical work do you need for ${serviceLabel}?`,
      `Is this for a new construction or existing property?`,
      `What is the scope of electrical work required for ${serviceLabel}?`,
      `Do you have any specific electrical requirements or preferences?`,
      `What is your preferred timeline for the ${serviceLabel} work?`
    ]
  }
  
  // Furniture & Setup
  if (category === 'Furniture & Setup' || serviceKey.includes('furniture') || serviceKey.includes('setup')) {
    return [
      `What type of furniture assistance do you need for ${serviceLabel}?`,
      `What is the quantity and approximate size of items for ${serviceLabel}?`,
      `Do you have the furniture already or need assistance with selection?`,
      `What is your preferred timeline for completing ${serviceLabel}?`,
      `Are there any specific requirements or challenges with the space for ${serviceLabel}?`
    ]
  }
  
  // Default questions for any other service
  return [
    `What specific requirements do you have for ${serviceLabel}?`,
    `What is your preferred timeline for completing ${serviceLabel}?`,
    `What is your budget range for this ${serviceLabel} project?`,
    `Do you have any specific preferences or constraints for ${serviceLabel}?`,
    `When would you like to start the ${serviceLabel} project?`
  ]
}
