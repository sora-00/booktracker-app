import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function EntryScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>認証前画面</Text>
      <Link href="/(authed)/home">
        <Text style={{ color: "blue", textDecorationLine: "underline" }}>
          ホームへ進む（認証済み）
        </Text>
      </Link>
    </View>
  );
}

