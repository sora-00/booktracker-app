import { View, type StyleProp, type ViewStyle } from "react-native";
import { colors } from "@/constants/colors";

type Props = {
	width: number;
	height: number;
	style?: StyleProp<ViewStyle>;
	borderWidth?: number;
	borderColor?: string;
};

/** 表紙がないときの単色の長方形プレースホルダー */
export function BookCoverPlaceholder(props: Props) {
	const { width, height, style, borderWidth = 0, borderColor } = props;
	return (
		<View
			className="rounded-md"
			style={[
				{ width, height, backgroundColor: colors.light },
				borderWidth > 0 ? { borderWidth, borderColor: borderColor ?? colors.primary } : null,
				style,
			]}
		/>
	);
}
