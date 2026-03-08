import { Pressable, View } from "react-native";
import { Text } from "@/components/common/Text";
import { Image } from "@/components/common/Image";
import { FLAG_SIZE, MARK_SIZE } from "@/constants/track";

const logFlagPng = require("~/assets/img/icon/logflag.png");
const markPng = require("~/assets/img/icon/mark.png");

type Props = {
	x: number;
	date: string;
	onPress?: () => void;
};

export function LogMarker(props: Props) {
	return (
		<Pressable
			className="absolute items-center justify-center"
			style={{ left: props.x - 30, top: 25 }}
			onPress={props.onPress}
			hitSlop={12}
		>
			<View style={{ top: 5, left: 12 }}>
				<Image source={logFlagPng} style={{ width: FLAG_SIZE, height: FLAG_SIZE, backgroundColor: "transparent" }} variant="square" />
			</View>
			<Image source={markPng} style={{ width: MARK_SIZE, height: MARK_SIZE, backgroundColor: "transparent" }} variant="square" />
			{props.date && (
				<View style={{ top: 8 }}>
					<Text size="body2" color="gray">{props.date}</Text>
				</View>
			)}
		</Pressable>
	);
}
