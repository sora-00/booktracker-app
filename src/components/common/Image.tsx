import { Image as RNImage, ImageSourcePropType, ImageStyle, StyleProp, View } from "react-native";

type ImageVariant = "rounded-md" | "rounded-lg" | "rounded-full" | "square";

type Props = {
	source: ImageSourcePropType;
	variant?: ImageVariant;
	style?: StyleProp<ImageStyle>;
};

const variantClass: Record<ImageVariant, string> = {
	"rounded-md": "rounded-md",
	"rounded-lg": "rounded-lg",
	"rounded-full": "rounded-full",
	square: "",
};

export const Image = (props: Props) => {
	const variant = props.variant ?? "rounded-md";
	const viewClass = [variantClass[variant], "bg-gray-100"].filter(Boolean).join(" ");
	return (
		<View className={viewClass}>
			<RNImage source={props.source} style={props.style} />
		</View>
	);
};
