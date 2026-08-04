import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header variant="solid" />
      <main id="main" className="pt-16 lg:pt-20">
        {children}
      </main>
      <Footer />
    </>
  )
}
