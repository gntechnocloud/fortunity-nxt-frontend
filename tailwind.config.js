/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        'sm': '640px',  
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px', 
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3840px',
      },
      spacing: {
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
        '26': '6.5rem', // 104px
        '30': '7.5rem', // 120px
        '34': '8.5rem', // 136px
        '38': '9.5rem', // 152px
      },  
      borderRadius: {
        '4xl': '2rem', // 32px
        '5xl': '2.5rem', // 40px
        '6xl': '3rem', // 48px
      },
      boxShadow: {
        'inner-lg': 'inset 0 4px 6px rgba(0, 0, 0, 0.1)',
        'outline-lg': '0 0 0 3px rgba(59, 130, 246, 0.5)', // blue-500
        'card': '0 2px 10px rgba(0, 0, 0, 0.1)',
      },
      borderWidth: {
        '3': '3px',
        '6': '6px',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }], // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }], // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }], // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
        '5xl': ['3rem', { lineHeight: '1' }], // 48px
      },
      lineHeight: {
        'tight': '1.2',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
      },
      letterSpacing: {
        'tight': '-0.02em',
        'normal': '0',
        'wide': '0.02em',
        'wider': '0.04em',
        'widest': '0.1em',
      },
      opacity: {
        '5': '0.05',
        '10': '0.1',
        '15': '0.15',
        '20': '0.2',
        '25': '0.25',
        '30': '0.3',
        '35': '0.35',
        '40': '0.4',
        '45': '0.45',
        '50': '0.5',
        '55': '0.55',
        '60': '0.6',
        '65': '0.65',
        '70': '0.7',
        '75': '0.75',
        '80': '0.8',
        '85': '0.85',
        '90': '0.9',
        '95': '0.95',
      },
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, box-shadow',
        'opacity': 'opacity',
        'transform': 'transform',
        'all': 'all',
      },
      transitionDuration: {
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        'linear': 'linear',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDelay: {
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
      },
      backgroundPosition: {
        'center': 'center',
        'top': 'top',
        'bottom': 'bottom',
        'left': 'left',
        'right': 'right',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#3b82f6', // blue-500
        'secondary': '#64748b', // gray-500
        'success': '#22c55e', // green-500
        'warning': '#f59e0b', // yellow-500
        'danger': '#ef4444', // red-500
      }),
      colors: {
        border: '#e5e7eb', // example border color, adjust as needed
        primary: {
          DEFAULT: '#1E3A8A',  // Fortunity NXT Deep Blue primary
          light: '#2563EB',    // Bright Blue
          dark: '#1B2A6B',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        secondary: {
          DEFAULT:'#F59E0B', // Amber/Gold accent (Fortunity NXT secondary)
          light: '#FCD34D', // Light Amber
          dark: '#B45309',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        accent: '#F59E0B',    // Same as secondary for consistency
        neutral: {
          dark: '#111827',
          DEFAULT: '#374151',
          light: '#F3F4F6',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
      },
      fontFamily: {
        // Add Fortunity NXT fonts alongside your existing ones
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'], // your existing sans
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.7' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
        },
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        zoomOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.5)', opacity: '0' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeSlideOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(20px)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        },
        bounceOut: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(0.3)', opacity: '0' },
        },
        fadeZoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeZoomOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.5)' },
        },
        fadeRotateIn: {
          '0%': { opacity: '0', transform: 'rotate(45deg)' },
          '100%': { opacity: '1', transform: 'rotate(0deg)' },
        },
        fadeRotateOut: {
          '0%': { opacity: '1', transform: 'rotate(0deg)' },
          '100%': { opacity: '0', transform: 'rotate(45deg)' },
        },
        fadeSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeSlideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeSlideLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeSlideRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },  
      },
      cursor: {
        'pointer': 'pointer',
        'default': 'default',
        'text': 'text',
        'wait': 'wait',
        'help': 'help',
        'not-allowed': 'not-allowed',
        'zoom-in': 'zoom-in',
        'zoom-out': 'zoom-out',
        'grab': 'grab',
        'grabbing': 'grabbing',
      },
      outline: {
        'none': '2px solid transparent',
        'primary': '2px solid #3b82f6', // blue-500
        'secondary': '2px solid #64748b', // gray-500
        'success': '2px solid #22c55e', // green-500
        'warning': '2px solid #f59e0b', // yellow-500
        'danger': '2px solid #ef4444', // red-500
      },
      aspectRatio: {
        'square': '1 / 1',
        'video': '16 / 9',
        'portrait': '9 / 16',
        'landscape': '16 / 9',
        'custom': '4 / 3', // Example custom aspect ratio
      },
      transition: {
        'all': 'all 0.3s ease-in-out',
        'colors': 'background-color, border-color, color, box-shadow 0.3s ease-in-out',
        'opacity': 'opacity 0.3s ease-in-out',
        'transform': 'transform 0.3s ease-in-out',
      },
      willChange: {
        'transform': 'transform',
        'opacity': 'opacity',
        'scroll-position': 'scroll-position',
        'contents': 'contents',
      },
      textDecoration: {
        'none': 'none',
        'underline': 'underline',
        'line-through': 'line-through',
        'overline': 'overline',
        'underline-offset': 'underline-offset 0.1em',
      },
      textTransform: {
        'uppercase': 'uppercase',
        'lowercase': 'lowercase',
        'capitalize': 'capitalize',
        'none': 'none',
      },
      textOverflow: {
        'ellipsis': 'ellipsis',
        'clip': 'clip',
      },
      visibility: {
        'visible': 'visible',
        'hidden': 'hidden',
        'collapse': 'collapse',
      },
      position: {
        'static': 'static',
        'relative': 'relative',
        'absolute': 'absolute',
        'fixed': 'fixed',
        'sticky': 'sticky',
      },
      inset: {
        '0': '0',
        '1': '0.25rem', // 4px
        '2': '0.5rem', // 8px
        '3': '0.75rem', // 12px
        '4': '1rem', // 16px
        '5': '1.25rem', // 20px
        '6': '1.5rem', // 24px
        '8': '2rem', // 32px
        '10': '2.5rem', // 40px
      },
      flex: {
        '1': '1 1 0%',
        'auto': '1 1 auto',
        'initial': '0 1 auto',
        'none': 'none',
      },
      flexGrow: {
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
      },
      flexShrink: {
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
      },
      flexBasis: {
        'auto': 'auto',
        '0': '0%',
        '1/2': '50%',
        '1/3': '33.333333%',
        '1/4': '25%',
        '1/5': '20%',
        '1/6': '16.666667%',
        'full': '100%',
      },
      gridTemplateColumns: {
        '1': 'repeat(1, minmax(0, 1fr))',
        '2': 'repeat(2, minmax(0, 1fr))',
        '3': 'repeat(3, minmax(0, 1fr))',
        '4': 'repeat(4, minmax(0, 1fr))',
        '5': 'repeat(5, minmax(0, 1fr))',
        '6': 'repeat(6, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '1': 'repeat(1, minmax(0, 1fr))',
        '2': 'repeat(2, minmax(0, 1fr))',
        '3': 'repeat(3, minmax(0, 1fr))',
        '4': 'repeat(4, minmax(0, 1fr))',
        '5': 'repeat(5, minmax(0, 1fr))',
        '6': 'repeat(6, minmax(0, 1fr))',
      },
      gridAutoColumns: {
        'auto': 'auto',
        'min': 'min-content',
        'max': 'max-content',
        'fr': '1fr',
      },
      gridAutoRows: {
        'auto': 'auto',
        'min': 'min-content',
        'max': 'max-content',
        'fr': '1fr',
      },
      gridColumn: {
        'span-1': 'span 1 / span 1',
        'span-2': 'span 2 / span 2',
        'span-3': 'span 3 / span 3',
        'span-4': 'span 4 / span 4',
        'span-5': 'span 5 / span 5',
        'span-6': 'span 6 / span 6',
      },
      gridRow: {
        'span-1': 'span 1 / span 1',
        'span-2': 'span 2 / span 2',
        'span-3': 'span 3 / span 3',
        'span-4': 'span 4 / span 4',
        'span-5': 'span 5 / span 5',
        'span-6': 'span 6 / span 6',
      },
      gap: {
        '0': '0',
        '1': '0.25rem', // 4px
        '2': '0.5rem', // 8px
        '3': '0.75rem', // 12px
        '4': '1rem', // 16px
        '5': '1.25rem', // 20px
        '6': '1.5rem', // 24px
        '8': '2rem', // 32px
        '10': '2.5rem', // 40px
      },
      container: {
        center: true,
        padding: '2rem', // 32px
      },
      outlineOffset: {
        '0': '0',
        '1': '1px',
        '2': '2px',
        '4': '4px',
        '8': '8px',
      },
      fill: {
        'current': 'currentColor',
        'primary': '#3b82f6', // blue-500
        'secondary': '#64748b', // gray-500
        'success': '#22c55e', // green-500
        'warning': '#f59e0b', // yellow-500
        'danger': '#ef4444', // red-500
      },
      stroke: {
        'current': 'currentColor',
        'primary': '#3b82f6', // blue-500
        'secondary': '#64748b', // gray-500
        'success': '#22c55e', // green-500
        'warning': '#f59e0b', // yellow-500
        'danger': '#ef4444', // red-500
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.7' },
        },
      },
      willChange: {
        'transform': 'transform',
        'opacity': 'opacity',
        'scroll-position': 'scroll-position',
        'contents': 'contents',
      },
      textShadow: {
        'none': 'none',
        'sm': '1px 1px 2px rgba(0, 0, 0, 0.05)',
        'base': '2px 2px 4px rgba(0, 0, 0, 0.1)',
        'lg': '3px 3px 6px rgba(0, 0, 0, 0.15)',
        'xl': '4px 4px 8px rgba(0, 0, 0, 0.2)',
      },
      textStroke: {
        'none': 'none',
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
      },
      textUnderlineOffset: {
        '0': '0',
        '1': '1px',
        '2': '2px',
        '4': '4px',
        '8': '8px',
      },
      textDecorationColor: {
        'primary': '#3b82f6', // blue-500
        'secondary': '#64748b', // gray-500
        'success': '#22c55e', // green-500
        'warning': '#f59e0b', // yellow-500
        'danger': '#ef4444', // red-500
      },
      textDecorationThickness: {
        'auto': 'auto',
        'from-font': 'from-font',
        '0': '0',
        '1': '1px',
        '2': '2px',
        '4': '4px',
        '8': '8px',
      },
      textIndent: {
        '0': '0',
        '1': '0.25rem', // 4px
        '2': '0.5rem', // 8px
        '3': '0.75rem', // 12px
        '4': '1rem', // 16px
        '5': '1.25rem', // 20px
      },
      textOverflow: {
        'ellipsis': 'ellipsis',
        'clip': 'clip',
      },
      textTransform: {
        'uppercase': 'uppercase',
        'lowercase': 'lowercase',
        'capitalize': 'capitalize',
        'none': 'none',
      },
      textAlign: {
        'left': 'left',
        'center': 'center',
        'right': 'right',
        'justify': 'justify',
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      fontStyle: {
        'normal': 'normal',
        'italic': 'italic',
        'oblique': 'oblique',
      },
      fontVariantNumeric: {
        'normal': 'normal',
        'lining-nums': 'lining-nums',
        'oldstyle-nums': 'oldstyle-nums',
        'proportional-nums': 'proportional-nums',
        'tabular-nums': 'tabular-nums',
      },
      fontVariantLigatures: {
        'normal': 'normal',
        'none': 'none',
        'common-ligatures': 'common-ligatures',
        'discretionary-ligatures': 'discretionary-ligatures',
        'historical-ligatures': 'historical-ligatures',
      },
      fontVariantCaps: {
        'normal': 'normal',
        'small-caps': 'small-caps',
        'all-small-caps': 'all-small-caps',
        'petite-caps': 'petite-caps',
        'all-petite-caps': 'all-petite-caps',
        'unicase': 'unicase',
    },
  },
  plugins: [],
}
}