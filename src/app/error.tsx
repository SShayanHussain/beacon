'use client'

import { Button } from '@/components/ui'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink">
      <div className="text-center max-w-lg mx-auto px-6">
        <h1 className="font-display text-3xl font-semibold text-fog-pure [font-variation-settings:'WONK'_1]">
          Something broke on our end.
        </h1>
        <p className="mt-4 text-fog/60 leading-relaxed">
          Not your fault. Reload, or email us and we will sort it.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Button onClick={reset} variant="primary" size="md">
            Try again
          </Button>
          <Button href="/" variant="secondary" size="md">
            Go home
          </Button>
        </div>
      </div>
    </div>
  )
}
