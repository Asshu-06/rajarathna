import { useMemo } from 'react'
import { motion } from 'framer-motion'
import heroBg from '../assets/herobg.jpeg'

// CSS grid tile reveal — each tile scales in from 0 with shuffled stagger
const COLS = 14
const ROWS = 9
const TOTAL = COLS * ROWS

function GridRevealBg({ src }) {
  // Build a shuffled delay map once — stable across renders
  const delays = useMemo(() => {
    const order = Array.from({ length: TOTAL }, (_, i) => i)
    // Fisher-Yates shuffle
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]]
    }
    // Map tile index → delay in seconds
    const map = new Array(TOTAL)
    order.forEach((tileIdx, rank) => {
      map[tileIdx] = rank * 0.018 // ~2.3 s total spread
    })
    return map
  }, [])

  return (
    <div
      style={{
        position: 'absolute', inset: 0,
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {Array.from({ length: TOTAL }, (_, i) => {
        const col = i % COLS
        const row = Math.floor(i / COLS)
        return (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: delays[i],
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
              backgroundPosition: `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`,
              backgroundRepeat: 'no-repeat',
              willChange: 'transform, opacity',
            }}
          />
        )
      })}
    </div>
  )
}

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
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Grid reveal background */}
      <GridRevealBg src={heroBg} />
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
        background: 'rgba(10,2,8,0.55)',
        borderRadius: '24px',
        backdropFilter: 'blur(2px)',
      }}>
        <motion.p
          style={{ color: '#f0d060', fontFamily: 'Lato,sans-serif', fontSize: '11px', letterSpacing: '0.45em', textTransform: 'uppercase', marginBottom: '16px', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        >
          Wedding Invitation
        </motion.p>

        <motion.div className="gold-divider" style={{ marginBottom: '28px' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
        />

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
          <h1 className="font-playfair" style={{ color: '#fff8f0', fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: 1.15, marginBottom: '4px', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
            A. Selvaraja
          </h1>
        </motion.div>

        <motion.p className="font-playfair"
          style={{ color: '#f0d060', fontSize: 'clamp(1.8rem, 4vw, 3rem)', margin: '8px 0', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.8 }}
        >
          &amp;
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.9 }}>
          <h1 className="font-playfair" style={{ color: '#fff8f0', fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: 1.15, marginBottom: '4px', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
            R. Rathna
          </h1>
        </motion.div>

        <motion.div className="gold-divider" style={{ margin: '28px auto' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 1.1 }}
        />

        <motion.p className="font-cormorant"
          style={{ color: '#f0e0c0', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontStyle: 'italic', marginBottom: '12px', textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.2 }}
        >
          "Where Coimbatore's ambition meets Kumbakonam's grace"
        </motion.p>

        <motion.p
          style={{ color: '#e0c8a0', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(0.8rem, 1.8vw, 1rem)', letterSpacing: '0.05em', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.4 }}
        >
          Mr. &amp; Mrs. Family request your gracious presence
        </motion.p>

        {/* Scroll cue */}
        <motion.div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.8 }}
        >
          <p style={{ color: '#f0d060', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '8px' }}>Scroll</p>
          <motion.div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #f0d060, transparent)' }}
            animate={{ scaleY: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
      {/* Bottom wave — covers tile grid bottom edge, flows into next section */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, zIndex: 4 }}>
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '120px' }}>
          <path d="M0,60 C180,0 360,120 540,60 C720,0 900,120 1080,60 C1260,0 1380,80 1440,60 L1440,120 L0,120 Z" fill="#1a0510"/>
        </svg>
      </div>
    </section>
  )
}
