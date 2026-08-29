import type { FirebaseError } from "firebase/app";

const MESSAGE_BY_CODE: Record<string, string> = {
	"auth/operation-not-allowed":
		"メール/パスワード認証が無効です。Firebase Console の Authentication > Sign-in method で有効化してください。",
	"auth/email-already-in-use": "このメールアドレスは既に使用されています。",
	"auth/invalid-email": "メールアドレスの形式が正しくありません。",
	"auth/weak-password": "パスワードが弱すぎます。より強いパスワードを設定してください。",
	"auth/invalid-credential": "メールアドレスまたはパスワードが正しくありません。",
	"auth/user-not-found": "このメールアドレスのユーザーは見つかりません。",
	"auth/wrong-password": "パスワードが正しくありません。",
	"auth/too-many-requests": "試行回数が多すぎます。しばらく待ってから再試行してください。",
	"auth/network-request-failed":
		"ネットワークに接続できませんでした。通信環境を確認してください。",
	"auth/invalid-api-key":
		"Firebase APIキーが不正です。.env の FIREBASE_API_KEY を確認してください。",
};

export function toFirebaseAuthErrorMessage(error: unknown, fallback: string): string {
	if (!error || typeof error !== "object") {
		return fallback;
	}
	const code = (error as FirebaseError).code;
	if (!code) {
		return fallback;
	}
	return MESSAGE_BY_CODE[code] ?? `${fallback} (${code})`;
}
