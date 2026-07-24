/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        popYellow: '#FFE600',
        popTeal: '#00F0FF',
        popPink: '#FF2A85',
        popRed: '#FF003C',
        popGreen: '#00FF66',
        popOrange: '#FF7A00',
        popDark: '#0A0E1A',
        popBlue: '#0066FF',
        halftoneDot: 'rgba(0, 0, 0, 0.15)',
      },
      boxShadow: {
        'pop': '5px 5px 0px 0px #000000',
        'pop-lg': '8px 8px 0px 0px #000000',
        'pop-xl': '12px 12px 0px 0px #000000',
        'pop-sm': '3px 3px 0px 0px #000000',
        'pop-white': '5px 5px 0px 0px #FFFFFF',
      },
      fontFamily: {
        comic: ['"Bangers"', '"Impact"', 'sans-serif'],
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
        mono: ['"Courier Prime"', 'monospace']
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      }
    },
  },
  plugins: [],
}
