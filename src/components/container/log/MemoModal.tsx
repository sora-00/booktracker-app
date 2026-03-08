import { useEffect, useState, type ComponentProps } from "react";
import { View, Pressable, ScrollView, TextInput } from "react-native";
import { CenterModal } from "@/components/common/CenterModal";
import { Text, textSizes } from "@/components/common/Text";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { MenuPopup } from "@/components/common/MenuPopup";
import { SharpButton } from "@/components/common/SharpButton";
import type { Log } from "@/types";

type Props = {
	log: Log;
	memoOverlay: ComponentProps<typeof CenterModal>["overlay"];
	onUpdateLogMemo: (logId: number, memo: string) => void;
	initialEditMode?: boolean;
};

export function MemoModal(props: Props) {
	const initialEditMode = props.initialEditMode ?? false;
	const [showMemoMenu, setShowMemoMenu] = useState(false);
	const [isEditingMemo, setIsEditingMemo] = useState(false);
	const [editedMemo, setEditedMemo] = useState(props.log.memo || "");
	const memo = props.log.memo || "";

	useEffect(() => {
		if (!isEditingMemo) setEditedMemo(memo);
	}, [memo, isEditingMemo]);

	useEffect(() => {
		if (props.memoOverlay.isShow && initialEditMode) {
			setIsEditingMemo(true);
			setEditedMemo(memo);
			setShowMemoMenu(false);
		} else if (!props.memoOverlay.isShow) {
			setIsEditingMemo(false);
			setShowMemoMenu(false);
		}
	}, [props.memoOverlay.isShow, initialEditMode, memo]);

	useEffect(() => {
		if (isEditingMemo) setShowMemoMenu(false);
	}, [isEditingMemo]);

	const startEditingMemo = () => {
		setEditedMemo(memo);
		setIsEditingMemo(true);
		setShowMemoMenu(false);
	};

	const handleCompleteMemoEdit = () => {
		props.onUpdateLogMemo(props.log.id, editedMemo);
		setIsEditingMemo(false);
	};

	return (
		<CenterModal overlay={props.memoOverlay} portalName="log-memo-modal">
			<View className="relative flex-1 w-full">
				<View className="w-full flex-row items-center justify-between pb-3 border-b border-accent">
					<Text size="title2" color="black" weight="bold">メモ</Text>
					{!isEditingMemo && (
						<Pressable onPress={() => setShowMemoMenu(!showMemoMenu)}>
							<Ionicons name="ellipsis-horizontal" size={24} color={colors.text.black} />
						</Pressable>
					)}
				</View>
				{showMemoMenu && (
					<View className="absolute right-4 top-16" style={{ zIndex: 1000 }}>
						<MenuPopup items={[{ label: "メモを編集", onPress: startEditingMemo }]} onClose={() => setShowMemoMenu(false)} />
					</View>
				)}
				<View className="w-full flex-1 min-h-0 items-center justify-center">
					{isEditingMemo ? (
						<>
							<View className="w-full flex-1 min-h-0 items-center justify-center">
								<View className="w-full flex-1 min-h-0 border border-accent rounded-[20px] px-2 py-2 bg-white">
									<ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
										<View className="w-full flex-1 min-h-0">
										<TextInput value={editedMemo} onChangeText={setEditedMemo} multiline scrollEnabled={false} placeholder="メモを入力してください" placeholderTextColor={colors.text.gray} style={{ fontSize: textSizes.body1, fontFamily: "ZenMaruGothic-Regular", color: colors.text.black, textAlignVertical: "top", flex: 1 }} />
									</View>
									</ScrollView>
								</View>
							</View>
							<View className="w-1/2 mt-4 flex-shrink-0">
								<SharpButton title="完了" onPress={handleCompleteMemoEdit} disabled={!editedMemo.trim()} />
							</View>
						</>
					) : (
						<View className="w-full flex-1 min-h-0 pt-3">
							<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 8, paddingHorizontal: 4 }}>
								<View className="py-2">
									<Text size="body1" color="black">{memo || "メモがありません"}</Text>
								</View>
							</ScrollView>
						</View>
					)}
				</View>
			</View>
		</CenterModal>
	);
}
