import { NextResponse } from 'next/server'
import { LeadFormSchema } from '@/lib/schemas'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    
    // Rate limit: max 5 requests per hour
    const { success } = await rateLimit(ip, 5, 3600)
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    
    // Check honeypot
    if (body.company_website && body.company_website.length > 0) {
      // Spam detected. Return 200 to fool the bot, but do not send email.
      return NextResponse.json({ success: true })
    }

    const parsed = LeadFormSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: parsed.error.format() },
        { status: 400 }
      )
    }

    const data = parsed.data

    // Simulate sending email via Resend for now, since we don't have a RESEND_API_KEY set up in this demo environment
    console.log('Sending lead email to team:', data)
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Lead form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
