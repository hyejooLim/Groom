import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary-color) / <alpha-value>)',
        error: 'rgb(var(--error-color) / <alpha-value>)',
        background: 'var(--bg-color)',
        dark: 'var(--text-color)',
        border: 'var(--border-color)',
        accent: 'rgb(var(--accent-color) / <alpha-value>)',
        blue: 'var(--blue-color)',
        'light-blue': 'var(--light-blue-color)',
        'extra-light-blue': 'var(--extra-light-blue-color)',
        grey: 'var(--grey-color)',
        'light-grey': 'var(--light-grey-color)',
        'dark-grey': 'rgb(var(--dark-grey-color) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};

export default config;
