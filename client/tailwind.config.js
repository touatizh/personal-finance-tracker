const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	darkMode: "class",
	plugins: [
		nextui({
			themes: {
				"custom-light": {
					extend: "light",
					colors: {
						background: {
							lightest: "#FFFFFF", // Crisp White for main backgrounds
							lighter: "#F0F2F5", // Light gray for slight differentiation
							light: "#E5E7EB", // Cool gray for panel backgrounds, cards
							DEFAULT: "#DDDDDD", // Soft gray for default backgrounds needing contrast
							dark: "#BFC3C7", // Dark gray for active or highlighted sections
						},

						foreground: {
							lightest: "#BCC2C7", // Light for secondary icons or low emphasis elements
							lighter: "#A3B1BF", // Medium light for general icons
							DEFAULT: "#36454F", // Charcoal Gray for primary foreground elements
							dark: "#2E3E4E", // Darker for focused or active elements
							darkest: "#253545", // Darkest for high contrast needs or accents
						},
						primary: {
							100: "#C5E8F7",
							200: "#8FCEEF",
							300: "#539ED1",
							400: "#286CA3",
							500: "#003366", // Navy Blue
							600: "#002757",
							700: "#001D49",
							800: "#00143B",
							900: "#000E30",
							DEFAULT: "#003366",
						},
						secondary: {
							100: "#D0E4FF",
							200: "#A1C9FF",
							300: "#72AEFF",
							400: "#5596FF",
							500: "#7FBAFF", // Sky Blue
							600: "#649ADC",
							700: "#4A7AB8",
							800: "#305A94",
							900: "#20487A",
							DEFAULT: "#7FBAFF",
						},
						success: {
							100: "#E6FCE2",
							200: "#CFF9C5",
							300: "#B8F5A8",
							400: "#A6F391",
							500: "#BFFCC6", // Soft Mint
							600: "#ACEFBA",
							700: "#99E2AE",
							800: "#86D5A2",
							900: "#77C997",
							DEFAULT: "#BFFCC6",
						},
						warning: {
							100: "#FFECB3",
							200: "#FFE082",
							300: "#FFD54F",
							400: "#FFCA28",
							500: "#FFA000", // Saffron Amber
							600: "#FF8F00",
							700: "#FF6F00",
							800: "#E65100",
							900: "#BF360C",
							DEFAULT: "#FFA000",
						},
						error: {
							100: "#FADBD8", // Lightest
							200: "#F5B7B1",
							300: "#F1948A",
							400: "#EC7063",
							500: "#D32F2F", // Crimson Red as the default
							600: "#C0392B",
							700: "#A93226",
							800: "#922B21",
							900: "#7B241C",
							DEFAULT: "#D32F2F",
						},
						info: {
							100: "#E0FFFF",
							200: "#B2FFFF",
							300: "#80FFFF",
							400: "#5EFFFF",
							500: "#AFEEEE", // Pale Turquoise
							600: "#96CDCD",
							700: "#78B4B4",
							800: "#5CA2A2",
							900: "#4D8888",
							DEFAULT: "#AFEEEE",
						},
						text: {
							lightest: "#F5F5F5", // For highlighted or inverse text on dark backgrounds
							lighter: "#BEC8D2", // Secondary text or hints
							light: "#A3B1BF", // Placeholders or less important information
							DEFAULT: "#36454F", // Primary text color, Charcoal Gray
							dark: "#2E3E4E", // For emphasis or headings
							darker: "#253545", // Strong emphasis, might be used for titles or UI controls
							darkest: "#1C2A3C", // For maximum contrast against light backgrounds, sparingly
						},

						border: {
							lighter: "#D1DDE6", // Very light gray for subtle borders
							light: "#A3B1BF", // Slightly darker for more definition
							DEFAULT: "#708090", // Light Slate Gray for standard borders
							dark: "#5F6A78", // Darker gray for focused or emphasized borders
						},
					},
				},
			},
		}),
	],
};
