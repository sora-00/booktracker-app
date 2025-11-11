import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { useEffect } from "react";
import { initApiFetcher } from "../mods/repositories/cli/client";
import { getApiBaseUrl } from "../mods/utils/config";
import type { FetcherInterceptor } from "../mods/utils/api-fetcher/config";

export default function RootLayout() {
  useEffect(() => {
    const apiBaseUrl = getApiBaseUrl();
    const platform = Platform.OS;
    const version = "1.0.0";

    const interceptor: FetcherInterceptor = {
      onRequest: (req) => {
        return req;
      },
      onResponse: (res) => {
        return res;
      },
      onError: (error: Error) => {
        console.error("API Error:", error);
        return error;
      },
    };

    initApiFetcher(apiBaseUrl, platform, version, interceptor);
  }, []);

  return (
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  );
}

