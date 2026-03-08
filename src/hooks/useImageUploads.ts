import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { postBookThumbnail } from "@/repositories/upload";

/** 本の表紙画像の選択・アップロード用フック */
export function useImageUploads() {
	const [uploadedData, setUploadedData] = useState<{ id: string; url: string }>();
	const [localImageUri, setLocalImageUri] = useState<string | undefined>();
	const [isUploading, setIsUploading] = useState<boolean>(false);

	return {
		uploadedData,
		localImageUri,
		clearUploadedData: () => {
			setUploadedData(undefined);
			setLocalImageUri(undefined);
		},
		isUploading,
		upload: async () => {
			try {
				const pickerResult = await ImagePicker.launchImageLibraryAsync({
					mediaTypes: "images",
					allowsEditing: true,
					aspect: [2, 3],
					quality: 1,
				});

				if (pickerResult.canceled) return;
				if (!pickerResult.assets[0]) return;

				const asset = pickerResult.assets[0];
				const manipulator = ImageManipulator.manipulate(asset.uri);
				const size = { width: asset.width > 900 ? 900 : asset.width };
				const image = await manipulator.resize(size).renderAsync();
				const imageResult = await image.saveAsync({
					format: SaveFormat.JPEG,
					compress: 0.8,
				});

				setLocalImageUri(imageResult.uri);

				setIsUploading(true);
				try {
					const res = await postBookThumbnail({
						uri: imageResult.uri,
						name: imageResult.uri.split("/").pop() || "image.jpg",
						type: "image/jpg",
					});

					if (res.err) {
						console.log("アップロードエラー:", res.err);
					} else {
						setUploadedData(res.data);
					}
				} catch (error) {
					console.error("アップロードエラー:", error);
				} finally {
					setIsUploading(false);
				}
			} catch (error) {
				console.error("画像処理エラー:", error);
				setIsUploading(false);
			}
		},
	};
}
