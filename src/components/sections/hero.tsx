'use client'

import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { Beam } from '@/components/motion/beam'
import { Button } from '@/components/ui'
import { Container } from '@/components/ui'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Hero() {
  const reduced = useReducedMotion()

  const revealTransition = (delay: number) =>
    reduced
      ? { duration: 0.2 }
      : { duration: 0.72, ease: [0.16, 1, 0.3, 1] as const, delay: delay / 1000 }

  const clipReveal = reduced
    ? {}
    : {
        initial: { clipPath: 'inset(0 100% 0 0)', y: 12, opacity: 0 },
        animate: { clipPath: 'inset(0 0 0 0)', y: 0, opacity: 1 },
      }

  const fadeUp = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
      }

  return (
    <section
      className="relative min-h-screen flex items-center bg-ink overflow-hidden noise"
      data-surface="dark"
    >
      <Beam />

      <Container size="wide" className="relative z-10 py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.p
            {...clipReveal}
            transition={revealTransition(240)}
            className="font-mono text-eyebrow font-medium uppercase tracking-[0.16em] text-beam mb-6"
          >
            Independent Publishing Services
          </motion.p>

          {/* H1 — split into 3 spans for staggered reveal */}
          <h1
            className="font-display text-5xl font-semibold tracking-[-0.03em] leading-[0.95] text-fog-pure [font-variation-settings:'WONK'_1]"
            aria-label="Your manuscript already has the weight. We provide the light."
          >
            <motion.span
              {...clipReveal}
              transition={revealTransition(320)}
              className="block"
            >
              Your manuscript already
            </motion.span>
            <motion.span
              {...clipReveal}
              transition={revealTransition(400)}
              className="block"
            >
              has the weight.
            </motion.span>
            <motion.span
              {...clipReveal}
              transition={revealTransition(480)}
              className="block italic text-beam/90 font-body"
            >
              We provide the light.
            </motion.span>
          </h1>

          {/* Lede */}
          <motion.p
            {...fadeUp}
            transition={revealTransition(640)}
            className="mt-8 text-lg text-fog/70 leading-relaxed max-w-[48ch] font-body"
          >
            Editing, design, distribution and marketing for independent authors — with a
            fixed scope, a named editor, and no claim on your rights or your royalties.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp}
            transition={revealTransition(760)}
            className="flex flex-wrap items-center gap-4 mt-10"
          >
            <Button href="/schedule" variant="primary" size="lg">
              Book a free call
            </Button>
            <Button href="/packages" variant="secondary" size="lg">
              See what it costs
            </Button>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduced ? 0 : 0.9, duration: 0.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs text-fog/30 uppercase tracking-[0.1em]">
            How it works
          </span>
          <ChevronDown
            className={cn(
              'w-5 h-5 text-fog/30',
              !reduced && 'animate-[bob_2s_ease-in-out_infinite]'
            )}
          />
        </motion.div>
      </Container>
    </section>
  )
}
