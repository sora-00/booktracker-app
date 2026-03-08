import { View, Pressable, Alert } from "react-native";
import { useState } from "react";
import { Text } from "@/components/common/Text";
import { Image } from "@/components/common/Image";
import { colors } from "@/constants/colors";
import { formatDateSlash } from "@/utils/date";
import { useOverlay } from "@/hooks/useOverlay";
import { Ionicons } from "@expo/vector-icons";
import { MenuPopup } from "@/components/common/MenuPopup";
import { MemoModal } from "./MemoModal";
import type { Log, Book } from "@/types";

type Props = {
	log: Log;
	book: Book;
	onDeleteLog: (logId: number) => void;
	onUpdateLogMemo: (logId: number, memo: string) => void;
};

export function LogCard(props: Props) {
	const memoOverlay = useOverlay();
	const [showMenu, setShowMenu] = useState(false);
	const memo = props.log.memo || "";
	const displayMemo = memo.length > 87 ? memo.substring(0, 87) + "..." : memo;

	const confirmDelete = () => {
		Alert.alert("記録を削除", "この記録を削除しますか？", [
			{ text: "キャンセル", style: "cancel" },
			{ text: "削除", style: "destructive", onPress: () => props.onDeleteLog(props.log.id) },
		]);
	};

	const handleAddMemo = () => {
		setShowMenu(false);
		memoOverlay.open();
	};

	return (
		<>
			<View className="flex-col py-3 px-4 rounded-xl shadow-sm w-full relative bg-white">
				<View className="flex-row items-start ">
					<View className="flex items-center justify-center">
						{props.book.thumbnailUrl ? (
							typeof props.book.thumbnailUrl === "string" ? (
								<Image source={{ uri: props.book.thumbnailUrl }} variant="rounded-md" style={{ resizeMode: "cover", width: 50, height: 70 }} />
							) : (
								<Image source={props.book.thumbnailUrl} variant="rounded-md" style={{ resizeMode: "cover", width: 50, height: 70 }} />
							)
						) : (
							<View className="w-[50px] h-[70px] rounded-md bg-gray-100 items-center justify-center" />
						)}
					</View>
					<View className="flex-1 flex-col justify-between pl-3">
						<View className="flex-row justify-between " style={{ alignItems: "stretch" }}>
							<View className="flex-1">
								<Text size="title2" color="black" weight="bold">{props.book.title}</Text>
								<View className="mt-1">
									<Text size="body1" color="black">{props.book.author}</Text>
								</View>
							</View>
							<View className="flex-col items-end justify-between">
								<View>
									<Pressable onPress={() => setShowMenu(!showMenu)}>
										<Ionicons name="ellipsis-horizontal" size={20} color={colors.text.black} />
									</Pressable>
								</View>
								<View className="flex-col items-end justify-between">
									<View>
										<View className="flex-row items-center">
											<Text size="body1" color="black">{props.log.startPage}</Text>
											<Text size="body1" color="black">〜</Text>
											<Text size="body1" color="black">{props.log.endPage}</Text>
											<Text size="body1" color="black">P</Text>
										</View>
									</View>
									<View>
										<Text size="body1" color="black">{formatDateSlash(props.log.readDate)}</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
				<View className="mt-2">
					{memo ? (
						<Pressable onPress={memoOverlay.open}>
							<View className="mt-2">
								<Text size="body1" color="black">{displayMemo}</Text>
							</View>
						</Pressable>
					) : null}
				</View>
			</View>
			{showMenu && (
				<View className="absolute right-4 top-16" style={{ zIndex: 1000 }}>
					<MenuPopup
						items={[
							...(memo ? [] : [{ label: "メモを追加", onPress: handleAddMemo }]),
							{ label: "記録を削除", onPress: confirmDelete, color: "red" },
						]}
						onClose={() => setShowMenu(false)}
					/>
				</View>
			)}
			<MemoModal log={props.log} memoOverlay={memoOverlay} onUpdateLogMemo={props.onUpdateLogMemo} initialEditMode={!memo} />
		</>
	);
}
