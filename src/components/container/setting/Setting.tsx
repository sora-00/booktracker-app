import { View } from "react-native";
import { Text } from "@/components/common/Text";
import { RoundedButton } from "@/components/common/RoundedButton";
import { useAuth } from "@/hooks/useAuth";

export default function Setting() {
	const { clearToken } = useAuth();

	return (
		<View className="flex-1 items-center justify-center px-6">
			<View className="mb-6">
				<Text size="title1">Setting</Text>
			</View>
			<RoundedButton title="ログアウト" onPress={clearToken} />
		</View>
	);
}
