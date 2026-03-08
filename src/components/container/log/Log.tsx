import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { Spacer } from "@/components/common/Spacer";
import { BottomModal } from "@/components/common/BottomModal";
import { useOverlay } from "@/hooks/useOverlay";
import LogForm from "./LogForm";
import { AddButton } from "@/components/common/AddButton";
import { Text } from "@/components/common/Text";
import { LogCard } from "./LogCard";
import { BookStatusFilter } from "@/components/container/bookshelf/BookStatusFilter";
import type { Book, Log, Status } from "@/types";

type LogWithBook = { log: Log; book: Book };

type Props = {
	logs: Log[];
	selectedFilter: Status | undefined;
	onFilterChange: (status: Status | undefined) => void;
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

export default function Log(props: Props) {
	const modalOverlay = useOverlay();
	const logsWithBooks = useMemo<LogWithBook[]>(() => {
		return props.logs
			.map((log) => {
				const book = props.books.find((b) => b.id === log.bookId);
				return book ? { log, book } : null;
			})
			.filter((item): item is LogWithBook => item !== null);
	}, [props.logs, props.books]);

	const handleFormAdd = () => {
		props.onFormAdd();
		modalOverlay.close();
	};

	return (
		<View className="flex-1 items-center">
			<Spacer height={10} />
			<BookStatusFilter selectedFilter={props.selectedFilter} onFilterChange={props.onFilterChange} availableFilters={[undefined, "reading", "completed"]} />
			<Spacer height={20} />
			<View className="flex-1 w-full">
				<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
				{logsWithBooks.length > 0 ? (
					logsWithBooks.map(({ log, book }) => (
						<View key={log.id}>
							<LogCard log={log} book={book} onDeleteLog={props.onDeleteLog} onUpdateLogMemo={props.onUpdateLogMemo} />
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
			</View>
			<AddButton onPress={modalOverlay.open} icon="pencil" />
			<BottomModal overlay={modalOverlay} portalName="book-log-form" height="full">
				<LogForm
					selectedBook={props.selectedBook}
					readDate={props.readDate}
					startPage={props.startPage}
					endPage={props.endPage}
					memo={props.memo}
					books={props.books}
					onSelectBook={props.onSelectBook}
					onChangeReadDate={props.onChangeReadDate}
					onChangeStartPage={props.onChangeStartPage}
					onChangeEndPage={props.onChangeEndPage}
					onChangeMemo={props.onChangeMemo}
					onAdd={handleFormAdd}
				/>
			</BottomModal>
		</View>
	);
}
