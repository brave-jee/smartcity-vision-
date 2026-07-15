import { useEffect, useRef, useState } from 'react'

type LiveNumberProps = {
  value: number
  decimals?: number
  suffix?: string
  useGrouping?: boolean
  className?: string
}

/**
 * 数值过渡动画：每次 Mock 刷新时平滑滚动到新值。
 */
export function LiveNumber({
  value,
  decimals = 0,
  suffix = '',
  useGrouping = false,
  className,
}: LiveNumberProps) {
  const [display, setDisplay] = useState(value)
  const frameRef = useRef(0)
  const fromRef = useRef(value)

  useEffect(() => {
    const from = fromRef.current
    const to = value
    const duration = 700
    const start = performance.now()

    cancelAnimationFrame(frameRef.current)

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      // easeOutCubic
      const eased = 1 - (1 - progress) ** 3
      const current = from + (to - from) * eased
      setDisplay(current)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }

    frameRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frameRef.current)
    }
  }, [value])

  const text = display.toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping,
  })

  return (
    <span className={className}>
      {text}
      {suffix}
    </span>
  )
}
