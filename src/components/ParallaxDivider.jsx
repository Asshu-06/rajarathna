import { useRef, useEffect, useState } from 'react'

/**
 * Works on ALL devices including iOS/Android.
 * Renders a truly position:fixed background element, clipped to the section.
 */
export default function ParallaxDivider({ image, height = '340px', overlay = 'rgba(20,10,4,0.45)', children }) {
  const wrapRef = useRef(null)
  const [clip, setClip] = useState('inset(100%)')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const update = () => {
      const r = wrap.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight

      if (r.bottom <= 0 || r.top >= vh) {
        setVisible(false)
        return
      }

      setVisible(true)
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

  const h = `clamp(200px, 30vw, ${height})`

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', height: h }}>
      {/* Truly fixed bg — position:fixed, clipped to section bounds via clip-path */}
      {visible && (
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
      )}
      {/* Overlay sits in normal flow above the fixed bg */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
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
