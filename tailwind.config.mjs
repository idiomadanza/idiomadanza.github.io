/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // Beibehalten für das "Modern-Clubbing" Design
  theme: {
    extend: {
      colors: {
        brand: {
          rose: '#7C3AED',    // Electric Violet (WCAG AA compliant contrast)
          glow: '#FCD34D',    // Amber Glow (Gold) - kept as is to match logo
          dark: '#020617',    // Deep slate/black
          light: '#F8FAFC',   // Soft Shell
        }
      },
      fontFamily: {
        // Die elegante "P&S" Headline
        display: ['"Playfair Display"', 'serif'],
        // Die herzliche, klare "Idiomadanza" Body-Font
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'idioma': '1.5rem', // Weiche Kanten für den "Third Place" Vibe
      },
      backgroundImage: {
        // Die Glassmorphism-Effekte aus dem Blueprint bleiben erhalten
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'glass-gradient-dark': 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-rose': '0 0 15px rgba(139, 92, 246, 0.5)',    // Glow an brand.rose angepasst (#8B5CF6)
        'glow-amber': '0 0 15px rgba(252, 211, 77, 0.5)',  // Glow an brand.glow angepasst
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        // Animationen für das flüssige Design
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)' },
          '50%': { opacity: '.7', boxShadow: '0 0 25px rgba(139, 92, 246, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}
