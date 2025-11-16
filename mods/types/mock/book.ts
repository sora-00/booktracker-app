import type { Book } from "@mods/entities";

// 画像をインポート
// app/ui/container/book-shelf/ から app/assets/img/ への正しい相対パス
const mock1Image = require("../../../app/assets/img/mock/mock1.png");
const mock2Image = require("../../../app/assets/img/mock/mock2.png");
const mock3Image = require("../../../app/assets/img/mock/mock3.png");

/**
 * BookCard表示用の拡張型
 * thumbnailUrlは文字列（URI）または数値（require()で取得した画像）を受け取れる
 */

/**
 * モックデータ
 */
export const mockBooks: Book[] = [
	{
        id: 1,
        title: "吾輩は猫である",
        author: "夏目漱石",
        totalPages: 500,
        publisher: "",
        background: "",
        thumbnailUrl: mock1Image,
        status: "unread",
        targetCompleteDate: "2025-10-16",
        completedPages: 0,
        targetPagesPerDay: 0,
        createdAt: "2025-10-16T00:00:00Z",
        updatedAt: "2025-10-16T00:00:00Z",
	},
	{
		id: 2,
		title: "騙されないための本",
		author: "藤田孝典",
		totalPages: 500,
		publisher: "",
		background: "",
		thumbnailUrl: mock2Image,
		status: "reading",
		targetCompleteDate: "2025-10-16",
		completedPages: 160,
		targetPagesPerDay: 0,
		createdAt: "2025-10-16T00:00:00Z",
		updatedAt: "2025-10-16T00:00:00Z",
	},
	{
		id: 3,
		title: "りんごかもしれないいいいいいいいいい",
		author: "中野信子",
		totalPages: 500,
		publisher: "",
		background: "",
		thumbnailUrl: mock3Image,
		status: "completed",
		targetCompleteDate: "2025-10-16",
		completedPages: 500,
		targetPagesPerDay: 0,
		createdAt: "2025-10-16T00:00:00Z",
		updatedAt: "2025-10-16T00:00:00Z",
	},
    {
        id: 4,
        title: "読み途中の本",
        author: "wwwwwww",
        totalPages: 0,
        publisher: "",
        background: "",
        thumbnailUrl: undefined,
        status: "reading",
        targetCompleteDate: "",
        completedPages: 0,
        targetPagesPerDay: 0,
        createdAt: "2025-10-16T00:00:00Z",
        updatedAt: "2025-10-16T00:00:00Z",
    },
    {
        id: 5,
        title: "未読の本です",
        author: "asdewadf",
        totalPages: 0,
        publisher: "",
        background: "",
        thumbnailUrl: undefined,
        status: "unread",
        targetCompleteDate: "",
        completedPages: 0,
        targetPagesPerDay: 0,
        createdAt: "2025-10-16T00:00:00Z",
        updatedAt: "2025-10-16T00:00:00Z",
    },
    {
        id: 6,
        title: "読了の本です",
        author: "adovfij",
        totalPages: 0,
        publisher: "",
        background: "",
        thumbnailUrl: undefined,
        status: "completed",
        targetCompleteDate: "",
        completedPages: 0,
        targetPagesPerDay: 0,
        createdAt: "2025-10-16T00:00:00Z",
        updatedAt: "2025-10-16T00:00:00Z",
    },
    {
        id: 7,
        title: "まだ読んでないです",
        author: "asぢうfへ",
        totalPages: 0,
        publisher: "",
        background: "",
        thumbnailUrl: undefined,
        status: "unread",
        targetCompleteDate: "",
        completedPages: 0,
        targetPagesPerDay: 0,
        createdAt: "2025-10-16T00:00:00Z",
        updatedAt: "2025-10-16T00:00:00Z",
    },
];

