/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#EFB8C8",
        ivory: "#FAF6F4",
        champagne: "#D7B894",
        velvet: "#0E0E0E",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        poppins: ["Poppins", "sans-serif"],
        signature: ["Dancing Script", "cursive"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(239, 184, 200, 0.5)" },
          "100%": { boxShadow: "0 0 30px rgba(239, 184, 200, 0.8)" },
        },
        typing: {
          "0%": { width: "0ch" },
          "50%": { width: "34ch" },
          "100%": { width: "0ch" },
        },
        "typing-mobile": {
          "0%": { width: "0ch" },
          "50%": { width: "20ch" },
          "100%": { width: "0ch" },
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "white" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        typing: "typing 8s steps(34) infinite, blink .8s step-end infinite",
        "typing-mobile": "typing-mobile 6s steps(20) infinite, blink .8s step-end infinite",
      },
    },
  },
  plugins: [],
};
