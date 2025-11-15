import { View } from "react-native";
import { Text } from "./Text";
import { Image } from "./Image";
import { Book } from "@mods/entities/book";
import { colors } from "./colors";

type Props = {
  book: Book;
};

export const BookCard = ({ book }: Props) => {
  return (
		<View
			className="flex-row gap-3 p-3 rounded-xl border border-gray-200 shadow-sm"
			style={{ backgroundColor: colors.background.card }}
		>
      {book.thumbnailUrl ? (
				<Image source={{ uri: book.thumbnailUrl }} size="thumbnail" variant="rounded-md" />
      ) : (
        <View className="w-13 h-16 rounded-md bg-gray-100 items-center justify-center" />
      )}
      <View className="flex-1">
				<Text size="title2" color="black" weight="bold" numberOfLines={1}>
					{book.title}
				</Text>
				<View className="mt-1">
					<Text size="body1" color="black" numberOfLines={1}>
						{book.author}
					</Text>
				</View>
      </View>
    </View>
  );
};


