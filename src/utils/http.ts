import type { HttpRequest } from "@/types";

export async function fetchJson<TResp>(req: HttpRequest): Promise<TResp> {
	const url = `${(req.baseUrl ?? "").replace(/\/$/, "")}${req.path}`;
	const res = await fetch(url, {
		method: req.method,
		headers: {
			"Content-Type": "application/json",
			...(req.headers ?? {}),
		},
		body: req.body ? JSON.stringify(req.body) : undefined,
	});
	if (!res.ok) {
		const text = await safeText(res);
		throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
	}
	if (res.status === 204) {
		return undefined as TResp;
	}
	let text: string;
	try {
		text = await res.text();
	} catch {
		return undefined as TResp;
	}
	if (!text || text.trim() === "") {
		return undefined as TResp;
	}
	try {
		return JSON.parse(text) as TResp;
	} catch {
		return undefined as TResp;
	}
}

export async function fetchFileUpload<TResp>(req: HttpRequest): Promise<TResp> {
	const url = `${(req.baseUrl ?? "").replace(/\/$/, "")}${req.path}`;
	const res = await fetch(url, {
		method: req.method,
		headers: {
			...(req.headers ?? {}),
		},
		body: req.body as FormData,
	});
	if (!res.ok) {
		const text = await safeText(res);
		throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
	}
	return (await res.json()) as TResp;
}

async function safeText(res: Response): Promise<string> {
	try {
		return await res.text();
	} catch {
		return "";
	}
}
