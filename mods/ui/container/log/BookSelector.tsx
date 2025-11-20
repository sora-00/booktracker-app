import { View, ScrollView, Pressable } from "react-native";
import { Text } from "../../common/Text";
import { Image } from "../../common/Image";
import { Spacer } from "../../common/Spacer";
import { colors } from "../../common/colors";
import { Ionicons } from "@expo/vector-icons";
import type { Book } from "@mods/entities";

type Props = {
	books: Book[];
	onSelectBook: (book: Book) => void;
};

export function BookSelector({ books, onSelectBook }: Props) {
	// statusで本を分類
	const readingBooks = books.filter((book) => book.status === "reading");
	const unreadBooks = books.filter((book) => book.status === "unread");
	const completedBooks = books.filter((book) => book.status === "completed");

	const renderBookCover = (book: Book) => {
		return (
			<Pressable
				key={book.id}
				onPress={() => onSelectBook(book)}
				className="items-center"
				style={{ width: "25%", paddingHorizontal: 6 }}
			>
				<View className="items-center">
					{book.thumbnailUrl ? (
						typeof book.thumbnailUrl === "string" ? (
							<Image
								source={{ uri: book.thumbnailUrl }}
								variant="rounded-md"
								style={{ resizeMode: "cover", width: 75, height: 105 }}
							/>
						) : (
							<Image
								source={book.thumbnailUrl}
								variant="rounded-md"
								style={{ resizeMode: "cover", width: 75, height: 105 }}
							/>
						)
					) : (
						<View className="w-[75px] h-[105px] rounded-md bg-gray-100 items-center justify-center" />
					)}
					<Spacer height={6} />
					<View style={{ width: 75, alignItems: "center" }}>
						<Text size="body2" color="black">
							{book.title}
						</Text>
					</View>
				</View>
			</Pressable>
		);
	};

	const renderBookRow = (bookList: Book[]) => {
		const rows = [];
		for (let i = 0; i < bookList.length; i += 4) {
			const rowBooks = bookList.slice(i, i + 4);
			rows.push(
				<View key={i} className="flex-row mb-4">
					{rowBooks.map((book) => renderBookCover(book))}
				</View>
			);
		}
		return rows;
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false} className="flex-1">
			<Spacer height={10} />
			
			{/* 読み途中 */}
			{readingBooks.length > 0 && (
				<View className="mb-6">
					<View className="flex-row items-center mb-3">
						<Ionicons name="walk" size={20} color={colors.main.accent} />
						<View style={{ marginLeft: 8 }}>
							<Text size="title2" color="black" weight="bold">
								読み途中
							</Text>
						</View>
					</View>
					{renderBookRow(readingBooks)}
				</View>
			)}

			{/* 未読 */}
			{unreadBooks.length > 0 && (
				<View className="mb-6">
					<View className="flex-row items-center mb-3">
						<Ionicons name="book" size={20} color={colors.main.accent} />
						<View style={{ marginLeft: 8 }}>
							<Text size="title2" color="black" weight="bold">
								未読
							</Text>
						</View>
					</View>
					{renderBookRow(unreadBooks)}
				</View>
			)}

			{/* 読破済 */}
			{completedBooks.length > 0 && (
				<View className="mb-6">
					<View className="flex-row items-center mb-3">
						<Ionicons name="trophy" size={20} color={colors.main.accent} />
						<View style={{ marginLeft: 8 }}>
							<Text size="title2" color="black" weight="bold">
								もう一度読む
							</Text>
						</View>
					</View>
					{renderBookRow(completedBooks)}
				</View>
			)}

			{books.length === 0 && (
				<View className="items-center justify-center py-20">
					<Text size="body1" color="gray">登録されている本がありません</Text>
				</View>
			)}

			<Spacer height={20} />
		</ScrollView>
	);
}

