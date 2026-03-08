import { View } from "react-native";
import { Text } from "@/components/common/Text";
import { Image } from "@/components/common/Image";
import { FLAG_SIZE, MARK_SIZE } from "@/constants/track";

const goalFlagPng = require("~/assets/img/icon/goalflag.png");
const markPng = require("~/assets/img/icon/mark.png");

type Props = {
	x: number;
	top: number;
	date?: string;
};

export function GoalMarker(props: Props) {
	return (
		<View className="absolute items-center justify-center" style={{ left: props.x - 30, top: 25 }}>
			<View style={{ top: 5, left: 12 }}>
				<Image source={goalFlagPng} style={{ width: FLAG_SIZE, height: FLAG_SIZE, backgroundColor: "transparent" }} variant="square" />
			</View>
			<Image source={markPng} style={{ width: MARK_SIZE, height: MARK_SIZE, backgroundColor: "transparent" }} variant="square" />
			{props.date && (
				<View style={{ top: 8 }}>
					<Text size="body2" color="gray">{props.date}</Text>
				</View>
			)}
		</View>
	);
}
