import { View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { Text } from "@/components/common/Text";
import { DatePickerModal } from "@/components/common/DatePickerModal";
import { useOverlay } from "@/hooks/useOverlay";
import { formatDateForDisplay, parseDate } from "@/utils/date";

type Props = {
	title?: string;
	value: string;
	onChange: (value: string) => void;
};

export function DateInput(props: Props) {
	const overlay = useOverlay();
	const [selectedDate, setSelectedDate] = useState<Date>(props.value ? parseDate(props.value) : new Date());

	useEffect(() => {
		if (props.value) setSelectedDate(parseDate(props.value));
	}, [props.value]);

	const handleDateChange = (newValue: string) => {
		setSelectedDate(parseDate(newValue));
		props.onChange(newValue);
	};

	const handleDatePickerChange = (date: Date) => {
		setSelectedDate(date);
	};

	return (
		<View className="flex flex-col gap-1 items-start w-full">
			{props.title && (
				<View className="flex justify-start items-start">
					<Text size="body1" color="black">{props.title}</Text>
				</View>
			)}
			<View className="w-full">
				<Pressable onPress={() => overlay.open()}>
					<View
						className="w-full border border-accent bg-gray rounded-[20px] py-3 px-4 flex-row items-center justify-center"
					>
						<Text size="title2" color={props.value ? "black" : "gray"}>
							{props.value ? formatDateForDisplay(props.value) : null}
						</Text>
					</View>
				</Pressable>
			</View>
			<DatePickerModal
				value={selectedDate}
				onChange={handleDateChange}
				onDateChange={handleDatePickerChange}
				overlay={overlay}
			/>
		</View>
	);
}
