import { useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import { useBooks } from "../../../mods/hooks/useBooks";
import Home from "../../ui/container/home/Home";

export default function HomeScreen() {
  const { books, getBooks, addBook } = useBooks();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const handleAdd = useCallback(async () => {
    if (!title.trim() || !author.trim()) {
      return;
    }

    const errorMessage = await addBook({ title: title.trim(), author: author.trim() });
    if (errorMessage) {
      console.error("追加に失敗しました:", errorMessage);
      return;
    }

    setTitle("");
    setAuthor("");
  }, [addBook, title, author]);

  return (
    <View style={{ flex: 1 }}>
      <Home
        books={books}
        title={title}
        author={author}
        onChangeTitle={setTitle}
        onChangeAuthor={setAuthor}
        onAdd={handleAdd}
      />
    </View>
  );
}

