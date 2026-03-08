import React, { useCallback, type ReactNode } from "react";
import { View, Pressable as RawPressable, Dimensions } from "react-native";
import { Portal } from "@gorhom/portal";
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, Easing } from "react-native-reanimated";
import type { useOverlay } from "@/hooks/useOverlay";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const overlayContainerStyle = {
	flex: 1,
	position: "absolute" as const,
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
};
const overlayStyle = { backgroundColor: "rgba(0, 0, 0, 0.5)" };

type Height = "full" | "half";

type Props = {
	children: ReactNode;
	overlay: ReturnType<typeof useOverlay>;
	overlayCloseDisabled?: boolean;
	portalName: string;
	height?: Height;
};

export function BottomModal(props: Props) {
	const onPressOverlay = useCallback(() => {
		if (props.overlayCloseDisabled) return;
		props.overlay.close();
	}, [props.overlayCloseDisabled, props.overlay]);

	const getModalHeight = (height?: Height): number => {
		switch (height) {
			case "full": return SCREEN_HEIGHT * 0.9;
			case "half": return SCREEN_HEIGHT * 0.5;
			default: return SCREEN_HEIGHT * 0.9;
		}
	};

	const modalHeight = getModalHeight(props.height);

	return (
		<>
			{props.overlay.isShow && (
				<Portal name={props.portalName}>
					<Animated.View
						entering={FadeIn.duration(200)}
						exiting={FadeOut.duration(200)}
						style={overlayContainerStyle}
					>
						<View className="flex-1 justify-end">
							<RawPressable
								onPress={onPressOverlay}
								style={[{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }, overlayStyle]}
							/>
							<Animated.View
								entering={SlideInDown.duration(300).easing(Easing.out(Easing.cubic))}
								exiting={SlideOutDown.duration(250).easing(Easing.in(Easing.cubic))}
								style={{ height: modalHeight }}
							>
								<View className="bg-main rounded-t-3xl pt-3 pb-10 px-5 flex-1 min-h-0">
									<View className="w-10 h-1 rounded-sm self-center mb-5 bg-textGray" />
									<View style={{ flex: 1, minHeight: 0 }}>
										{props.children}
									</View>
								</View>
							</Animated.View>
						</View>
					</Animated.View>
				</Portal>
			)}
		</>
	);
}
