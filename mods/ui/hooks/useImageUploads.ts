import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import { postUploads, UploadsType } from "@mods/repositories/upload";
import { useAuth } from "./useAuth";

export function useImageUploads({ type }: { type: UploadsType }) {
  const { accessToken } = useAuth();

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
        // ライブラリから画像を選択する
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: "images",
          allowsEditing: true,
          aspect: [2, 3],
          quality: 1,
        });

        if (pickerResult.canceled) {
          return;
        }

        if (!pickerResult.assets[0]) {
          return;
        }

        // 画像をリサイズする
        const asset = pickerResult.assets[0];
        const manipulator = ImageManipulator.manipulate(asset.uri);

        const size = (() => {
          switch (type) {
            case "thumbnail":
              return { width: asset.width > 900 ? 900 : asset.width }; // 最大表示サイズ(300px) * 3
          }
        })();

        const image = await manipulator.resize(size).renderAsync();

        const imageResult = await image.saveAsync({
          format: SaveFormat.JPEG,
          compress: 0.8,
        });

        // ローカル画像URIを保存（すぐに表示できるように）
        setLocalImageUri(imageResult.uri);

        // バックグラウンドでサーバーにアップロードする
        if (!accessToken) {
          console.warn("アクセストークンがありません。画像はローカルのみ表示されます。");
          return;
        }

        setIsUploading(true);
        try {
          const res = await postUploads(accessToken, type, {
            uri: imageResult.uri,
            name: imageResult.uri.split("/").pop() || "image.jpg",
            type: "image/jpg",
          });

          if (res.err) {
            console.log("アップロードエラー:", res.err);
            // エラーでもローカル画像は表示し続ける
          } else {
            // アップロード成功したら、サーバーのURLを使用
            setUploadedData(res.data);
          }
        } catch (error) {
          console.error("アップロードエラー:", error);
          // エラーでもローカル画像は表示し続ける
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

