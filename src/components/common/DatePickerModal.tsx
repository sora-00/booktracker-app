import { View, Pressable, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import { Text } from "./Text";
import { BottomModal } from "./BottomModal";
import { formatDate } from "@/utils/date";
import { createDatePickerChangeHandler } from "@/utils/datePicker";
import type { useOverlay } from "@/hooks/useOverlay";

type Overlay = ReturnType<typeof useOverlay>;

type Props = {
	value: Date;
	onChange: (value: string) => void;
	onDateChange?: (date: Date) => void;
	overlay: Overlay;
};

export function DatePickerModal(props: Props) {
	const handleDateChange = createDatePickerChangeHandler({
		isIos: Platform.OS === "ios",
		onChange: props.onChange,
		onDateChange: props.onDateChange,
		onClose: props.overlay.close,
	});

	const handleConfirm = () => {
		props.onChange(formatDate(props.value));
		props.overlay.close();
	};

	if (Platform.OS === "ios") {
		return (
			<BottomModal overlay={props.overlay} portalName="date-picker" height="half">
				<SafeAreaView edges={["bottom"]}>
					<View className="items-center">
						<View className="items-center">
							<DateTimePicker
								value={props.value}
								mode="date"
								display="inline"
								locale="ja-JP"
								accentColor={colors.accent}
								onChange={handleDateChange}
							/>
						</View>
						<View className="flex-row justify-end gap-4 w-full pb-2">
							<Pressable onPress={() => props.overlay.close()}>
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

	return props.overlay.isShow ? (
		<DateTimePicker
			value={props.value}
			mode="date"
			display="default"
			locale="ja-JP"
			onChange={handleDateChange}
		/>
	) : null;
}
