import { useState } from 'react'
import { motion } from 'framer-motion'
import useHighlight from '../hooks/useHighlight'
import WaveDivider from './WaveDivider'

function EventCard({ title, date, time, venue, icon, accent, backContent, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderRadius: '20px',
        padding: 'clamp(24px,4vw,44px) clamp(20px,4vw,36px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        background: 'rgba(139,26,47,0.15)',
        border: `1px solid ${accent}60`,
        boxShadow: `0 8px 40px rgba(139,26,47,0.18), inset 0 1px 0 ${accent}20`,
        backdropFilter: 'blur(12px)',
        minHeight: 'clamp(300px,42vw,400px)',
      }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{icon}</div>
      <h3 className="font-playfair" style={{ color: '#f5e6d0', fontSize: 'clamp(1.2rem,3vw,1.7rem)', marginBottom: '10px' }}>{title}</h3>
      <p className="font-playfair" style={{ color: accent, fontSize: 'clamp(1.1rem,2.8vw,1.6rem)', fontWeight: 600, marginBottom: '4px' }}>{date}</p>
      <p className="font-cormorant" style={{ color: '#e8c8d0', fontSize: 'clamp(1rem,2.5vw,1.3rem)', marginBottom: '10px' }}>{time}</p>
      {venue && <p style={{ color: '#d4a0b0', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(0.8rem,1.8vw,0.92rem)', marginBottom: '16px' }}>📍 {venue}</p>}
      <div style={{ borderTop: `1px solid ${accent}30`, width: '100%', paddingTop: '12px' }}>
        {backContent.map((item, i) => (
          <div key={i} style={{ marginBottom: '8px' }}>
            <p style={{ color: accent, fontFamily: 'Lato,sans-serif', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase' }}>{item.label}</p>
            <p className="font-cormorant" style={{ color: '#e8c8d0', fontSize: 'clamp(0.85rem,2vw,1.05rem)', whiteSpace: 'pre-line' }}>{item.value}</p>
          </div>
        ))}
      </div>
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
      style={{ position: 'relative', width: '100%', padding: 'clamp(48px,8vw,96px) 0', background: 'linear-gradient(180deg,#1a0510 0%,#2d0a1e 100%)' }}
    >
      <div className="section-line" />
      <WaveDivider fill="#1a0510" />
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
          <EventCard
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
          <EventCard
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
