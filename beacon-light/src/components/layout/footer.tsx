import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui'
import { Logo } from './logo'
import { siteConfig } from '@/data/site'
import { footerNav } from '@/data/navigation'
import { Mail, Phone } from 'lucide-react'

const SocialIcons: Record<string, (props: React.SVGProps<SVGSVGElement>) => React.ReactElement> = {
  linkedin: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  x: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
  instagram: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  facebook: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
}

export function Footer() {

  return (
    <footer className="bg-ink border-t border-beam/15" role="contentinfo">
      <Container size="wide" className="py-16 lg:py-20">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo variant="light" size="md" />
            <p className="mt-4 text-sm text-fog/60 leading-relaxed max-w-[32ch]">
              {siteConfig.tagline}
            </p>
            <div className="flex gap-3 mt-6">
              {Object.entries(siteConfig.socials).map(([key, url]) => {
                const Icon = SocialIcons[key]
                if (!Icon) return null
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md text-fog/40 hover:text-beam hover:bg-beam/8 transition-all duration-[var(--dur-fast)]"
                    aria-label={`Follow us on ${key}`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-beam mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fog/60 hover:text-beam transition-colors duration-[var(--dur-fast)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-beam mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerNav.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-fog/60 hover:text-beam transition-colors duration-[var(--dur-fast)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-beam mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-sm text-fog/60 hover:text-beam transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-sm text-fog/60 hover:text-beam transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  {siteConfig.phone}
                </a>
              </li>
              <li className="pt-2">
                <p className="text-xs text-fog/40">{siteConfig.addresses.office.label}</p>
                {siteConfig.addresses.office.lines.map((line) => (
                  <p key={line} className="text-sm text-fog/60">{line}</p>
                ))}
              </li>
              <li>
                <p className="text-xs text-fog/40">{siteConfig.addresses.mailing.label}</p>
                {siteConfig.addresses.mailing.lines.map((line) => (
                  <p key={line} className="text-sm text-fog/60">{line}</p>
                ))}
                <p className="text-xs text-fog/30 mt-0.5 italic">
                  {siteConfig.addresses.mailing.note}
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal disclaimer — mandatory per README §7 */}
        <div className="mt-12 pt-8 border-t border-fog/8">
          <p className="text-xs text-fog/40 leading-relaxed max-w-prose">
            {siteConfig.disclaimer}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-fog/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-fog/30">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex gap-4">
            {footerNav.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs text-fog/30 hover:text-fog/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  )
}
