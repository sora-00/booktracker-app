import { View } from "react-native";

type SpacerProps = {
  height: number;
};

export const Spacer = ({ height }: SpacerProps) => {
  return <View style={{ height }} />;
};