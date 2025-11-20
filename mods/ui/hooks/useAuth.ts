import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "@booktracker:accessToken";

export function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ストレージからトークンを読み込む
  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
      setAccessToken(token);
    } catch (error) {
      console.error("Failed to load token:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // トークンを保存
  const saveToken = useCallback(async (token: string) => {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
      setAccessToken(token);
    } catch (error) {
      console.error("Failed to save token:", error);
    }
  }, []);

  // トークンを削除（ログアウト時）
  const clearToken = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
      setAccessToken(null);
    } catch (error) {
      console.error("Failed to clear token:", error);
    }
  }, []);

  return {
    accessToken,
    isLoading,
    saveToken,
    clearToken,
    isAuthenticated: !!accessToken,
  };
}

