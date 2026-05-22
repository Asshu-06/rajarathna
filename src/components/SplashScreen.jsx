import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Rose petal — varied shapes, colors, drift
function Petal({ delay, x, rotate, size, color, drift }) {
  return (
    <motion.div
      style={{
        position: 'absolute', top: '-30px', left: `${x}%`,
        width: `${size}px`, height: `${size * 1.4}px`,
        borderRadius: '50% 0 50% 0',
        background: color,
        opacity: 0.85,
        zIndex: 6,
        pointerEvents: 'none',
      }}
      initial={{ y: -30, opacity: 0, rotate, x: 0 }}
      animate={{
        y: '115vh',
        opacity: [0, 0.9, 0.9, 0],
        rotate: rotate + 540,
        x: [0, drift, -drift * 0.5, drift * 0.3, 0],
      }}
      transition={{ duration: 4 + Math.random() * 3, delay, ease: 'linear' }}
    />
  )
}

// Groom — sharp business suit (real estate professional)
function Groom({ walking, reached }) {
  const bodyBob = walking ? [0, -3, 0, -3, 0] : [0]

  return (
    <motion.svg
      viewBox="0 0 80 170"
      fill="none"
      style={{ width: 'clamp(52px,9vw,88px)', height: 'clamp(104px,18vw,176px)', overflow: 'visible' }}
      animate={{ y: bodyBob }}
      transition={{ duration: 0.5, repeat: walking ? Infinity : 0, ease: 'easeInOut' }}
    >
      {/* Shadow */}
      <ellipse cx="40" cy="165" rx="18" ry="4" fill="rgba(0,0,0,0.12)"/>
      {/* Head */}
      <ellipse cx="40" cy="17" rx="12" ry="13" fill="#8b5e3c"/>
      {/* Hair — neat side-parted */}
      <path d="M28 10 Q40 3 52 10 Q50 6 40 5 Q30 6 28 10Z" fill="#2a1505"/>
      <path d="M28 10 Q32 8 40 8 Q48 8 52 10 Q48 12 40 12 Q32 12 28 10Z" fill="#3d1a0a"/>
      {/* Neck */}
      <rect x="36" y="28" width="8" height="7" fill="#8b5e3c"/>
      {/* White shirt */}
      <path d="M34 35 L40 43 L46 35" fill="white" opacity="0.95"/>
      {/* Smart navy suit jacket */}
      <path d="M18 36 Q40 31 62 36 L66 92 Q40 98 14 92 Z" fill="#1a2744"/>
      {/* Lapels */}
      <path d="M34 35 L20 54 L32 57 Z" fill="#141e36"/>
      <path d="M46 35 L60 54 L48 57 Z" fill="#141e36"/>
      {/* Gold tie */}
      <path d="M37 35 L40 60 L43 35" fill="#d4af37" opacity="0.95"/>
      {/* Tie knot */}
      <ellipse cx="40" cy="36" rx="3" ry="2" fill="#b8960b"/>
      {/* Pocket square */}
      <path d="M52 46 L58 42 L60 49 Z" fill="white" opacity="0.8"/>
      {/* Suit button */}
      <circle cx="40" cy="72" r="1.5" fill="#d4af37" opacity="0.6"/>
      {/* Left arm */}
      <motion.g
        animate={{ rotate: reached ? -25 : (walking ? [0, 20, 0, -20, 0] : 0) }}
        transition={{ duration: 0.5, repeat: walking ? Infinity : 0 }}
        style={{ transformOrigin: '20px 42px' }}
      >
        <path d="M20 42 Q6 62 8 82" stroke="#1a2744" strokeWidth="11" strokeLinecap="round" fill="none"/>
        <ellipse cx="8" cy="84" rx="5" ry="4" fill="#8b5e3c"/>
      </motion.g>
      {/* Right arm — holding briefcase when reached */}
      <motion.g
        animate={{ rotate: reached ? 20 : (walking ? [0, -20, 0, 20, 0] : 0) }}
        transition={{ duration: 0.5, repeat: walking ? Infinity : 0 }}
        style={{ transformOrigin: '60px 42px' }}
      >
        <path d="M60 42 Q74 62 72 82" stroke="#1a2744" strokeWidth="11" strokeLinecap="round" fill="none"/>
        <ellipse cx="72" cy="84" rx="5" ry="4" fill="#8b5e3c"/>
        {/* Briefcase */}
        {reached && (
          <>
            <rect x="65" y="84" width="16" height="11" rx="2" fill="#8b6914" stroke="#d4af37" strokeWidth="0.8"/>
            <path d="M68 84 L68 81 Q72 79 76 81 L76 84" stroke="#d4af37" strokeWidth="0.8" fill="none"/>
            <line x1="65" y1="89" x2="81" y2="89" stroke="#d4af37" strokeWidth="0.6" opacity="0.7"/>
          </>
        )}
      </motion.g>
      {/* Left leg */}
      <motion.g
        animate={{ rotate: walking ? [0, -22, 0, 22, 0] : 0 }}
        transition={{ duration: 0.5, repeat: walking ? Infinity : 0 }}
        style={{ transformOrigin: '30px 92px' }}
      >
        <path d="M30 92 L26 148" stroke="#141e36" strokeWidth="12" strokeLinecap="round" fill="none"/>
        <ellipse cx="24" cy="152" rx="10" ry="5" fill="#0d1520"/>
      </motion.g>
      {/* Right leg */}
      <motion.g
        animate={{ rotate: walking ? [0, 22, 0, -22, 0] : 0 }}
        transition={{ duration: 0.5, repeat: walking ? Infinity : 0, delay: 0.25 }}
        style={{ transformOrigin: '50px 92px' }}
      >
        <path d="M50 92 L54 148" stroke="#141e36" strokeWidth="12" strokeLinecap="round" fill="none"/>
        <ellipse cx="56" cy="152" rx="10" ry="5" fill="#0d1520"/>
      </motion.g>
    </motion.svg>
  )
}

// Bride — saree with walking sway
function Bride({ walking, reached }) {
  const bodyBob = walking ? [0, -3, 0, -3, 0] : [0]

  return (
    <motion.svg
      viewBox="0 0 80 170"
      fill="none"
      style={{ width: 'clamp(52px,9vw,88px)', height: 'clamp(104px,18vw,176px)', overflow: 'visible' }}
      animate={{ y: bodyBob }}
      transition={{ duration: 0.5, repeat: walking ? Infinity : 0, ease: 'easeInOut', delay: 0.15 }}
    >
      {/* Shadow */}
      <ellipse cx="40" cy="165" rx="18" ry="4" fill="rgba(0,0,0,0.12)"/>
      {/* Head */}
      <ellipse cx="40" cy="15" rx="11" ry="12" fill="#7c3d2a"/>
      {/* Hair bun */}
      <path d="M29 9 Q40 1 51 9 Q56 18 52 28 Q46 22 40 23 Q34 22 28 28 Q24 18 29 9Z" fill="#1a0a04"/>
      <ellipse cx="40" cy="6" rx="7" ry="5" fill="#1a0a04"/>
      {/* Bindi */}
      <circle cx="40" cy="10" r="2" fill="#d4af37"/>
      {/* Neck */}
      <rect x="37" y="26" width="6" height="7" fill="#7c3d2a"/>
      {/* Necklace */}
      <path d="M33 30 Q40 36 47 30" stroke="#d4af37" strokeWidth="1.5" fill="none"/>
      {/* Blouse */}
      <path d="M24 33 Q40 29 56 33 L57 58 Q40 63 23 58 Z" fill="#8b1a2f"/>
      {/* Saree drape */}
      <path d="M23 58 Q8 76 10 112 Q18 124 40 126 Q62 124 70 112 Q72 76 57 58 Z" fill="#8b1a2f"/>
      {/* Saree pallu drape over shoulder */}
      <path d="M56 33 Q68 20 72 10 Q74 6 70 8 Q64 18 56 38Z" fill="#a02040" opacity="0.85"/>
      {/* Gold border */}
      <path d="M10 112 Q40 132 70 112" stroke="#d4af37" strokeWidth="2.5" fill="none" opacity="0.9"/>
      <path d="M10 106 Q40 126 70 106" stroke="#d4af37" strokeWidth="1" fill="none" opacity="0.5"/>
      {/* Left arm */}
      <motion.g
        animate={{ rotate: reached ? -25 : (walking ? [0, 15, 0, -15, 0] : 0) }}
        transition={{ duration: 0.5, repeat: walking ? Infinity : 0 }}
        style={{ transformOrigin: '24px 36px' }}
      >
        <path d="M24 36 Q12 54 14 70" stroke="#7c3d2a" strokeWidth="8" strokeLinecap="round" fill="none"/>
        <ellipse cx="14" cy="72" rx="4" ry="3.5" fill="#7c3d2a"/>
        {/* Bangles */}
        <circle cx="14" cy="68" r="4" stroke="#d4af37" strokeWidth="1.5" fill="none"/>
        <circle cx="14" cy="73" r="4" stroke="#c0a030" strokeWidth="1.5" fill="none"/>
      </motion.g>
      {/* Right arm — holding bouquet when reached */}
      <motion.g
        animate={{ rotate: reached ? 25 : (walking ? [0, -15, 0, 15, 0] : 0) }}
        transition={{ duration: 0.5, repeat: walking ? Infinity : 0 }}
        style={{ transformOrigin: '56px 36px' }}
      >
        <path d="M56 36 Q68 54 66 70" stroke="#7c3d2a" strokeWidth="8" strokeLinecap="round" fill="none"/>
        <ellipse cx="66" cy="72" rx="4" ry="3.5" fill="#7c3d2a"/>
        <circle cx="66" cy="68" r="4" stroke="#d4af37" strokeWidth="1.5" fill="none"/>
        <circle cx="66" cy="73" r="4" stroke="#c0a030" strokeWidth="1.5" fill="none"/>
        {/* Bouquet */}
        {reached && (
          <>
            <circle cx="70" cy="76" r="4" fill="#ff8fa3" opacity="0.9"/>
            <circle cx="76" cy="72" r="3.5" fill="#ffb347" opacity="0.9"/>
            <circle cx="74" cy="79" r="3" fill="#ff6b8a" opacity="0.85"/>
            <path d="M72 82 L73 90" stroke="#4a7c3f" strokeWidth="1.5" strokeLinecap="round"/>
          </>
        )}
      </motion.g>
      {/* Legs under saree */}
      <motion.g
        animate={{ rotate: walking ? [0, -14, 0, 14, 0] : 0 }}
        transition={{ duration: 0.5, repeat: walking ? Infinity : 0 }}
        style={{ transformOrigin: '34px 126px' }}
      >
        <path d="M34 126 L32 158" stroke="#8b1a2f" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.8"/>
      </motion.g>
      <motion.g
        animate={{ rotate: walking ? [0, 14, 0, -14, 0] : 0 }}
        transition={{ duration: 0.5, repeat: walking ? Infinity : 0, delay: 0.25 }}
        style={{ transformOrigin: '46px 126px' }}
      >
        <path d="M46 126 L48 158" stroke="#8b1a2f" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.8"/>
      </motion.g>
    </motion.svg>
  )
}

// Animated ECG line
function ECGLine() {
  return (
    <svg viewBox="0 0 400 60" style={{ width: 'clamp(200px,60vw,360px)', height: '40px' }} preserveAspectRatio="none">
      <motion.path
        d="M0,30 L60,30 L75,30 L85,5 L95,55 L105,15 L115,30 L130,30 L200,30 L215,30 L225,5 L235,55 L245,15 L255,30 L270,30 L400,30"
        stroke="#d4af37"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
    </svg>
  )
}

const PETAL_COLORS = [
  'linear-gradient(135deg,#f9c6d0,#e8748a)',
  'linear-gradient(135deg,#fde8b0,#f5c842)',
  'linear-gradient(135deg,#f7b8c8,#d4607a)',
  'linear-gradient(135deg,#ffd6a5,#ffb347)',
  'linear-gradient(135deg,#e8a0b0,#c0607a)',
  'linear-gradient(135deg,#fff0c0,#d4af37)',
  'linear-gradient(135deg,#ffc8d8,#ff8fa3)',
]

const PETALS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  delay: i * 0.12,
  x: 2 + Math.random() * 96,
  rotate: Math.random() * 360,
  size: 8 + Math.random() * 10,
  color: PETAL_COLORS[i % PETAL_COLORS.length],
  drift: 20 + Math.random() * 40,
}))

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('walk')

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('meet'),    1600),
      setTimeout(() => setPhase('curtain'), 2400),
      setTimeout(() => setPhase('text'),    3200),
      setTimeout(() => setPhase('done'),    5000),
      setTimeout(() => onComplete(),        5400),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  const walking = phase === 'walk'
  const reached = phase === 'meet' || phase === 'curtain' || phase === 'text'
  const showPetals = phase === 'meet' || phase === 'curtain' || phase === 'text'
  const groomX = phase === 'walk' ? '-60vw' : '-8vw'
  const brideX = phase === 'walk' ? '60vw' : '8vw'

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="splash"
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #2d1060 55%, #1a0a2e 100%)',
          }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6 }}
        >

          {/* Ambient glow */}
          <motion.div
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
            animate={{ background: reached
              ? 'radial-gradient(ellipse 70% 50% at 50% 55%, rgba(212,175,55,0.22) 0%, transparent 70%)'
              : 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)'
            }}
            transition={{ duration: 0.8 }}
          />

          {/* Rose petals — fall from meet phase onwards */}
          {showPetals && PETALS.map(p => <Petal key={p.id} {...p} />)}

          {/* Characters stage */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '560px', height: 'clamp(140px,28vw,220px)', marginBottom: '20px' }}>

            {/* Groom */}
            <motion.div
              style={{ position: 'absolute', bottom: 0, left: '50%' }}
              animate={{ x: groomX }}
              transition={{ duration: phase === 'walk' ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
              initial={{ x: '-60vw' }}
            >
              <Groom walking={walking} reached={reached} />
            </motion.div>

            {/* Bride */}
            <motion.div
              style={{ position: 'absolute', bottom: 0, left: '50%' }}
              animate={{ x: brideX }}
              transition={{ duration: phase === 'walk' ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
              initial={{ x: '60vw' }}
            >
              <Bride walking={walking} reached={reached} />
            </motion.div>

            {/* Heart between them */}
            <AnimatePresence>
              {reached && (
                <motion.div
                  style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 5 }}
                  initial={{ scale: 0, opacity: 0, y: 10 }}
                  animate={{ scale: [0, 1.3, 1], opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'backOut' }}
                >
                  <motion.svg
                    viewBox="0 0 40 36" width="32" height="32" fill="#d4af37"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <path d="M20 34C20 34 2 22 2 11C2 5.5 6.5 2 11 2C14.5 2 17.5 4 20 7C22.5 4 25.5 2 29 2C33.5 2 38 5.5 38 11C38 22 20 34 20 34Z"/>
                  </motion.svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Curtain open */}
            <AnimatePresence>
              {(phase === 'curtain' || phase === 'text') && (
                <>
                  <motion.div
                    style={{ position: 'absolute', inset: 0, left: 0, width: '50%', background: 'linear-gradient(to right,#1a0a2e,#2d1060)', transformOrigin: 'left', zIndex: 3 }}
                    initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.div
                    style={{ position: 'absolute', inset: 0, right: 0, left: '50%', background: 'linear-gradient(to left,#1a0a2e,#2d1060)', transformOrigin: 'right', zIndex: 3 }}
                    initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                </>
              )}
            </AnimatePresence>
          </div>

          {/* ECG line */}
          <AnimatePresence>
            {(phase === 'meet' || phase === 'curtain' || phase === 'text') && (
              <motion.div
                style={{ marginBottom: '18px' }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6 }}
              >
                <ECGLine />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Text reveal */}
          <AnimatePresence>
            {phase === 'text' && (
              <motion.div
                style={{ textAlign: 'center', padding: '0 clamp(16px,5vw,40px)' }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <motion.p
                  style={{ color: '#d4af37', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(9px,2vw,11px)', letterSpacing: '0.45em', textTransform: 'uppercase', marginBottom: '14px' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                >
                  Wedding Invitation
                </motion.p>

                <motion.h1
                  className="font-playfair"
                  style={{ color: '#f0e8ff', fontSize: 'clamp(1.5rem,5vw,2.8rem)', lineHeight: 1.2 }}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                >
                  A. Selvaraja
                </motion.h1>

                <motion.p
                  className="font-playfair"
                  style={{ color: '#d4af37', fontSize: 'clamp(1.3rem,4vw,2.2rem)', margin: '6px 0' }}
                  initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.45, ease: 'backOut' }}
                >
                  &amp;
                </motion.p>

                <motion.h1
                  className="font-playfair"
                  style={{ color: '#f0e8ff', fontSize: 'clamp(1.5rem,5vw,2.8rem)', lineHeight: 1.2 }}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                >
                  R. Rathna
                </motion.h1>

                <motion.p
                  className="font-cormorant"
                  style={{ color: '#b8a0e8', fontSize: 'clamp(0.9rem,2.5vw,1.2rem)', fontStyle: 'italic', marginTop: '10px' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
                >
                  29 May 2026 · Bellezza Event Hall, Coimbatore
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
