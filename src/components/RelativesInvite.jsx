import { motion } from 'framer-motion'
import useHighlight from '../hooks/useHighlight'

export default function RelativesInvite() {
  const [ref, inView] = useHighlight(0.08)

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section
      ref={ref}
      className={`section-highlight${inView ? ' in-view' : ''}`}
      style={{
        position: 'relative',
        width: '100%',
        padding: 'clamp(64px,10vw,120px) 0',
        background: 'linear-gradient(160deg, #f0e8d5 0%, #faf8f3 60%, #f5ead6 100%)',
      }}
    >
      <div className="section-line" />
      {inView && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 65% 55% at 50% 40%, rgba(139,26,47,0.06) 0%, transparent 70%)' }} />
      )}

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '760px', margin: '0 auto', padding: '0 clamp(16px,5vw,40px)' }}>

        {/* Header */}
        <motion.div style={{ textAlign: 'center', marginBottom: '40px' }} {...fadeUp(0)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,#8b1a2f)' }} />
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#8b1a2f">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,#8b1a2f,transparent)' }} />
          </div>
          <p style={{ color: '#8b1a2f', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(9px,1.5vw,11px)', letterSpacing: '0.45em', textTransform: 'uppercase', marginBottom: '12px' }}>
            You Are Our World
          </p>
          <h2 className="font-playfair" style={{ color: '#4a2c1a', fontSize: 'clamp(1.8rem,5vw,2.8rem)' }}>
            A Heartfelt Call to Our Beloved Family &amp; Friends
          </h2>
        </motion.div>

        {/* Main invite card */}
        <motion.div
          {...fadeUp(0.18)}
          style={{
            borderRadius: '20px',
            padding: 'clamp(28px,5vw,56px) clamp(24px,5vw,56px)',
            background: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(139,26,47,0.15)',
            boxShadow: '0 16px 60px rgba(139,26,47,0.08)',
            backdropFilter: 'blur(14px)',
            textAlign: 'center',
          }}
        >
          <motion.p className="font-cormorant" {...fadeUp(0.26)}
            style={{ color: '#4a2c1a', fontSize: 'clamp(1.1rem,2.8vw,1.45rem)', lineHeight: 1.9, marginBottom: '24px', fontStyle: 'italic' }}>
            Dear Amma, Appa, Thatha, Paati, Chitthi, Periappa, Maama, Maami,
            Akka, Anna, Thambi, Thangachi — and every precious soul who has
            ever called us family...
          </motion.p>

          <motion.p className="font-cormorant" {...fadeUp(0.33)}
            style={{ color: '#5a3a1a', fontSize: 'clamp(1.05rem,2.5vw,1.35rem)', lineHeight: 1.85, marginBottom: '20px' }}>
            You have been the roots that kept us grounded, the wings that taught us to fly, and the warmth that made every house a home. Every milestone in our lives has been made sweeter because you were there — cheering, praying, and loving us unconditionally.
          </motion.p>

          <motion.p className="font-cormorant" {...fadeUp(0.4)}
            style={{ color: '#5a3a1a', fontSize: 'clamp(1.05rem,2.5vw,1.35rem)', lineHeight: 1.85, marginBottom: '20px' }}>
            What began as a meeting arranged by two families who trusted each other became something neither of us expected — a quiet understanding, a growing warmth, and a love that felt both new and familiar at the same time. They say arranged marriages are chosen by the family, but what grew between Selvaraja and Rathna was chosen by the heart.
          </motion.p>

          <motion.p className="font-cormorant" {...fadeUp(0.47)}
            style={{ color: '#5a3a1a', fontSize: 'clamp(1.05rem,2.5vw,1.35rem)', lineHeight: 1.85, marginBottom: '32px' }}>
            Now, as we step into the most beautiful chapter of our lives, we cannot imagine beginning it without your blessings, your laughter, and your presence beside us. A celebration without you would be like a garland without flowers — incomplete. Please come. Not just as guests — but as the heartbeat of this celebration. Your smile is our decoration, your blessing is our auspiciousness, and your love is the greatest gift you could ever give us on this day.
          </motion.p>

          {/* Highlighted invite box */}
          <motion.div
            {...fadeUp(0.54)}
            style={{
              borderRadius: '16px',
              padding: 'clamp(20px,4vw,36px)',
              background: 'linear-gradient(135deg, rgba(139,26,47,0.06), rgba(212,175,55,0.08))',
              border: '1px solid rgba(139,26,47,0.18)',
              marginBottom: '28px',
            }}
          >
            <p className="font-playfair" style={{ color: '#8b1a2f', fontSize: 'clamp(1.1rem,2.8vw,1.5rem)', marginBottom: '12px' }}>
              We joyfully invite you to grace us with your presence at
            </p>
            <p className="font-playfair" style={{ color: '#4a2c1a', fontSize: 'clamp(1.3rem,3.5vw,2rem)', fontWeight: 600, marginBottom: '8px' }}>
              The Wedding of
            </p>
            <p className="font-playfair" style={{ color: '#8b1a2f', fontSize: 'clamp(1.2rem,3vw,1.8rem)', marginBottom: '4px' }}>
              A. Selvaraja
            </p>
            <p className="font-playfair" style={{ color: '#d4af37', fontSize: 'clamp(1.3rem,3vw,1.8rem)', margin: '6px 0' }}>&amp;</p>
            <p className="font-playfair" style={{ color: '#8b1a2f', fontSize: 'clamp(1.2rem,3vw,1.8rem)', marginBottom: '20px' }}>
              R. Rathna
            </p>
            <p className="font-cormorant" style={{ color: '#5a3a1a', fontSize: 'clamp(1rem,2.5vw,1.3rem)', lineHeight: 1.7, fontStyle: 'italic' }}>
              🌼 Haldi: 28 May 2026, 4:00 PM – 9:00 PM<br/>
              💍 Muhurtham: 29 May 2026, 8:30 AM – 9:30 AM<br/>
              📍 Bellezza Event Hall, Coimbatore
            </p>
          </motion.div>

          <motion.p className="font-cormorant" {...fadeUp(0.62)}
            style={{ color: '#4a2c1a', fontSize: 'clamp(1.1rem,2.8vw,1.45rem)', lineHeight: 1.85, fontStyle: 'italic', marginBottom: '24px' }}>
            Come, eat with us, dance with us, cry happy tears with us.
            Let your laughter fill the halls and your blessings fill our hearts.
            We need you there — not just as witnesses, but as the very reason
            this day will be unforgettable. Because it was you — your prayers,
            your trust, your love — that brought two hearts together.
          </motion.p>

          <motion.div {...fadeUp(0.68)} style={{ borderTop: '1px solid rgba(212,175,55,0.2)', paddingTop: '24px' }}>
            <p className="font-playfair" style={{ color: '#8b1a2f', fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', fontStyle: 'italic', marginBottom: '6px' }}>
              With folded hands and full hearts,
            </p>
            <p className="font-playfair" style={{ color: '#4a2c1a', fontSize: 'clamp(1.2rem,3vw,1.6rem)', fontWeight: 600 }}>
              Mr. &amp; Mrs. Family
            </p>
            <p className="font-cormorant" style={{ color: '#8b6914', fontSize: 'clamp(0.9rem,2vw,1.1rem)', fontStyle: 'italic', marginTop: '4px' }}>
              &amp; the entire family
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
