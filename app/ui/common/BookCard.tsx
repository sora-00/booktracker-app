import { View, Text, Image } from "react-native";
import { Book } from "../../../mods/entities/book";

type Props = {
  book: Book;
};

export const BookCard = ({ book }: Props) => {
  return (
    <View className="flex-row gap-3 p-3 rounded-xl border border-gray-200 bg-white shadow-sm">
      {book.thumbnailUrl ? (
        <Image source={{ uri: book.thumbnailUrl }} className="w-13 h-16 rounded-md bg-gray-100" />
      ) : (
        <View className="w-13 h-16 rounded-md bg-gray-100 items-center justify-center" />
      )}
      <View className="flex-1">
        <Text className="text-base font-bold text-gray-900" numberOfLines={1}>{book.title}</Text>
        <Text className="text-sm text-gray-500 mt-1" numberOfLines={1}>{book.author}</Text>
      </View>
    </View>
  );
};


