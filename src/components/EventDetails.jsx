import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import useHighlight from '../hooks/useHighlight'

// Scratch card — canvas overlay that erases on mouse/touch drag
function ScratchCard({ title, date, time, venue, icon, accent, backContent, delay, inView }) {
  const canvasRef = useRef(null)
  const [scratched, setScratched] = useState(false)
  const [scratchPct, setScratchPct] = useState(0)
  const isDrawing = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    // Fill with scratch overlay
    ctx.fillStyle = '#2a1050'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // Add texture pattern
    ctx.fillStyle = 'rgba(212,175,55,0.15)'
    for (let i = 0; i < canvas.width; i += 8) {
      for (let j = 0; j < canvas.height; j += 8) {
        if ((i + j) % 16 === 0) ctx.fillRect(i, j, 4, 4)
      }
    }
    // Scratch hint text
    ctx.fillStyle = 'rgba(212,175,55,0.7)'
    ctx.font = 'bold 14px Lato, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('🪙 Scratch to Reveal', canvas.width / 2, canvas.height / 2 - 10)
    ctx.font = '11px Lato, sans-serif'
    ctx.fillStyle = 'rgba(212,175,55,0.5)'
    ctx.fillText(title, canvas.width / 2, canvas.height / 2 + 14)
  }, [inView, title])

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    }
  }

  const scratch = (e) => {
    if (!isDrawing.current) return
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const { x, y } = getPos(e, canvas)
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 28, 0, Math.PI * 2)
    ctx.fill()
    // Check % scratched
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let transparent = 0
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++
    }
    const pct = (transparent / (canvas.width * canvas.height)) * 100
    setScratchPct(pct)
    if (pct > 55) setScratched(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative', height: 'clamp(300px,42vw,400px)', width: '100%', borderRadius: '20px', overflow: 'hidden' }}
    >
      {/* Content underneath */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: '20px',
        padding: 'clamp(24px,4vw,44px) clamp(20px,4vw,36px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        background: `linear-gradient(135deg, ${accent}22, ${accent}08)`,
        border: `1px solid ${accent}50`,
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{icon}</div>
        <h3 className="font-playfair" style={{ color: '#e8e0ff', fontSize: 'clamp(1.2rem,3vw,1.7rem)', marginBottom: '10px' }}>{title}</h3>
        <p className="font-playfair" style={{ color: accent, fontSize: 'clamp(1.1rem,2.8vw,1.6rem)', fontWeight: 600, marginBottom: '4px' }}>{date}</p>
        <p className="font-cormorant" style={{ color: '#c8caff', fontSize: 'clamp(1rem,2.5vw,1.3rem)', marginBottom: '10px' }}>{time}</p>
        {venue && <p style={{ color: '#a8aaee', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(0.8rem,1.8vw,0.92rem)', marginBottom: '16px' }}>📍 {venue}</p>}
        <div style={{ borderTop: `1px solid ${accent}30`, width: '100%', paddingTop: '12px' }}>
          {backContent.map((item, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>
              <p style={{ color: accent, fontFamily: 'Lato,sans-serif', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase' }}>{item.label}</p>
              <p className="font-cormorant" style={{ color: '#c8caff', fontSize: 'clamp(0.85rem,2vw,1.05rem)', whiteSpace: 'pre-line' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scratch overlay canvas */}
      {!scratched && (
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          onMouseDown={() => { isDrawing.current = true }}
          onMouseUp={() => { isDrawing.current = false }}
          onMouseLeave={() => { isDrawing.current = false }}
          onMouseMove={scratch}
          onTouchStart={(e) => { isDrawing.current = true; scratch(e) }}
          onTouchEnd={() => { isDrawing.current = false }}
          onTouchMove={scratch}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            borderRadius: '20px',
            cursor: 'crosshair',
            touchAction: 'none',
          }}
        />
      )}

      {scratched && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute', bottom: '12px', left: 0, right: 0,
            textAlign: 'center',
            color: accent, fontFamily: 'Lato,sans-serif',
            fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
          }}
        >
          ✓ Revealed
        </motion.div>
      )}
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
      style={{ position: 'relative', width: '100%', padding: 'clamp(48px,8vw,96px) 0', background: 'linear-gradient(180deg,#1a0a2e 0%,#2a1050 100%)' }}
    >
      <div className="section-line" />
      {inView && <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(212,175,55,0.09) 0%,transparent 70%)' }} />}

      <div style={{ width: '100%', maxWidth: '960px', margin: '0 auto', padding: '0 clamp(16px,5vw,40px)' }}>

        <motion.div
          style={{ textAlign: 'center', marginBottom: 'clamp(32px,5vw,56px)' }}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
        >
          <p style={{ color: '#b8a0e8', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(9px,1.5vw,11px)', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Save the Date
          </p>
          <h2 className="font-playfair" style={{ color: '#e8e0ff', fontSize: 'clamp(1.8rem,5vw,3rem)', marginBottom: '16px' }}>
            Event Details
          </h2>
          <div className="gold-divider" />
          <p style={{ color: '#a890d8', fontFamily: 'Lato,sans-serif', fontSize: 'clamp(10px,1.8vw,12px)', marginTop: '12px', letterSpacing: '0.08em' }}>
            Scratch each card to reveal details
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'clamp(16px,3vw,40px)', alignItems: 'stretch' }}>
          <ScratchCard
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
          <ScratchCard
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
      </div>
    </section>
  )
}
