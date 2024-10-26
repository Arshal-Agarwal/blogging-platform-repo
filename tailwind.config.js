/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode class-based toggling

  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust the path according to your project structure
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      height: {
        '40vh': '40vh',
        '80vh': '80vh',
      },
      width: {
        '40vh': '40vh',
        '80vh': '80vh',
      },
      maxWidth: {
        '0.5vh': '0.5vh',
      },
    },
  },

  plugins: [],
};
