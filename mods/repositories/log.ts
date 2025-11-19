import { Log, NewLogInput } from "../entities";
import { fetcher } from "./cli/client";

type Resp = {
  getLogList: ReadonlyArray<Log>;
  getLog: Log;
  postLog: Log;
  putLog: Log;
  deleteLog: void;
};


export async function getLogList(accessToken: string) {
  return await fetcher.fetchJson<Resp["getLogList"]>({
    method: "GET",
    path: `/logs`,
    accessToken,
  });
}

export async function getLog(accessToken: string, id: number) {
  return await fetcher.fetchJson<Resp["getLog"]>({
    method: "GET",
    path: `/logs/${id}`,
    accessToken,
  });
}

export async function postLog(accessToken: string, input: NewLogInput) {
  return await fetcher.fetchJson<Resp["postLog"]>({
    method: "POST",
    path: `/logs`,
    accessToken,
    body: { input },
  });
}

export async function putLog(
  accessToken: string,
  id: number,
  input: Partial<NewLogInput>
) {
  return await fetcher.fetchJson<Resp["putLog"]>({
    method: "PUT",
    path: `/logs/${id}`,
    accessToken,
    body: { input },
  });
}

export async function deleteLog(accessToken: string, id: number) {
  await fetcher.fetchJson<Resp["deleteLog"]>({
    method: "DELETE",
    path: `/logs/${id}`,
    accessToken,
  });
}