import { API_BASE_URL_IOS, API_BASE_URL_DEVICE } from "@env";
import { Platform } from "react-native";

const getApiBaseUrl = () => {
  if (Platform.OS === "ios") return API_BASE_URL_IOS;
  return API_BASE_URL_DEVICE;
};

const API_BASE_URL = getApiBaseUrl();

export async function getBooks() {
  const res = await fetch(`${API_BASE_URL}/api/books`);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

export async function createBook(title: string, author: string) {
  const res = await fetch(`${API_BASE_URL}/api/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author }),
  });
  if (!res.ok) throw new Error("Failed to create book");
  return res.json();
}
