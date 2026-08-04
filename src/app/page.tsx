import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { TrustBar } from '@/components/sections/trust-bar'
import { ProofCounters } from '@/components/sections/proof-counters'
import { ServicesGrid } from '@/components/sections/services-grid'
import { RightsPromise } from '@/components/sections/rights-promise'
import { PortfolioPreview } from '@/components/sections/portfolio-preview'
import { TestimonialCarousel } from '@/components/sections/testimonial-carousel'
import { LatestPosts } from '@/components/sections/latest-posts'
import { NewsletterBand } from '@/components/sections/newsletter-band'
import { FinalCTA } from '@/components/sections/final-cta'

export default function HomePage() {
  return (
    <>
      <Header variant="transparent" />
      <main id="main">
        <Hero />
        <TrustBar />
        <ProofCounters />
        <ServicesGrid />
        <RightsPromise />
        <PortfolioPreview />
        <TestimonialCarousel />
        <LatestPosts />
        <NewsletterBand />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
