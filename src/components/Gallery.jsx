import { motion } from 'framer-motion'
import useHighlight from '../hooks/useHighlight'
import WaveDivider from './WaveDivider'

const photos = [
  { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=700&q=80', alt: 'Wedding flowers' },
  { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=80', alt: 'Wedding rings' },
  { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=80', alt: 'Wedding ceremony' },
  { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=700&q=80', alt: 'Wedding decor' },
  { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&q=80', alt: 'Couple portrait' },
  { url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=700&q=80', alt: 'Wedding bouquet' },
]

export default function Gallery() {
  const [ref, inView] = useHighlight(0.1)

  return (
    <section
      ref={ref}
      className={`section-highlight${inView ? ' in-view' : ''}${inView ? ' section-glow' : ''}`}
      style={{ position: 'relative', width: '100%', padding: 'clamp(48px,8vw,96px) 0', background: 'linear-gradient(180deg,#1a0510 0%,#2d0a1e 100%)' }}
    >
      <div className="section-line" />
      <WaveDivider fill="#1a0510" />

      {inView && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 65%)' }} />
      )}

      <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(16px,5vw,40px)' }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: 'clamp(32px,5vw,56px)' }}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
        >
          <p style={{ color: '#e8a0b0', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(9px,1.5vw,11px)', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Moments
          </p>
          <h2 className="font-playfair" style={{ color: '#f5e6d0', fontSize: 'clamp(1.8rem,5vw,3rem)', marginBottom: '16px' }}>
            Gallery
          </h2>
          <div className="gold-divider" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 'clamp(10px,2vw,20px)' }}>
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              style={{ position: 'relative', overflow: 'hidden', borderRadius: '16px', aspectRatio: '1/1', boxShadow: inView ? '0 6px 28px rgba(0,0,0,0.12)' : 'none', transition: 'box-shadow 0.6s ease' }}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img
                src={photo.url} alt={photo.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
              <motion.div
                style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(212,175,55,0.38) 0%, transparent 55%)', pointerEvents: 'none' }}
                initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
