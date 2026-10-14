'use client'

import { useEffect, useRef, useState } from 'react'

// Cuenta de 0 a `to` cuando entra al viewport.
export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        const start = performance.now()
        const dur = 1400
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          setValue(Math.round(to * (1 - Math.pow(1 - p, 3))))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [to])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}
