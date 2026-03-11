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
        primary: '#ff6b35',
        secondary: '#ffd166',
        background: '#120f0f',
        card: '#1e1817',
        muted: '#f3ede6',
        ink: '#181312',
      },
    },
  },
  plugins: [],
};

export default config;
