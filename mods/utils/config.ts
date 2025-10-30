import { Platform } from "react-native";
import { API_BASE_URL_IOS, API_BASE_URL_DEVICE } from "@env";

export type DataSource = "memory" | "http";

export const getDataSource = (): DataSource => {
  const explicit = (process.env.EXPO_PUBLIC_DATA_SOURCE || process.env.DATA_SOURCE || "").toString();
  if (explicit) return explicit === "http" ? "http" : "memory";
  // .env に API ベースURLが入っていれば http を既定に
  const base = getApiBaseUrlFromEnv();
  return base ? "http" : "memory";
};

export const getApiBaseUrl = (): string => {
  return (
    process.env.EXPO_PUBLIC_API_BASE_URL ||
    getApiBaseUrlFromEnv() ||
    "http://localhost:8085"
  ).toString();
};

function getApiBaseUrlFromEnv(): string | undefined {
  if (Platform.OS === "ios") return API_BASE_URL_IOS || undefined;
  return API_BASE_URL_DEVICE || undefined;
}


