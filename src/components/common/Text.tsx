import { Text as RNText } from "react-native";
import { ReactNode } from "react";
import { colors } from "@/constants/colors";
import type { TextColor } from "@/constants/colors";

type TextSize = "big" | "title1" | "title2" | "body1" | "body2";
type TextWeight = "normal" | "bold";

type Props = {
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

const fontFamily: Record<TextWeight, string> = {
	normal: "ZenMaruGothic-Regular",
	bold: "ZenMaruGothic-Bold",
};

export function Text(props: Props): React.ReactElement {
	const { size, color = "black", weight = "normal", children } = props;
	const fontSize = textSizes[size];
	return (
		<RNText
			style={{
				fontSize,
				lineHeight: fontSize * 1.35,
				color: colors.text[color],
				fontFamily: fontFamily[weight],
			}}
		>
			{children}
		</RNText>
	);
}
