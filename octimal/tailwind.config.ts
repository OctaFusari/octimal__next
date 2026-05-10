import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-outfit)', 'sans-serif'],
      },
      colors: {
        dark: '#0A0A0A',
        dark2: '#111111',
        dark3: '#181818',
        teal: '#00C9A7',
        purple: '#7B4FD8',
        muted: '#6B6B65',
        light: '#F0EDE8',
      },
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}

export default config
