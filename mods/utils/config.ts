import { Platform } from "react-native";
import Constants from "expo-constants";
import { API_BASE_URL_IOS, API_BASE_URL_DEVICE } from "@env";
import { DataSource } from "../types/config";

export const getDataSource = (): DataSource => {
  const explicit = (process.env.EXPO_PUBLIC_DATA_SOURCE || process.env.DATA_SOURCE || "").toString();
  if (explicit) return explicit === "http" ? "http" : "memory";
  // .env に API ベースURLが入っていれば http を既定に
  const base = getApiBaseUrlFromEnv();
  return base ? "http" : "memory";
};

/**
 * 開発環境で実デバイスからlocalhostに接続する場合、
 * ExpoのデバッグホストからIPアドレスを取得してlocalhostを置き換える
 */
function replaceLocalhostWithDevHost(url: string): string {
  // 開発環境でない場合はそのまま返す
  if (!__DEV__) {
    return url;
  }

  // ExpoのデバッグホストからIPアドレスを取得
  const debuggerHost = Constants.expoConfig?.hostUri;
  if (debuggerHost) {
    // debuggerHostは "192.168.x.x:8081" のような形式
    const hostIp = debuggerHost.split(":")[0];
    // localhostをIPアドレスに置き換え
    return url.replace(/localhost|127\.0\.0\.1/g, hostIp);
  }

  // IPアドレスが取得できない場合は警告を出してそのまま返す
  console.warn(`[API Config] デバッグホストのIPアドレスを取得できませんでした。実デバイスでは接続できない可能性があります: ${url}`);
  return url;
}

export const getApiBaseUrl = (): string => {
  const baseUrl = Platform.OS === "ios"
    ? (API_BASE_URL_IOS || "http://localhost:8085")
    : (API_BASE_URL_DEVICE || "http://localhost:8085");

  // 実デバイスでlocalhostが使われている場合、開発マシンのIPアドレスに置き換える
  return replaceLocalhostWithDevHost(baseUrl);
};

function getApiBaseUrlFromEnv(): string | undefined {
  if (Platform.OS === "ios") return API_BASE_URL_IOS || undefined;
  return API_BASE_URL_DEVICE || undefined;
}

