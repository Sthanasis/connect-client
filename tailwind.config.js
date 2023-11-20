import theme from './tailwind/theme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme,
  plugins: [],
  prefix: 'tw-',
};
