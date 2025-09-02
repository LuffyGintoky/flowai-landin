/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#00ff88',
        'primary-foreground': '#000000',
        'secondary': '#9333ea',
        'secondary-foreground': '#ffffff',
        'accent': '#0ea5e9',
        'accent-foreground': '#000000',
        'dark-bg': '#050505',
        'dark-card': '#0a0a0a',
        'muted': '#1f1f1f',
        'muted-foreground': '#a1a1aa',
        'border': 'rgba(255, 255, 255, 0.1)',
        'ring': 'rgba(0, 255, 136, 0.5)',
        'background': '#050505',
        'foreground': '#ffffff',
        'card': '#0a0a0a',
        'card-foreground': '#ffffff',
        'popover': '#0a0a0a',
        'popover-foreground': '#ffffff',
        'destructive': '#ff4d4d',
        'destructive-foreground': '#ffffff',
        'input': 'rgba(255, 255, 255, 0.15)',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': '0 0 15px rgba(94, 247, 166, 0.7)',
        'glow-purple': '0 0 15px rgba(208, 168, 255, 0.7)',
        'glow-blue': '0 0 15px rgba(97, 218, 251, 0.7)',
      },
    },
  },
  plugins: [],
};
