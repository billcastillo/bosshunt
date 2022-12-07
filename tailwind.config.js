/** @type {import('tailwindcss').Config} */

const defaultFonts = [
	"-apple-system",
	"BlinkMacSystemFont",
	"Segoe UI",
	"Roboto",
	"Oxygen",
	"Ubuntu",
	"Cantarell",
	"Fira Sans",
	"Droid Sans",
	"Helvetica Neue",
	"sans-serif",
];

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"bir-red": {
					lighter: "#ff3333",
					light: "#ff1a1a",
					DEFAULT: "#FF0000",
					dark: "#e60000",
					darker: "#cc0000",
				},
				"bir-dark": "#0C161E",
			},
			fontFamily: {
				bebas: ["Bebas Neue", ...defaultFonts],
				changa: ["Changa", ...defaultFonts],
			},
			animation: {
				shine: "shine 1s",
			},
			keyframes: {
				shine: {
					"100%": { left: "125%" },
				},
			},
			backgroundImage: {
				"pattern-bir": "url('/bg/pattern-bir.png')",
				"pattern-1": "url('/bg/pattern-1.png')",
			},
			boxShadow: {
				"bottom-red": "0 6px 0 #A90000",
			},
		},
	},
	plugins: [],
};
