import Link from 'next/link'
import { Container, Button } from '@/components/ui'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function NotFound() {
  return (
    <>
      <Header variant="solid" />
      <main id="main" className="pt-16 lg:pt-20">
        <div className="min-h-[70vh] flex items-center justify-center bg-ink">
          <Container>
            <div className="text-center max-w-lg mx-auto">
              {/* Lighthouse illustration */}
              <div className="mb-8">
                <svg
                  className="w-24 h-24 mx-auto text-beam/30"
                  viewBox="0 0 80 80"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect x="30" y="28" width="20" height="44" rx="2" className="fill-fog/10" />
                  <rect x="30" y="48" width="20" height="6" className="fill-signal/30" />
                  <rect x="26" y="20" width="28" height="12" rx="4" className="fill-beam/40" />
                  <circle cx="40" cy="26" r="4" className="fill-beam" />
                  <path d="M40 16 L24 4 L56 4 Z" className="fill-beam/20" />
                  <rect x="24" y="72" width="32" height="4" rx="2" className="fill-fog/10" />
                </svg>
              </div>

              <h1 className="font-display text-3xl font-semibold text-fog-pure [font-variation-settings:'WONK'_1]">
                This light doesn&apos;t reach that far.
              </h1>
              <p className="mt-4 text-fog/60 leading-relaxed">
                The page is not here. Try search, or start from the beginning.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <Button href="/" variant="primary" size="md">
                  Go home
                </Button>
                <Button href="/blog" variant="secondary" size="md">
                  Read the blog
                </Button>
                <Button href="/services" variant="secondary" size="md">
                  See services
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  )
}
