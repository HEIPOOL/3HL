import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className = '',
  onClick,
  disabled,
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const baseStyles = `
    px-6 py-3 
    rounded-full 
    font-medium 
    transition-all 
    duration-200
    focus:outline-none 
    focus:ring-2 
    focus:ring-offset-2
    disabled:opacity-50 
    disabled:cursor-not-allowed
  `

  const variants = {
    primary: `
      bg-warm-terracotta 
      text-white 
      hover:bg-warm-terracotta/90 
      focus:ring-warm-terracotta
      shadow-lg 
      hover:shadow-xl
    `,
    secondary: `
      bg-transparent 
      text-warm-terracotta 
      border-2 
      border-warm-terracotta
      hover:bg-warm-terracotta/10 
      focus:ring-warm-terracotta
    `,
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  )
}
