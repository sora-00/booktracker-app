import { View } from "react-native";
import { Text } from "@/components/common/Text";
import { Image } from "@/components/common/Image";
import { FLAG_SIZE, MARK_SIZE } from "@/constants/track";

const starFlagPng = require("~/assets/img/icon/starflag.png");
const markPng = require("~/assets/img/icon/mark.png");

type Props = {
	top: number;
	date?: string;
	startX: number;
};

export function StartMarker(props: Props) {
	return (
		<View className="absolute items-center justify-center" style={{ left: props.startX - 30, top: 25 }}>
			<View style={{ top: 5, left: 12 }}>
				<Image source={starFlagPng} style={{ width: FLAG_SIZE, height: FLAG_SIZE, backgroundColor: "transparent" }} variant="square" />
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
