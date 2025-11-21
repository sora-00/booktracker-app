import { View } from "react-native";
import { colors } from "../../../common/colors";
import { TRACK_HEIGHT } from "../types/constants";

type ProgressTrackProps = {
	completedRatio: number;
	startX: number;
	endX: number;
	top: number;
};

export function ProgressTrack({ completedRatio, startX, endX, top }: ProgressTrackProps) {
	const trackWidth = endX - startX;
	const progressWidth = trackWidth * Math.min(Math.max(completedRatio, 0), 1);

	const dashLength = 6;
	const gapLength = 4;
	const dashCount = Math.ceil(trackWidth / (dashLength + gapLength));

	return (
		<>
			<View className="absolute flex-row" style={{ left: startX, top: top - TRACK_HEIGHT / 2 }}>
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
						left: startX,
						top: top - TRACK_HEIGHT / 2,
						width: progressWidth,
						height: TRACK_HEIGHT,
						backgroundColor: colors.main.primary,
					}}
				/>
			)}
		</>
	);
}
