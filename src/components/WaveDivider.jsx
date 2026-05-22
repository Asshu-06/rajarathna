/**
 * SVG wave divider — placed at the top of a section to create
 * a flowing curved transition from the section above.
 * `fill` should match the current section's background color.
 * `flip` reverses the wave direction.
 */
export default function WaveDivider({ fill = '#1a0510', flip = false, height = 60 }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        transform: flip ? 'rotateX(180deg)' : 'none',
        pointerEvents: 'none',
        zIndex: 3,
      }}
    >
      <svg
        viewBox="0 0 1440 60"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: `${height}px` }}
      >
        <path
          d="M0,30 C180,60 360,0 540,30 C720,60 900,0 1080,30 C1260,60 1380,20 1440,30 L1440,0 L0,0 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}
