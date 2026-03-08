const colors = require("./src/constants/design-tokens.js");

module.exports = {
	content: [
		"./App.{js,jsx,ts,tsx}",
		"./app/**/*.{js,jsx,ts,tsx}",
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors,
			fontFamily: {
				body: ["ZenMaruGothic-Regular"],
				bold: ["ZenMaruGothic-Bold"],
			},
			fontSize: {
				big: ["32px", { lineHeight: "1.2" }],
				title1: ["20px", { lineHeight: "1.3" }],
				title2: ["18px", { lineHeight: "1.3" }],
				body1: ["14px", { lineHeight: "1.4" }],
				body2: ["12px", { lineHeight: "1.4" }],
				note: ["10px", { lineHeight: "1.4" }],
			},
			fontWeight: {
				note: "300",
			},
		},
	},
	plugins: [],
};
