/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
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
        "oxford-blue": "#0D1B2A",
        "vivid-orange": "#FB5607",
      },
    },
  },
  plugins: [],
};
