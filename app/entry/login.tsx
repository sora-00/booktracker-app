import { useState } from "react";
import { Alert, View } from "react-native";
import { Link, Redirect } from "expo-router";
import { Input } from "@/components/common/Input";
import { RoundedButton } from "@/components/common/RoundedButton";
import { Text } from "@/components/common/Text";
import { useAuth } from "@/hooks/useAuth";
import { rEntrySignup, rTabsBookshelf } from "@/routes";
import { toFirebaseAuthErrorMessage } from "@/utils/firebaseAuthError";

export default function LoginScreen() {
	const { isLoading, isAuthenticated, loginWithEmailAndPassword } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	if (isLoading) {
		return null;
	}
	if (isAuthenticated) {
		return <Redirect href={rTabsBookshelf()} />;
	}

	const onLogin = async () => {
		if (!email.trim() || !password) {
			Alert.alert("入力エラー", "メールアドレスとパスワードを入力してください");
			return;
		}
		setIsSubmitting(true);
		try {
			await loginWithEmailAndPassword(email.trim(), password);
		} catch (error) {
			const message = toFirebaseAuthErrorMessage(error, "ログインに失敗しました");
			console.error("login error:", error);
			Alert.alert("ログイン失敗", message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<View className="flex-1 justify-center px-6">
			<View className="mb-6">
				<Text size="big" weight="bold">ログイン</Text>
			</View>
			<View className="mb-4">
				<Input
					title="メールアドレス"
					value={email}
					onChangeText={setEmail}
					placeholder="you@example.com"
					autoCapitalize="none"
					autoCorrect={false}
					keyboardType="email-address"
				/>
			</View>
			<View className="mb-6">
				<Input
					title="パスワード"
					value={password}
					onChangeText={setPassword}
					placeholder="8文字以上"
					secureTextEntry
					autoCapitalize="none"
					autoCorrect={false}
				/>
			</View>
			<View className="mb-4">
				<RoundedButton
					title={isSubmitting ? "ログイン中..." : "ログイン"}
					onPress={onLogin}
					disabled={isSubmitting}
				/>
			</View>
			<Link href={rEntrySignup()}>
				<Text size="body1" color="accent">アカウント作成はこちら</Text>
			</Link>
		</View>
	);
}
