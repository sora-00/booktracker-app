import { View, ScrollView, Pressable } from "react-native";
import { Text } from "@/components/common/Text";
import { Image } from "@/components/common/Image";
import { Spacer } from "@/components/common/Spacer";
import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import type { Book } from "@/types";

type Props = {
	books: Book[];
	onSelectBook: (book: Book) => void;
};

export function BookSelector(props: Props) {
	const readingBooks = props.books.filter((book) => book.status === "reading");
	const unreadBooks = props.books.filter((book) => book.status === "unread");
	const completedBooks = props.books.filter((book) => book.status === "completed");

	const renderBookCover = (book: Book) => (
		<View key={book.id} className="items-center w-1/4 px-1.5">
			<Pressable onPress={() => props.onSelectBook(book)}>
				<View className="items-center">
				{book.thumbnailUrl ? (
					typeof book.thumbnailUrl === "string" ? (
						<Image source={{ uri: book.thumbnailUrl }} variant="rounded-md" style={{ resizeMode: "cover", width: 75, height: 105 }} />
					) : (
						<Image source={book.thumbnailUrl} variant="rounded-md" style={{ resizeMode: "cover", width: 75, height: 105 }} />
					)
				) : (
					<View className="w-[75px] h-[105px] rounded-md bg-gray-100 items-center justify-center" />
				)}
				<Spacer height={6} />
				<View className="w-[75px] items-center">
					<Text size="body2" color="black">{book.title}</Text>
				</View>
			</View>
			</Pressable>
		</View>
	);

	const renderBookRow = (bookList: Book[]) => {
		const rows = [];
		for (let i = 0; i < bookList.length; i += 4) {
			const rowBooks = bookList.slice(i, i + 4);
			rows.push(<View key={i} className="flex-row mb-4">{rowBooks.map((book) => renderBookCover(book))}</View>);
		}
		return rows;
	};

	return (
		<View className="flex-1">
			<ScrollView showsVerticalScrollIndicator={false}>
				<Spacer height={10} />
			{readingBooks.length > 0 && (
				<View className="mb-6">
					<View className="flex-row items-center mb-3">
						<Ionicons name="walk" size={20} color={colors.accent} />
						<View style={{ marginLeft: 8 }}><Text size="title2" color="black" weight="bold">読み途中</Text></View>
					</View>
					{renderBookRow(readingBooks)}
				</View>
			)}
			{unreadBooks.length > 0 && (
				<View className="mb-6">
					<View className="flex-row items-center mb-3">
						<Ionicons name="book" size={20} color={colors.accent} />
						<View style={{ marginLeft: 8 }}><Text size="title2" color="black" weight="bold">未読</Text></View>
					</View>
					{renderBookRow(unreadBooks)}
				</View>
			)}
			{completedBooks.length > 0 && (
				<View className="mb-6">
					<View className="flex-row items-center mb-3">
						<Ionicons name="trophy" size={20} color={colors.accent} />
						<View style={{ marginLeft: 8 }}><Text size="title2" color="black" weight="bold">もう一度読む</Text></View>
					</View>
					{renderBookRow(completedBooks)}
				</View>
			)}
			{props.books.length === 0 && (
				<View className="items-center justify-center py-20">
					<Text size="body1" color="gray">登録されている本がありません</Text>
				</View>
			)}
			<Spacer height={20} />
			</ScrollView>
		</View>
	);
}
