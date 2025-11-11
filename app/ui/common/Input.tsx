import { TextInput, TextInputProps } from "react-native";

export const Input = (props: TextInputProps) => {
  return (
  <TextInput 
  {...props} 
  placeholderTextColor="#9ca3af" 
  className="border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-base" />
  );
};


