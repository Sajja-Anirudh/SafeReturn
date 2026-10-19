/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        // High-end Tactical Luxury Palette
        polar: {
          dark: '#080a0f',    // Deep tactical blue-black
          darker: '#020305',  // Pitch obsidian
          light: '#f1f5f9',   
          lighter: '#ffffff', 
          accent: '#00e5ff',  // Electric ice cyan
          alert: '#ff2a2a',   // Piercing pure red
          warning: '#ffab00', // Deep amber/gold
        }
      },
      backgroundImage: {
        // Subtle hardware screen texture
        'tactical-grid': 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}