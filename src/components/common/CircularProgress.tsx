import { Circle } from "react-native-progress";
import { colors } from "@/constants/colors";
import { textSizes } from "./Text";

type Props = {
	progress: number;
	size: number;
	thickness: number;
};

export function CircularProgress(props: Props) {
	const progressValue = props.progress / 100;
	return (
		<Circle
			progress={progressValue}
			size={props.size}
			thickness={props.thickness}
			color={colors.accent}
			unfilledColor="#E5E5E5"
			borderWidth={0}
			showsText={true}
			formatText={() => `${props.progress}%`}
			textStyle={{
				fontSize: textSizes.title2,
				fontWeight: "bold",
				color: colors.text.black,
			}}
			direction="clockwise"
			strokeCap="round"
		/>
	);
}
