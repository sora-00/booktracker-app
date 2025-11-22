import { ScrollView, View } from "react-native";
import { Spacer } from "../../common/Spacer";
import { BottomModal } from "../../common/BottomModal";
import { useOverlay } from "../../hooks/useOverlay";
import LogForm from "./LogForm";
import { AddButton } from "../../common/AddButton";
import { Text } from "../../common/Text";
import { LogCard } from "./LogCard";
import { BookStatusFilter } from "../book-shelf/BookStatusFilter";
import { useState } from "react";
import type { Book, Log } from "@mods/entities";
import type { LogFilterStatus } from "@mods/types/log";

type LogWithBook = {
	log: Log;
	book: Book;
};

type Props = {
	logs: Log[];
	selectedBook: Book | null;
	readDate: string;
	startPage: string;
	endPage: string;
	memo: string;
	books: Book[];
	onSelectBook: (book: Book) => void;
	onChangeReadDate: (value: string) => void;
	onChangeStartPage: (value: string) => void;
	onChangeEndPage: (value: string) => void;
	onChangeMemo: (value: string) => void;
	onFormAdd: () => void;
	onDeleteLog: (logId: number) => void;
	onUpdateLogMemo: (logId: number, memo: string) => void;
};

export default function Log({
	logs,
	selectedBook,
	readDate,
	startPage,
	endPage,
	memo,
	books,
	onSelectBook,
	onChangeReadDate,
	onChangeStartPage,
	onChangeEndPage,
	onChangeMemo,
	onFormAdd,
	onDeleteLog,
	onUpdateLogMemo,
}: Props) {
	const modalOverlay = useOverlay();

	const handleFormAdd = () => {
		onFormAdd();
		modalOverlay.close();
	};

	const [selectedFilter, setSelectedFilter] = useState<LogFilterStatus>("all");

	// LogとBookをマッピング
	const logsWithBooks: LogWithBook[] = logs
		.map((log) => {
			const book = books.find((b) => b.id === log.bookId);
			if (!book) {
				return null;
			}
			return { log, book };
		})
		.filter((item): item is LogWithBook => item !== null);

	// フィルタリング（本のstatusでフィルタ）
	const filteredLogsWithBooks = selectedFilter === "all" 
		? logsWithBooks 
		: logsWithBooks.filter((item) => item.book.status === selectedFilter);

	// createdAtで降順ソート（新しい順）
	const sortedLogsWithBooks = [...filteredLogsWithBooks].sort((a, b) => {
		const dateA = new Date(a.log.createdAt).getTime();
		const dateB = new Date(b.log.createdAt).getTime();
		return dateB - dateA;
	});

	return (
		<View className="flex-1 items-center">
			<Spacer height={10} />
			<BookStatusFilter
				selectedFilter={selectedFilter}
				onFilterChange={setSelectedFilter}
				availableFilters={["all", "reading", "completed"]}
			/>
			<Spacer height={20} />
			<ScrollView showsVerticalScrollIndicator={false} className="flex-1 w-full">
				{sortedLogsWithBooks.length > 0 ? (
					sortedLogsWithBooks.map(({ log, book }) => (
						<View key={log.id}>
							<LogCard
								log={log}
								book={book}
								onDeleteLog={onDeleteLog}
								onUpdateLogMemo={onUpdateLogMemo}
							/>
							<Spacer height={20} />
						</View>
					))
				) : (
					<View className="items-center justify-center py-20">
						<Text size="body1" color="gray">記録がありません</Text>
					</View>
				)}
				<Spacer height={100} />
			</ScrollView>
			
			{/* 右下のペンボタン */}
			<AddButton onPress={modalOverlay.open} icon="pencil" />

			{/* BottomModalでBookLogFormを表示 */}
			<BottomModal overlay={modalOverlay} portalName="book-log-form" height="full">
				<LogForm
					selectedBook={selectedBook}
					readDate={readDate}
					startPage={startPage}
					endPage={endPage}
					memo={memo}
					books={books}
					onSelectBook={onSelectBook}
					onChangeReadDate={onChangeReadDate}
					onChangeStartPage={onChangeStartPage}
					onChangeEndPage={onChangeEndPage}
					onChangeMemo={onChangeMemo}
					onAdd={handleFormAdd}
				/>
			</BottomModal>
		</View>
	);
}
