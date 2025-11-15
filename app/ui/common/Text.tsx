import { Text as RNText, TextProps as RNTextProps, StyleSheet } from "react-native";
import { ReactNode } from "react";
import { colors, type TextColor } from "./colors";

type TextSize = "big" | "title1" | "title2" | "body1" | "body2";
type TextWeight = "normal" | "bold";

type TextProps = Omit<RNTextProps, "style" | "className"> & {
	size: TextSize;
	color?: TextColor;
	weight?: TextWeight;
	children: ReactNode;
};

export const textSizes = {
	big: 32,
	title1: 20,
	title2: 18,
	body1: 14,
	body2: 12,
} as const;

const sizeStyles = StyleSheet.create({
	big: { fontSize: textSizes.big },
	title1: { fontSize: textSizes.title1 },
	title2: { fontSize: textSizes.title2 },
	body1: { fontSize: textSizes.body1 },
	body2: { fontSize: textSizes.body2 },
});

const colorStyles = StyleSheet.create({
	black: { color: colors.text.black },
	white: { color: colors.text.white },
	accent: { color: colors.text.accent },
	gray: { color: colors.text.gray },
});

const weightStyles = StyleSheet.create({
	normal: { fontFamily: "ZenMaruGothic-Regular" },
	bold: { fontFamily: "ZenMaruGothic-Bold" },
});

export const Text = ({
	size,
	color = "black",
	weight = "normal",
	children,
	...props
}: TextProps) => {
	return (
		<RNText
			style={[sizeStyles[size], colorStyles[color], weightStyles[weight]]}
			{...props}
		>
			{children}
		</RNText>
	);
};

