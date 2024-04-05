/* eslint-disable no-undef */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  //media
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        mainBody: "#0f172a",
        sidebarBody: "#0f172a",
        headerBody: "#0f172a",
        layoutBorder: "#374151",

        // white :"#fff",
        // black: "#fff",
        // mainBody: "#fff",
        // sidebarBody:"#fff",
        // headerBody:"#fff",
        // layoutBorder:"#fff",
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("daisyui"),
  ],
}

