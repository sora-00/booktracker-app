import { Redirect } from "expo-router";

export default function Index() {
  // 初期ルート: 認証済みホームにリダイレクト
  // 将来的に認証状態に応じて分岐する
  return <Redirect href="/(authed)/home" />;
}

