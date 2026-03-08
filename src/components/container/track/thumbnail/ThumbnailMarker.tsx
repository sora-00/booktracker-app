import { View } from "react-native";
import { Image } from "@/components/common/Image";
import { colors } from "@/constants/colors";
import { THUMBNAIL_SIZE_WIDTH, THUMBNAIL_SIZE_HEIGHT } from "@/constants/track";

type Props = {
	thumbnailUrl: string | number;
};

export function ThumbnailMarker(props: Props) {
	const source = typeof props.thumbnailUrl === "string" ? { uri: props.thumbnailUrl } : props.thumbnailUrl;
	return (
		<View>
			<Image
				source={source}
				variant="rounded-md"
				style={{
					width: THUMBNAIL_SIZE_WIDTH,
					height: THUMBNAIL_SIZE_HEIGHT,
					borderWidth: 2,
					borderColor: colors.primary,
				}}
			/>
		</View>
	);
}
