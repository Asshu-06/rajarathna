import { useState } from 'react'
import { motion } from 'framer-motion'
import useHighlight from '../hooks/useHighlight'

function FlipCard({ title, date, time, venue, icon, accent, backContent, delay, inView }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => setFlipped(f => !f)}
      style={{
        cursor: 'pointer',
        perspective: '1200px',
        minHeight: 'clamp(320px,44vw,420px)',
        userSelect: 'none',
      }}
    >
      {/* Flip container */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: 'clamp(320px,44vw,420px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ── FRONT ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          borderRadius: '20px',
          padding: 'clamp(24px,4vw,44px) clamp(20px,4vw,36px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          background: 'rgba(139,26,47,0.15)',
          border: `1px solid ${accent}60`,
          boxShadow: `0 8px 40px rgba(139,26,47,0.18), inset 0 1px 0 ${accent}20`,
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '14px' }}>{icon}</div>
          <h3 className="font-playfair" style={{ color: '#f5e6d0', fontSize: 'clamp(1.2rem,3vw,1.7rem)', marginBottom: '10px' }}>{title}</h3>
          <p className="font-playfair" style={{ color: accent, fontSize: 'clamp(1.1rem,2.8vw,1.6rem)', fontWeight: 600, marginBottom: '4px' }}>{date}</p>
          <p className="font-cormorant" style={{ color: '#e8c8d0', fontSize: 'clamp(1rem,2.5vw,1.3rem)', marginBottom: '10px' }}>{time}</p>
          {venue && (
            <p style={{ color: '#d4a0b0', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(0.8rem,1.8vw,0.92rem)', marginBottom: '20px' }}>
              📍 {venue}
            </p>
          )}
          {/* Tap hint */}
          <div style={{
            marginTop: 'auto',
            display: 'flex', alignItems: 'center', gap: '6px',
            color: accent, opacity: 0.7,
            fontFamily: 'Lato,sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"/>
            </svg>
            Tap to flip
          </div>
        </div>

        {/* ── BACK ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: '20px',
          padding: 'clamp(24px,4vw,44px) clamp(20px,4vw,36px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          background: `linear-gradient(135deg, rgba(139,26,47,0.35), rgba(45,10,30,0.9))`,
          border: `1px solid ${accent}80`,
          boxShadow: `0 8px 40px rgba(139,26,47,0.3), inset 0 1px 0 ${accent}30`,
          backdropFilter: 'blur(16px)',
        }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '16px' }}>✨</div>
          <h3 className="font-playfair" style={{ color: accent, fontSize: 'clamp(1rem,2.5vw,1.4rem)', marginBottom: '20px', letterSpacing: '0.05em' }}>
            {title}
          </h3>
          <div style={{ width: '100%' }}>
            {backContent.map((item, i) => (
              <div key={i} style={{
                marginBottom: '16px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: `rgba(212,175,55,0.08)`,
                border: `1px solid ${accent}25`,
              }}>
                <p style={{ color: accent, fontFamily: 'Lato,sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {item.label}
                </p>
                <p className="font-cormorant" style={{ color: '#f0dce4', fontSize: 'clamp(0.9rem,2vw,1.1rem)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          {/* Tap hint back */}
          <div style={{
            marginTop: '12px',
            color: '#a06070', fontFamily: 'Lato,sans-serif', fontSize: '10px',
            letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.7,
          }}>
            ↩ Tap to go back
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function EventDetails() {
  const [ref, inView] = useHighlight(0.12)

  const weddingBack = [
    { label: 'Dress Code', value: 'Traditional / Ethnic Wear\nSaree, Dhoti, Kurta welcome' },
    { label: 'Muhurtham', value: '8:30 AM sharp\nPlease arrive by 8:00 AM' },
    { label: 'Blessings', value: '"May your presence fill our hearts\nwith joy and our home with love"' },
  ]

  const haldiBack = [
    { label: 'Dress Code', value: 'Yellow / Traditional Wear\nFestive & colourful attire' },
    { label: 'Programme', value: 'Haldi Ceremony\nMusic · Celebrations · Dinner' },
    { label: 'Note', value: '"Your smile is our decoration,\nyour blessing our greatest gift"' },
  ]

  return (
    <section
      ref={ref}
      className={`section-highlight${inView ? ' in-view' : ''}`}
      style={{ position: 'relative', zIndex: 2, width: '100%', padding: 'clamp(48px,8vw,96px) 0', background: 'linear-gradient(180deg,#1a0510 0%,#2d0a1e 100%)' }}
    >
      <div className="section-line" />

      {inView && <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(212,175,55,0.09) 0%,transparent 70%)' }} />}

      <div style={{ width: '100%', maxWidth: '960px', margin: '0 auto', padding: '0 clamp(16px,5vw,40px)' }}>

        <motion.div
          style={{ textAlign: 'center', marginBottom: 'clamp(32px,5vw,56px)' }}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
        >
          <p style={{ color: '#e8a0b0', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(9px,1.5vw,11px)', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Save the Date
          </p>
          <h2 className="font-playfair" style={{ color: '#f5e6d0', fontSize: 'clamp(1.8rem,5vw,3rem)', marginBottom: '16px' }}>
            Event Details
          </h2>
          <div className="gold-divider" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'clamp(16px,3vw,40px)', alignItems: 'stretch' }}>
          <FlipCard
            title="Haldi Ceremony"
            date="28 May 2026"
            time="4:00 PM – 9:00 PM"
            venue="Bellezza Event Hall, Coimbatore"
            icon="🌼"
            accent="#d4af37"
            backContent={haldiBack}
            delay={0.1}
            inView={inView}
          />
          <FlipCard
            title="Muhurtham / Marriage"
            date="29 May 2026"
            time="8:30 AM – 9:30 AM"
            venue="Bellezza Event Hall, Coimbatore"
            icon="💍"
            accent="#e8a0b0"
            backContent={weddingBack}
            delay={0.22}
            inView={inView}
          />
        </div>
      </div>
    </section>
  )
}
