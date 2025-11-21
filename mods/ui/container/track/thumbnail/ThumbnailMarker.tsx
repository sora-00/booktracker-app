import { View } from "react-native";
import { Image } from "../../../common/Image";
import { colors } from "../../../common/colors";
import { THUMBNAIL_SIZE_WIDTH, THUMBNAIL_SIZE_HEIGHT } from "../types/constants";

type ThumbnailMarkerProps = {
	thumbnailUrl: string | number;
};

export function ThumbnailMarker({ thumbnailUrl }: ThumbnailMarkerProps) {
	const source = typeof thumbnailUrl === "string" ? { uri: thumbnailUrl } : thumbnailUrl;

	return (
		<View>
			<Image
				source={source}
				variant="rounded-md"
				style={{
					width: THUMBNAIL_SIZE_WIDTH,
					height: THUMBNAIL_SIZE_HEIGHT,
					borderWidth: 2,
					borderColor: colors.main.primary,
				}}
			/>
		</View>
	);
}


