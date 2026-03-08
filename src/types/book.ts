import type { Status } from "./status";

export type Book = {
	id: number;
	title: string;
	author: string;
	totalPages: number;
	publisher: string;
	encounterNote: string;
	thumbnailUrl: string;
	status: Status;
	targetCompleteDate: string;
	completedDate?: string;
	readPages: number;
	targetPagesPerDay: number;
	createdAt: string;
	updatedAt: string;
	/** API が計算して返す残り日数 */
	remainingDays?: number;
};

export type NewBookInput = {
	title: string;
	author: string;
	totalPages: number;
	publisher: string;
	encounterNote: string;
	thumbnailUrl: string;
	status: Status;
	targetCompleteDate: string;
	readPages: number;
	targetPagesPerDay: number;
};
