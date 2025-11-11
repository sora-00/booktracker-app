import { ScrollView, View } from "react-native";
import { BookCard } from "../../common/BookCard";
import { Input } from "../../common/Input";
import { Button } from "../../common/Button";
import { Spacer } from "../../common/Spacer";
import type { Book } from "../../../../mods/entities/book";

type Props = {
  books: Book[];
  title: string;
  author: string;
  onChangeTitle: (value: string) => void;
  onChangeAuthor: (value: string) => void;
  onAdd: () => void;
};

export default function Home({ books, title, author, onChangeTitle, onChangeAuthor, onAdd }: Props) {
  // デバッグ用、ここで確実にbooksの中身を出力
  console.log("books (デバッグ用):", books);
  console.log("books.length:", books.length);
  if (books.length > 0) {
    console.log("books[0]:", books[0]);
  }

  return (
    <View className="flex-1">
      <View className="gap-3 pt-32 px-10 flex-shrink-0">
        <Input value={title} onChangeText={onChangeTitle} placeholder="タイトル" />
        <Input value={author} onChangeText={onChangeAuthor} placeholder="著者" />
        <Spacer height={30} />
        <Button title="追加" onPress={onAdd} />
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="gap-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}


