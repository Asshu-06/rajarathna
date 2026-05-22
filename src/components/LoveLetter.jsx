import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useHighlight from '../hooks/useHighlight'
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

function Cursor() {
  return (
    <motion.span
      style={{
        display: 'inline-block',
        width: '2px',
        height: '1em',
        background: '#8b1a2f',
        marginLeft: '1px',
        verticalAlign: 'text-bottom',
        borderRadius: '1px',
      }}
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
    />
  )
}

export default function LoveLetter() {
  const [sectionRef, inView] = useHighlight(0.1)
  const [opened, setOpened] = useState(false)
  const [typed, setTyped] = useState('')
  const [done, setDone] = useState(false)

  const openedRef = useRef(false)
  const idxRef = useRef(0)
  const timerRef = useRef(null)
  const skippedRef = useRef(false)

  const clearTimer = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null }
  }

  const tick = useCallback(() => {
    if (!openedRef.current || skippedRef.current) return
    const i = idxRef.current
    if (i > FULL_TEXT.length) { setDone(true); return }
    setTyped(FULL_TEXT.slice(0, i))
    idxRef.current = i + 1
    if (i < FULL_TEXT.length) {
      const ch = FULL_TEXT[i - 1]
      const delay = (ch === '.' || ch === '—' || ch === ',') ? 55 : 16
      timerRef.current = setTimeout(tick, delay)
    } else {
      setDone(true)
    }
  }, [])

  const startTyping = useCallback(() => {
    clearTimer()
    skippedRef.current = false
    idxRef.current = 0
    setTyped('')
    setDone(false)
    timerRef.current = setTimeout(tick, 600)
  }, [tick])

  const stopAll = useCallback(() => {
    clearTimer()
    openedRef.current = false
    skippedRef.current = false
    idxRef.current = 0
    setTyped('')
    setDone(false)
  }, [])

  const skip = useCallback((e) => {
    e.stopPropagation()
    clearTimer()
    skippedRef.current = true
    idxRef.current = FULL_TEXT.length
    setTyped(FULL_TEXT)
    setDone(true)
  }, [])

  const toggle = useCallback(() => {
    if (!openedRef.current) {
      openedRef.current = true
      setOpened(true)
    } else {
      stopAll()
      setOpened(false)
    }
  }, [stopAll])

  useEffect(() => {
    if (opened) startTyping()
  }, [opened, startTyping])

  useEffect(() => () => clearTimer(), [])

  return (
    <section
      ref={sectionRef}
      className={`section-highlight${inView ? ' in-view' : ''}`}
      style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        padding: 'clamp(64px,10vw,120px) 0',
        background: 'linear-gradient(160deg,#1a0510 0%,#2d0a1e 50%,#1a0510 100%)',
      }}
    >
      <div className="section-line" />
      <WaveDivider fill="#1a0a10" />
      {inView && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 65% 55% at 50% 40%,rgba(212,175,55,0.1) 0%,transparent 70%)' }} />
      )}

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '640px', margin: '0 auto', padding: '0 clamp(16px,5vw,40px)' }}>

        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '36px' }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,#d4af37)' }} />
            <svg viewBox="0 0 40 36" width="24" height="22" fill="#d4af37">
              <path d="M20 34C20 34 2 22 2 11C2 5.5 6.5 2 11 2C14.5 2 17.5 4 20 7C22.5 4 25.5 2 29 2C33.5 2 38 5.5 38 11C38 22 20 34 20 34Z"/>
            </svg>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,#d4af37,transparent)' }} />
          </div>
          <p style={{ color: '#e8a0b0', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(9px,1.5vw,11px)', letterSpacing: '0.45em', textTransform: 'uppercase', marginBottom: '10px' }}>
            A Letter from the Heart
          </p>
          <h2 className="font-playfair" style={{ color: '#fdf0f4', fontSize: 'clamp(1.8rem,5vw,2.8rem)', marginBottom: '10px' }}>
            Our Story, Our Promise
          </h2>
          <motion.p
            style={{ color: '#d4af37', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(10px,1.8vw,12px)', letterSpacing: '0.12em' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {opened ? '✉ Tap envelope to close' : '✉ Tap envelope to open'}
          </motion.p>
        </motion.div>

        {/* Envelope + letter */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Envelope */}
          <div
            onClick={toggle}
            style={{ position: 'relative', width: '100%', maxWidth: '380px', margin: '0 auto', cursor: 'pointer', perspective: '900px', userSelect: 'none' }}
          >
            <div style={{ position: 'relative', width: '100%', paddingBottom: '61%' }}>
              {/* Body */}
              <svg viewBox="0 0 360 220" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
                <rect x="0" y="0" width="360" height="220" rx="6" fill="#f5ead6" stroke="#d4af37" strokeWidth="1.5"/>
                <path d="M0 0 L180 130 L360 0" fill="#ede0c4" stroke="#d4af37" strokeWidth="1"/>
                <path d="M0 220 L180 130 L360 220" fill="#e8d5b0" stroke="#d4af37" strokeWidth="1"/>
                <path d="M0 0 L0 220 L180 130 Z" fill="#f0e4cc" stroke="#d4af37" strokeWidth="0.8"/>
                <path d="M360 0 L360 220 L180 130 Z" fill="#f0e4cc" stroke="#d4af37" strokeWidth="0.8"/>
                {!opened && (
                  <>
                    <circle cx="180" cy="133" r="22" fill="#d4af37" opacity="0.95"/>
                    <text x="180" y="140" textAnchor="middle" fill="#fdf8ee" fontSize="18" fontFamily="serif">♥</text>
                  </>
                )}
              </svg>

              {/* Flap */}
              <motion.div
                style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', transformOrigin: 'top center', zIndex: 4 }}
                animate={{ rotateX: opened ? -175 : 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <svg viewBox="0 0 360 110" style={{ width: '100%', height: '100%' }}>
                  <path d="M0 0 L180 100 L360 0 Z" fill="#ede0c4" stroke="#d4af37" strokeWidth="1.5"/>
                  <path d="M18 0 L180 82 L342 0" fill="none" stroke="rgba(212,175,55,0.25)" strokeWidth="0.8"/>
                </svg>
              </motion.div>

              {/* Pulse ring */}
              {!opened && (
                <motion.div
                  style={{ position: 'absolute', inset: 0, borderRadius: '6px', border: '2px solid rgba(212,175,55,0.5)', pointerEvents: 'none' }}
                  animate={{ scale: [1, 1.03, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
          </div>

          {/* Letter slides out */}
          <AnimatePresence>
            {opened && (
              <motion.div
                key="letter"
                initial={{ opacity: 0, y: -30, scaleY: 0.4 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -30, scaleY: 0.4 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  transformOrigin: 'top center',
                  marginTop: '-10px',
                  borderRadius: '0 0 20px 20px',
                  padding: 'clamp(32px,5vw,56px) clamp(24px,5vw,48px) clamp(28px,4vw,44px)',
                  /* ringvk.jpeg as background */
                  backgroundImage: `url(${ringBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1px solid rgba(212,175,55,0.28)',
                  borderTop: 'none',
                  boxShadow: '0 20px 60px rgba(184,134,11,0.15)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* White overlay so text is readable over the photo */}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,250,240,0.86)', pointerEvents: 'none' }} />
                {/* Lined paper texture */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(transparent,transparent 31px,rgba(212,175,55,0.07) 31px,rgba(212,175,55,0.07) 32px)', pointerEvents: 'none' }} />
                {/* Quote watermark */}
                <div style={{ position: 'absolute', top: '8px', left: '18px', fontFamily: 'Playfair Display,serif', fontSize: 'clamp(60px,10vw,90px)', color: 'rgba(212,175,55,0.12)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>"</div>

                {/* Skip button */}
                {!done && (
                  <motion.button
                    onClick={skip}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{
                      position: 'absolute', top: '14px', right: '16px',
                      background: 'rgba(212,175,55,0.18)',
                      border: '1px solid rgba(212,175,55,0.45)',
                      borderRadius: '999px',
                      padding: '5px 16px',
                      fontSize: '11px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#8b6914',
                      fontFamily: 'Lato,sans-serif',
                      cursor: 'pointer',
                      zIndex: 10,
                    }}
                    whileHover={{ background: 'rgba(212,175,55,0.35)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Skip ›
                  </motion.button>
                )}

                {/* Typed text */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p
                    className="font-cormorant"
                    style={{
                      color: '#4a2c1a',
                      fontSize: 'clamp(1rem,2.5vw,1.22rem)',
                      lineHeight: 2,
                      whiteSpace: 'pre-wrap',
                      minHeight: '2em',
                    }}
                  >
                    {typed}
                    {!done && <Cursor />}
                  </p>

                  <AnimatePresence>
                    {done && (
                      <motion.div
                        key="seal"
                        style={{ display: 'flex', justifyContent: 'center', marginTop: '28px' }}
                        initial={{ opacity: 0, scale: 0, rotate: -20 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.55, ease: 'backOut' }}
                      >
                        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%,#e8c84a,#b8860b)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(184,134,11,0.4)' }}>
                          <svg viewBox="0 0 40 36" width="22" height="20" fill="#fdf8ee">
                            <path d="M20 34C20 34 2 22 2 11C2 5.5 6.5 2 11 2C14.5 2 17.5 4 20 7C22.5 4 25.5 2 29 2C33.5 2 38 5.5 38 11C38 22 20 34 20 34Z"/>
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
