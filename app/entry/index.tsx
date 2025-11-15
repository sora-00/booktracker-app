import { View } from "react-native";
import { Link } from "expo-router";
import { Text } from "@ui/common/Text";

export default function EntryScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ marginBottom: 20 }}>
        <Text size="big">認証前画面</Text>
      </View>
      <Link href="/bookshelf">
        <Text size="body1" color="black">
          ホームへ進む（認証済み）
        </Text>
      </Link>
    </View>
  );
}

