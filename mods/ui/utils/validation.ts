// バリデーション関数

export const validateTitle = (value: string): string | undefined => {
	if (value.length > 30) {
		return "30字以内で入力してください";
	}
	return undefined;
};

export const validateAuthor = (value: string): string | undefined => {
	if (value.length > 20) {
		return "20字以内で入力してください";
	}
	return undefined;
};

export const validateTotalPages = (value: string): string | undefined => {
	if (value.length === 0) {
		return undefined;
	}
	if (!/^\d+$/.test(value)) {
		return "数字で入力してください";
	}
	if (value.length > 4) {
		return "4桁以内で入力してください";
	}
	return undefined;
};

export const validatePublisher = (value: string): string | undefined => {
	if (value.length > 20) {
		return "20字以内で入力してください";
	}
	return undefined;
};

export const validateBackground = (value: string): string | undefined => {
	if (value.length > 200) {
		return "200字以内で入力してください";
	}
	return undefined;
};

export const validateCompletedPages = (value: string): string | undefined => {
	if (value.length === 0) {
		return undefined;
	}
	if (!/^\d+$/.test(value)) {
		return "数字で入力してください";
	}
	if (value.length > 4) {
		return "4桁以内で入力してください";
	}
	return undefined;
};

export const validateTargetPagesPerDay = (value: string): string | undefined => {
	if (value.length === 0) {
		return undefined;
	}
	if (!/^\d+$/.test(value)) {
		return "数字で入力してください";
	}
	if (value.length > 4) {
		return "4桁以内で入力してください";
	}
	return undefined;
};

export const validateStartPage = (value: string): string | undefined => {
	if (value.length === 0) {
		return undefined;
	}
	if (!/^\d+$/.test(value)) {
		return "数字で入力してください";
	}
	if (value.length > 4) {
		return "4桁以内で入力してください";
	}
	return undefined;
};

export const validateEndPage = (value: string, startPage?: string, totalPages?: number): string | undefined => {
	if (value.length === 0) {
		return undefined;
	}
	if (!/^\d+$/.test(value)) {
		return "数字で入力してください";
	}
	if (value.length > 4) {
		return "4桁以内で入力してください";
	}
	const end = parseInt(value);
	if (startPage && /^\d+$/.test(startPage)) {
		const start = parseInt(startPage);
		if (end <= start) {
			return `読み始めたページより後の数字を入力してください`;
		}
	}
	if (totalPages !== undefined && end > totalPages) {
		return `総ページ数（${totalPages}ページ）を超えることはできません`;
	}
	return undefined;
};

// 読み始めたページと総ページ数を考慮した読み終わったページのバリデーション関数を返す
export const createValidateEndPageWithStart = (startPage: string, totalPages?: number) => {
	return (value: string): string | undefined => {
		return validateEndPage(value, startPage, totalPages);
	};
};

export const validateMemo = (value: string): string | undefined => {
	if (value.length > 2000) {
		return "2000字以内で入力してください";
	}
	return undefined;
};

