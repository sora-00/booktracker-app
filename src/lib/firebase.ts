import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
	FIREBASE_API_KEY,
	FIREBASE_AUTH_DOMAIN,
	FIREBASE_PROJECT_ID,
	FIREBASE_STORAGE_BUCKET,
	FIREBASE_MESSAGING_SENDER_ID,
	FIREBASE_APP_ID,
} from "@env";

const firebaseConfig = {
	apiKey: FIREBASE_API_KEY,
	authDomain: FIREBASE_AUTH_DOMAIN,
	projectId: FIREBASE_PROJECT_ID,
	storageBucket: FIREBASE_STORAGE_BUCKET,
	messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
	appId: FIREBASE_APP_ID,
};

function getMissingConfigKeys(): string[] {
	const entries = Object.entries(firebaseConfig);
	return entries
		.filter(([, value]) => !value || value.trim() === "")
		.map(([key]) => key);
}

const missingConfigKeys = getMissingConfigKeys();

if (missingConfigKeys.length > 0) {
	throw new Error(
		`Firebase 設定が不足しています。.env の FIREBASE_* を設定してください。missing: ${missingConfigKeys.join(", ")}`
	);
}

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// RN 向け persistence は環境差分で型解決に失敗することがあるため、
// API 用トークンは AsyncStorage で明示管理する。
void AsyncStorage;
export const firebaseAuth = getAuth(firebaseApp);
