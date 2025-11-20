import { TextInput, TextInputProps, View } from "react-native";
import { useEffect } from "react";
import { colors } from "./colors";
import { textSizes, Text } from "./Text";

type Props = TextInputProps & {
	title?: string;
	placeholder?: string;
	errorMessage?: string;
	validation?: (value: string) => string | undefined;
	onValidationChange?: (hasError: boolean) => void;
	minHeight?: number;
};

export function Input(props: Props) {
	const { errorMessage, validation, onValidationChange, value, minHeight, ...textInputProps } = props;
	
	// バリデーションを実行
	const validationError = validation && value ? validation(value) : undefined;
	const displayError = errorMessage || validationError;
	
	// バリデーション状態の変化を親に通知
	useEffect(() => {
		if (onValidationChange && validation) {
			onValidationChange(Boolean(validationError));
		}
	}, [validationError, onValidationChange, validation]);
	
	return (
		<View className="flex flex-col gap-1 items-start w-full">
			{props.title && (
			<View className="flex justify-start items-start">
				<Text size="body1" color="black">{props.title}</Text>
			</View>
			)}
			<View 
				className="w-full border rounded-[20px] py-3 px-4"
				style={{
					borderColor: colors.input.border,
					backgroundColor: colors.input.background,
				}}
			>
				<TextInput 
					{...textInputProps}
					value={value}
					placeholder={props.placeholder}
					placeholderTextColor={colors.text.gray}
					multiline={props.multiline}
					style={{
						fontSize: textSizes.body1,
						fontFamily: "ZenMaruGothic-Regular",
						minHeight: minHeight,
					}}
				/>
			</View>
			{displayError && (
				<View className="px-4">
					<Text size="body2" color="red">{displayError}</Text>
				</View>
			)}
		</View>
	);
}


