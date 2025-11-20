import { Image as RNImage, ImageSourcePropType, ImageStyle, StyleProp } from "react-native";

type ImageVariant = "rounded-md" | "rounded-lg" | "rounded-full" | "square";

type ImageProps = {
	source: ImageSourcePropType;
	variant?: ImageVariant;
	style?: StyleProp<ImageStyle>;
};

const variantStyles: Record<ImageVariant, string> = {
	"rounded-md": "rounded-md",
	"rounded-lg": "rounded-lg",
	"rounded-full": "rounded-full",
	square: "",
};

export const Image = ({
	source,
	variant = "rounded-md",
	style,
}: ImageProps) => {
	const classes = [
		variantStyles[variant],
		"bg-gray-100",
	]
		.filter(Boolean)
		.join(" ");

	return <RNImage className={classes} source={source} style={style} />;
};

