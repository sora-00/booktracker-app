import { useCallback, ReactNode } from "react";
import { View, Pressable as RawPressable, Dimensions } from "react-native";
import { Portal } from "@gorhom/portal";
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut, Easing } from "react-native-reanimated";
import type { useOverlay } from "@/hooks/useOverlay";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const overlayContainerStyle = {
	flex: 1,
	position: "absolute" as const,
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
};
const overlayStyle = { backgroundColor: "rgba(0, 0, 0, 0.5)" };

type Props = {
	children: ReactNode;
	overlay: ReturnType<typeof useOverlay>;
	overlayCloseDisabled?: boolean;
	portalName: string;
};

export function CenterModal(props: Props) {
	const onPressOverlay = useCallback(() => {
		if (props.overlayCloseDisabled) return;
		props.overlay.close();
	}, [props.overlayCloseDisabled, props.overlay]);

	return (
		<>
			{props.overlay.isShow && (
				<Portal name={props.portalName}>
					<Animated.View
						entering={FadeIn.duration(200)}
						exiting={FadeOut.duration(200)}
						style={overlayContainerStyle}
					>
						<View className="flex-1 justify-center items-center">
							<RawPressable
								onPress={onPressOverlay}
								style={[{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }, overlayStyle]}
							/>
							<Animated.View
								entering={ZoomIn.duration(300).easing(Easing.out(Easing.cubic))}
								exiting={ZoomOut.duration(250).easing(Easing.in(Easing.cubic))}
								style={{ maxWidth: SCREEN_WIDTH * 0.85, width: SCREEN_WIDTH * 0.85 }}
							>
								<View className="bg-white rounded-3xl p-5 h-[60%]">
									{props.children}
								</View>
							</Animated.View>
						</View>
					</Animated.View>
				</Portal>
			)}
		</>
	);
}
