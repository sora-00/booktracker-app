import { ScrollView, View, Text } from "react-native";
import { Book } from "../../../../mods/entities/book";
import { BookCard } from "../../common/BookCard";
import { Input } from "../../common/Input";
import { Button } from "../../common/Button";
import { useState, useEffect } from "react";
import { Spacer } from "../../common/Spacer";
import { useBooks } from "../../../../mods/hooks/useBooks";

export default function Home() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const { books, add, initialize } = useBooks();

  useEffect(() => {
    initialize();
  }, [initialize]);

  // デバッグ用、ここで確実にbooksの中身を出力
  console.log('books (デバッグ用):', books);
  console.log('books.length:', books.length);
  if (books.length > 0) {
    console.log('books[0]:', books[0]);
  }

  const handleAdd = async () => {
    if (!title.trim() || !author.trim()) return;
    try {
      await add({ title: title.trim(), author: author.trim() });
      setTitle("");
      setAuthor("");
      console.log("本を追加しました:", title, author);
    } catch (error) {
      console.error("追加に失敗しました:", error);
    }
  };

  return (
    <View className="flex-1">
      <View className="gap-3 pt-32 px-10 flex-shrink-0">
        <Input value={title} onChangeText={setTitle} placeholder="タイトル" />
        <Input value={author} onChangeText={setAuthor} placeholder="著者" />
        <Spacer height={30} />
        <Button title="追加" onPress={handleAdd} />
      </View>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="gap-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}


