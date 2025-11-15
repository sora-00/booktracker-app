import { useEffect, useState, useCallback } from "react";
import { useBooks } from "@mods/hooks/useBooks";
import BookShelf from "@ui/container/book-shelf/BookShelf";
import { Container } from "@ui/common/Container";

export default function BookshelfScreen() {
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
        <Container>
            <BookShelf
                books={books}
                title={title}
                author={author}
                onChangeTitle={setTitle}
                onChangeAuthor={setAuthor}
                onAdd={handleAdd}
            />
        </Container>
	);
}


