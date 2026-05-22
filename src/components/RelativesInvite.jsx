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
        background: 'linear-gradient(160deg, #0a1f1a 0%, #0f2d24 60%, #0a1f1a 100%)',
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
          <p style={{ color: '#7ecfb0', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(9px,1.5vw,11px)', letterSpacing: '0.45em', textTransform: 'uppercase', marginBottom: '12px' }}>
            You Are Our World
          </p>
          <h2 className="font-playfair" style={{ color: '#e8f5f0', fontSize: 'clamp(1.8rem,5vw,2.8rem)' }}>
            From Kumbakonam to Coimbatore — One Beautiful Story
          </h2>
        </motion.div>

        {/* Main invite card */}
        <motion.div
          {...fadeUp(0.18)}
          style={{
            borderRadius: '20px',
            padding: 'clamp(28px,5vw,56px) clamp(24px,5vw,56px)',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(126,207,176,0.25)',
            boxShadow: '0 16px 60px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(14px)',
            textAlign: 'center',
          }}
        >
          <motion.p className="font-cormorant" {...fadeUp(0.22)}
            style={{ color: '#c8ede0', fontSize: 'clamp(1rem,2.5vw,1.35rem)', lineHeight: 1.9, marginBottom: '20px', fontStyle: 'italic' }}>
            From the sacred temple streets of Kumbakonam, where every dawn begins with prayer bells and tradition flows like the Cauvery… To the vibrant city of Coimbatore, where dreams rise alongside skylines and hard work builds tomorrow… Two different worlds were destined to meet.
          </motion.p>

          <motion.p className="font-cormorant" {...fadeUp(0.28)}
            style={{ color: '#a8d8c8', fontSize: 'clamp(1rem,2.5vw,1.3rem)', lineHeight: 1.85, marginBottom: '20px' }}>
            One heart grew among culture, devotion, and timeless traditions. Another heart grew amidst ambition, engineering, construction, and the spirit of creating something lasting for the future. And somewhere between these two beautiful journeys, destiny quietly began writing a story called <strong style={{ color: '#7ecfb0' }}>"Selvaraja &amp; Rathna."</strong>
          </motion.p>

          <motion.p className="font-cormorant" {...fadeUp(0.34)}
            style={{ color: '#c8ede0', fontSize: 'clamp(1rem,2.5vw,1.35rem)', lineHeight: 1.9, marginBottom: '20px', fontStyle: 'italic' }}>
            Dear Amma, Appa, Thatha, Paati, Chitthi, Periappa, Maama, Maami, Akka, Anna, Thambi, Thangachi — and every soul who has walked beside us through life…
          </motion.p>

          <motion.p className="font-cormorant" {...fadeUp(0.39)}
            style={{ color: '#a8d8c8', fontSize: 'clamp(1rem,2.5vw,1.3rem)', lineHeight: 1.85, marginBottom: '20px' }}>
            You are not merely relatives to us. You are our first teachers, our loudest supporters, our safe place in every storm, and the reason our happiest memories feel complete. Every blessing you whispered for us… Every sacrifice you silently made… Every prayer you offered with love… Has led us to this beautiful moment.
          </motion.p>

          <motion.p className="font-cormorant" {...fadeUp(0.44)}
            style={{ color: '#a8d8c8', fontSize: 'clamp(1rem,2.5vw,1.3rem)', lineHeight: 1.85, marginBottom: '20px' }}>
            Some stories begin with grand love. Ours began with trust. A trust between two families. A meeting arranged with care. A conversation that slowly turned into comfort. A bond that quietly became friendship. And before we realized it, two hearts from two different cities had found a home within each other.
          </motion.p>

          <motion.p className="font-cormorant" {...fadeUp(0.49)}
            style={{ color: '#a8d8c8', fontSize: 'clamp(1rem,2.5vw,1.3rem)', lineHeight: 1.85, marginBottom: '28px' }}>
            Like the ancient temples of Kumbakonam standing strong through time… And like the ever-growing skyline of Coimbatore built with vision and determination… Our journey too is built on faith, respect, understanding, and love.
          </motion.p>

          <motion.div
            {...fadeUp(0.54)}
            style={{
              borderRadius: '16px',
              padding: 'clamp(20px,4vw,36px)',
              background: 'linear-gradient(135deg, rgba(126,207,176,0.12), rgba(212,175,55,0.1))',
              border: '1px solid rgba(126,207,176,0.3)',
              marginBottom: '28px',
            }}
          >
            <p className="font-playfair" style={{ color: '#7ecfb0', fontSize: 'clamp(1.1rem,2.8vw,1.5rem)', marginBottom: '16px' }}>
              ✨ The Wedding of ✨
            </p>
            <p className="font-playfair" style={{ color: '#e8f5f0', fontSize: 'clamp(1.2rem,3vw,1.8rem)', marginBottom: '4px' }}>
              A. Selvaraja
            </p>
            <p className="font-cormorant" style={{ color: '#7ecfb0', fontSize: 'clamp(0.9rem,2vw,1.1rem)', fontStyle: 'italic', marginBottom: '8px' }}>
              Engineer • Construction &amp; Real Estate
            </p>
            <p className="font-playfair" style={{ color: '#d4af37', fontSize: 'clamp(1.3rem,3vw,1.8rem)', margin: '6px 0' }}>with</p>
            <p className="font-playfair" style={{ color: '#e8f5f0', fontSize: 'clamp(1.2rem,3vw,1.8rem)', marginBottom: '4px' }}>
              R. Rathna
            </p>
            <p className="font-cormorant" style={{ color: '#7ecfb0', fontSize: 'clamp(0.9rem,2vw,1.1rem)', fontStyle: 'italic', marginBottom: '20px' }}>
              The graceful daughter of the Temple City, Kumbakonam
            </p>
            <p className="font-cormorant" style={{ color: '#a8d8c8', fontSize: 'clamp(1rem,2.5vw,1.2rem)', lineHeight: 1.8 }}>
              🌼 Haldi Ceremony — 28 May 2026 | 4:00 PM – 9:00 PM<br/>
              💍 Muhurtham — 29 May 2026 | 8:30 AM – 9:30 AM<br/>
              📍 Bellezza Event Hall, Coimbatore
            </p>
          </motion.div>

          <motion.p className="font-cormorant" {...fadeUp(0.62)}
            style={{ color: '#c8ede0', fontSize: 'clamp(1rem,2.5vw,1.35rem)', lineHeight: 1.9, fontStyle: 'italic', marginBottom: '24px' }}>
            Come celebrate with us… Eat with us. Laugh with us. Dance with us. Bless us. Because no decoration can shine brighter than the love of family, and no wedding can feel complete without the people who hold our hearts forever.
          </motion.p>

          <motion.div {...fadeUp(0.68)} style={{ borderTop: '1px solid rgba(126,207,176,0.2)', paddingTop: '24px' }}>
            <p className="font-playfair" style={{ color: '#7ecfb0', fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', fontStyle: 'italic', marginBottom: '6px' }}>
              With love, gratitude, and folded hands,
            </p>
            <p className="font-playfair" style={{ color: '#e8f5f0', fontSize: 'clamp(1.2rem,3vw,1.6rem)', fontWeight: 600 }}>
              Selvaraja &amp; Rathna
            </p>
            <p className="font-cormorant" style={{ color: '#d4af37', fontSize: 'clamp(0.9rem,2vw,1.1rem)', fontStyle: 'italic', marginTop: '4px' }}>
              along with our beloved families
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
