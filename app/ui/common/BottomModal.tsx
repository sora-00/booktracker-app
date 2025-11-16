import React, { useCallback, type ReactNode } from "react";
import { View, Pressable as RawPressable, StyleSheet, Dimensions } from "react-native";
import { Portal } from "@gorhom/portal";
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, Easing } from "react-native-reanimated";
import { colors } from "./colors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type Height = "full" | "half";

type Props = {
	children?: ReactNode;
	overlay: ReturnType<typeof useOverlay>;
	overlayCloseDisabled?: boolean;
	portalName: string;
	height?: Height;
};

export function BottomModal(props: Props) {
	const onPressOverlay = useCallback(() => {
		if (props.overlayCloseDisabled) {
			return;
		}
		props.overlay.close();
	}, [props.overlayCloseDisabled, props.overlay]);

	const getModalHeight = (height?: Height): number => {
		switch (height) {
			case "full":
				return SCREEN_HEIGHT * 0.9;
			case "half":
				return SCREEN_HEIGHT * 0.5;
			default:
				return SCREEN_HEIGHT * 0.9;
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
						style={styles.overlayContainer}
					>
						<View className="flex-1 justify-end">
							{/* Overlay */}
							<RawPressable
								onPress={onPressOverlay}
								style={[StyleSheet.absoluteFill, styles.overlay]}
							/>

							{/* Bottom Modal Content */}
							<Animated.View
								entering={SlideInDown.duration(300).easing(Easing.out(Easing.cubic))}
								exiting={SlideOutDown.duration(250).easing(Easing.in(Easing.cubic))}
								style={[styles.modalContent, { height: modalHeight }]}
							>
								<View className="w-10 h-1 rounded-sm self-center mb-5" style={{ backgroundColor: colors.text.gray }} />
								{props.children}
							</Animated.View>
						</View>
					</Animated.View>
				</Portal>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	overlayContainer: {
		flex: 1,
		position: "absolute",
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	},
	overlay: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: colors.background.screen,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingTop: 12,
		paddingBottom: 40,
		paddingHorizontal: 20,
	},
});

// ---

export function useOverlay() {
	const [isShow, setIsShow] = React.useState(false);

	const open = () => {
		setIsShow(true);
	};

	const close = () => {
		setIsShow(false);
	};

	const toggle = useCallback(() => {
		setIsShow((prev) => !prev);
	}, []);

	return {
		isShow,
		open,
		close,
		toggle,
	};
}

