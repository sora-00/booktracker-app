import { ScrollView, View } from "react-native";
import { BookCard } from "../../common/BookCard";
import { Input } from "../../common/Input";
import { Button } from "../../common/Button";
import { Spacer } from "../../common/Spacer";
import type { Book } from "@mods/entities/book";
import { colors } from "../../common/colors";

type Props = {
	books: Book[];
	title: string;
	author: string;
	onChangeTitle: (value: string) => void;
	onChangeAuthor: (value: string) => void;
	onAdd: () => void;
};

export default function BookShelf({
	books,
	title,
	author,
	onChangeTitle,
	onChangeAuthor,
	onAdd,
}: Props) {
	console.log("books (デバッグ用):", books);
	console.log("books.length:", books.length);
	if (books.length > 0) {
		console.log("books[0]:", books[0]);
	}

	return (
		<View className="flex-1">
			<View className="gap-3">
                <Spacer height={30} />
				<View className="width-full">
					<Input value={title} onChangeText={onChangeTitle} placeholder="タイトル" />
				</View>
				<View className="width-full">
					<Input value={author} onChangeText={onChangeAuthor} placeholder="著者" />
				</View>
				<Spacer height={30} />
                <View className="width-full">
                    <Button title="追加" onPress={onAdd}/>
                </View>
			</View>
			<ScrollView className="flex-1">
				<View className="gap-3">
					{books.map((book) => (
						<BookCard key={book.id} book={book} />
					))}
					<Spacer height={24} />
				</View>
			</ScrollView>
		</View>
	);
}


