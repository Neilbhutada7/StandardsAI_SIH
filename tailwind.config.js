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
          DEFAULT: '#f8fafc', // bg-primary
          50: '#f8fafc',
          100: '#f1f5f9',
          900: '#0f172a', // accent-primary
        },
        secondary: '#ffffff', // bg-secondary
        accent: {
          DEFAULT: '#1e3a8a', // accent-blue
          light: '#eff6ff', // accent-blue-light
          dark: '#1e40af',
        },
        text: {
          primary: '#1e293b',
          secondary: '#475569',
          muted: '#64748b',
        },
        border: {
          DEFAULT: '#e2e8f0',
        },
        status: {
          success: {
            DEFAULT: '#15803d',
            bg: '#f0fdf4',
          },
          warning: {
            DEFAULT: '#b45309',
            bg: '#fffbeb',
          },
          error: {
            DEFAULT: '#b91c1c',
            bg: '#fef2f2',
          },
          info: {
            DEFAULT: '#0369a1',
            bg: '#f0f9ff',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        sidebar: '240px',
        'sidebar-collapsed': '64px',
        header: '64px',
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      }
    },
  },
  plugins: [],
}
