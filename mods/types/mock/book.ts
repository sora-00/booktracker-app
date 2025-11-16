import type { Book } from "@mods/entities/book";
import type { ReadingStatus } from "@ui/container/book-shelf/ReadingStatusSelector";

// 画像をインポート
// app/ui/container/book-shelf/ から app/assets/img/ への正しい相対パス
const mock1Image = require("../../../app/assets/img/mock/mock1.png");
const mock2Image = require("../../../app/assets/img/mock/mock2.png");
const mock3Image = require("../../../app/assets/img/mock/mock3.png");

/**
 * BookCard表示用の拡張型
 * thumbnailUrlは文字列（URI）または数値（require()で取得した画像）を受け取れる
 */
export type BookCardData = Omit<Book, "thumbnailUrl"> & {
	status: ReadingStatus;
	targetCompleteDate: string; // YYYY-MM-DD形式
	totalPages?: number;
	completedPages?: number;
	thumbnailUrl?: string | number; // URI文字列またはrequire()で取得した画像
};

/**
 * モックデータ
 */
export const mockBooks: BookCardData[] = [
	{
		id: 1,
		title: "吾輩は猫である",
		author: "夏目漱石",
		thumbnailUrl: mock1Image,
		description: "",
		createdAt: "2025-10-16T00:00:00Z",
		updatedAt: "2025-10-16T00:00:00Z",
		status: "unread",
		targetCompleteDate: "2025-10-16",
		totalPages: 500,
		completedPages: 0,
	},
	{
		id: 2,
		title: "騙されないための本",
		author: "藤田孝典",
		thumbnailUrl: mock2Image,
		description: "",
		createdAt: "2025-10-16T00:00:00Z",
		updatedAt: "2025-10-16T00:00:00Z",
		status: "reading",
		targetCompleteDate: "2025-10-16",
		totalPages: 500,
		completedPages: 160,
	},
	{
		id: 3,
		title: "りんごかもしれないいいいいいいいいい",
		author: "中野信子",
		thumbnailUrl: mock3Image,
		description: "",
		createdAt: "2025-10-16T00:00:00Z",
		updatedAt: "2025-10-16T00:00:00Z",
		status: "completed",
		targetCompleteDate: "2025-10-16",
		totalPages: 500,
		completedPages: 500,
	},
];

