import { Platform } from "react-native";
import Constants from "expo-constants";
import { API_BASE_URL_IOS, API_BASE_URL_DEVICE } from "@env";
import type { DataSource } from "@/types";

export const getDataSource = (): DataSource => {
	const explicit = (process.env.EXPO_PUBLIC_DATA_SOURCE || process.env.DATA_SOURCE || "").toString();
	if (explicit) return explicit === "http" ? "http" : "memory";
	const base = getApiBaseUrlFromEnv();
	return base ? "http" : "memory";
};

function replaceLocalhostWithDevHost(url: string): string {
	if (!__DEV__) {
		return url;
	}

	const debuggerHost = Constants.expoConfig?.hostUri;
	if (debuggerHost) {
		const hostIp = debuggerHost.split(":")[0];
		return url.replace(/localhost|127\.0\.0\.1/g, hostIp);
	}

	console.warn(`[API Config] デバッグホストのIPアドレスを取得できませんでした。実デバイスでは接続できない可能性があります: ${url}`);
	return url;
}

export const getApiBaseUrl = (): string => {
	const baseUrl = Platform.OS === "ios"
		? (API_BASE_URL_IOS || "http://localhost:8085")
		: (API_BASE_URL_DEVICE || "http://localhost:8085");

	const url = replaceLocalhostWithDevHost(baseUrl);
	if (__DEV__ && Platform.OS === "ios" && /localhost|127\.0\.0\.1/.test(url)) {
		console.warn(
			"[API Config] iOSシミュレータで localhost のままです。表紙アップロードが失敗する場合は .env に API_BASE_URL_IOS=http://<あなたのMacのIP>:8085 を設定してください。"
		);
	}
	return url;
};

function getApiBaseUrlFromEnv(): string | undefined {
	if (Platform.OS === "ios") return API_BASE_URL_IOS || undefined;
	return API_BASE_URL_DEVICE || undefined;
}
