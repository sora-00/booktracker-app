import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { colors } from "./colors";
import { textSizes } from "./Text";

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: colors.input.border,
		backgroundColor: colors.input.background,
		borderRadius: 60,
		paddingHorizontal: 16,
		paddingVertical: 12,
		fontSize: textSizes.body1,
		fontFamily: "ZenMaruGothic-Regular",
	},
});

export const Input = (props: TextInputProps) => {
  return (
  <TextInput 
  {...props} 
  placeholderTextColor={colors.text.gray} 
			style={[styles.input, props.style]}
		/>
  );
};


