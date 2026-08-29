import { View } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { Text } from "@/components/common/Text";
import { rEntryLogin, rEntrySignup, rTabsBookshelf } from "@/routes";
import { RoundedButton } from "@/components/common/RoundedButton";
import { useAuth } from "@/hooks/useAuth";

export default function EntryScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }
  if (isAuthenticated) {
    return <Redirect href={rTabsBookshelf()} />;
  }

  return (
    <View className="flex-1 justify-center px-6">
      <View className="mb-6">
        <Text size="big" weight="bold">BookTracker</Text>
      </View>
      <View className="mb-8">
        <Text size="body1" color="gray">はじめるにはログインまたはアカウント作成を選択してください</Text>
      </View>
      <View className="mb-4">
        <RoundedButton title="アカウント作成" onPress={() => router.push(rEntrySignup())} />
      </View>
      <RoundedButton title="ログイン" onPress={() => router.push(rEntryLogin())} />
    </View>
  );
}

