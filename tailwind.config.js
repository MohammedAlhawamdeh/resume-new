/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-vivid-orange",
    "text-vivid-orange",
    "focus:ring-vivid-orange",
    "hover:text-vivid-orange",
    "hover:bg-opacity-90",
    "bg-oxford-blue",
    "text-oxford-blue",
    "border-vivid-orange",
  ],
  theme: {
    extend: {
      colors: {
        "oxford-blue": "rgb(13 27 42)", // #0D1B2A
        "vivid-orange": "rgb(251 86 7)", // #FB5607
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        btn: "0.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
