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
    './src/**/*.{js,ts,jsx,tsx}', // Adjust the path according to your project structure
  ],
  theme: {
    extend: {
      maxWidth: {
        '0.5vh': '0.5vh',
      },
    },
  },
}
module.exports = {
  theme: {
    extend: {
      width: {
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
