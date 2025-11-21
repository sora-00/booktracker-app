import { View, Pressable, Alert } from "react-native";
import { useState } from "react";
import { Text } from "./Text";
import { Image } from "./Image";
import { colors } from "./colors";
import { Ionicons } from "@expo/vector-icons";
import { CircularProgress } from "./CircularProgress";
import { formatDateSlash, getDateFromISO } from "../utils/date";
import { calculateProgress } from "../utils/reading";
import { MenuPopup } from "./MenuPopup";
import type { Book } from "@mods/entities";

type Props = {
  book: Book;
  onDeleteBook?: (bookId: number) => void;
  onPress?: (book: Book) => void;
};

export function BookCard({ book, onDeleteBook, onPress }: Props) {
	const [showMenu, setShowMenu] = useState(false);
	const progress = book.totalPages && book.completedPages !== undefined
		? calculateProgress(book.completedPages, book.totalPages)
		: 0;

	const confirmDelete = () => {
		Alert.alert("本を削除", "この本を削除しますか？", [
			{
				text: "キャンセル",
				style: "cancel",
			},
			{
				text: "削除",
				style: "destructive",
				onPress: () => {
					if (onDeleteBook) {
						onDeleteBook(book.id);
					}
				},
			},
		]);
	};

	const handleCardPress = () => {
		if (onPress) {
			onPress(book);
		}
	};

	// statusに応じた右側の表示
	const renderStatusIndicator = () => {
		switch (book.status) {
			case "unread":
				return (
					<View className="items-center justify-center">
						<Ionicons name="library" size={40} color={colors.main.accent} />
					</View>
				);
			case "reading":
				return (
					// 円形プログレス
					<View className="items-center justify-end">
						<CircularProgress progress={progress} size={60} thickness={6} />
					</View>

				);
			case "completed":
				return (
					<View className="items-center justify-center">
						<Ionicons name="trophy" size={40} color={colors.main.accent} />
					</View>
				);
			default:
				return null;
		}
	};

	return (
		<View className="relative">
			<Pressable
				onPress={handleCardPress}
				className="flex-row py-3 px-4 rounded-xl border border-gray-200 shadow-sm w-full justify-between"
				style={{ backgroundColor: colors.background.card }}
			>
				{/* サムネイル */}
					<View className="flex items-center justify-center">
						{book.thumbnailUrl ? (
							typeof book.thumbnailUrl === "string" ? (
								<Image
									source={{ uri: book.thumbnailUrl }}
									variant="rounded-md"
									style={{ resizeMode: "cover", width: 90, height: 126 }}
								/>
							) : (
								<Image
									source={book.thumbnailUrl}
									variant="rounded-md"
									style={{ resizeMode: "cover", width: 90, height: 126 }}
								/>
							)
						) : (
							<View className="w-13 h-16 rounded-md bg-gray-100 items-center justify-center" />
						)}
					</View>
				{/* 中央コンテンツ */}
				<View className="flex-1 flex-col justify-between pl-3">
					{/* タイトルと著者（上） */}
					<View className="flex-row justify-between" style={{ alignItems: "stretch" }}>
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
						{/* 右上：3点ボタン */}
						<View className="ml-2">
							<Pressable onPress={() => setShowMenu(!showMenu)}>
								<Ionicons name="ellipsis-horizontal" size={20} color={colors.text.black} />
							</Pressable>
						</View>
					</View>
				
					{/* 日付情報とステータスアイコン（下、横並び） */}
					<View className="flex-row items-end justify-between mt-2">
						{/* 日付情報 */}
						<View className="">
							{/* 読破済みの場合は完読日、それ以外は目標読破日 */}
							{book.status === "completed" && book.completedDate ? (
								<View className="flex-row items-center">
									<Ionicons name="trophy" size={16} color={colors.main.accent} />
									<View className="pl-1">
										<Text size="body1" color="black">
											{formatDateSlash(book.completedDate)}
										</Text>
									</View>
								</View>
							) : (
								<View className="flex-row items-center">
									<Ionicons name="flag" size={16} color={colors.main.accent} />
									<View className="pl-1">
										<Text size="body1" color="black">
											{formatDateSlash(book.targetCompleteDate)}
										</Text>
									</View>
								</View>
							)}
					
							{/* 登録日 */}
							<View className="flex-row items-center">
								<Ionicons name="star-outline" size={16} color={colors.main.accent} />
								<View className="pl-1">
									<Text size="body1" color="black">
										{getDateFromISO(book.createdAt)}
									</Text>
								</View>
							</View>
						</View>
						{/* 右側のステータス表示 */}
						<View className="">
							{renderStatusIndicator()}
						</View>
					</View>
				</View>
			</Pressable>

			{/* メニューポップアップ（本を削除） */}
			{showMenu && (
				<View 
					className="absolute right-4 top-16"
					style={{ zIndex: 1000 }}
				>
					<MenuPopup
						items={[
							{
								label: "本を削除",
								onPress: confirmDelete,
								color: "red",
							},
						]}
						onClose={() => setShowMenu(false)}
					/>
				</View>
			)}
		</View>
	);
};


