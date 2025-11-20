import { View, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState, useMemo } from "react";
import { Input } from "@ui/common/Input";
import { RoundedButton } from "@ui/common/RoundedButton";
import { Spacer } from "@ui/common/Spacer";
import { Divider } from "@ui/common/Divider";
import { Text } from "@ui/common/Text";
import { DateInput } from "../book-shelf/DateInput";
import { BottomModal } from "@ui/common/BottomModal";
import { useOverlay } from "@ui/hooks/useOverlay";
import { BookSelector } from "./BookSelector";
import { BookCard } from "@ui/common/BookCard";
import { colors } from "@ui/common/colors";
import { Ionicons } from "@expo/vector-icons";
import {
	validateStartPage,
	createValidateEndPageWithStart,
	validateMemo,
} from "../../utils/validation";
import type { Book } from "@mods/entities";

type Props = {
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
	onAdd: () => void;
};

export default function LogForm(props: Props) {
	const bookSelectorOverlay = useOverlay();
	
	// バリデーションエラー状態を管理
	const [startPageError, setStartPageError] = useState(false);
	const [endPageError, setEndPageError] = useState(false);
	const [memoError, setMemoError] = useState(false);
	
	// バリデーションエラーがあるかどうか
	const hasValidationError = startPageError || endPageError || memoError;

	// 読み終わったページのバリデーション関数（読み始めたページと総ページ数を考慮）
	const validateEndPageWithStart = useMemo(() => {
		return createValidateEndPageWithStart(props.startPage, props.selectedBook?.totalPages);
	}, [props.startPage, props.selectedBook?.totalPages]);

	const handleBookSelect = (book: Book) => {
		props.onSelectBook(book);
		bookSelectorOverlay.close();
	};

	return (
		<View className="flex flex-1 flex-col w-full">
			<KeyboardAwareScrollView
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
				enableOnAndroid={true}
				enableResetScrollToCoords={false}
				scrollToOverflowEnabled={true}
				enableAutomaticScroll={true}
				extraScrollHeight={0}
			>
				<Spacer height={10} />
				<View className="w-full flex justify-center items-center">
					<Text size="title1" color="black">読書記録を追加</Text>
				</View>
				<Spacer height={10} />
				
				{/* 本選択ボタン */}
				<View className="w-full">
					<Text size="body1" color="black">本を選択</Text>
					<Spacer height={5} />
					{props.selectedBook ? (
						<View className="w-full">
							<BookCard book={props.selectedBook} />
							<Spacer height={10} />
							<Pressable onPress={bookSelectorOverlay.open}>
								<View className="flex-row items-center">
									<View style={{ marginLeft: 6 }}>
										<Text size="body1" color="accent">本を変更</Text>
									</View>
								</View>
							</Pressable>
						</View>
					) : (
						<RoundedButton
							icon={
								<View className="flex-row items-center">
									<Ionicons name="add" size={24} color="white" />
									<Ionicons name="book" size={24} color="white" style={{ marginLeft: 4 }} />
								</View>
							}
							onPress={bookSelectorOverlay.open}
						/>
					)}
				</View>

				<Spacer height={20} />
				<Divider />
				<Spacer height={20} />

				{/* 読んだ日 */}
				<View className="w-full">
					<DateInput
						title="読んだ日"
						value={props.readDate}
						onChange={props.onChangeReadDate}
					/>
				</View>

				<Spacer height={20} />

				{/* 読み始めたページと読み終わったページ */}
				<View className="flex-row w-full">
					<View className="w-1/2">
						<View className="pr-10">
							<Input
								title="読み始めたページ"
								value={props.startPage}
								onChangeText={props.onChangeStartPage}
								keyboardType="numeric"
								validation={validateStartPage}
								onValidationChange={setStartPageError}
								editable={false}
							/>
						</View>
					</View>
					<View className="w-1/2">
						<View className="pr-10">
							<Input
								title="読み終わったページ"
								value={props.endPage}
								onChangeText={props.onChangeEndPage}
								keyboardType="numeric"
								validation={validateEndPageWithStart}
								onValidationChange={setEndPageError}
							/>
						</View>
					</View>
				</View>

				<Spacer height={20} />

				{/* メモ */}
				<View className="w-full">
					<Input
						title="メモ"
						value={props.memo}
						onChangeText={props.onChangeMemo}
						multiline
						validation={validateMemo}
						onValidationChange={setMemoError}
						minHeight={120}
					/>
				</View>

				<Spacer height={45} />
			</KeyboardAwareScrollView>
			<View className="w-full">
				<RoundedButton 
					title="追加" 
					onPress={props.onAdd} 
					disabled={!props.selectedBook || !props.readDate || !props.startPage || !props.endPage || hasValidationError}
				/>
			</View>

			{/* 本選択モーダル */}
			<BottomModal overlay={bookSelectorOverlay} portalName="book-selector" height="full">
				<View className="flex-1">
					<View className="w-full flex justify-center items-center mb-4">
						<Text size="title1" color="black">本を選択</Text>
					</View>
					<BookSelector books={props.books} onSelectBook={handleBookSelect} />
				</View>
			</BottomModal>
		</View>
	);
}

