import { ComponentProps, useState } from "react";
import { Pressable, ScrollView, View, TextInput } from "react-native";
import { CenterModal } from "@/components/common/CenterModal";
import { Text, textSizes } from "@/components/common/Text";
import { colors } from "@/constants/colors";
import { Image } from "@/components/common/Image";
import { formatDateSlash, getDateFromISO } from "@/utils/date";
import { calculateProgress } from "@/utils/reading";
import { CircularProgress } from "@/components/common/CircularProgress";
import { Ionicons } from "@expo/vector-icons";
import { LogCard } from "@/components/container/log/LogCard";
import { Spacer } from "@/components/common/Spacer";
import { SharpButton } from "@/components/common/SharpButton";
import type { Book, Log } from "@/types";

type TabType = "about" | "logs";

type Props = {
	overlay: ComponentProps<typeof CenterModal>["overlay"];
	book: Book;
	logs: Log[];
	onClose: () => void;
	onDeleteLog?: (logId: number) => void;
	onUpdateLogMemo?: (logId: number, memo: string) => void;
	onUpdateBookEncounterNote?: (bookId: number, encounterNote: string) => void;
	onAddLog?: () => void;
};

export function BookDetailModal(props: Props) {
	const [activeTab, setActiveTab] = useState<TabType>("about");
	const [isEditingEncounterNote, setIsEditingEncounterNote] = useState(false);
	const [editedEncounterNote, setEditedEncounterNote] = useState(props.book.encounterNote || "");

	const { overlay, book, logs, onClose, onDeleteLog, onUpdateLogMemo, onUpdateBookEncounterNote, onAddLog } = props;
	const thumbnailSource = typeof book.thumbnailUrl === "string" ? { uri: book.thumbnailUrl } : book.thumbnailUrl;
	const progress = calculateProgress(book.readPages, book.totalPages);
	const remainingDays = book.remainingDays ?? 0;
	const bookLogs = logs.filter((log) => log.bookId === book.id);
	const sortedLogs = [...bookLogs].sort((a, b) => new Date(a.readDate).getTime() - new Date(b.readDate).getTime());

	const handleSaveEncounterNote = () => {
		onUpdateBookEncounterNote?.(book.id, editedEncounterNote);
		setIsEditingEncounterNote(false);
	};

	return (
		<CenterModal overlay={overlay} portalName="book-detail-modal">
			<View className="flex-1">
				<View className="flex-row items-center justify-between pb-2 border-b border-accent">
					<View className="flex-row gap-2">
						<View className={`px-4 py-2 rounded-lg ${activeTab === "about" ? "bg-primary" : ""}`}>
							<Pressable onPress={() => setActiveTab("about")}>
								<Text size="body1" color={activeTab === "about" ? "white" : "black"} weight={activeTab === "about" ? "bold" : "normal"}>本について</Text>
							</Pressable>
						</View>
						<View className={`px-4 py-2 rounded-lg ${activeTab === "logs" ? "bg-primary" : ""}`}>
							<Pressable onPress={() => setActiveTab("logs")}>
								<Text size="body1" color={activeTab === "logs" ? "white" : "black"} weight={activeTab === "logs" ? "bold" : "normal"}>記録</Text>
							</Pressable>
						</View>
					</View>
					<Pressable onPress={onClose} hitSlop={12}>
						<Ionicons name="close" size={24} color={colors.text.black} />
					</Pressable>
				</View>
				<View className="flex-1 mt-4">
					<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
					{activeTab === "about" ? (
						<>
							<View className="flex-row items-start">
								<Image source={thumbnailSource} variant="rounded-md" style={{ width: 100, height: 140, borderWidth: 2, borderColor: colors.primary }} />
								<View className="flex-1 ml-4">
									<Text size="title2" weight="bold" color="black">{book.title}</Text>
									<View className="mt-1"><Text size="body1" color="gray">{book.author}</Text></View>
									{book.publisher && <View className="mt-1"><Text size="body1" color="gray">{book.publisher}</Text></View>}
								</View>
							</View>
							<Spacer height={24} />
							<View>
								<DetailRow label="本を登録した日" value={getDateFromISO(book.createdAt)} />
								<DetailRow label="目標読了日" value={`${formatDateSlash(book.targetCompleteDate)}${remainingDays > 0 ? ` 残り${remainingDays}日` : ""}`} />
							</View>
							<Spacer height={24} />
							<View className="flex-row items-center justify-between">
								<View className="flex-1">
									<Text size="body1" color="black" weight="bold">読んだ</Text>
									<Text size="title1" color="black" weight="bold">{book.readPages}ページ</Text>
									<View className="mt-1"><Text size="body1" color="gray">全部で {book.totalPages}ページ</Text></View>
								</View>
								<CircularProgress progress={progress} size={100} thickness={8} />
							</View>
							<Spacer height={24} />
							<View>
								<View className="flex-row items-center justify-between mb-2">
									<Text size="body2" color="gray" weight="bold">この本に出会った経緯</Text>
									{!isEditingEncounterNote && (
										<Pressable onPress={() => setIsEditingEncounterNote(true)}>
											<Ionicons name="create-outline" size={20} color={colors.text.gray} />
										</Pressable>
									)}
								</View>
								{isEditingEncounterNote ? (
									<View>
										<View className="p-3 rounded-2xl bg-main">
											<TextInput value={editedEncounterNote} onChangeText={setEditedEncounterNote} multiline placeholder="この本に出会った経緯を入力してください" placeholderTextColor={colors.text.gray} style={{ fontSize: textSizes.body1, fontFamily: "ZenMaruGothic-Regular", color: colors.text.black, minHeight: 100, textAlignVertical: "top" }} />
										</View>
										<View className="flex-row justify-end mt-2 gap-2">
											<View className="px-4 py-2 rounded-lg bg-main">
												<Pressable onPress={() => { setEditedEncounterNote(book.encounterNote || ""); setIsEditingEncounterNote(false); }}>
													<Text size="body1" color="black">キャンセル</Text>
												</Pressable>
											</View>
											<View className="px-4 py-2 rounded-lg bg-primary">
												<Pressable onPress={handleSaveEncounterNote}>
													<Text size="body1" color="white" weight="bold">保存</Text>
												</Pressable>
											</View>
										</View>
									</View>
								) : (
									<View className="p-3 rounded-2xl bg-main">
										<Text size="body1" color="black">{book.encounterNote?.trim() || "この本に出会った経緯を入力してください"}</Text>
									</View>
								)}
							</View>
						</>
					) : (
						<>
							{sortedLogs.length > 0 ? (
								sortedLogs.map((log) => (
									<View key={log.id}>
										<LogCard log={log} book={book} onDeleteLog={onDeleteLog || (() => {})} onUpdateLogMemo={onUpdateLogMemo || (() => {})} />
										<Spacer height={16} />
									</View>
								))
							) : (
								<View className="items-center justify-center py-20">
									<Text size="body1" color="gray">記録がありません</Text>
								</View>
							)}
							{onAddLog && (
								<View className="mt-4 mb-4">
									<SharpButton title="記録する" onPress={onAddLog} />
								</View>
							)}
						</>
					)}
					<Spacer height={20} />
					</ScrollView>
				</View>
			</View>
		</CenterModal>
	);
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
	<View className="flex-row items-center justify-between py-2">
		<Text size="body2" color="gray">{label}</Text>
		<Text size="body1" color="black" weight="bold">{value || "-"}</Text>
	</View>
);
