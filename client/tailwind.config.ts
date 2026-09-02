import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
    },
    extend: {
      colors: {
        // ── Official JharSankalp Brand Identity ────────────────
        brand: {
          purple: {
            DEFAULT: '#4C1E4F',
            hover: '#3D173F',
            subtle: '#F8F0F9',
            border: '#6B2B70',
          },
          apricot: {
            DEFAULT: '#FEE1C7',
            surface: '#FFF6EE',
            border: '#F8CCA5',
          },
          khaki: {
            DEFAULT: '#B5A886',
            subtle: '#F7F5F0',
            border: '#8F8261',
          },
          coral: {
            DEFAULT: '#FA7E61',
            hover: '#F06847',
            subtle: '#FFF1EE',
          },
          strawberry: {
            DEFAULT: '#F44174',
            hover: '#E02B5E',
            subtle: '#FEF0F4',
          },
        },

        // ── 10-Step Neutral Grayscale System ───────────────────
        neutral: {
          0: '#FFFFFF',
          25: '#FCFCFD',
          50: '#F8F7F8',
          100: '#F2F1F3',
          200: '#E7E4E8', // Primary border
          300: '#D5D0D6', // Strong border
          400: '#98919A', // Muted text / icons
          600: '#625A64', // Secondary text
          800: '#332D35', // Strong text / titles
          900: '#1D1720', // Headings / primary text
        },

        // ── Semantic Status (Decoupled from brand palette) ────
        status: {
          success: {
            DEFAULT: '#15803D',
            subtle: '#F0FDF4',
            border: '#BBF7D0',
          },
          warning: {
            DEFAULT: '#B45309',
            subtle: '#FFFBEB',
            border: '#FDE68A',
          },
          danger: {
            DEFAULT: '#B91C1C',
            subtle: '#FEF2F2',
            border: '#FECACA',
          },
          info: {
            DEFAULT: '#4C1E4F',
            subtle: '#F8F0F9',
            border: '#E8D2EB',
          },
        },
      },

      fontSize: {
        'caption': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }], // 12px
        'small': ['0.8125rem', { lineHeight: '1.15rem' }],                       // 13px
        'body-sm': ['0.875rem', { lineHeight: '1.35rem' }],                     // 14px
        'body': ['0.9375rem', { lineHeight: '1.45rem' }],                        // 15px
        'body-lg': ['1rem', { lineHeight: '1.5rem' }],                           // 16px
        'h3': ['1.375rem', { lineHeight: '1.75rem', fontWeight: '600' }],        // 22px
        'h2': ['1.75rem', { lineHeight: '2.1rem', fontWeight: '600' }],          // 28px
        'h1': ['2.25rem', { lineHeight: '2.6rem', fontWeight: '600' }],          // 36px
        'display': ['3rem', { lineHeight: '3.4rem', fontWeight: '700' }],        // 48px
      },

      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'DEFAULT': '8px',
        'md': '8px',
        'lg': '10px',
        'xl': '12px',
        'pill': '9999px',
      },

      boxShadow: {
        'subtle': '0 1px 2px rgba(29, 23, 32, 0.04)',
        'medium': '0 4px 12px rgba(29, 23, 32, 0.06)',
      },

      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
      },
    },
  },
  plugins: [],
};

export default config;
