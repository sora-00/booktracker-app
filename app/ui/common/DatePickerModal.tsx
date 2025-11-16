import { View, Pressable, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "./colors";
import { Text } from "./Text";
import { BottomModal } from "./BottomModal";
import { formatDate } from "../utils/date";
import { useOverlay } from "../hooks/useOverlay";

type Overlay = ReturnType<typeof useOverlay>;

type Props = {
	value: Date;
	onChange: (value: string) => void;
	onDateChange?: (date: Date) => void;
	overlay: Overlay;
};

export function DatePickerModal({ value, onChange, onDateChange, overlay }: Props) {
	const handleDateChange = (event: any, date?: Date) => {
		if (Platform.OS === "android") {
			overlay.close();
			if (event.type === "set" && date) {
				onChange(formatDate(date));
			}
		} else {
			// iOS
			if (date) {
				// 日付が変更されたときは、親のselectedDateを更新
				onDateChange?.(date);
			}
			if (event.type === "dismissed") {
				overlay.close();
			}
		}
	};

	const handleConfirm = () => {
		onChange(formatDate(value));
		overlay.close();
	};

	if (Platform.OS === "ios") {
		return (
			<BottomModal overlay={overlay} portalName="date-picker" height="half">
				<SafeAreaView edges={["bottom"]}>
					<View className="items-center">
						<View className="items-center">
							<DateTimePicker
								value={value}
								mode="date"
								display="inline"
								locale="ja-JP"
								accentColor={colors.main.accent}
								onChange={handleDateChange}
							/>
						</View>
						<View 
							className="flex-row justify-end gap-4" 
							style={{ 
								width: "100%",
								paddingBottom: 8
							}}
						>
							<Pressable onPress={() => overlay.close()}>
								<Text size="body1" color="gray">キャンセル</Text>
							</Pressable>
							<Pressable onPress={handleConfirm}>
								<Text size="body1" color="black">決定</Text>
							</Pressable>
						</View>
					</View>
				</SafeAreaView>
			</BottomModal>
		);
	}

	// Android
	return overlay.isShow ? (
		<DateTimePicker
			value={value}
			mode="date"
			display="default"
			locale="ja-JP"
			onChange={handleDateChange}
		/>
	) : null;
}

