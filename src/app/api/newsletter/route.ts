import { NextResponse } from 'next/server'
import { NewsletterSchema } from '@/lib/schemas'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    
    // Rate limit: max 10 requests per hour
    const { success } = await rateLimit(`newsletter-${ip}`, 10, 3600)
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    
    // Check honeypot
    if (body.company_website && body.company_website.length > 0) {
      return NextResponse.json({ success: true })
    }

    const parsed = NewsletterSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: parsed.error.format() },
        { status: 400 }
      )
    }

    const data = parsed.data

    // Simulate sending email subscription
    console.log('New newsletter subscription:', data.email)
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Newsletter form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
