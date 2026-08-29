import { Redirect } from "expo-router";
import { rEntry, rTabsBookshelf } from "@/routes";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return null;
  }

  return <Redirect href={isAuthenticated ? rTabsBookshelf() : rEntry()} />;
}

