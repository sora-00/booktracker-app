export type HttpRequest = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  baseUrl?: string;
  headers?: Record<string, string>;
  body?: unknown;
};

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
  return (await res.json()) as TResp;
}

export async function fetchFileUpload<TResp>(req: HttpRequest): Promise<TResp> {
  const url = `${(req.baseUrl ?? "").replace(/\/$/, "")}${req.path}`;
  const res = await fetch(url, {
    method: req.method,
    headers: {
      // FormDataの場合はContent-Typeを設定しない（ブラウザが自動的にmultipart/form-dataを設定する）
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
