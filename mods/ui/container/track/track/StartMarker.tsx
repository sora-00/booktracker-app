import { View } from "react-native";
import { Text } from "../../../common/Text";
import { Image } from "../../../common/Image";
import { FLAG_SIZE, MARK_SIZE } from "../types/constants";

const starFlagPng = require("../../../../../app/assets/img/icon/starflag.png");
const markPng = require("../../../../../app/assets/img/icon/mark.png");

type StartMarkerProps = {
	top: number;
	date?: string;
	startX: number;
};

export function StartMarker({ date, startX }: StartMarkerProps) {
	return (
		<View
			className="absolute items-center justify-center"
			style={{ left: startX - 30, top: 25 }}
		>
			{/* 旗の画像 */}
			<View style={{ top: 5, left: 12 }}>
				<Image source={starFlagPng} style={{ width: FLAG_SIZE, height: FLAG_SIZE, backgroundColor: "transparent" }} variant="square" />
			</View>
			{/* プログレスバー上のマーカー */}
				<Image source={markPng} style={{ width: MARK_SIZE, height: MARK_SIZE, backgroundColor: "transparent" }} variant="square" />
			{/* 日付ラベル */}
			{date && (
				<View style={{ top: 8 }}>
					<Text size="body2" color="gray">
						{date}
					</Text>
				</View>
			)}
		</View>
	);
}


