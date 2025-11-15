import { Image as RNImage, ImageProps as RNImageProps } from "react-native";

type ImageSize = "thumbnail" | "small" | "medium" | "large";
type ImageVariant = "rounded-md" | "rounded-lg" | "rounded-full" | "square";

type ImageProps = Omit<RNImageProps, "style" | "className"> & {
	size: ImageSize;
	variant: ImageVariant;
};

const sizeStyles: Record<ImageSize, string> = {
	thumbnail: "w-13 h-16",
	small: "w-16 h-20",
	medium: "w-24 h-32",
	large: "w-32 h-40",
};

const variantStyles: Record<ImageVariant, string> = {
	"rounded-md": "rounded-md",
	"rounded-lg": "rounded-lg",
	"rounded-full": "rounded-full",
	square: "",
};

export const Image = ({
	size = "thumbnail",
	variant = "rounded-md",
	...props
}: ImageProps) => {
	const classes = [
		sizeStyles[size],
		variantStyles[variant],
		"bg-gray-100",
	]
		.filter(Boolean)
		.join(" ");

	return <RNImage className={classes} {...props} />;
};

