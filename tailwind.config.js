/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      height: {
        '40vh': '40vh',
        '80vh': '80vh',
        // Add other custom values here
      }
    }
  }
}
module.exports = {
  content: [
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
    },
  },
  plugins: [],
};
