import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useHighlight from '../hooks/useHighlight'
import WaveDivider from './WaveDivider'

const TARGET = new Date('2026-05-29T08:30:00')

function getTimeLeft() {
  const diff = TARGET - new Date()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function TimeBox({ value, label, inView, delay }) {
  return (
    <motion.div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08, y: -4 }}
    >
      <div style={{
        width: 'clamp(64px,12vw,120px)',
        height: 'clamp(64px,12vw,120px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, rgba(212,175,55,0.18), rgba(212,175,55,0.05))',
        border: '1px solid rgba(212,175,55,0.5)',
        boxShadow: '0 6px 28px rgba(212,175,55,0.15), inset 0 1px 0 rgba(212,175,55,0.25)',
      }}>
        <span className="font-playfair" style={{
          color: '#d4af37',
          fontSize: 'clamp(1.5rem,4vw,3rem)',
          fontWeight: 600,
          lineHeight: 1,
        }}>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span style={{
        marginTop: '10px',
        fontSize: 'clamp(9px,1.5vw,12px)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#e8a0b0',
        fontFamily: 'Lato, sans-serif',
      }}>
        {label}
      </span>
    </motion.div>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft())
  const [ref, inView] = useHighlight(0.15)

  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      ref={ref}
      className={`section-highlight${inView ? ' in-view' : ''}`}
      style={{
        position: 'relative',
        width: '100%',
        padding: 'clamp(64px,10vw,120px) 0',
        background: 'linear-gradient(180deg,#1a0510 0%,#2d0a1e 100%)',
      }}
    >
      <div className="section-line" />
      <WaveDivider fill="#1a0510" />
      {inView && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,175,55,0.1) 0%, transparent 70%)' }} />
      )}

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '700px', margin: '0 auto', padding: '0 clamp(16px,5vw,40px)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p style={{ color: '#e8a0b0', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(9px,1.5vw,11px)', letterSpacing: '0.45em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Counting down to our special day
          </p>
          <h2 className="font-playfair" style={{ color: '#f5e6d0', fontSize: 'clamp(1.8rem,5vw,3rem)', marginBottom: '8px' }}>
            29 May 2026
          </h2>
          <p className="font-cormorant" style={{ color: '#d4a0b0', fontSize: 'clamp(1rem,2.5vw,1.4rem)', fontStyle: 'italic', marginBottom: 'clamp(28px,5vw,48px)' }}>
            8:30 AM — Bellezza Event Hall, Coimbatore
          </p>
        </motion.div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(8px,2.5vw,32px)', flexWrap: 'nowrap', padding: 'clamp(8px,2vw,16px) 0' }}>
          <TimeBox value={time.days}    label="Days"    inView={inView} delay={0.1} />
          <motion.span className="font-playfair" style={{ color: '#d4af37', fontSize: 'clamp(1.5rem,4vw,2.5rem)', paddingBottom: '28px', userSelect: 'none' }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>:</motion.span>
          <TimeBox value={time.hours}   label="Hours"   inView={inView} delay={0.2} />
          <motion.span className="font-playfair" style={{ color: '#d4af37', fontSize: 'clamp(1.5rem,4vw,2.5rem)', paddingBottom: '28px', userSelect: 'none' }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>:</motion.span>
          <TimeBox value={time.minutes} label="Minutes" inView={inView} delay={0.3} />
          <motion.span className="font-playfair" style={{ color: '#d4af37', fontSize: 'clamp(1.5rem,4vw,2.5rem)', paddingBottom: '28px', userSelect: 'none' }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>:</motion.span>
          <TimeBox value={time.seconds} label="Seconds" inView={inView} delay={0.4} />
        </div>
      </div>
    </section>
  )
}
