'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { Section, Container, SectionHeader, Button, Card } from '@/components/ui'
import { Reveal } from '@/components/motion/reveal'
import { siteConfig } from '@/data/site'
import { faqs } from '@/data/faqs'
import { cn } from '@/lib/utils'
import { Mail, Phone, MapPin, Clock, ChevronDown } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <Section surface="dark" hasDivider={false}>
        <Container>
          <Reveal>
            <p className="font-mono text-eyebrow font-medium uppercase tracking-[0.16em] text-beam mb-4">
              ↳ Contact
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-[-0.025em] leading-[1.05] text-fog-pure [font-variation-settings:'WONK'_1] max-w-2xl">
              Tell us about the book
            </h1>
            <p className="mt-6 text-lg text-fog/60 leading-relaxed max-w-xl">
              Fill this in and we will reply within one business day, or call if you would rather
              talk first.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Form + details */}
      <Section surface="light">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>

            {/* Contact details */}
            <div className="lg:col-span-2">
              <Reveal delay={0.15}>
                <Card surface="light" className="p-6 lg:p-8">
                  <h3 className="font-display text-lg font-semibold text-ink mb-6 [font-variation-settings:'WONK'_0]">
                    Get in touch directly
                  </h3>
                  <ul className="space-y-5">
                    <li>
                      <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-3 text-sm text-ink-soft hover:text-ink transition-colors">
                        <Mail className="w-5 h-5 text-beam shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-ink">{siteConfig.email}</p>
                          <p className="text-xs text-ink-soft mt-0.5">We reply within one business day</p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="flex items-start gap-3 text-sm text-ink-soft hover:text-ink transition-colors">
                        <Phone className="w-5 h-5 text-beam shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-ink">{siteConfig.phone}</p>
                          <p className="text-xs text-ink-soft mt-0.5">{siteConfig.hours}</p>
                        </div>
                      </a>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <MapPin className="w-5 h-5 text-beam shrink-0 mt-0.5" />
                      <div>
                        {siteConfig.addresses.office.lines.map((l) => (
                          <p key={l} className="text-ink-soft">{l}</p>
                        ))}
                        <p className="text-xs text-ink-soft/60 mt-1 italic">{siteConfig.addresses.office.note}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-sm">
                      <Clock className="w-5 h-5 text-beam shrink-0 mt-0.5" />
                      <div>
                        <p className="text-ink-soft">{siteConfig.hours}</p>
                      </div>
                    </li>
                  </ul>
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section surface="dark">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="↳ Questions"
              title="Frequently asked"
              id="contact-faq-heading"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-2xl space-y-3">
              {faqs.filter(f => f.scope === 'contact').map((faq) => (
                <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('pending')
    await new Promise(r => setTimeout(r, 1500))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className="bg-beam/10 border border-beam/20 rounded-lg p-8 text-center">
        <h3 className="font-display text-2xl font-semibold text-ink [font-variation-settings:'WONK'_1]">Got it.</h3>
        <p className="mt-3 text-ink-soft leading-relaxed">
          Your enquiry is in. We read the details, check the calendar, and reply within one
          business day with either a scope and a number, or a couple of questions.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Button href="/blog" variant="onLight" size="sm">Read the blog</Button>
          <Button href="/portfolio" variant="ghost" size="sm" className="text-ink">See the shelf</Button>
        </div>
      </div>
    )
  }

  const inputClasses = cn(
    'w-full h-[52px] px-4 rounded-md font-mono text-sm',
    'bg-fog-pure border border-ink/12 text-ink placeholder:text-ink-soft/40',
    'focus:border-beam focus:ring-2 focus:ring-beam/30 focus:outline-none',
    'transition-all duration-[var(--dur-fast)]'
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block font-mono text-xs uppercase tracking-[0.08em] text-ink-soft mb-2">Your name *</label>
        <input id="name" name="name" type="text" required className={inputClasses} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block font-mono text-xs uppercase tracking-[0.08em] text-ink-soft mb-2">Email *</label>
          <input id="email" name="email" type="email" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="phone" className="block font-mono text-xs uppercase tracking-[0.08em] text-ink-soft mb-2">Phone (optional)</label>
          <input id="phone" name="phone" type="tel" className={inputClasses} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="service" className="block font-mono text-xs uppercase tracking-[0.08em] text-ink-soft mb-2">Interested in</label>
          <select id="service" name="service" className={cn(inputClasses, 'appearance-none cursor-pointer')}>
            <option value="">Select a service</option>
            <option value="book-publishing">Book Publishing</option>
            <option value="book-writing">Ghostwriting</option>
            <option value="book-editing">Editing</option>
            <option value="book-marketing">Book Marketing</option>
            <option value="audiobooks">Audiobooks</option>
            <option value="cover-design">Cover Design</option>
            <option value="not-sure">Not sure yet</option>
          </select>
        </div>
        <div>
          <label htmlFor="manuscript" className="block font-mono text-xs uppercase tracking-[0.08em] text-ink-soft mb-2">Manuscript status</label>
          <select id="manuscript" name="manuscriptStatus" className={cn(inputClasses, 'appearance-none cursor-pointer')}>
            <option value="">Where does it stand?</option>
            <option value="idea">Just an idea</option>
            <option value="writing">Writing it now</option>
            <option value="finished">Finished draft</option>
            <option value="published">Already published</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block font-mono text-xs uppercase tracking-[0.08em] text-ink-soft mb-2">Tell us about the book *</label>
        <textarea id="message" name="message" required rows={5} className={cn(inputClasses, 'h-auto py-3 resize-y')} />
      </div>

      {/* Honeypot */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex items-start gap-2">
        <input id="consent" name="consent" type="checkbox" required className="mt-1 accent-beam" />
        <label htmlFor="consent" className="text-xs text-ink-soft">
          I agree to the{' '}
          <a href="/privacy-policy" className="underline hover:text-ink">privacy policy</a>.
        </label>
      </div>

      <Button type="submit" variant="onLight" size="lg" disabled={status === 'pending'} className="w-full sm:w-auto">
        {status === 'pending' ? 'Sending…' : 'Send enquiry'}
      </Button>
    </form>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border border-beam/10 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-5 text-left cursor-pointer hover:bg-beam/5 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-display text-base font-medium text-fog-pure pr-4">{question}</span>
        <ChevronDown className={cn('w-5 h-5 text-beam shrink-0 transition-transform', isOpen && 'rotate-180')} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5">
          <p className="text-sm text-fog/60 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}
