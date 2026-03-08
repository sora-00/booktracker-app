import type { GetLogListOptions, Log, LogResp, NewLogInput } from "@/types";
import { fetcher } from "./cli/client";

export async function getLogList(
	accessToken: string,
	options?: GetLogListOptions
): Promise<LogResp["getLogList"]> {
	const status = options?.status;
	const path = status ? `/logs?status=${status}` : "/logs";
	return await fetcher.fetchJson<LogResp["getLogList"]>({
		method: "GET",
		path,
		accessToken,
	});
}

export async function getLog(accessToken: string, id: number): Promise<LogResp["getLog"]> {
	return await fetcher.fetchJson<LogResp["getLog"]>({
		method: "GET",
		path: `/logs/${id}`,
		accessToken,
	});
}

export async function postLog(accessToken: string, input: NewLogInput): Promise<LogResp["postLog"]> {
	return await fetcher.fetchJson<LogResp["postLog"]>({
		method: "POST",
		path: "/logs",
		body: input,
		accessToken,
	});
}

export async function putLog(
	accessToken: string,
	id: number,
	input: Partial<NewLogInput>
): Promise<LogResp["putLog"]> {
	return await fetcher.fetchJson<LogResp["putLog"]>({
		method: "PUT",
		path: `/logs/${id}`,
		body: input,
		accessToken,
	});
}

export async function deleteLog(accessToken: string, id: number): Promise<LogResp["deleteLog"]> {
	await fetcher.fetchJson<LogResp["deleteLog"]>({
		method: "DELETE",
		path: `/logs/${id}`,
		accessToken,
	});
}
