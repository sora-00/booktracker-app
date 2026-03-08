import { Pressable, View } from "react-native";
import { ReactNode } from "react";
import { Text } from "./Text";

type Props = {
	title?: string;
	onPress: () => void;
	disabled?: boolean;
	icon?: ReactNode;
};

export function RoundedButton(props: Props) {
	const hasIcon = Boolean(props.icon);
	const hasTitle = Boolean(props.title);
	const showTitle = hasTitle;
	const showIcon = hasIcon && !hasTitle;

	return (
		<View
			className={`w-full min-h-[52px] rounded-[24px] ${props.disabled ? "bg-light" : "bg-primary"} ${showIcon ? "px-4" : "px-6"}`}
			style={{ paddingVertical: 14 }}
		>
			<Pressable
				onPress={props.onPress}
				disabled={props.disabled}
				style={{
					flex: 1,
					width: "100%",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{showIcon && props.icon}
				{showTitle && (
					<Text size="title1" color="white" weight="bold">{props.title}</Text>
				)}
			</Pressable>
		</View>
	);
}
