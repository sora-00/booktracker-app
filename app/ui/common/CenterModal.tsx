import React, { useCallback } from "react";
import { View, Pressable as RawPressable, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Portal } from "@gorhom/portal";
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut, Easing } from "react-native-reanimated";
import { colors } from "./colors";
import { useOverlay } from "../hooks/useOverlay";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type Props = {
	children?: React.ReactNode;
	overlay: ReturnType<typeof useOverlay>;
	overlayCloseDisabled?: boolean;
	portalName: string;
};

export function CenterModal(props: Props) {
	const onPressOverlay = useCallback(() => {
		if (props.overlayCloseDisabled) {
			return;
		}
		props.overlay.close();
	}, [props.overlayCloseDisabled, props.overlay]);

	return (
		<>
			{props.overlay.isShow && (
				<Portal name={props.portalName}>
					<Animated.View
						entering={FadeIn.duration(200)}
						exiting={FadeOut.duration(200)}
						style={styles.overlayContainer}
					>
						<View className="flex-1 justify-center items-center">
							{/* Overlay */}
							<RawPressable
								onPress={onPressOverlay}
								style={[StyleSheet.absoluteFill, styles.overlay]}
							/>

							{/* Center Modal Content */}
							<Animated.View
								entering={ZoomIn.duration(300).easing(Easing.out(Easing.cubic))}
								exiting={ZoomOut.duration(250).easing(Easing.in(Easing.cubic))}
								style={styles.modalContent}
							>
								{props.children}
							</Animated.View>
						</View>
					</Animated.View>
				</Portal>
			)}
		</>
	);
}

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
		backgroundColor: colors.background.card,
		borderRadius: 24,
		padding: 20,
		maxWidth: SCREEN_WIDTH * 0.85,
		height: "60%",
		width: SCREEN_WIDTH * 0.85,
	},
});

