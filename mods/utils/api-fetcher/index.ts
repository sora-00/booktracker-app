import { fetchJson, HttpRequest } from "../http";
import type { FetcherConfig, FetcherInterceptor } from "./config";
import type { FetcherRequest } from "./parameter";

export class Fetcher {
  private config: FetcherConfig;

  constructor(config: FetcherConfig) {
    this.config = config;
  }

  setAnalyticsClientId(_analyticsClientId: string) {
    // TODO: 実装が必要
  }

  async fetchJson<TResp>(req: FetcherRequest): Promise<TResp> {
    const headers: Record<string, string> = {};
    if (req.accessToken) {
      headers.Authorization = `Bearer ${req.accessToken}`;
    }

    const httpReq: HttpRequest = {
      method: req.method as HttpRequest["method"],
      path: req.path,
      baseUrl: this.config.apiBaseUrl,
      headers,
      body: req.body,
    };

    const interceptedReq = this.config.interceptor?.onRequest?.(httpReq) ?? httpReq;
    try {
      const res = await fetchJson<TResp>(interceptedReq);
      return this.config.interceptor?.onResponse?.(res) ?? res;
    } catch (error) {
      const interceptedError = this.config.interceptor?.onError?.(error as Error) ?? error;
      throw interceptedError;
    }
  }
}


