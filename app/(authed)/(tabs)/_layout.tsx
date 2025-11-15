import { Tabs } from "expo-router";
import { colors } from "@ui/common/colors";
import { textSizes } from "@ui/common/Text";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// カスタムタブラベルコンポーネント
function CustomTabLabel({ focused, title }: { focused: boolean; title: string }) {
	return (
		<Text
			style={{
				fontSize: focused ? textSizes.body1 : textSizes.body2,
				fontFamily: "ZenMaruGothic-Regular",
				color: colors.text.black,
			}}
		>
			{title}
		</Text>
	);
}

// カスタムタブボタンコンポーネント
function CustomTabBarButton(props: BottomTabBarButtonProps) {
	const { children, onPress, accessibilityState } = props;
	const focused = accessibilityState?.selected ?? false;

	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.tabButton,
				focused && styles.tabButtonFocused,
				pressed && styles.tabButtonPressed,
			]}
		>
			{children}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	tabButton: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	tabButtonFocused: {
		transform: [{ scale: 1.05 }], // 選択時は全体を少し大きく
	},
	tabButtonPressed: {
		opacity: 0.7,
	},
});

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: colors.main.secondary,
					borderTopWidth: 0,
					paddingBottom: 0,
					height: 60,
				},
				tabBarActiveTintColor: colors.text.black,
				tabBarInactiveTintColor: colors.text.black,
				tabBarButton: (props) => <CustomTabBarButton {...props} />,
			}}
		>
			<Tabs.Screen
				name="bookshelf/index"
				options={{
					title: "本",
					tabBarLabel: ({ focused }) => <CustomTabLabel focused={focused} title="本" />,
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name={focused ? "library" : "library-outline"}
							size={focused ? 24 : 22}
							color={focused ? colors.text.accent : colors.text.white}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="log/index"
				options={{
					title: "記録",
					tabBarLabel: ({ focused }) => <CustomTabLabel focused={focused} title="記録" />,
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name={focused ? "pencil" : "pencil-outline"}
							size={focused ? 24 : 22}
							color={focused ? colors.text.accent : colors.text.white}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="track/index"
				options={{
					title: "トラック",
					tabBarLabel: ({ focused }) => <CustomTabLabel focused={focused} title="トラック" />,
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name={focused ? "footsteps" : "footsteps-outline"}
							size={focused ? 24 : 22}
							color={focused ? colors.text.accent : colors.text.white}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="calendar/index"
				options={{
					title: "カレンダー",
					tabBarLabel: ({ focused }) => <CustomTabLabel focused={focused} title="カレンダー" />,
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name={focused ? "calendar" : "calendar-outline"}
							size={focused ? 24 : 22}
							color={focused ? colors.text.accent : colors.text.white}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="setting/index"
				options={{
					title: "設定",
					tabBarLabel: ({ focused }) => <CustomTabLabel focused={focused} title="設定" />,
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name={focused ? "settings" : "settings-outline"}
							size={focused ? 24 : 22}
							color={focused ? colors.text.accent : colors.text.white}
						/>
					),
				}}
			/>
		</Tabs>
	);
}


