import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@ui/common/Text";
import { Spacer } from "@ui/common/Spacer";
import { Image } from "@ui/common/Image";
import { RoundedButton } from "@ui/common/RoundedButton";

type Props = {
	displayImageUri?: string;
	isUploading: boolean;
	onUpload: () => void;
};

export function ThumbnailUpload({ displayImageUri, isUploading, onUpload }: Props) {
	return (
		<View className="w-full">
			<Text size="body1" color="black">表紙画像をアップロード</Text>
			<Spacer height={5} />
			{displayImageUri ? (
				<View className="w-full items-center">
					<View className="w-full">
						<Pressable onPress={onUpload} disabled={isUploading}>
							<Image
								source={{ uri: displayImageUri }}
								size="large"
								variant="rounded-md"
								style={{ width: 100, height: 140, resizeMode: "cover" }}
							/>
						</Pressable>
					</View>
					{isUploading && (
						<View className="mb-2">
							<Text size="body2" color="gray">アップロード中...</Text>
						</View>
					)}
				</View>
			) : (
				<View className="w-1/3">
					<RoundedButton
						icon={<Ionicons name="camera" size={24} color="white" />}
						onPress={onUpload}
						disabled={isUploading}
					/>
				</View>
			)}
		</View>
	);
}

