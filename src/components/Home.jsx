import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import heroBg from '../assets/herobg.jpeg'

// Continuously falling petal for hero
function FallingPetal({ x, delay, duration, size, color, drift }) {
  return (
    <motion.div
      style={{
        position: 'absolute', top: '-20px', left: `${x}%`,
        width: `${size}px`, height: `${size * 1.4}px`,
        borderRadius: '50% 0 50% 0',
        background: color,
        pointerEvents: 'none',
        zIndex: 2,
      }}
      animate={{
        y: ['0vh', '110vh'],
        rotate: [0, 360 + Math.random() * 360],
        x: [0, drift, -drift * 0.6, drift * 0.3, 0],
        opacity: [0, 0.7, 0.7, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
        repeatDelay: 0,
      }}
    />
  )
}

const HERO_PETAL_COLORS = [
  'rgba(255,215,100,0.6)',
  'rgba(255,180,150,0.5)',
  'rgba(255,200,200,0.55)',
  'rgba(212,175,55,0.5)',
  'rgba(255,160,180,0.5)',
]

const HERO_PETALS = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 5 + Math.random() * 5,
  size: 7 + Math.random() * 8,
  color: HERO_PETAL_COLORS[i % HERO_PETAL_COLORS.length],
  drift: 15 + Math.random() * 35,
}))

export default function Home() {
  const wrapRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const bg = bgRef.current
    if (!wrap || !bg) return

    const update = () => {
      const r = wrap.getBoundingClientRect()
      const vw = window.innerWidth
      const vh = window.innerHeight
      if (r.bottom <= 0 || r.top >= vh) {
        bg.style.clipPath = 'inset(100%)'
        return
      }
      const t = Math.max(0, r.top)
      const b = Math.max(0, vh - r.bottom)
      const l = Math.max(0, r.left)
      const ri = Math.max(0, vw - r.right)
      bg.style.clipPath = `inset(${t}px ${ri}px ${b}px ${l}px)`
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section
      ref={wrapRef}
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Truly fixed background — works on iOS/Android */}
      <div
        ref={bgRef}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      {/* Dark overlay — removed */}

      {/* Continuously falling petals */}
      {HERO_PETALS.map(p => <FallingPetal key={p.id} {...p} />)}

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center',
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto',
        padding: '80px 24px 60px',
      }}>
        <motion.p
          style={{ color: '#d4af37', fontFamily: 'Lato,sans-serif', fontSize: '11px', letterSpacing: '0.45em', textTransform: 'uppercase', marginBottom: '16px' }}
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        >
          Wedding Invitation
        </motion.p>

        <motion.div className="gold-divider" style={{ marginBottom: '28px' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
        />

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
          <h1 className="font-playfair" style={{ color: '#fdf8ee', fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: 1.15, marginBottom: '4px' }}>
            A. Selvaraja
          </h1>
        </motion.div>

        <motion.p className="font-playfair"
          style={{ color: '#d4af37', fontSize: 'clamp(1.8rem, 4vw, 3rem)', margin: '8px 0' }}
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.8 }}
        >
          &amp;
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.9 }}>
          <h1 className="font-playfair" style={{ color: '#fdf8ee', fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: 1.15, marginBottom: '4px' }}>
            R. Rathna
          </h1>
        </motion.div>

        <motion.div className="gold-divider" style={{ margin: '28px auto' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 1.1 }}
        />

        <motion.p className="font-cormorant"
          style={{ color: '#e8d5b0', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontStyle: 'italic', marginBottom: '12px' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.2 }}
        >
          "Where Coimbatore's ambition meets Kumbakonam's grace"
        </motion.p>

        <motion.p
          style={{ color: '#c4a882', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(0.8rem, 1.8vw, 1rem)', letterSpacing: '0.05em' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.4 }}
        >
          Mr. &amp; Mrs. Family request your gracious presence
        </motion.p>

        {/* Scroll cue */}
        <motion.div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.8 }}
        >
          <p style={{ color: '#d4af37', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}>Scroll</p>
          <motion.div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #d4af37, transparent)' }}
            animate={{ scaleY: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  )
}
