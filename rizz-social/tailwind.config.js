/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily :{
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', /* ... */],
        irishgrover:["Irish Grover"]
      }
    },
  },
  plugins: [],
}
