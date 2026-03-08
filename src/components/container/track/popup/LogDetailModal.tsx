import { ComponentProps } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { CenterModal } from "@/components/common/CenterModal";
import { Text } from "@/components/common/Text";
import { colors } from "@/constants/colors";
import { Image } from "@/components/common/Image";
import { formatDateSlash } from "@/utils/date";
import { Ionicons } from "@expo/vector-icons";
import type { Book, Log } from "@/types";

type Props = {
	overlay: ComponentProps<typeof CenterModal>["overlay"];
	book: Book;
	log: Log;
	onClose: () => void;
};

export function LogDetailModal(props: Props) {
	const thumbnailSource = typeof props.book.thumbnailUrl === "string" ? { uri: props.book.thumbnailUrl } : props.book.thumbnailUrl;

	return (
		<CenterModal overlay={props.overlay} portalName="track-log-detail-modal">
			<View className="flex-1">
				<View className="flex-row items-center justify-between pb-2 border-b border-accent">
					<Text size="title2" color="black" weight="bold">読書ログ</Text>
					<Pressable onPress={props.onClose} hitSlop={12}>
						<Ionicons name="close" size={24} color={colors.text.black} />
					</Pressable>
				</View>
				<View className="flex-1 mt-4">
					<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
					<View className="flex-row items-center">
						<Image
							source={thumbnailSource}
							variant="rounded-md"
							style={{ width: 100, height: 140, borderWidth: 2, borderColor: colors.primary }}
						/>
						<View className="flex-1 ml-4">
							<Text size="title2" weight="bold">{props.book.title}</Text>
							<Text size="body1" color="gray">{props.book.author}</Text>
						</View>
					</View>
					<View className="mt-6">
						<SectionTitle label="読書ログ" />
						<DetailRow label="読書日" value={formatDateSlash(props.log.readDate)} />
						<DetailRow label="開始ページ" value={`${props.log.startPage}ページ`} />
						<DetailRow label="終了ページ" value={`${props.log.endPage}ページ`} />
					</View>
					<View className="mt-6">
						<SectionTitle label="メモ" />
						<View className="mt-2 p-3 bg-main rounded-2xl">
							<Text size="body1" color="black">
								{props.log.memo?.trim() ? props.log.memo : "メモはありません"}
							</Text>
						</View>
					</View>
				</ScrollView>
				</View>
			</View>
		</CenterModal>
	);
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
	<View className="flex-row items-center justify-between py-2">
		<Text size="body2" color="gray">{label}</Text>
		<Text size="body1" color="black" weight="bold">{value || "-"}</Text>
	</View>
);

const SectionTitle = ({ label }: { label: string }) => (
	<Text size="body2" color="gray" weight="bold">{label}</Text>
);
