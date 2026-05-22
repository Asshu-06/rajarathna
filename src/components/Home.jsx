import { motion } from 'framer-motion'
import heroBg from '../assets/herobg.jpeg'

// Petal shapes: 0=classic, 1=round, 2=elongated, 3=diamond
function PetalShape({ shape, color, size }) {
  if (shape === 1) {
    return (
      <div style={{
        width: `${size}px`, height: `${size}px`,
        borderRadius: '50%',
        background: color,
      }} />
    )
  }
  if (shape === 2) {
    return (
      <div style={{
        width: `${size * 0.6}px`, height: `${size * 2}px`,
        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
        background: color,
      }} />
    )
  }
  if (shape === 3) {
    return (
      <div style={{
        width: `${size}px`, height: `${size}px`,
        borderRadius: '0 50% 0 50%',
        background: color,
        transform: 'rotate(45deg)',
      }} />
    )
  }
  // default: classic petal
  return (
    <div style={{
      width: `${size}px`, height: `${size * 1.5}px`,
      borderRadius: '50% 0 50% 0',
      background: color,
    }} />
  )
}

function FallingFlower({ x, delay, duration, size, color, drift, shape, spin }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '-30px',
        left: `${x}%`,
        pointerEvents: 'none',
        zIndex: 3,
      }}
      animate={{
        y: ['0vh', '115vh'],
        rotate: [0, spin],
        x: [0, drift, -drift * 0.5, drift * 0.4, 0],
        opacity: [0, 0.85, 0.85, 0.85, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
        repeatDelay: 0,
        times: [0, 0.1, 0.5, 0.9, 1],
      }}
    >
      <PetalShape shape={shape} color={color} size={size} />
    </motion.div>
  )
}

const PETAL_COLORS = [
  'rgba(255,182,193,0.75)',   // light pink
  'rgba(255,105,135,0.6)',    // rose
  'rgba(255,215,100,0.65)',   // golden yellow
  'rgba(212,175,55,0.6)',     // gold
  'rgba(255,200,220,0.7)',    // blush
  'rgba(255,160,180,0.65)',   // deep pink
  'rgba(255,230,150,0.6)',    // pale gold
  'rgba(220,120,150,0.55)',   // mauve
  'rgba(255,240,200,0.7)',    // cream
  'rgba(255,140,160,0.6)',    // salmon pink
]

const FLOWERS = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: Math.random() * 105,
  delay: Math.random() * 12,
  duration: 6 + Math.random() * 7,
  size: 6 + Math.random() * 10,
  color: PETAL_COLORS[i % PETAL_COLORS.length],
  drift: 20 + Math.random() * 50,
  shape: Math.floor(Math.random() * 4),
  spin: 180 + Math.random() * 540,
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
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
        backgroundRepeat: 'no-repeat',
        zIndex: 2,
      }}
    >
      {/* Dark overlay — stronger at bottom so text pops */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,2,8,0.25) 0%, rgba(10,2,8,0.3) 50%, rgba(10,2,8,0.75) 75%, rgba(10,2,8,0.92) 100%)',
        zIndex: 1, pointerEvents: 'none',
      }} />

      {/* Continuously falling flowers */}
      {FLOWERS.map(f => <FallingFlower key={f.id} {...f} />)}

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        textAlign: 'center',
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto',
        padding: '0 24px 60px',
      }}>
        <motion.p
          style={{ color: '#f0d060', fontFamily: 'Lato,sans-serif', fontSize: '11px', letterSpacing: '0.45em', textTransform: 'uppercase', marginBottom: '16px', textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        >
          Wedding Invitation
        </motion.p>

        <motion.div className="gold-divider" style={{ marginBottom: '28px' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
        />

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
          <h1 className="font-playfair" style={{ color: '#ffffff', fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: 1.15, marginBottom: '4px', textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>
            A. Selvaraja
          </h1>
        </motion.div>

        <motion.p className="font-playfair"
          style={{ color: '#f5d020', fontSize: 'clamp(1.8rem, 4vw, 3rem)', margin: '8px 0', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.8 }}
        >
          &amp;
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.9 }}>
          <h1 className="font-playfair" style={{ color: '#ffffff', fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: 1.15, marginBottom: '4px', textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>
            R. Rathna
          </h1>
        </motion.div>

        <motion.div className="gold-divider" style={{ margin: '28px auto' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 1.1 }}
        />

        <motion.p className="font-cormorant"
          style={{ color: '#f5e8c0', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontStyle: 'italic', marginBottom: '12px', textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.2 }}
        >
          "Where Coimbatore's ambition meets Kumbakonam's grace"
        </motion.p>

        <motion.p
          style={{ color: '#e8d5a0', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(0.8rem, 1.8vw, 1rem)', letterSpacing: '0.05em', textShadow: '0 1px 6px rgba(0,0,0,0.8)' }}
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
    </section>
  )
}
