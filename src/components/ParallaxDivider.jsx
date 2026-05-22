import { useRef, useEffect, useState } from 'react'

/**
 * ParallaxDivider — the image is rendered as a position:fixed layer
 * that is only visible through this component's "window" using clip-path.
 * This works even inside transformed/overflow parents where
 * background-attachment:fixed breaks.
 */
export default function ParallaxDivider({ image, height = '600px', children }) {
  const containerRef = useRef(null)
  const [clip, setClip] = useState('inset(0px 0px 0px 0px)')

  useEffect(() => {
    const update = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const top = Math.max(0, rect.top)
      const bottom = Math.min(window.innerHeight, rect.bottom)
      const left = rect.left
      const right = window.innerWidth - rect.right
      setClip(`inset(${top}px ${right}px ${window.innerHeight - bottom}px ${left}px)`)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const h = `clamp(380px, 50vw, ${height})`

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: h,
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Fixed image layer — clipped to only show through this container's bounds */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          clipPath: clip,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Children sit above the fixed image */}
      {children && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2,
        }}>
          {children}
        </div>
      )}
    </div>
  )
}
