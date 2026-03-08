import { View } from "react-native";

type Props = { height: number };

export const Spacer = (props: Props) => {
	return <View style={{ height: props.height }} />;
};
