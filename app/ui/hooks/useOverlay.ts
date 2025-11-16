import { useState, useCallback } from "react";

export function useOverlay() {
	const [isShow, setIsShow] = useState(false);

	const open = () => {
		setIsShow(true);
	};

	const close = () => {
		setIsShow(false);
	};

	const toggle = useCallback(() => {
		setIsShow((prev) => !prev);
	}, []);

	return {
		isShow,
		open,
		close,
		toggle,
	};
}

