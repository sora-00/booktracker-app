import { ComponentProps } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { CenterModal } from "../../../common/CenterModal";
import { Text } from "../../../common/Text";
import { colors } from "../../../common/colors";
import { Image } from "../../../common/Image";
import { formatDateSlash } from "../../../utils/date";
import { Ionicons } from "@expo/vector-icons";
import type { Book } from "@mods/entities/book";
import type { Log } from "@mods/entities/log";

type Props = {
	overlay: ComponentProps<typeof CenterModal>["overlay"];
	book: Book;
	log: Log;
	onClose: () => void;
};

export function LogDetailModal({ overlay, book, log, onClose }: Props) {
	const thumbnailSource = typeof book.thumbnailUrl === "string" ? { uri: book.thumbnailUrl } : book.thumbnailUrl;

	return (
		<CenterModal overlay={overlay} portalName="track-log-detail-modal">
			<View className="flex-1">
				<View className="flex-row items-center justify-between pb-2 border-b" style={{ borderColor: colors.input.border }}>
					<Text size="title2" color="black" weight="bold">
						読書ログ
					</Text>
					<Pressable onPress={onClose} hitSlop={12}>
						<Ionicons name="close" size={24} color={colors.text.black} />
					</Pressable>
				</View>

				<ScrollView showsVerticalScrollIndicator={false} className="flex-1 mt-4">
					<View className="flex-row items-center">
						<Image
							source={thumbnailSource}
							variant="rounded-md"
							style={{
								width: 100,
								height: 140,
								borderWidth: 2,
								borderColor: colors.main.primary,
							}}
						/>
						<View className="flex-1 ml-4">
							<Text size="title2" weight="bold">
								{book.title}
							</Text>
							<Text size="body1" color="gray">
								{book.author}
							</Text>
						</View>
					</View>

					<View className="mt-6">
						<SectionTitle label="読書ログ" />
						<DetailRow label="読書日" value={formatDateSlash(log.readDate)} />
						<DetailRow label="開始ページ" value={`${log.startPage}ページ`} />
						<DetailRow label="終了ページ" value={`${log.endPage}ページ`} />
					</View>

					<View className="mt-6">
						<SectionTitle label="メモ" />
						<View className="mt-2 p-3" style={{ backgroundColor: colors.background.screen, borderRadius: 16 }}>
							<Text size="body1" color="black">
								{log.memo?.trim() ? log.memo : "メモはありません"}
							</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		</CenterModal>
	);
}

type DetailRowProps = {
	label: string;
	value: string;
};

const DetailRow = ({ label, value }: DetailRowProps) => (
	<View className="flex-row items-center justify-between py-2">
		<Text size="body2" color="gray">
			{label}
		</Text>
		<Text size="body1" color="black" weight="bold">
			{value || "-"}
		</Text>
	</View>
);

const SectionTitle = ({ label }: { label: string }) => (
	<Text size="body2" color="gray" weight="bold">
		{label}
	</Text>
);

