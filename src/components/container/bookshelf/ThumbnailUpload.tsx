import { View, Pressable, ActivityIndicator } from "react-native";
import { Text } from "@/components/common/Text";
import { Spacer } from "@/components/common/Spacer";
import { Image } from "@/components/common/Image";
import { RoundedButton } from "@/components/common/RoundedButton";
import { Ionicons } from "@expo/vector-icons";

const THUMBNAIL_WIDTH = 100;
const THUMBNAIL_HEIGHT = 140;

type Props = {
	displayImageUri?: string;
	isUploading: boolean;
	onUpload: () => void;
};

export function ThumbnailUpload(props: Props) {
	return (
		<View className="w-full">
			<Text size="body1" color="black">表紙画像をアップロード</Text>
			<Spacer height={5} />
			{props.isUploading ? (
				<View
					className="w-full items-center justify-center rounded-md bg-gray-100"
					style={{ width: THUMBNAIL_WIDTH, height: THUMBNAIL_HEIGHT, minHeight: THUMBNAIL_HEIGHT }}
				>
					<ActivityIndicator size="large" color="#666" />
				</View>
			) : props.displayImageUri ? (
				<View className="w-full items-center">
					<Pressable onPress={props.onUpload}>
						<Image
							source={{ uri: props.displayImageUri }}
							variant="rounded-md"
							style={{ width: THUMBNAIL_WIDTH, height: THUMBNAIL_HEIGHT, resizeMode: "cover" }}
						/>
					</Pressable>
				</View>
			) : (
				<View className="w-full">
					<RoundedButton icon={<Ionicons name="camera" size={24} color="white" />} onPress={props.onUpload} />
				</View>
			)}
		</View>
	);
}
