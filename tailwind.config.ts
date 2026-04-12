import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary-color) / <alpha-value>)',
        error: 'rgb(var(--error-color) / <alpha-value>)',
        bg: 'var(--bg-color)',
        text: 'var(--text-color)',
        border: 'var(--border-color)',
        blue: 'var(--blue-color)',
        'light-blue': 'var(--light-blue-color)',
        grey: 'var(--grey-color)',
        'light-grey': 'var(--light-grey-color)',
        'dark-grey': 'var(--dark-grey-color)',
      },
    },
  },
  plugins: [],
};

export default config;
