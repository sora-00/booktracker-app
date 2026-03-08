export type HttpRequest = {
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
	path: string;
	baseUrl?: string;
	headers?: Record<string, string>;
	body?: unknown;
};
