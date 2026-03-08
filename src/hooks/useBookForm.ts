import { useState, useEffect, useCallback } from "react";
import type { Status } from "@/types";
import { getOneMonthLaterDate } from "@/utils/date";
import { calculatePagesPerDay } from "@/utils/reading";

/**
 * 本の登録フォームの状態管理用hook
 */
export function useBookForm() {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [totalPages, setTotalPages] = useState("");
	const [publisher, setPublisher] = useState("");
	const [encounterNote, setEncounterNote] = useState("");
	const [thumbnailUrl, setThumbnailUrl] = useState("");
	const [readingStatus, setReadingStatus] = useState<Status>("unread");
	const [targetCompleteDate, setTargetCompleteDate] = useState(getOneMonthLaterDate());
	const [readPages, setReadPages] = useState("");
	const [targetPagesPerDay, setTargetPagesPerDay] = useState("");
	const [hasThumbnailImage, setHasThumbnailImage] = useState(false);
	const [thumbnailUploading, setThumbnailUploading] = useState(false);
	const [resetTrigger, setResetTrigger] = useState(0);

	useEffect(() => {
		if (targetCompleteDate && totalPages) {
			const calculatedPagesPerDay = calculatePagesPerDay(
				targetCompleteDate,
				totalPages,
				readPages
			);
			if (calculatedPagesPerDay !== null) {
				setTargetPagesPerDay(calculatedPagesPerDay.toString());
			}
		}
	}, [targetCompleteDate, totalPages, readPages]);

	const resetForm = useCallback(() => {
		setTitle("");
		setAuthor("");
		setTotalPages("");
		setPublisher("");
		setEncounterNote("");
		setThumbnailUrl("");
		setReadingStatus("unread");
		setTargetCompleteDate(getOneMonthLaterDate());
		setReadPages("");
		setTargetPagesPerDay("");
		setHasThumbnailImage(false);
		setThumbnailUploading(false);
		setResetTrigger((k) => k + 1);
	}, []);

	const handleThumbnailUploadStateChange = useCallback((hasImage: boolean, isUploading: boolean) => {
		setHasThumbnailImage(hasImage);
		setThumbnailUploading(isUploading);
	}, []);

	return {
		title,
		author,
		totalPages,
		publisher,
		encounterNote,
		thumbnailUrl,
		readingStatus,
		targetCompleteDate,
		readPages,
		targetPagesPerDay,
		resetTrigger,
		hasThumbnailImage,
		thumbnailUploading,
		setTitle,
		setAuthor,
		setTotalPages,
		setPublisher,
		setEncounterNote,
		setThumbnailUrl,
		setReadingStatus,
		setTargetCompleteDate,
		setReadPages,
		setTargetPagesPerDay,
		handleThumbnailUploadStateChange,
		resetForm,
	};
}
