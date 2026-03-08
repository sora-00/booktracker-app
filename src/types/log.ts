export type Log = {
	id: number;
	bookId: number;
	readDate: string;
	startPage: number;
	endPage: number;
	memo?: string;
	createdAt: string;
	updatedAt: string;
};

export type NewLogInput = {
	bookId: number;
	readDate: string;
	startPage: number;
	endPage: number;
	memo?: string;
};
