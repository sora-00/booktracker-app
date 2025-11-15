/**
 * アプリ全体で使用する色の定義
 */
export const colors = {
	// テキスト色
	text: {
		black: "#4D4942",
		white: "#FFFFFF",
		accent: "#F9A007",
		gray: "#9D9D9D",
	},
	// 背景色
	background: {
		screen: "#FFF6E5", // tabごとの画面の背景色
		card: "#FFFFFF", // cardなどの背景色白
	},
	// メインカラー
	main: {
		primary: "#F8BA4F", // main
		secondary: "#FFD690", // main2
		accent: "#F9A007", // アクセント
	},
	input: {
		background: "#F9F9F9",
		border: "#F9A007",
	},
} as const;

/**
 * 色の型定義
 */
export type TextColor = keyof typeof colors.text;
export type BackgroundColor = keyof typeof colors.background;
export type MainColor = keyof typeof colors.main;
export type InputColor = keyof typeof colors.input;
