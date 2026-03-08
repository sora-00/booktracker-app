import { formatDate } from "./date";

type CreateDatePickerChangeHandlerParams = {
	/** "ios" のときのみ iOS 扱い、それ以外は Android 扱い */
	isIos: boolean;
	onChange: (value: string) => void;
	onDateChange?: (date: Date) => void;
	onClose: () => void;
};

/**
 * DateTimePicker の onChange 用ハンドラを生成する。
 * Android / iOS で挙動が異なるため、プラットフォーム別の処理をまとめる。
 */
export function createDatePickerChangeHandler({
	isIos,
	onChange,
	onDateChange,
	onClose,
}: CreateDatePickerChangeHandlerParams) {
	return (event: { type?: string }, date?: Date) => {
		if (!isIos) {
			onClose();
			if (event.type === "set" && date) {
				onChange(formatDate(date));
			}
		} else {
			if (date) onDateChange?.(date);
			if (event.type === "dismissed") onClose();
		}
	};
}
