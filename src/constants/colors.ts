import tokens from "./design-tokens.js";

export const colors = {
	text: {
		black: tokens.textBlack,
		white: tokens.white,
		gray: tokens.textGray,
		red: tokens.red,
		accent: tokens.accent,
	},
	...tokens,
} as const;

export type TextColor = keyof typeof colors.text;
