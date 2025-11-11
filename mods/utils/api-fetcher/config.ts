import type { HttpRequest } from "../http";

export type FetcherConfig = {
  apiBaseUrl: string;
  platform: string;
  version: string;
  interceptor?: FetcherInterceptor;
};

export type FetcherInterceptor = {
  onRequest?: (req: HttpRequest) => HttpRequest;
  onResponse?: <T>(res: T) => T;
  onError?: (error: Error) => Error;
};

