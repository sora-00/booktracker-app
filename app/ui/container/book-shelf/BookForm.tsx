import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";
import { Input } from "@ui/common/Input";
import { RoundedButton } from "@ui/common/RoundedButton";
import { Spacer } from "@ui/common/Spacer";
import { useImageUploads } from "@ui/hooks/useImageUploads";
import { ThumbnailUpload } from "./ThumbnailUpload";
import { Divider } from "@ui/common/Divider";
import { Text } from "@ui/common/Text";
import { ReadingStatusSelector } from "./ReadingStatusSelector";
import type { Status } from "@mods/entities/status";
import { DateInput } from "./DateInput";
import {
	validateTitle,
	validateAuthor,
	validateTotalPages,
	validatePublisher,
	validateBackground,
	validateCompletedPages,
	validateTargetPagesPerDay,
} from "../../utils/validation";

type Props = {
	title: string;
	author: string;
	totalPages: string;
	publisher: string;
	background: string;
	thumbnailUrl?: string;
	readingStatus: Status;
	targetCompleteDate: string;
	completedPages: string;
	targetPagesPerDay: string;
	onChangeTitle: (value: string) => void;
	onChangeAuthor: (value: string) => void;
	onChangeTotalPages: (value: string) => void;
	onChangePublisher: (value: string) => void;
	onChangeBackground: (value: string) => void;
	onThumbnailUrlChange: (url: string | undefined) => void;
	onReadingStatusChange: (status: Status) => void;
	onChangeTargetCompleteDate: (value: string) => void;
	onChangeCompletedPages: (value: string) => void;
	onChangeTargetPagesPerDay: (value: string) => void;
	onAdd: () => void;
};
export default function BookForm(props: Props) {
	const { uploadedData, localImageUri, isUploading, upload } = useImageUploads({ type: "thumbnail" });
	const displayImageUri = uploadedData?.url || localImageUri;
	
	// バリデーションエラー状態を管理
	const [titleError, setTitleError] = useState(false);
	const [authorError, setAuthorError] = useState(false);
	const [totalPagesError, setTotalPagesError] = useState(false);
	const [publisherError, setPublisherError] = useState(false);
	const [backgroundError, setBackgroundError] = useState(false);
	const [completedPagesError, setCompletedPagesError] = useState(false);
	const [targetPagesPerDayError, setTargetPagesPerDayError] = useState(false);
	
	// 画像URLが変更されたら親コンポーネントに通知
	useEffect(() => {
		props.onThumbnailUrlChange(uploadedData?.url);
	}, [uploadedData?.url]);

	// バリデーションエラーがあるかどうか
	const hasValidationError = titleError || authorError || totalPagesError || publisherError || backgroundError || completedPagesError || targetPagesPerDayError;

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
					<Text size="title1" color="black">本を新規登録</Text>
				</View>
				<Spacer height={10} />
				<View className="w-full">
					<Input 
						title="タイトル" 
						value={props.title} 
						onChangeText={props.onChangeTitle}
						validation={validateTitle}
						onValidationChange={setTitleError}
					/>
				</View>
				<Spacer height={20} />
				<View className="w-full">
					<Input 
						title="著者" 
						value={props.author} 
						onChangeText={props.onChangeAuthor}
						validation={validateAuthor}
						onValidationChange={setAuthorError}
					/>
				</View>
				<Spacer height={20} />
				<View className="flex flex-row justify-between">
					<View className="w-1/2 flex ">
						<View className="pr-10">
							<Input 
								title="総ページ数" 
								value={props.totalPages} 
								onChangeText={props.onChangeTotalPages}
								validation={validateTotalPages}
								onValidationChange={setTotalPagesError}
								keyboardType="numeric"
							/>
						</View>
						<Spacer height={20} />
						<View className="pr-10">
							<Input 
								title="出版社" 
								value={props.publisher} 
								onChangeText={props.onChangePublisher}
								validation={validatePublisher}
								onValidationChange={setPublisherError}
							/>
						</View>
					</View>
					<View className="w-1/2">
						<ThumbnailUpload
							displayImageUri={displayImageUri}
							isUploading={isUploading}
							onUpload={upload}
						/>
					</View>
				</View>
				<Spacer height={20} />
				<Divider />
				<Spacer height={20} />
				<View className="w-full">
					<Input 
						title="この本に出会った経緯" 
						value={props.background} 
						onChangeText={props.onChangeBackground}
						validation={validateBackground}
						onValidationChange={setBackgroundError}
						multiline
					/>
				</View>
				<Spacer height={20} />
				<View className="flex flex-row items-start">
					<View className="w-1/2">
						<ReadingStatusSelector
							status={props.readingStatus}
							onStatusChange={props.onReadingStatusChange}
						/>
					</View>
					<View className="w-1/2">
						<DateInput
							title="目標読了日"
							value={props.targetCompleteDate}
							onChange={props.onChangeTargetCompleteDate}
						/>
					</View>
				</View>
				<Spacer height={20} />
				<View className="flex-row w-full">
					<View className="w-1/2">
						<View className="pr-10">
							<Input
								title="読み終わったページ"
								value={props.completedPages}
								onChangeText={props.onChangeCompletedPages}
								validation={validateCompletedPages}
								onValidationChange={setCompletedPagesError}
								keyboardType="numeric"
							/>
						</View>
					</View>
					<Spacer height={20} />
					<View className="w-1/2">
						<View className="pr-10">
							<Input 
								title="目標ページ数/日" 
								value={props.targetPagesPerDay} 
								onChangeText={props.onChangeTargetPagesPerDay}
								validation={validateTargetPagesPerDay}
								onValidationChange={setTargetPagesPerDayError}
								keyboardType="numeric"
							/>
						</View>
					</View>
				</View>
				<Spacer height={45} />
			</KeyboardAwareScrollView>
			<View className="w-full">
				<RoundedButton title="追加" onPress={props.onAdd} disabled={hasValidationError} />
			</View>
		</View>
	);
}