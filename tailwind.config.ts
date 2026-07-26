import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-navy': '#020c1b',
        navy: '#0a192f',
        'light-navy': '#112240',
        'lightest-navy': '#233554',
        'navy-shadow': 'rgba(2, 12, 27, 0.7)',
        'dark-slate': '#495670',
        slate: '#8892b0',
        'light-slate': '#a8b2d1',
        'lightest-slate': '#ccd6f6',
        white: '#e6f1ff',
        green: '#64ffda',
        'green-tint': 'rgba(100, 255, 218, 0.1)',
        pink: '#f57dff',
        blue: '#57cbff',
      },
      fontFamily: {
        sans: [
          'Calibre',
          'Inter',
          'San Francisco',
          'SF Pro Text',
          '-apple-system',
          'system-ui',
          'sans-serif',
        ],
        mono: ['SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', 'monospace'],
      },
      fontSize: {
        xxs: '12px',
        xs: '13px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        xxl: '22px',
        heading: '32px',
      },
      transitionTimingFunction: {
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      },
      borderRadius: {
        DEFAULT: '4px',
      },
    },
  },
  plugins: [],
};

export default config;
