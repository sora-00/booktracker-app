import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { PortalProvider, PortalHost } from "@gorhom/portal";
import { initApiFetcher } from "../mods/repositories/cli/client";
import { getApiBaseUrl } from "../mods/utils/config";
import type { FetcherInterceptor } from "../mods/utils/api-fetcher/config";

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "ZenMaruGothic-Regular": require("./assets/fonts/ZenMaruGothic-Regular.ttf"),
    "ZenMaruGothic-Medium": require("./assets/fonts/ZenMaruGothic-Medium.ttf"),
    "ZenMaruGothic-Bold": require("./assets/fonts/ZenMaruGothic-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      console.log("フォントの読み込みが完了しました");
    }
    if (fontError) {
      console.error("フォントの読み込みエラー:", fontError);
    }
  }, [fontsLoaded, fontError]);

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

  if (!fontsLoaded) {
    return null; // フォント読み込み中は何も表示しない
  }

  return (
    <SafeAreaProvider>
      <PortalProvider>
        <Slot />
        <PortalHost name="modal" />
        <PortalHost name="date-picker" />
      </PortalProvider>
    </SafeAreaProvider>
  );
}

