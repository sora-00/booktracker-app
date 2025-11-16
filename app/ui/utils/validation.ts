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

