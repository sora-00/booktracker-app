import { useEffect } from "react";
import { View } from "react-native";
import { useBooks } from "../../../../mods/hooks/useBooks";
import Home from "../../../ui/container/home/Home";

export default function HomeScreen() {
  const { initialize } = useBooks();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <View style={{ flex: 1 }}>
      <Home />
    </View>
  );
}


