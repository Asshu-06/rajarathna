import { motion } from 'framer-motion'
import useHighlight from '../hooks/useHighlight'

export default function Invitation() {
  const [ref, inView] = useHighlight(0.08)

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section
      ref={ref}
      className={`section-highlight${inView ? ' in-view' : ''}`}
      style={{
        position: 'relative',
        width: '100%',
        padding: 'clamp(64px,10vw,120px) 0',
        background: 'linear-gradient(180deg,#0d0f2b 0%,#141640 100%)',
      }}
    >
      <div className="section-line" />
      {inView && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,175,55,0.09) 0%, transparent 70%)' }} />
      )}

      <div style={{ width: '100%', maxWidth: '760px', margin: '0 auto', padding: '0 clamp(16px,5vw,40px)' }}>

        <motion.div style={{ textAlign: 'center', marginBottom: '36px' }} {...fadeUp(0)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,#d4af37)' }} />
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#d4af37" style={{ flexShrink: 0 }}>
              <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5Z"/>
            </svg>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,#d4af37,transparent)' }} />
          </div>
          <p style={{ color: '#9b9fe8', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(9px,1.5vw,11px)', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Invitation
          </p>
          <h2 className="font-playfair" style={{ color: '#e8e9ff', fontSize: 'clamp(1.8rem,5vw,3rem)' }}>
            Join Us in Celebration
          </h2>
        </motion.div>

        <motion.div
          {...fadeUp(0.15)}
          style={{
            borderRadius: '20px',
            padding: 'clamp(24px,5vw,56px) clamp(20px,5vw,56px)',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(155,159,232,0.3)',
            boxShadow: '0 16px 60px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <p className="font-cormorant" style={{ color: '#c8caff', fontSize: 'clamp(1rem,2.5vw,1.4rem)', fontStyle: 'italic', textAlign: 'center', lineHeight: 1.7, marginBottom: '20px' }}>
            Mr. &amp; Mrs. Family cordially invite you to celebrate the auspicious wedding ceremony of
          </p>
          <p className="font-cormorant" style={{ color: '#a8aaee', fontSize: 'clamp(0.95rem,2vw,1.25rem)', textAlign: 'center', lineHeight: 1.7, marginBottom: '24px' }}>
            With the blessings of family and friends, we request your gracious presence to make this occasion more memorable.
          </p>

          <motion.div
            style={{ textAlign: 'center', padding: 'clamp(16px,3vw,28px) 0', borderTop: '1px solid rgba(155,159,232,0.25)', borderBottom: '1px solid rgba(155,159,232,0.25)', marginBottom: '28px' }}
            {...fadeUp(0.28)}
          >
            <p className="font-playfair" style={{ color: '#e8e9ff', fontSize: 'clamp(1.4rem,4vw,2.5rem)' }}>✨ A. Selvaraja</p>
            <p className="font-playfair" style={{ color: '#d4af37', fontSize: 'clamp(1.6rem,4vw,2.5rem)', margin: '12px 0' }}>with</p>
            <p className="font-playfair" style={{ color: '#e8e9ff', fontSize: 'clamp(1.4rem,4vw,2.5rem)' }}>✨ R. Rathna</p>
          </motion.div>

          <motion.div {...fadeUp(0.38)} style={{ marginBottom: '16px' }}>
            <p className="font-cormorant" style={{ color: '#9b9fe8', fontSize: 'clamp(1rem,2.5vw,1.3rem)', textAlign: 'center', marginBottom: '8px' }}>
              🌼 Haldi Ceremony
            </p>
            <p className="font-cormorant" style={{ color: '#c8caff', fontSize: 'clamp(0.95rem,2vw,1.2rem)', textAlign: 'center', lineHeight: 1.7 }}>
              📅 28th May 2026 &nbsp;🕓 4:00 PM – 9:00 PM
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.44)} style={{ marginBottom: '20px' }}>
            <p className="font-cormorant" style={{ color: '#9b9fe8', fontSize: 'clamp(1rem,2.5vw,1.3rem)', textAlign: 'center', marginBottom: '8px' }}>
              💍 Muhurtham / Marriage
            </p>
            <p className="font-cormorant" style={{ color: '#c8caff', fontSize: 'clamp(0.95rem,2vw,1.2rem)', textAlign: 'center', lineHeight: 1.7 }}>
              📅 29th May 2026 &nbsp;🕣 8:30 AM – 9:30 AM
            </p>
            <p className="font-cormorant" style={{ color: '#c8caff', fontSize: 'clamp(0.95rem,2vw,1.2rem)', textAlign: 'center', lineHeight: 1.7 }}>
              📍 Bellezza Event Hall, Coimbatore
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
