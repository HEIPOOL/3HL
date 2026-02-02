/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'warm-terracotta': '#C77B5B',
        'soft-cream': 'var(--color-soft-cream)',
        'muted-teal': '#6EA8A6',
        'deep-cocoa': 'var(--color-deep-cocoa)',
        'accent-glow': '#FFD6A5',
        'bg': 'var(--color-bg)',
        'surface': 'var(--color-surface)',
        'text': 'var(--color-text)',
        'muted': 'var(--color-muted)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'card-dark': '0 4px 20px rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        'glass': '4px',
      },
    },
  },
  plugins: [],
}
