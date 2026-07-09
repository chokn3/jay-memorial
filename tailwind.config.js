export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1C2321",
        parchment: "#F7F4EC",
        moss: "#5B6D5B",
        ember: "#C9915B",
        mist: "#DCE3DC",
      },
      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.4s ease-out',
        'pop': 'pop 0.3s ease',
      },
    },
  },
  plugins: [],
}