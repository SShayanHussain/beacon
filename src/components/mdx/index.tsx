import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { AlertCircle, Info, Lightbulb, AlertTriangle, ArrowUpRight } from 'lucide-react'

// Note: many standard HTML overrides are done via Tailwind typography in the prose configuration, 
// but we can export custom components here.

export function Callout({ type = 'info', children }: { type?: 'info' | 'tip' | 'warning' | 'note'; children: React.ReactNode }) {
  const styles = {
    info: { icon: Info, bg: 'bg-beam/5', border: 'border-beam', text: 'text-ink-soft' },
    tip: { icon: Lightbulb, bg: 'bg-beam/10', border: 'border-beam', text: 'text-ink' },
    warning: { icon: AlertTriangle, bg: 'bg-red-500/10', border: 'border-red-500', text: 'text-ink' },
    note: { icon: AlertCircle, bg: 'bg-tide', border: 'border-beam', text: 'text-ink-soft' },
  }
  const config = styles[type] || styles.info
  const Icon = config.icon

  return (
    <div className={cn("my-6 p-5 rounded-lg border-l-4 flex gap-4", config.bg, config.border)}>
      <Icon className={cn("w-5 h-5 shrink-0 mt-0.5 text-beam")} />
      <div className={cn("text-sm leading-relaxed [&>p]:m-0", config.text)}>{children}</div>
    </div>
  )
}

export function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-8">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-tide">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-mono text-xs text-ink-soft">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export function Quote({ author, role, children }: { author: string; role?: string; children: React.ReactNode }) {
  return (
    <blockquote className="my-8 border-l-[3px] border-beam pl-6 not-italic">
      <div className="font-display text-2xl italic text-ink leading-relaxed [font-variation-settings:'WONK'_1]">
        {children}
      </div>
      {author && (
        <cite className="block mt-4 font-mono text-xs not-italic">
          <span className="text-ink font-medium">{author}</span>
          {role && <span className="text-ink-soft">, {role}</span>}
        </cite>
      )}
    </blockquote>
  )
}

export function Steps({ children }: { children: React.ReactNode }) {
  return <div className="my-8 space-y-6">{children}</div>
}

export function Step({ title, children, number }: { title: string; children: React.ReactNode; number: number }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-6 h-6 rounded-full bg-beam/10 border border-beam/30 flex items-center justify-center font-mono text-[10px] text-beam shrink-0">
          {number}
        </div>
      </div>
      <div>
        <h4 className="font-display text-lg font-semibold text-ink [font-variation-settings:'WONK'_0]">{title}</h4>
        <div className="text-sm text-ink-soft mt-1 leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

export function Compare({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-fog-pure p-6 rounded-xl border border-ink/5">{left}</div>
      <div className="bg-fog-pure p-6 rounded-xl border border-ink/5">{right}</div>
    </div>
  )
}

export function CTACard({ service, title, body }: { service?: string; title: string; body: string }) {
  return (
    <div className="my-10 p-8 rounded-xl bg-gradient-to-br from-tide to-ink text-fog relative overflow-hidden group">
      <div className="absolute inset-0 bg-beam/0 group-hover:bg-beam/5 transition-colors" />
      <div className="relative z-10">
        <h3 className="font-display text-2xl font-semibold text-fog-pure [font-variation-settings:'WONK'_1] mb-3">{title}</h3>
        <p className="text-fog/70 mb-6 max-w-lg leading-relaxed">{body}</p>
        <Button href="/schedule" variant="primary" size="md">
          Book a free call
        </Button>
      </div>
    </div>
  )
}

export function Checklist({ items, children }: { items?: string[]; children?: React.ReactNode }) {
  if (children) {
    return (
      <div className="my-6 space-y-2 [&>ul]:space-y-2 [&>ul>li]:flex [&>ul>li]:items-start [&>ul>li]:gap-2 [&>ul>li]:text-sm [&>ul>li]:text-ink-soft [&>ul]:list-none [&>ul]:pl-0">
        {children}
      </div>
    )
  }
  return (
    <ul className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3 list-none pl-0">
      {(items || []).map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-ink-soft">
          <svg className="w-5 h-5 text-beam shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  )
}

export function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="inline-flex items-baseline gap-2 mr-6 my-4">
      <span className="font-mono text-3xl font-semibold text-beam tabular-nums">{value}</span>
      <span className="font-mono text-xs uppercase tracking-wider text-ink-soft">{label}</span>
    </div>
  )
}

export const mdxComponents = {
  Callout,
  Note: ({ children, type }: { children: React.ReactNode, type?: 'info' | 'tip' | 'warning' | 'note' }) => <Callout type={type || 'info'}>{children}</Callout>,
  Figure,
  Quote,
  Steps,
  Step,
  Compare,
  CTACard,
  CTA: ({ heading, title, body, href, label }: { heading?: string, title?: string, body: string, href?: string, label?: string }) => (
    <div className="my-10 p-8 rounded-xl bg-gradient-to-br from-tide to-ink text-fog relative overflow-hidden group">
      <div className="absolute inset-0 bg-beam/0 group-hover:bg-beam/5 transition-colors" />
      <div className="relative z-10">
        <h3 className="font-display text-2xl font-semibold text-fog-pure [font-variation-settings:'WONK'_1] mb-3">{title || heading}</h3>
        <p className="text-fog/70 mb-6 max-w-lg leading-relaxed">{body}</p>
        <Button href={href || "/schedule"} variant="primary" size="md">
          {label || "Book a free call"}
        </Button>
      </div>
    </div>
  ),
  Checklist,
  Stat,
  // Link override for external vs internal
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (!href) return <a {...props}>{children}</a>
    const isInternal = href.startsWith('/') || href.startsWith('#')
    if (isInternal) {
      return (
        <Link href={href} className="text-beam underline decoration-beam/40 underline-offset-2 hover:decoration-beam transition-colors" {...props}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-beam underline decoration-beam/40 underline-offset-2 hover:decoration-beam transition-colors inline-flex items-center gap-0.5" {...props}>
        {children}
        <ArrowUpRight className="w-3 h-3 inline" />
      </a>
    )
  },
}
