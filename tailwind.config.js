/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F3F1FF',
          100: '#E8E4FF',
          500: '#5B4CFF',
          600: '#4A3DE6',
          700: '#3B2FCC',
        },
        secondary: {
          50: '#F5F3FF',
          100: '#EDEAFF',
          500: '#8B7FFF',
          600: '#7A6FFF',
        },
        accent: {
          50: '#FFF2F2',
          100: '#FFE5E5',
          500: '#FF6B6B',
          600: '#FF5252',
        },
        success: {
          50: '#F1F8E9',
          500: '#4CAF50',
        },
        warning: {
          50: '#FFF8E1',
          500: '#FF9800',
        },
        error: {
          50: '#FFEBEE',
          500: '#F44336',
        },
        surface: '#FFFFFF',
        background: '#F8F9FA',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'scale-in': 'scaleIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-soft': 'bounceSoft 0.4s ease-out',
        'confetti': 'confetti 0.6s ease-out',
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSoft: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        confetti: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '0.8' },
          '100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' },
        },
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 20px rgba(91, 76, 255, 0.3)',
      },
    },
  },
  plugins: [],
}