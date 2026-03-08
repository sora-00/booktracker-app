import { View } from "react-native";
import { colors } from "@/constants/colors";
import { TRACK_HEIGHT } from "@/constants/track";

type Props = {
	completedRatio: number;
	startX: number;
	endX: number;
	top: number;
};

export function ProgressTrack(props: Props) {
	const trackWidth = props.endX - props.startX;
	const progressWidth = trackWidth * Math.min(Math.max(props.completedRatio, 0), 1);
	const dashLength = 6;
	const gapLength = 4;
	const dashCount = Math.ceil(trackWidth / (dashLength + gapLength));

	return (
		<>
			<View className="absolute flex-row" style={{ left: props.startX, top: props.top - TRACK_HEIGHT / 2 }}>
				{Array.from({ length: dashCount }).map((_, index) => (
					<View
						key={index}
						style={{
							width: dashLength,
							height: TRACK_HEIGHT,
							backgroundColor: colors.text.gray,
							marginRight: gapLength,
							borderRadius: TRACK_HEIGHT / 2,
						}}
					/>
				))}
			</View>
			{progressWidth > 0 && (
				<View
					className="absolute rounded-full"
					style={{
						left: props.startX,
						top: props.top - TRACK_HEIGHT / 2,
						width: progressWidth,
						height: TRACK_HEIGHT,
						backgroundColor: colors.primary,
					}}
				/>
			)}
		</>
	);
}
