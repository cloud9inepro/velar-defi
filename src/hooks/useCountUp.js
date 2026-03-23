import { useEffect, useRef, useState } from 'react'

export function useCountUp(target, duration = 2000, decimals = 0) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)

  // ─── Intersection Observer — starts when visible ────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [hasStarted])

  // ─── Count Up Animation ─────────────────────────────────
  useEffect(() => {
    if (!hasStarted) return

    let startTime = null
    const startValue = 0

    function animate(timestamp) {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Easing — ease out expo
      const eased = 1 - Math.pow(2, -10 * progress)
      const current = startValue + (target - startValue) * eased

      setCount(parseFloat(current.toFixed(decimals)))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    requestAnimationFrame(animate)
  }, [hasStarted, target, duration, decimals])

  return { count, ref }
}