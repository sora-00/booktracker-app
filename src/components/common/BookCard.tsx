import { View, Pressable, Alert } from "react-native";
import { useState } from "react";
import { Text } from "./Text";
import { Image } from "./Image";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { CircularProgress } from "./CircularProgress";
import { formatDateSlash, getDateFromISO } from "@/utils/date";
import { calculateProgress } from "@/utils/reading";
import { MenuPopup } from "./MenuPopup";
import type { Book } from "@/types";

type Props = {
	book: Book;
	onDeleteBook?: (bookId: number) => void;
	onPress?: (book: Book) => void;
};

export function BookCard(props: Props) {
	const [showMenu, setShowMenu] = useState(false);
	const progress = props.book.totalPages && props.book.readPages !== undefined
		? calculateProgress(props.book.readPages, props.book.totalPages)
		: 0;

	const confirmDelete = () => {
		Alert.alert("本を削除", "この本を削除しますか？", [
			{ text: "キャンセル", style: "cancel" },
			{ text: "削除", style: "destructive", onPress: () => props.onDeleteBook?.(props.book.id) },
		]);
	};

	const handleCardPress = () => props.onPress?.(props.book);

	const renderStatusIndicator = () => {
		switch (props.book.status) {
			case "unread":
				return (
					<View className="items-center justify-center">
						<Ionicons name="library" size={40} color={colors.accent} />
					</View>
				);
			case "reading":
				return (
					<View className="items-center justify-end">
						<CircularProgress progress={progress} size={60} thickness={6} />
					</View>
				);
			case "completed":
				return (
					<View className="items-center justify-center">
						<Ionicons name="trophy" size={40} color={colors.accent} />
					</View>
				);
			default:
				return null;
		}
	};

	return (
		<View className="relative">
			<View className="flex-row py-3 px-4 rounded-xl shadow-sm w-full justify-between bg-white">
				<Pressable onPress={handleCardPress} style={{ flex: 1 }}>
					<View className="flex-1 flex-row">
						<View className="flex items-center justify-center">
							{props.book.thumbnailUrl ? (
								typeof props.book.thumbnailUrl === "string" ? (
									<Image source={{ uri: props.book.thumbnailUrl }} variant="rounded-md" style={{ resizeMode: "cover", width: 90, height: 126 }} />
								) : (
									<Image source={props.book.thumbnailUrl} variant="rounded-md" style={{ resizeMode: "cover", width: 90, height: 126 }} />
								)
							) : (
								<View className="w-13 h-16 rounded-md bg-gray-100 items-center justify-center" />
							)}
						</View>
						<View className="flex-1 flex-col justify-between pl-3">
							<View className="flex-row justify-between items-stretch">
								<View className="flex-1">
									<Text size="title2" color="black" weight="bold">{props.book.title}</Text>
									<View className="mt-1">
										<Text size="body1" color="black">{props.book.author}</Text>
									</View>
								</View>
								<View className="ml-2">
									<Pressable onPress={() => setShowMenu(!showMenu)}>
										<Ionicons name="ellipsis-horizontal" size={20} color={colors.text.black} />
									</Pressable>
								</View>
							</View>
							<View className="flex-row items-end justify-between mt-2">
								<View>
									{props.book.status === "completed" && props.book.completedDate ? (
										<View className="flex-row items-center">
											<Ionicons name="trophy" size={16} color={colors.accent} />
											<View className="pl-1">
												<Text size="body1" color="black">{formatDateSlash(props.book.completedDate)}</Text>
											</View>
										</View>
									) : (
										<View className="flex-row items-center">
											<Ionicons name="flag" size={16} color={colors.accent} />
											<View className="pl-1">
												<Text size="body1" color="black">{formatDateSlash(props.book.targetCompleteDate)}</Text>
											</View>
										</View>
									)}
									<View className="flex-row items-center">
										<Ionicons name="star-outline" size={16} color={colors.accent} />
										<View className="pl-1">
											<Text size="body1" color="black">{getDateFromISO(props.book.createdAt)}</Text>
										</View>
									</View>
								</View>
								<View>{renderStatusIndicator()}</View>
							</View>
						</View>
					</View>
				</Pressable>
			</View>
			{showMenu && (
				<View className="absolute right-4 top-16 z-[1000]">
					<MenuPopup
						items={[{ label: "本を削除", onPress: confirmDelete, color: "red" }]}
						onClose={() => setShowMenu(false)}
					/>
				</View>
			)}
		</View>
	);
}
