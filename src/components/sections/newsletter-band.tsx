'use client'

import { useState } from 'react'
import { Section, Container, Button } from '@/components/ui'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

export function NewsletterBand() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('pending')
    // Simulate — wired to /api/newsletter in Phase 5
    await new Promise((r) => setTimeout(r, 1000))
    setStatus('success')
  }

  return (
    <Section surface="light" id="newsletter-section" aria-labelledby="newsletter-heading">
      <Container>
        <Reveal>
          <div className="max-w-xl mx-auto text-center">
            <p className="font-mono text-eyebrow font-medium uppercase tracking-[0.16em] text-beam mb-4">
              ↳ The Lamp Room
            </p>
            <h2
              id="newsletter-heading"
              className="font-display text-2xl font-semibold tracking-[-0.015em] text-ink [font-variation-settings:'WONK'_1]"
            >
              One useful email a month
            </h2>
            <p className="mt-3 text-sm text-ink-soft leading-relaxed">
              New posts and the occasional thing we learned the hard way. No pitches.
              Unsubscribe in one click.
            </p>

            {status === 'success' ? (
              <div className="mt-6 p-4 rounded-md bg-beam/10 border border-beam/20">
                <p className="font-mono text-sm text-ink font-medium">
                  You are in. Watch your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex gap-3 max-w-md mx-auto">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={cn(
                    'flex-1 h-12 px-4 rounded-md font-mono text-sm',
                    'bg-fog-pure border border-ink/12 text-ink placeholder:text-ink-soft/40',
                    'focus:border-beam focus:ring-2 focus:ring-beam/30 focus:outline-none',
                    'transition-all duration-[var(--dur-fast)]'
                  )}
                />
                {/* Honeypot */}
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <Button
                  type="submit"
                  variant="onLight"
                  size="md"
                  disabled={status === 'pending'}
                >
                  {status === 'pending' ? 'Sending…' : 'Subscribe'}
                </Button>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
