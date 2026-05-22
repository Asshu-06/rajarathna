import { motion } from 'framer-motion'
import useHighlight from '../hooks/useHighlight'

export default function MapFooter() {
  const [ref, inView] = useHighlight(0.08)
  const mapUrl = 'https://maps.google.com/maps?q=Bellezza+Event+Hall+Coimbatore+Tamil+Nadu&t=&z=17&ie=UTF8&iwloc=&output=embed'

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <footer
      ref={ref}
      className={`section-highlight${inView ? ' in-view' : ''}${inView ? ' section-glow' : ''}`}
      style={{ position: 'relative', width: '100%', background: 'linear-gradient(180deg,#faf8f3 0%,#ede0c4 100%)' }}
    >
      <div className="section-line" />

      {inView && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(212,175,55,0.09) 0%, transparent 65%)' }} />
      )}

      <div style={{ width: '100%', maxWidth: '960px', margin: '0 auto', padding: 'clamp(48px,8vw,80px) clamp(16px,5vw,40px)' }}>

        <motion.div style={{ textAlign: 'center', marginBottom: 'clamp(28px,4vw,48px)' }} {...fadeUp(0)}>
          <p style={{ color: '#b8860b', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(9px,1.5vw,11px)', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Find Us
          </p>
          <h2 className="font-playfair" style={{ color: '#4a2c1a', fontSize: 'clamp(1.8rem,5vw,3rem)', marginBottom: '8px' }}>
            Venue Location
          </h2>
          <p className="font-cormorant" style={{ color: '#8b6914', fontSize: 'clamp(1rem,2.5vw,1.3rem)', fontStyle: 'italic', marginBottom: '16px' }}>
            Bellezza Event Hall, Coimbatore
          </p>
          <div className="gold-divider" />
        </motion.div>

        {/* Map */}
        <motion.div
          {...fadeUp(0.15)}
          style={{
            borderRadius: '20px', overflow: 'hidden',
            marginBottom: 'clamp(24px,4vw,40px)',
            boxShadow: inView ? '0 16px 56px rgba(184,134,11,0.2)' : '0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid rgba(212,175,55,0.35)',
            transition: 'box-shadow 0.8s ease',
          }}
        >
          <iframe src={mapUrl} width="100%" height="380"
            style={{ border: 0, display: 'block', minHeight: '260px' }}
            allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title="Wedding Venue Location"
          />
        </motion.div>

        {/* Button */}
        <motion.div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'clamp(32px,5vw,56px)' }} {...fadeUp(0.25)}>
          <a
            href="https://www.google.com/maps/search/Bellezza+Event+Hall+Coimbatore+Tamil+Nadu"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: 'clamp(10px,2vw,14px) clamp(24px,4vw,40px)',
              borderRadius: '999px',
              background: 'linear-gradient(135deg,#b8860b,#d4af37)',
              color: '#fdf8ee',
              fontFamily: 'Lato,sans-serif',
              fontSize: 'clamp(10px,1.5vw,13px)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 6px 24px rgba(184,134,11,0.38)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(184,134,11,0.52)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(184,134,11,0.38)' }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            View Location
          </a>
        </motion.div>

        {/* Sign-off */}
        <motion.div style={{ textAlign: 'center', borderTop: '1px solid rgba(212,175,55,0.22)', paddingTop: 'clamp(24px,4vw,40px)' }} {...fadeUp(0.35)}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg,transparent,#d4af37)' }} />
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#d4af37">
              <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5Z"/>
            </svg>
            <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg,#d4af37,transparent)' }} />
          </div>
          <p className="font-playfair" style={{ color: '#4a2c1a', fontSize: 'clamp(1.1rem,3vw,1.8rem)', fontStyle: 'italic', marginBottom: '10px' }}>
            "Built on love, blessed by tradition"
          </p>
          <p className="font-cormorant" style={{ color: '#8b6914', fontSize: 'clamp(0.95rem,2vw,1.2rem)' }}>
            A. Selvaraja &amp; R. Rathna
          </p>
          <p style={{ color: '#b8a080', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(9px,1.5vw,11px)', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: '16px' }}>
            29 May 2026 · Bellezza Event Hall, Coimbatore
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
