import * as Progress from "react-native-progress";
import { colors } from "./colors";
import { textSizes } from "./Text";

type Props = {
	progress: number; // 0-100の範囲
	size?: number;
	thickness?: number;
};

export function CircularProgress( props : Props) {
	// 進捗を0-1の範囲に変換
	const progressValue = props.progress / 100;
	
	return (
		<Progress.Circle
			progress={progressValue}
			size={props.size}
			thickness={props.thickness}
			color={colors.main.accent}
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
};

