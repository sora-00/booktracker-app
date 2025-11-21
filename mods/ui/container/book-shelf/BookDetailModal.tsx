import { ComponentProps, useState } from "react";
import { Pressable, ScrollView, View, TextInput, StyleSheet } from "react-native";
import { CenterModal } from "../../common/CenterModal";
import { Text, textSizes } from "../../common/Text";
import { colors } from "../../common/colors";
import { Image } from "../../common/Image";
import { formatDateSlash, getDateFromISO, calculateRemainingDays } from "../../utils/date";
import { calculateProgress } from "../../utils/reading";
import { CircularProgress } from "../../common/CircularProgress";
import { Ionicons } from "@expo/vector-icons";
import { LogCard } from "../log/LogCard";
import { Spacer } from "../../common/Spacer";
import { SharpButton } from "../../common/SharpButton";
import type { Book } from "@mods/entities/book";
import type { Log } from "@mods/entities/log";

type TabType = "about" | "logs";

type Props = {
	overlay: ComponentProps<typeof CenterModal>["overlay"];
	book: Book;
	logs: Log[];
	onClose: () => void;
	onDeleteLog?: (logId: number) => void;
	onUpdateLogMemo?: (logId: number, memo: string) => void;
	onUpdateBookBackground?: (bookId: number, background: string) => void;
	onAddLog?: () => void;
};

export function BookDetailModal({
	overlay,
	book,
	logs,
	onClose,
	onDeleteLog,
	onUpdateLogMemo,
	onUpdateBookBackground,
	onAddLog,
}: Props) {
	const [activeTab, setActiveTab] = useState<TabType>("about");
	const [isEditingBackground, setIsEditingBackground] = useState(false);
	const [editedBackground, setEditedBackground] = useState(book.background || "");

	const thumbnailSource = typeof book.thumbnailUrl === "string" ? { uri: book.thumbnailUrl } : book.thumbnailUrl;
	const progress = calculateProgress(book.completedPages, book.totalPages);
	const remainingDays = calculateRemainingDays(book.targetCompleteDate);
	const bookLogs = logs.filter((log) => log.bookId === book.id);
	const sortedLogs = [...bookLogs].sort((a, b) => {
		const dateA = new Date(a.readDate).getTime();
		const dateB = new Date(b.readDate).getTime();
		return dateA - dateB; // 古い順
	});

	const handleSaveBackground = () => {
		if (onUpdateBookBackground) {
			onUpdateBookBackground(book.id, editedBackground);
		}
		setIsEditingBackground(false);
	};

	return (
		<CenterModal overlay={overlay} portalName="book-detail-modal">
			<View className="flex-1">
				{/* ヘッダー */}
				<View className="flex-row items-center justify-between pb-2 border-b" style={{ borderColor: colors.input.border }}>
					<View className="flex-row" style={{ gap: 8 }}>
						<Pressable
							onPress={() => setActiveTab("about")}
							className="px-4 py-2 rounded-lg"
							style={{
								backgroundColor: activeTab === "about" ? colors.main.primary : "transparent",
							}}
						>
							<Text
								size="body1"
								color={activeTab === "about" ? "white" : "black"}
								weight={activeTab === "about" ? "bold" : "normal"}
							>
								本について
							</Text>
						</Pressable>
						<Pressable
							onPress={() => setActiveTab("logs")}
							className="px-4 py-2 rounded-lg"
							style={{
								backgroundColor: activeTab === "logs" ? colors.main.primary : "transparent",
							}}
						>
							<Text
								size="body1"
								color={activeTab === "logs" ? "white" : "black"}
								weight={activeTab === "logs" ? "bold" : "normal"}
							>
								記録
							</Text>
						</Pressable>
					</View>
					<Pressable onPress={onClose} hitSlop={12}>
						<Ionicons name="close" size={24} color={colors.text.black} />
					</Pressable>
				</View>

				<ScrollView showsVerticalScrollIndicator={false} className="flex-1 mt-4">
					{activeTab === "about" ? (
						<>
							{/* 本の基本情報 */}
							<View className="flex-row items-start">
								<Image
									source={thumbnailSource}
									variant="rounded-md"
									style={{
										width: 100,
										height: 140,
										borderWidth: 2,
										borderColor: colors.main.primary,
									}}
								/>
								<View className="flex-1 ml-4">
									<Text size="title2" weight="bold" color="black">
										{book.title}
									</Text>
									<View className="mt-1">
										<Text size="body1" color="gray">
											{book.author}
										</Text>
									</View>
									{book.publisher && (
										<View className="mt-1">
											<Text size="body1" color="gray">
												{book.publisher}
											</Text>
										</View>
									)}
								</View>
							</View>

							<Spacer height={24} />

							{/* 日付情報 */}
							<View>
								<DetailRow
									label="本を登録した日"
									value={getDateFromISO(book.createdAt)}
								/>
								<DetailRow
									label="目標読了日"
									value={`${formatDateSlash(book.targetCompleteDate)}${remainingDays > 0 ? ` 残り${remainingDays}日` : ""}`}
								/>
							</View>

							<Spacer height={24} />

							{/* 読書進捗 */}
							<View className="flex-row items-center justify-between">
								<View className="flex-1">
									<Text size="body1" color="black" weight="bold">
										読んだ
									</Text>
									<Text size="title1" color="black" weight="bold">
										{book.completedPages}ページ
									</Text>
									<View className="mt-1">
										<Text size="body1" color="gray">
											全部で {book.totalPages}ページ
										</Text>
									</View>
								</View>
								<CircularProgress progress={progress} size={100} thickness={8} />
							</View>

							<Spacer height={24} />

							{/* この本に出会った経緯 */}
							<View>
								<View className="flex-row items-center justify-between mb-2">
									<Text size="body2" color="gray" weight="bold">
										この本に出会った経緯
									</Text>
									{!isEditingBackground && (
										<Pressable onPress={() => setIsEditingBackground(true)}>
											<Ionicons name="create-outline" size={20} color={colors.text.gray} />
										</Pressable>
									)}
								</View>
								{isEditingBackground ? (
									<View>
										<View
											className="p-3 rounded-2xl"
											style={{ backgroundColor: colors.background.screen }}
										>
											<TextInput
												value={editedBackground}
												onChangeText={setEditedBackground}
												multiline
												placeholder="この本に出会った経緯を入力してください"
												placeholderTextColor={colors.text.gray}
												style={{
													fontSize: textSizes.body1,
													fontFamily: "ZenMaruGothic-Regular",
													color: colors.text.black,
													minHeight: 100,
													textAlignVertical: "top",
												}}
											/>
										</View>
										<View className="flex-row justify-end mt-2" style={{ gap: 8 }}>
											<Pressable
												onPress={() => {
													setEditedBackground(book.background || "");
													setIsEditingBackground(false);
												}}
												className="px-4 py-2 rounded-lg"
												style={{ backgroundColor: colors.background.screen }}
											>
												<Text size="body1" color="black">
													キャンセル
												</Text>
											</Pressable>
											<Pressable
												onPress={handleSaveBackground}
												className="px-4 py-2 rounded-lg"
												style={{ backgroundColor: colors.main.primary }}
											>
												<Text size="body1" color="white" weight="bold">
													保存
												</Text>
											</Pressable>
										</View>
									</View>
								) : (
									<View
										className="p-3 rounded-2xl"
										style={{ backgroundColor: colors.background.screen }}
									>
										<Text size="body1" color="black">
											{book.background?.trim() || "この本に出会った経緯を入力してください"}
										</Text>
									</View>
								)}
							</View>
						</>
					) : (
						<>
							{/* 記録タブ */}
							{sortedLogs.length > 0 ? (
								sortedLogs.map((log) => (
									<View key={log.id}>
										<LogCard
											log={log}
											book={book}
											onDeleteLog={onDeleteLog || (() => {})}
											onUpdateLogMemo={onUpdateLogMemo || (() => {})}
										/>
										<Spacer height={16} />
									</View>
								))
							) : (
								<View className="items-center justify-center py-20">
									<Text size="body1" color="gray">
										記録がありません
									</Text>
								</View>
							)}
							{onAddLog && (
								<View className="mt-4 mb-4">
									<SharpButton
										title="記録する"
										onPress={onAddLog}
									/>
								</View>
							)}
						</>
					)}
					<Spacer height={20} />
				</ScrollView>
			</View>
		</CenterModal>
	);
}

type DetailRowProps = {
	label: string;
	value: string;
};

const DetailRow = ({ label, value }: DetailRowProps) => (
	<View className="flex-row items-center justify-between py-2">
		<Text size="body2" color="gray">
			{label}
		</Text>
		<Text size="body1" color="black" weight="bold">
			{value || "-"}
		</Text>
	</View>
);

