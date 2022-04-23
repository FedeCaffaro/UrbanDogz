module.exports = {
content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cWhite: '#FCFCFC',
        cBlack: '#010101',
        cSilver: '#BFBFBF',
        cMineShaft: '#303030',
        cGray: '#808080',
      },
      fontSize: {
        title: '1.75rem',
        productTitle: '1.5rem',
        subtitle: '1.125rem',
        itemTitle: '1rem',
        itemDescription: '0.875rem',
        listItems: '0.75rem',

      },
      fontFamily: {
        sketch: ["Sketch", 'sans-serif'],
        pilot: ['Pilot Command', 'sans-serif'],
        iA: ['iA', 'sans-serif'],
        sans: ['m-plus-rounded-2c','Montserrat', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
