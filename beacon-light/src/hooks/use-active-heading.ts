'use client'

import { useState, useEffect, useRef } from 'react'

export function useActiveHeading(headingIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (headingIds.length === 0) return

    observer.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
      }
    )

    for (const id of headingIds) {
      const el = document.getElementById(id)
      if (el) observer.current.observe(el)
    }

    return () => observer.current?.disconnect()
  }, [headingIds])

  return activeId
}
