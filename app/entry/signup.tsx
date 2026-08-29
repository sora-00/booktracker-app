import { useState } from "react";
import { Alert, View } from "react-native";
import { Link, Redirect } from "expo-router";
import { Input } from "@/components/common/Input";
import { RoundedButton } from "@/components/common/RoundedButton";
import { Text } from "@/components/common/Text";
import { useAuth } from "@/hooks/useAuth";
import { rEntryLogin, rTabsBookshelf } from "@/routes";
import { toFirebaseAuthErrorMessage } from "@/utils/firebaseAuthError";

export default function SignupScreen() {
	const { isLoading, isAuthenticated, signupWithEmailAndPassword } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	if (isLoading) {
		return null;
	}
	if (isAuthenticated) {
		return <Redirect href={rTabsBookshelf()} />;
	}

	const onSignup = async () => {
		if (!email.trim() || !password || !confirmPassword) {
			Alert.alert("入力エラー", "すべての項目を入力してください");
			return;
		}
		if (password.length < 8) {
			Alert.alert("入力エラー", "パスワードは8文字以上で入力してください");
			return;
		}
		if (password !== confirmPassword) {
			Alert.alert("入力エラー", "確認用パスワードが一致しません");
			return;
		}
		setIsSubmitting(true);
		try {
			await signupWithEmailAndPassword(email.trim(), password);
		} catch (error) {
			const message = toFirebaseAuthErrorMessage(error, "アカウント作成に失敗しました");
			console.error("signup error:", error);
			Alert.alert("作成失敗", message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<View className="flex-1 justify-center px-6">
			<View className="mb-6">
				<Text size="big" weight="bold">アカウント作成</Text>
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
			<View className="mb-4">
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
			<View className="mb-6">
				<Input
					title="パスワード（確認）"
					value={confirmPassword}
					onChangeText={setConfirmPassword}
					placeholder="もう一度入力"
					secureTextEntry
					autoCapitalize="none"
					autoCorrect={false}
				/>
			</View>
			<View className="mb-4">
				<RoundedButton
					title={isSubmitting ? "作成中..." : "アカウントを作成"}
					onPress={onSignup}
					disabled={isSubmitting}
				/>
			</View>
			<Link href={rEntryLogin()}>
				<Text size="body1" color="accent">ログインはこちら</Text>
			</Link>
		</View>
	);
}
