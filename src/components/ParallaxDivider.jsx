import { useRef, useEffect, useState } from 'react'

/**
 * ParallaxDivider — fixed background image with wave SVGs at top and bottom.
 * Wave SVGs are filled with the adjacent section color (#1a0510) so they
 * cut into the image cleanly — no masks, no overlays, no extra blocks.
 */
export default function ParallaxDivider({ image, height = '650px', topColor = '#1a0510', bottomColor = '#1a0510', children }) {
  const wrapRef = useRef(null)
  const [clip, setClip] = useState('inset(0)')

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const update = () => {
      const r = wrap.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight
      const t = Math.max(0, r.top)
      const b = Math.max(0, vh - r.bottom)
      const l = Math.max(0, r.left)
      const ri = Math.max(0, vw - r.right)
      setClip(`inset(${t}px ${ri}px ${b}px ${l}px)`)
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const h = `clamp(420px, 55vw, ${height})`

  return (
    <div
      ref={wrapRef}
      style={{ position: 'relative', width: '100%', height: h, overflow: 'hidden', zIndex: 0 }}
    >
      {/* Fixed parallax image */}
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url('${image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clipPath: clip,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Children (icon / quote) */}
      {children && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2,
        }}>
          {children}
        </div>
      )}

      {/* TOP wave — filled with the section above's background color */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', lineHeight: 0, zIndex: 3, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '120px' }}>
          <path
            d="M0,64L60,74.7C120,85,240,107,360,101.3C480,96,600,64,720,53.3C840,43,960,53,1080,69.3C1200,85,1320,107,1380,117.3L1440,128L1440,0L0,0Z"
            fill={topColor}
          />
        </svg>
      </div>

      {/* BOTTOM wave — filled with the section below's background color */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', lineHeight: 0, zIndex: 3, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '120px' }}>
          <path
            d="M0,96L60,90.7C120,85,240,75,360,64C480,53,600,43,720,53.3C840,64,960,96,1080,101.3C1200,107,1320,85,1380,74.7L1440,64L1440,120L0,120Z"
            fill={bottomColor}
          />
        </svg>
      </div>
    </div>
  )
}
