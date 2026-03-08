import { Fetcher } from "@/utils/api-fetcher";
import type { FetcherInterceptor } from "@/types";

export let fetcher: Fetcher;

export function initApiFetcher(
	apiUrl: string,
	platform: string,
	version: string,
	interceptor: FetcherInterceptor
) {
	// バックエンドが /api プレフィックス付きでルートを張っている場合は `${apiUrl}/api`
	const config = {
		apiBaseUrl: `${apiUrl}/api`,
		platform: platform,
		version,
		interceptor,
	};
	console.log("Init api fetcher", config);
	fetcher = new Fetcher(config);
}

export function setAnalyticsClientId(analyticsClientId: string) {
	fetcher.setAnalyticsClientId(analyticsClientId);
}
