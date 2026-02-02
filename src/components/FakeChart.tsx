import { motion } from 'framer-motion'
import { Track } from '@/types'

interface FakeChartProps {
  tracks: Track[]
}

export default function FakeChart({ tracks }: FakeChartProps) {
  const maxPlays = Math.max(...tracks.map(t => t.plays))
  const chartSize = 200
  const centerX = chartSize / 2
  const centerY = chartSize / 2
  const maxRadius = 80

  return (
    <div className="flex flex-col items-center">
      <svg 
        width={chartSize} 
        height={chartSize} 
        viewBox={`0 0 ${chartSize} ${chartSize}`}
        className="overflow-visible"
        role="img"
        aria-label="Gráfico de músicas mais tocadas"
      >
        {[0.25, 0.5, 0.75, 1].map((scale, i) => (
          <circle
            key={i}
            cx={centerX}
            cy={centerY}
            r={maxRadius * scale}
            fill="none"
            stroke="#382F2A"
            strokeOpacity={0.1}
            strokeDasharray="4 4"
          />
        ))}

        {tracks.map((track, index) => {
          const angle = (index / tracks.length) * Math.PI * 2 - Math.PI / 2
          const radius = (track.plays / maxPlays) * maxRadius
          const x = centerX + Math.cos(angle) * radius
          const y = centerY + Math.sin(angle) * radius
          
          const labelRadius = maxRadius + 20
          const labelX = centerX + Math.cos(angle) * labelRadius
          const labelY = centerY + Math.sin(angle) * labelRadius

          return (
            <g key={track.rank}>
              <motion.line
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="url(#gradient)"
                strokeWidth={8}
                strokeLinecap="round"
                opacity={0.8}
              />
              
              <motion.circle
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                cx={x}
                cy={y}
                r={6}
                fill="#C77B5B"
              />

              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-deep-cocoa/60"
              >
                #{track.rank}
              </text>
            </g>
          )
        })}

        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C77B5B" />
            <stop offset="100%" stopColor="#6EA8A6" />
          </linearGradient>
        </defs>

        <motion.circle
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: 'spring' }}
          cx={centerX}
          cy={centerY}
          r={20}
          fill="#FFF7EE"
          stroke="#C77B5B"
          strokeWidth={2}
        />
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-lg fill-deep-cocoa"
        >
          ♥
        </text>
      </svg>

      <div className="mt-6 text-center">
        <p className="text-sm text-deep-cocoa/60">Total de plays</p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-poppins text-3xl font-bold text-warm-terracotta"
        >
          {tracks.reduce((sum, t) => sum + t.plays, 0)}
        </motion.p>
      </div>
    </div>
  )
}
