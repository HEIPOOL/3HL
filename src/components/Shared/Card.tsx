import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div 
      className={`
        bg-white/70 
        backdrop-blur-sm 
        rounded-card 
        shadow-card 
        border border-white/50
        ${className}
      `}
    >
      {children}
    </div>
  )
}
