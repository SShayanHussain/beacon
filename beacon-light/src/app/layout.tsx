import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { fraunces, newsreader, plexMono } from '@/lib/fonts'
import { SkipLink } from '@/components/layout/skip-link'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: {
    default: 'Beacon Light Publishing — Publishing services for independent authors',
    template: '%s | Beacon Light Publishing',
  },
  description:
    'Editing, cover design, formatting, distribution, and marketing for independent authors. You keep every right and every royalty.',
  openGraph: {
    type: 'website',
    siteName: 'Beacon Light Publishing',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large' as const,
    'max-snippet': -1,
  },
  icons: {
    icon: '/favicon.ico',
  },
  alternates: { canonical: '/' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${newsreader.variable} ${plexMono.variable}`}
    >
      <body className="bg-ink text-fog font-body antialiased">
        <SkipLink />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
