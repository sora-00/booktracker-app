import { Fetcher } from "../../utils/api-fetcher";
import type { FetcherInterceptor } from "../../utils/api-fetcher/config";

export let fetcher: Fetcher;

export function initApiFetcher(
  apiUrl: string,
  platform: string,
  version: string,
  interceptor: FetcherInterceptor
) {
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

