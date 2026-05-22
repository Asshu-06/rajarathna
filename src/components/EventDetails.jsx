import { useState } from 'react'
import { motion } from 'framer-motion'
import useHighlight from '../hooks/useHighlight'

const ECGIcon = () => (
  <svg viewBox="0 0 80 24" width="80" height="24">
    <path d="M0,12 L16,12 L22,2 L28,22 L34,6 L40,12 L80,12"
      stroke="#d4af37" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </svg>
)

function FlipCard({ title, date, time, venue, accent, icon, backContent, delay, inView }) {
  const [flipped, setFlipped] = useState(false)
  const cardHeight = 'clamp(300px,42vw,400px)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => setFlipped(f => !f)}
      style={{
        perspective: '1200px',
        cursor: 'pointer',
        height: cardHeight,
        width: '100%',
      }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* FRONT */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          borderRadius: '20px',
          padding: 'clamp(24px,4vw,44px) clamp(20px,4vw,36px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          background: 'rgba(255,255,255,0.82)',
          border: `1px solid ${accent}45`,
          boxShadow: `0 10px 44px ${accent}20`,
          backdropFilter: 'blur(14px)',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px', borderRadius: '999px', background: `linear-gradient(90deg,transparent,${accent},transparent)` }} />
          <div style={{ fontSize: '2rem', marginBottom: '14px' }}>{icon}</div>
          <h3 className="font-playfair" style={{ color: '#4a2c1a', fontSize: 'clamp(1.2rem,3vw,1.7rem)', marginBottom: '10px' }}>{title}</h3>
          <ECGIcon />
          <p className="font-playfair" style={{ color: accent, fontSize: 'clamp(1.1rem,2.8vw,1.6rem)', fontWeight: 600, marginTop: '12px', marginBottom: '4px' }}>{date}</p>
          <p className="font-cormorant" style={{ color: '#5a3a1a', fontSize: 'clamp(1rem,2.5vw,1.3rem)', marginBottom: '10px' }}>{time}</p>
          {venue && (
            <p style={{ color: '#8b6914', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(0.8rem,1.8vw,0.92rem)', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(212,175,55,0.2)', width: '100%' }}>
              📍 {venue}
            </p>
          )}
          <motion.p
            style={{ color: accent, fontFamily: 'Lato,sans-serif', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '12px', opacity: 0.7 }}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap to reveal ›
          </motion.p>
        </div>

        {/* BACK */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: '20px',
          padding: 'clamp(24px,4vw,44px) clamp(20px,4vw,36px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
          background: `linear-gradient(135deg, ${accent}18, ${accent}06)`,
          border: `1px solid ${accent}50`,
          boxShadow: `0 10px 44px ${accent}25`,
          backdropFilter: 'blur(14px)',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px', borderRadius: '999px', background: `linear-gradient(90deg,transparent,${accent},transparent)` }} />
          <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '2px', borderRadius: '999px', background: `linear-gradient(90deg,transparent,${accent},transparent)` }} />

          <svg viewBox="0 0 24 24" width="28" height="28" fill={accent} style={{ marginBottom: '14px', opacity: 0.85 }}>
            <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5Z"/>
          </svg>

          {backContent.map((item, i) => (
            <div key={i} style={{ marginBottom: i < backContent.length - 1 ? '14px' : 0, width: '100%' }}>
              <p style={{ color: accent, fontFamily: 'Lato,sans-serif', fontSize: 'clamp(8px,1.5vw,10px)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '4px' }}>
                {item.label}
              </p>
              <p className="font-cormorant" style={{ color: '#4a2c1a', fontSize: 'clamp(0.9rem,2.2vw,1.15rem)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                {item.value}
              </p>
              {i < backContent.length - 1 && (
                <div style={{ width: '40px', height: '1px', background: `${accent}40`, margin: '10px auto 0' }} />
              )}
            </div>
          ))}

          <motion.p
            style={{ color: accent, fontFamily: 'Lato,sans-serif', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '14px', opacity: 0.6 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ‹ Tap to go back
          </motion.p>
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
      style={{ position: 'relative', width: '100%', padding: 'clamp(48px,8vw,96px) 0', background: 'linear-gradient(180deg,#faf8f3 0%,#f0e8d5 100%)' }}
    >
      <div className="section-line" />
      {inView && <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(212,175,55,0.09) 0%,transparent 70%)' }} />}

      <div style={{ width: '100%', maxWidth: '960px', margin: '0 auto', padding: '0 clamp(16px,5vw,40px)' }}>

        <motion.div
          style={{ textAlign: 'center', marginBottom: 'clamp(32px,5vw,56px)' }}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
        >
          <p style={{ color: '#b8860b', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(9px,1.5vw,11px)', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Save the Date
          </p>
          <h2 className="font-playfair" style={{ color: '#4a2c1a', fontSize: 'clamp(1.8rem,5vw,3rem)', marginBottom: '16px' }}>
            Event Details
          </h2>
          <div className="gold-divider" />
          <p style={{ color: '#8b6914', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(10px,1.8vw,12px)', marginTop: '12px', letterSpacing: '0.08em' }}>
            Tap each card to discover more
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'clamp(16px,3vw,40px)', alignItems: 'stretch' }}>
          <FlipCard
            title="Haldi Ceremony"
            date="28 May 2026"
            time="4:00 PM – 9:00 PM"
            venue="Bellezza Event Hall, Coimbatore"
            icon="🌼"
            accent="#b8860b"
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
            accent="#8b1a2f"
            backContent={weddingBack}
            delay={0.22}
            inView={inView}
          />
        </div>

        {/* ECG strip */}
        <motion.div
          style={{ marginTop: 'clamp(32px,5vw,56px)', display: 'flex', justifyContent: 'center' }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 0.4 }}
        >
          <svg viewBox="0 0 600 40" style={{ width: '100%', maxWidth: '560px', height: '40px' }}>
            <path d="M0,20 L100,20 L118,20 L130,4 L142,36 L154,10 L166,20 L200,20 L300,20 L318,20 L330,4 L342,36 L354,10 L366,20 L400,20 L600,20"
              stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.4" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
