import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { API_BASE_URL_IOS, API_BASE_URL_DEVICE } from "@env";
import type { DataSource } from "@/types";

/** 172.16.0.0/12 — Expo の hostUri が Docker ブリッジのときあり、ここへ差し替えると API に届かない */
function isLikelyDockerBridgeIp(host: string): boolean {
	return /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host);
}

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

	if (!/localhost|127\.0\.0\.1/.test(url)) {
		return url;
	}

	const debuggerHost = Constants.expoConfig?.hostUri;
	if (debuggerHost) {
		const hostIp = debuggerHost.split(":")[0];
		// iOS: hostUri が Docker ブリッジのとき、置換先が API サーバーではないことが多い（シミュレータは localhost のままが正解）。
		// expo-device の実機判定がブレても、ここで 172.17 置換を止められる。
		if (Platform.OS === "ios" && isLikelyDockerBridgeIp(hostIp)) {
			return url;
		}
		return url.replace(/localhost|127\.0\.0\.1/g, hostIp);
	}

	console.warn(`[API Config] デバッグホストのIPアドレスを取得できませんでした。実デバイスでは接続できない可能性があります: ${url}`);
	return url;
}

export const getApiBaseUrl = (): string => {
	const override = (process.env.EXPO_PUBLIC_API_BASE_URL || "").trim().replace(/\/$/, "");
	if (override) {
		return override;
	}

	const baseUrl = Platform.OS === "ios"
		? (API_BASE_URL_IOS || "http://localhost:8085")
		: (API_BASE_URL_DEVICE || "http://localhost:8085");

	const url = replaceLocalhostWithDevHost(baseUrl);
	if (__DEV__ && Platform.OS === "ios" && Device.isDevice && /localhost|127\.0\.0\.1/.test(url)) {
		console.warn(
			"[API Config] 実機のまま localhost です。Mac の API に繋ぐには .env の API_BASE_URL_IOS を http://<MacのLAN IP>:8085 にしてください。"
		);
	}
	return url;
};

function getApiBaseUrlFromEnv(): string | undefined {
	if (Platform.OS === "ios") return API_BASE_URL_IOS || undefined;
	return API_BASE_URL_DEVICE || undefined;
}
