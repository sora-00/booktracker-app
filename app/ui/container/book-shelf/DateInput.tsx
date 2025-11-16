import { View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { colors } from "@ui/common/colors";
import { Text } from "@ui/common/Text";
import { DatePickerModal } from "@ui/common/DatePickerModal";
import { useOverlay } from "@ui/hooks/useOverlay";
import { formatDateForDisplay, parseDate } from "@ui/utils/date";

type Props = {
	title?: string;
	value: string;
	onChange: (value: string) => void;
};

export function DateInput({ title, value, onChange }: Props) {
	const overlay = useOverlay();
	const [selectedDate, setSelectedDate] = useState<Date>(value ? parseDate(value) : new Date());
	
	// valueが変更されたときにselectedDateを更新
	useEffect(() => {
		if (value) {
			setSelectedDate(parseDate(value));
		}
	}, [value]);

	const handleDateChange = (newValue: string) => {
		setSelectedDate(parseDate(newValue));
		onChange(newValue);
	};

	const handleDatePickerChange = (date: Date) => {
		setSelectedDate(date);
	};

	return (
		<View className="flex flex-col gap-1 items-start w-full">
			{title && (
				<View className="flex justify-start items-start">
					<Text size="body1" color="black">{title}</Text>
				</View>
			)}
			<Pressable
				onPress={() => overlay.open()}
				className="w-full"
			>
				<View 
					className="w-full border rounded-[20px] py-3 px-4 flex-row items-center justify-center"
					style={{
						borderColor: colors.input.border,
						backgroundColor: colors.input.background,
					}}
				>
					<Text
						size="title2"
						color={value ? "black" : "gray"}
					>
						{value ? formatDateForDisplay(value) : null}
					</Text>
				</View>
			</Pressable>
			<DatePickerModal
				value={selectedDate}
				onChange={handleDateChange}
				onDateChange={handleDatePickerChange}
				overlay={overlay}
			/>
		</View>
	);
}

