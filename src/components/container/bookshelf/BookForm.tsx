import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";
import { Input } from "@/components/common/Input";
import { RoundedButton } from "@/components/common/RoundedButton";
import { Spacer } from "@/components/common/Spacer";
import { useImageUploads } from "@/hooks/useImageUploads";
import { ThumbnailUpload } from "./ThumbnailUpload";
import { Divider } from "@/components/common/Divider";
import { Text } from "@/components/common/Text";
import { ReadingStatusSelector } from "./ReadingStatusSelector";
import type { Status } from "@/types";
import { DateInput } from "./DateInput";
import {
	validateTitle,
	validateAuthor,
	validateTotalPages,
	validatePublisher,
	validateBackground,
	validateReadPages,
	validateTargetPagesPerDay,
} from "@/utils/validation";

type Props = {
	title: string;
	author: string;
	totalPages: string;
	publisher: string;
	encounterNote: string;
	thumbnailUrl: string;
	readingStatus: Status;
	targetCompleteDate: string;
	readPages: string;
	targetPagesPerDay: string;
	onChangeTitle: (value: string) => void;
	onChangeAuthor: (value: string) => void;
	onChangeTotalPages: (value: string) => void;
	onChangePublisher: (value: string) => void;
	onChangeEncounterNote: (value: string) => void;
	onThumbnailUrlChange: (url: string) => void;
	onReadingStatusChange: (status: Status) => void;
	onChangeTargetCompleteDate: (value: string) => void;
	onChangeReadPages: (value: string) => void;
	onChangeTargetPagesPerDay: (value: string) => void;
	onAdd: () => void;
	onThumbnailUploadStateChange?: (hasImage: boolean, isUploading: boolean) => void;
	resetTrigger?: number;
};

export default function BookForm(props: Props) {
	const { uploadedData, localImageUri, isUploading, upload, clearUploadedData } = useImageUploads();
	const displayImageUri = uploadedData?.url || localImageUri;
	const hasImage = !!displayImageUri;

	const [titleError, setTitleError] = useState(false);
	const [authorError, setAuthorError] = useState(false);
	const [totalPagesError, setTotalPagesError] = useState(false);
	const [publisherError, setPublisherError] = useState(false);
	const [encounterNoteError, setEncounterNoteError] = useState(false);
	const [readPagesError, setReadPagesError] = useState(false);
	const [targetPagesPerDayError, setTargetPagesPerDayError] = useState(false);

	useEffect(() => {
		props.onThumbnailUrlChange(uploadedData?.url || "");
	}, [uploadedData?.url]);

	useEffect(() => {
		props.onThumbnailUploadStateChange?.(hasImage, isUploading);
	}, [hasImage, isUploading, props.onThumbnailUploadStateChange]);

	useEffect(() => {
		if (props.resetTrigger !== undefined && props.resetTrigger > 0) {
			clearUploadedData();
		}
	}, [props.resetTrigger]);

	const hasValidationError = titleError || authorError || totalPagesError || publisherError || encounterNoteError || readPagesError || targetPagesPerDayError;

	return (
		<View className="flex flex-1 flex-col w-full min-h-0">
			<KeyboardAwareScrollView
				style={{ flex: 1 }}
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
					<Input title="タイトル" value={props.title} onChangeText={props.onChangeTitle} validation={validateTitle} onValidationChange={setTitleError} />
				</View>
				<Spacer height={20} />
				<View className="w-full">
					<Input title="著者" value={props.author} onChangeText={props.onChangeAuthor} validation={validateAuthor} onValidationChange={setAuthorError} />
				</View>
				<Spacer height={20} />
				<View className="flex flex-row justify-between">
					<View className="w-1/2 flex ">
						<View className="pr-10">
							<Input title="総ページ数" value={props.totalPages} onChangeText={props.onChangeTotalPages} validation={validateTotalPages} onValidationChange={setTotalPagesError} keyboardType="numeric" />
						</View>
						<Spacer height={20} />
						<View className="pr-10">
							<Input title="出版社" value={props.publisher} onChangeText={props.onChangePublisher} validation={validatePublisher} onValidationChange={setPublisherError} />
						</View>
					</View>
					<View className="w-1/2">
						<ThumbnailUpload displayImageUri={displayImageUri} isUploading={isUploading} onUpload={upload} />
					</View>
				</View>
				<Spacer height={20} />
				<Divider />
				<Spacer height={20} />
				<View className="w-full">
					<Input title="この本に出会った経緯" value={props.encounterNote} onChangeText={props.onChangeEncounterNote} validation={validateBackground} onValidationChange={setEncounterNoteError} multiline />
				</View>
				<Spacer height={20} />
				<View className="flex flex-row items-start">
					<View className="w-1/2">
						<ReadingStatusSelector status={props.readingStatus} onStatusChange={props.onReadingStatusChange} />
					</View>
					<View className="w-1/2">
						<DateInput title="目標読破日" value={props.targetCompleteDate} onChange={props.onChangeTargetCompleteDate} />
					</View>
				</View>
				<Spacer height={20} />
				<View className="flex-row w-full">
					<View className="w-1/2">
						<View className="pr-10">
							<Input title="読み終わったページ" value={props.readPages} onChangeText={props.onChangeReadPages} validation={validateReadPages} onValidationChange={setReadPagesError} keyboardType="numeric" />
						</View>
					</View>
					<Spacer height={20} />
					<View className="w-1/2">
						<View className="pr-10">
							<Input title="目標ページ数/日" value={props.targetPagesPerDay} onChangeText={props.onChangeTargetPagesPerDay} validation={validateTargetPagesPerDay} onValidationChange={setTargetPagesPerDayError} keyboardType="numeric" />
						</View>
					</View>
				</View>
				<Spacer height={45} />
			</KeyboardAwareScrollView>
			<View className="w-full">
				<RoundedButton title="追加" onPress={props.onAdd} disabled={!props.title || !props.author || !props.totalPages || !props.publisher || !props.thumbnailUrl || !props.encounterNote || !props.readingStatus || !props.targetCompleteDate || !props.readPages || !props.targetPagesPerDay || hasValidationError} />
			</View>
		</View>
	);
}
