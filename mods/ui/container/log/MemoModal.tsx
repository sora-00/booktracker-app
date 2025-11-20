import { useEffect, useState, type ComponentProps } from "react";
import { View, Pressable, ScrollView, TextInput, StyleSheet } from "react-native";
import { CenterModal } from "@ui/common/CenterModal";
import { Text, textSizes } from "@ui/common/Text";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@ui/common/colors";
import { MenuPopup } from "@ui/common/MenuPopup";
import { SharpButton } from "@ui/common/SharpButton";
import type { Log } from "@mods/entities/log";

type Props = {
	log: Log;
	memoOverlay: ComponentProps<typeof CenterModal>["overlay"];
	onUpdateLogMemo: (logId: number, memo: string) => void;
	initialEditMode?: boolean;
};

export function MemoModal({ log, memoOverlay, onUpdateLogMemo, initialEditMode = false }: Props) {
	const [showMemoMenu, setShowMemoMenu] = useState(false);
	const [isEditingMemo, setIsEditingMemo] = useState(false);
	const [editedMemo, setEditedMemo] = useState(log.memo || "");

	const memo = log.memo || "";

	useEffect(() => {
		if (!isEditingMemo) {
			setEditedMemo(memo);
		}
	}, [memo, isEditingMemo]);

	useEffect(() => {
		if (memoOverlay.isShow && initialEditMode) {
			setIsEditingMemo(true);
			setEditedMemo(memo);
			setShowMemoMenu(false);
		} else if (!memoOverlay.isShow) {
			setIsEditingMemo(false);
			setShowMemoMenu(false);
		}
	}, [memoOverlay.isShow, initialEditMode, memo]);

	useEffect(() => {
		if (isEditingMemo) {
			setShowMemoMenu(false);
		}
	}, [isEditingMemo]);

	const startEditingMemo = () => {
		setEditedMemo(memo);
		setIsEditingMemo(true);
		setShowMemoMenu(false);
	};

	const handleCompleteMemoEdit = () => {
		onUpdateLogMemo(log.id, editedMemo);
		setIsEditingMemo(false);
	};

	return (
		<CenterModal overlay={memoOverlay} portalName="log-memo-modal">
			<View className="relative flex-1 w-full">
				<View className="w-full flex-row items-center justify-between pb-3 border-b" style={{ borderColor: colors.input.border }}>
					<Text size="title2" color="black" weight="bold">
						メモ
					</Text>
					{!isEditingMemo && (
						<Pressable onPress={() => setShowMemoMenu(!showMemoMenu)}>
							<Ionicons name="ellipsis-horizontal" size={24} color={colors.text.black} />
						</Pressable>
					)}
				</View>

				{showMemoMenu && (
					<View 
					className="absolute right-4 top-16"
					style={{ zIndex: 1000 }}
					>
						<MenuPopup
							items={[
								{
									label: "メモを編集",
									onPress: startEditingMemo,
								},
							]}
							onClose={() => setShowMemoMenu(false)}
						/>
					</View>
				)}

				<View className="w-full flex-1 min-h-0 items-center justify-center">
					{isEditingMemo ? (
						<>
							<View className="w-full flex-1 min-h-0 items-center justify-center">
								<View className="w-full flex-1 min-h-0 border rounded-20 px-2 py-2" style={{ borderColor: colors.input.border, backgroundColor: colors.background.card }}>
									<ScrollView
										nestedScrollEnabled
										showsVerticalScrollIndicator={false}
										contentContainerStyle={styles.editScrollContent}
									>
										<TextInput
											value={editedMemo}
											onChangeText={setEditedMemo}
											multiline
											scrollEnabled={false}
											placeholder="メモを入力してください"
											placeholderTextColor={colors.text.gray}
											className="w-full flex-1 min-h-0"
											style={{
												fontSize: textSizes.body1,
												fontFamily: "ZenMaruGothic-Regular",
												color: colors.text.black,
												textAlignVertical: "top",
											}}
										/>
									</ScrollView>
								</View>
							</View>
							<View className="w-1/2 mt-4 flex-shrink-0">
								<SharpButton
									title="完了"
									onPress={handleCompleteMemoEdit}
									disabled={!editedMemo.trim()}
								/>
							</View>
						</>
					) : (
						<View className="w-full flex-1 min-h-0 pt-3">
							<ScrollView
								showsVerticalScrollIndicator={false}
								contentContainerStyle={styles.memoScrollContent}
							>
								<View className="py-2">
									<Text size="body1" color="black">
										{memo || "メモがありません"}
									</Text>
								</View>
							</ScrollView>
						</View>
					)}
				</View>
			</View>
		</CenterModal>
	);
}

const styles = StyleSheet.create({
	memoScrollContent: {
		paddingBottom: 8,
		paddingHorizontal: 4,
	},
	editScrollContent: {
		flexGrow: 1,
	},
});

