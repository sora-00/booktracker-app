import { View, Pressable, Alert } from "react-native";
import { useState } from "react";
import { Text } from "../../common/Text";
import { Image } from "../../common/Image";
import { colors } from "../../common/colors";
import { formatDateSlash } from "../../utils/date";
import { useOverlay } from "../../hooks/useOverlay";
import { Ionicons } from "@expo/vector-icons";
import { MenuPopup } from "../../common/MenuPopup";
import { MemoModal } from "./MemoModal";
import type { Log } from "@mods/entities/log";
import type { Book } from "@mods/entities";

type Props = {
	log: Log;
	book: Book;
	onDeleteLog: (logId: number) => void;
	onUpdateLogMemo: (logId: number, memo: string) => void;
};

export function LogCard({ log, book, onDeleteLog, onUpdateLogMemo }: Props) {
	const memoOverlay = useOverlay();
	const [showMenu, setShowMenu] = useState(false);
	const readPages = log.endPage - log.startPage + 1;
	const memo = log.memo || "";
	const displayMemo = memo.length > 87 ? memo.substring(0, 87) + "..." : memo;

	const confirmDelete = () => {
		Alert.alert("記録を削除", "この記録を削除しますか？", [
			{
				text: "キャンセル",
				style: "cancel",
			},
			{
				text: "削除",
				style: "destructive",
				onPress: () => onDeleteLog(log.id),
			},
		]);
	};

	const handleAddMemo = () => {
		setShowMenu(false);
		memoOverlay.open();
	};

	return (
		<>
            <View 
            className="flex-col py-3 px-4 rounded-xl border border-gray-200 shadow-sm w-full relative"
            style={{ backgroundColor: colors.background.card }}
                    >
                <View className="flex-row items-start ">
                    {/* サムネイル */}
                    <View className="flex items-center justify-center">
                        {book.thumbnailUrl ? (
                            typeof book.thumbnailUrl === "string" ? (
                                <Image
                                    source={{ uri: book.thumbnailUrl }}
                                    variant="rounded-md"
                                    style={{ resizeMode: "cover", width: 50, height: 70 }}
                                />
                            ) : (
                                <Image
                                    source={book.thumbnailUrl}
                                    variant="rounded-md"
                                    style={{ resizeMode: "cover", width: 50, height: 70 }}
                                />
                            )
                        ) : (
                            <View className="w-[50px] h-[70px] rounded-md bg-gray-100 items-center justify-center" />
                        )}
                    </View>

                    {/* 中央コンテンツ */}
                    <View className="flex-1 flex-col justify-between pl-3">
                        {/* タイトルと著者（上） */}
                        <View className="flex-row justify-between " style={{ alignItems: "stretch" }}>
                            <View className="flex-1">
                                {/* タイトル */}
                                <Text size="title2" color="black" weight="bold">
                                    {book.title}
                                </Text>
                                {/* 著者 */}
                                <View className="mt-1">
                                    <Text size="body1" color="black">
                                        {book.author}
                                    </Text>
                                </View>
                            </View>

                             {/* 右上：3点マーク、日付とページ数 */}
                            <View className="flex-col items-end justify-between">
                                <View>
                                    <Pressable onPress={() => setShowMenu(!showMenu)}>
                                        <Ionicons name="ellipsis-horizontal" size={20} color={colors.text.black} />
                                    </Pressable>
                                </View>
                                <View className="flex-col items-end justify-between">
                                    <View>
                                        <View className="flex-row items-center">
                                            <Text size="body1" color="black">
                                                {log.startPage}
                                            </Text>
                                            <Text size="body1" color="black">
                                                〜
                                            </Text>
                                            <Text size="body1" color="black">
                                                {log.endPage}
                                            </Text>
                                            <Text size="body1" color="black">
                                                P
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text size="body1" color="black">
                                            {formatDateSlash(log.readDate)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className="mt-2">
                    {/* メモ（下） */}
                    {memo ? (
                        <Pressable onPress={memoOverlay.open}>
                            <View className="mt-2">
                                <Text size="body1" color="black">
                                    {displayMemo}
                                </Text>
                            </View>
                        </Pressable>
                    ) : null}
                </View>
            </View>

			{/* メニューポップアップ（記録を削除） */}
			{showMenu && (
				<View 
					className="absolute right-4 top-16"
					style={{ zIndex: 1000 }}
				>
					<MenuPopup
						items={[
							...(memo ? [] : [
								{
									label: "メモを追加",
									onPress: handleAddMemo,
								},
							]),
							{
								label: "記録を削除",
								onPress: confirmDelete,
								color: "red",
							},
						]}
						onClose={() => setShowMenu(false)}
					/>
				</View>
			)}

			{/* メモ全文表示モーダル */}
			<MemoModal 
				log={log} 
				memoOverlay={memoOverlay} 
				onUpdateLogMemo={onUpdateLogMemo}
				initialEditMode={!memo}
			/>
		</>
	);
}


