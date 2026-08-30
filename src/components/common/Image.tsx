import { useEffect, useState, type ComponentProps } from "react";
import { Image as ExpoImage, type ImageContentFit } from "expo-image";
import { ImageSourcePropType, ImageStyle, StyleProp, View, StyleSheet } from "react-native";

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

function contentFitFromStyle(style: StyleProp<ImageStyle>): ImageContentFit {
	const flat = StyleSheet.flatten(style) as ImageStyle | undefined;
	const m = flat?.resizeMode;
	if (m === "contain") return "contain";
	if (m === "stretch") return "fill";
	if (m === "center") return "none";
	return "cover";
}

function styleWithoutResizeMode(style: StyleProp<ImageStyle>): StyleProp<ImageStyle> {
	const flat = StyleSheet.flatten(style) as ImageStyle | undefined;
	if (!flat) return style;
	const { resizeMode: _r, ...rest } = flat;
	return rest;
}

export const Image = (props: Props) => {
	const [loadFailed, setLoadFailed] = useState(false);
	useEffect(() => {
		setLoadFailed(false);
	}, [props.source]);

	const contentFit = contentFitFromStyle(props.style);
	const imageStyle = styleWithoutResizeMode(props.style);

	const variant = props.variant ?? "rounded-md";
	const viewClass = [variantClass[variant], "bg-gray-100"].filter(Boolean).join(" ");
	return (
		<View className={viewClass}>
			{!loadFailed ? (
				<ExpoImage
					source={props.source as ComponentProps<typeof ExpoImage>["source"]}
					style={imageStyle}
					contentFit={contentFit}
					cachePolicy="memory-disk"
					onError={() => setLoadFailed(true)}
					transition={150}
				/>
			) : null}
		</View>
	);
};
