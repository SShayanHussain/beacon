'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const [scrollY, setScrollY] = useState(0)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  const update = useCallback(() => {
    const currentScrollY = window.scrollY
    setScrollY(currentScrollY)

    if (currentScrollY > lastScrollY.current) {
      setDirection('down')
    } else {
      setDirection('up')
    }

    lastScrollY.current = currentScrollY
    ticking.current = false
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(update)
        ticking.current = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [update])

  return { direction, scrollY }
}
