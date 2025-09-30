import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { serviceLabel, category } = await request.json()
    
    if (!serviceLabel || !category) {
      return NextResponse.json({ error: 'Service label and category are required' }, { status: 400 })
    }

    const prompt = `Generate 5 specific diagnostic questions for a ${serviceLabel} service in the ${category} category. These questions should help gather initial information for a home service provider to understand the customer's needs. Make each question specific, actionable, and relevant to the service type. Return only the questions, one per line, without numbering.`
    
    console.log('🤖 Server-side AI request for:', serviceLabel, 'in category:', category)
    
    const response = await fetch('https://api.longcat.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ak_1N40y00IF1aB0uI01H7Ab71U9a59W'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Long Cat AI API Error:', response.status, errorText)
      return NextResponse.json({ error: 'AI service unavailable' }, { status: 500 })
    }

    const data = await response.json()
    console.log('📊 AI Response received')
    
    const questionsText = data.choices[0]?.message?.content || ''
    
    // Split by newlines and clean up
    const questions = questionsText
      .split('\n')
      .map(q => q.trim())
      .filter(q => q.length > 0)
      .slice(0, 5) // Ensure we only get 5 questions
    
    console.log('✅ Generated questions:', questions)
    
    return NextResponse.json({ questions })
  } catch (error) {
    console.error('❌ Server error generating questions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
