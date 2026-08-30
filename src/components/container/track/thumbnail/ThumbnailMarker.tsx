import { View } from "react-native";
import { Image } from "@/components/common/Image";
import { BookCoverPlaceholder } from "@/components/common/BookCoverPlaceholder";
import { colors } from "@/constants/colors";
import { THUMBNAIL_SIZE_WIDTH, THUMBNAIL_SIZE_HEIGHT } from "@/constants/track";
import { hasRenderableBookCover } from "@/utils/bookCover";

type Props = {
	thumbnailUrl: string | number;
};

export function ThumbnailMarker(props: Props) {
	const show = hasRenderableBookCover(props.thumbnailUrl);
	const source = typeof props.thumbnailUrl === "string" ? { uri: props.thumbnailUrl } : props.thumbnailUrl;
	return (
		<View>
			{show ? (
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
			) : (
				<BookCoverPlaceholder width={THUMBNAIL_SIZE_WIDTH} height={THUMBNAIL_SIZE_HEIGHT} borderWidth={2} />
			)}
		</View>
	);
}
