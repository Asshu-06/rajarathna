import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ringBg from '../assets/ringvk.jpeg'
import WaveDivider from './WaveDivider'

const FULL_TEXT = `Coimbatore, May 2026

Dear Selvaraja & Rathna,

From the moment two families sat across from each other with hope in their eyes, something quietly beautiful began. Not with grand gestures or dramatic declarations — but with small conversations, shared silences, and the slow, steady warmth of two people discovering they were meant to walk the same path.

Selvaraja — a man of quiet strength, steady purpose, and a heart that loves deeply without needing to say it loudly.

Rathna — a woman of grace, warmth, and the kind of gentle courage that makes everyone around her feel safe and seen.

Together, they are not just a couple. They are a promise — that love can be both chosen and destined, both practical and poetic, both rooted in tradition and open to the future.

As you begin this new chapter, may your home always be filled with laughter, your hearts always be full of gratitude, and your love always be the kind that grows stronger with every passing year.

We are so proud of you both.

With all our love and blessings,
Your Family 🌸`

function Bird({ flying, hasLetter }) {
  return (
    <svg viewBox="0 0 100 70" fill="none" style={{ width: '100px', height: '70px', overflow: 'visible' }}>
      <ellipse cx="48" cy="42" rx="16" ry="10" fill="#f5e6d0" stroke="#d4af37" strokeWidth="1.2"/>
      <ellipse cx="64" cy="34" rx="9" ry="8" fill="#f5e6d0" stroke="#d4af37" strokeWidth="1.2"/>
      <circle cx="68" cy="31" r="1.8" fill="#2a1505"/>
      <circle cx="68.6" cy="30.4" r="0.6" fill="white"/>
      <path d="M73 34 L82 31 L73 37 Z" fill="#d4af37"/>
      <path d="M32 42 L16 35 L18 44 L16 52 L32 47 Z" fill="#e8d5b0" stroke="#d4af37" strokeWidth="0.8"/>
      <motion.path
        d="M44 38 Q24 24 10 28 Q24 36 44 44 Z"
        fill="#f0e0c0" stroke="#d4af37" strokeWidth="0.9"
        animate={flying ? {
          d: ['M44 38 Q24 24 10 28 Q24 36 44 44 Z','M44 38 Q24 10 8 16 Q24 30 44 44 Z','M44 38 Q24 24 10 28 Q24 36 44 44 Z']
        } : { d: 'M44 38 Q24 28 14 32 Q24 38 44 44 Z' }}
        transition={{ duration: 0.35, repeat: flying ? Infinity : 0, ease: 'easeInOut' }}
      />
      <motion.path
        d="M52 38 Q72 24 86 28 Q72 36 52 44 Z"
        fill="#f0e0c0" stroke="#d4af37" strokeWidth="0.9"
        animate={flying ? {
          d: ['M52 38 Q72 24 86 28 Q72 36 52 44 Z','M52 38 Q72 10 88 16 Q72 30 52 44 Z','M52 38 Q72 24 86 28 Q72 36 52 44 Z']
        } : { d: 'M52 38 Q72 28 82 32 Q72 38 52 44 Z' }}
        transition={{ duration: 0.35, repeat: flying ? Infinity : 0, ease: 'easeInOut', delay: 0.17 }}
      />
      {hasLetter && (
        <g transform="translate(78,22)">
          <rect x="0" y="0" width="18" height="13" rx="2" fill="#fdf8ee" stroke="#d4af37" strokeWidth="0.9"/>
          <path d="M0 0 L9 8 L18 0" fill="none" stroke="#d4af37" strokeWidth="0.7"/>
          <line x1="3" y1="9" x2="15" y2="9" stroke="#c4a882" strokeWidth="0.5" opacity="0.6"/>
        </g>
      )}
    </svg>
  )
}

function Cursor() {
  return (
    <motion.span
      style={{ display:'inline-block', width:'2px', height:'1em', background:'#8b1a2f', marginLeft:'1px', verticalAlign:'text-bottom', borderRadius:'1px' }}
      animate={{ opacity:[1,0] }}
      transition={{ duration:0.5, repeat:Infinity, repeatType:'reverse' }}
    />
  )
}

export default function LoveLetter() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  // All animation state
  const [birdVisible, setBirdVisible]     = useState(false)
  const [birdFlying, setBirdFlying]       = useState(false)
  const [birdHasLetter, setBirdHasLetter] = useState(false)
  const [birdLeaving, setBirdLeaving]     = useState(false)
  const [letterOpen, setLetterOpen]       = useState(false)
  const [typed, setTyped]                 = useState('')
  const [typingDone, setTypingDone]       = useState(false)
  const [showCursor, setShowCursor]       = useState(false)

  const timers = useRef([])
  const idxRef = useRef(0)
  const skipRef = useRef(false)

  const after = (ms, fn) => { const t = setTimeout(fn, ms); timers.current.push(t) }
  const killTimers = () => { timers.current.forEach(clearTimeout); timers.current = [] }

  const tick = useCallback(() => {
    if (skipRef.current) return
    const i = idxRef.current
    if (i > FULL_TEXT.length) { setTypingDone(true); setShowCursor(false); return }
    setTyped(FULL_TEXT.slice(0, i))
    idxRef.current = i + 1
    if (i < FULL_TEXT.length) {
      const ch = FULL_TEXT[i - 1]
      after((ch === '.' || ch === '—' || ch === ',') ? 60 : 18, tick)
    } else { setTypingDone(true); setShowCursor(false) }
  }, [])

  // IntersectionObserver — just sets inView
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // React to inView changes
  useEffect(() => {
    if (inView) {
      // ── ENTER sequence ──
      killTimers()
      skipRef.current = false; idxRef.current = 0

      // Reset all state first
      setBirdLeaving(false); setBirdVisible(true)
      setBirdFlying(true); setBirdHasLetter(true)
      setLetterOpen(false); setTyped(''); setTypingDone(false); setShowCursor(false)

      // t=1400 — drop letter (bird releases, paper unrolls)
      after(1400, () => {
        setBirdHasLetter(false)
        setLetterOpen(true)
      })

      // t=2300 — bird flies away
      after(2300, () => {
        setBirdLeaving(true)
        after(900, () => setBirdVisible(false))
      })

      // t=2500 — start typing
      after(2500, () => {
        setShowCursor(true)
        after(100, tick)
      })

    } else {
      // ── EXIT sequence ──
      killTimers()
      skipRef.current = true

      // Close letter immediately
      setLetterOpen(false)
      setShowCursor(false)

      // t=500 — bird flies back in to pick up
      after(500, () => {
        setBirdLeaving(false); setBirdVisible(true)
        setBirdFlying(true); setBirdHasLetter(true)
      })

      // t=1400 — bird flies away with letter
      after(1400, () => setBirdLeaving(true))

      // t=2400 — full reset (ready for next enter)
      after(2400, () => {
        setBirdVisible(false); setBirdFlying(false)
        setBirdHasLetter(false); setBirdLeaving(false)
        setTyped(''); setTypingDone(false)
      })
    }
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => killTimers(), [])

  return (
    <section
      ref={sectionRef}
      style={{
        position:'relative', zIndex:1, width:'100%',
        padding:'clamp(64px,10vw,120px) 0',
        background:'linear-gradient(160deg,#1a0510 0%,#2d0a1e 50%,#1a0510 100%)',
        overflow:'hidden',
      }}
    >
      <div className="section-line" />
      <WaveDivider fill="#1a0510" />
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 65% 55% at 50% 40%,rgba(212,175,55,0.1) 0%,transparent 70%)' }} />

      <div style={{ position:'relative', zIndex:2, width:'100%', maxWidth:'640px', margin:'0 auto', padding:'0 clamp(16px,5vw,40px)' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'40px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'16px' }}>
            <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,transparent,#d4af37)' }} />
            <svg viewBox="0 0 40 36" width="22" height="20" fill="#d4af37">
              <path d="M20 34C20 34 2 22 2 11C2 5.5 6.5 2 11 2C14.5 2 17.5 4 20 7C22.5 4 25.5 2 29 2C33.5 2 38 5.5 38 11C38 22 20 34 20 34Z"/>
            </svg>
            <div style={{ flex:1, height:'1px', background:'linear-gradient(90deg,#d4af37,transparent)' }} />
          </div>
          <p style={{ color:'#e8a0b0', fontFamily:'Lato,sans-serif', fontSize:'11px', letterSpacing:'0.45em', textTransform:'uppercase', marginBottom:'10px' }}>
            A Letter from the Heart
          </p>
          <h2 className="font-playfair" style={{ color:'#fdf0f4', fontSize:'clamp(1.8rem,5vw,2.8rem)' }}>
            Our Story, Our Promise
          </h2>
        </div>

        {/* Bird stage */}
        <div style={{ position:'relative', height:'110px', marginBottom:'4px', overflow:'visible' }}>
          <AnimatePresence>
            {birdVisible && (
              <motion.div
                key="bird"
                style={{ position:'absolute', top:'10px', left:'50%' }}
                initial={{ x:'55vw', y:-50, opacity:0 }}
                animate={birdLeaving
                  ? { x:'55vw', y:-50, opacity:0 }
                  : { x:'-50%', y:0, opacity:1 }
                }
                exit={{ x:'55vw', y:-50, opacity:0 }}
                transition={{ duration: birdLeaving ? 0.85 : 1.1, ease:[0.22,1,0.36,1] }}
              >
                <Bird flying={birdFlying} hasLetter={birdHasLetter} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Letter — unrolls from top like old paper */}
        <motion.div
          style={{
            transformOrigin:'top center',
            borderRadius:'16px', overflow:'hidden',
            border:'1px solid rgba(212,175,55,0.35)',
            boxShadow: letterOpen ? '0 20px 60px rgba(184,134,11,0.25)' : 'none',
          }}
          animate={letterOpen ? { scaleY:1, opacity:1 } : { scaleY:0, opacity:0 }}
          transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
        >
          <div style={{
            position:'relative',
            backgroundImage:`url(${ringBg})`,
            backgroundSize:'cover', backgroundPosition:'center',
            padding:'clamp(28px,5vw,52px) clamp(24px,5vw,44px)',
          }}>
            <div style={{ position:'absolute', inset:0, background:'rgba(255,250,240,0.88)', pointerEvents:'none' }} />
            <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(transparent,transparent 31px,rgba(212,175,55,0.08) 31px,rgba(212,175,55,0.08) 32px)', pointerEvents:'none' }} />
            <div style={{ position:'absolute', top:'33%', left:0, right:0, height:'1px', background:'rgba(212,175,55,0.18)', pointerEvents:'none' }} />
            <div style={{ position:'absolute', top:'66%', left:0, right:0, height:'1px', background:'rgba(212,175,55,0.18)', pointerEvents:'none' }} />
            <div style={{ position:'absolute', top:'8px', left:'16px', fontFamily:'Playfair Display,serif', fontSize:'clamp(60px,10vw,90px)', color:'rgba(212,175,55,0.1)', lineHeight:1, userSelect:'none', pointerEvents:'none' }}>"</div>

            {showCursor && !typingDone && (
              <motion.button
                onClick={() => { killTimers(); skipRef.current=true; setTyped(FULL_TEXT); setTypingDone(true); setShowCursor(false) }}
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }}
                style={{
                  position:'absolute', top:'12px', right:'14px',
                  background:'rgba(212,175,55,0.18)', border:'1px solid rgba(212,175,55,0.45)',
                  borderRadius:'999px', padding:'4px 14px', fontSize:'11px',
                  letterSpacing:'0.12em', textTransform:'uppercase', color:'#8b6914',
                  fontFamily:'Lato,sans-serif', cursor:'pointer', zIndex:10,
                }}
              >Skip ›</motion.button>
            )}

            <div style={{ position:'relative', zIndex:1 }}>
              <p className="font-cormorant" style={{ color:'#4a2c1a', fontSize:'clamp(1rem,2.5vw,1.2rem)', lineHeight:2, whiteSpace:'pre-wrap', minHeight:'2em' }}>
                {typed}
                {showCursor && !typingDone && <Cursor />}
              </p>
              <AnimatePresence>
                {typingDone && (
                  <motion.div key="seal" style={{ display:'flex', justifyContent:'center', marginTop:'24px' }}
                    initial={{ opacity:0, scale:0, rotate:-20 }} animate={{ opacity:1, scale:1, rotate:0 }}
                    transition={{ duration:0.55, ease:'backOut' }}
                  >
                    <div style={{ width:'48px', height:'48px', borderRadius:'50%', background:'radial-gradient(circle at 35% 35%,#e8c84a,#b8860b)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 16px rgba(184,134,11,0.4)' }}>
                      <svg viewBox="0 0 40 36" width="20" height="18" fill="#fdf8ee">
                        <path d="M20 34C20 34 2 22 2 11C2 5.5 6.5 2 11 2C14.5 2 17.5 4 20 7C22.5 4 25.5 2 29 2C33.5 2 38 5.5 38 11C38 22 20 34 20 34Z"/>
                      </svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
