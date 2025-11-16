import { fetcher } from "./cli/client";
import { fetchFileUpload } from "../utils/http";
import { getApiBaseUrl } from "../utils/config";

export type UploadsType = "thumbnail";

type UploadResponse = {
  id: string;
  url: string;
};

export async function postUploads(
  accessToken: string,
  type: UploadsType,
  file: {
    uri: string;
    name: string;
    type: string;
  }
): Promise<{ err?: Error; data?: UploadResponse }> {
  try {
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: file.name,
      type: file.type,
    } as any);
    formData.append("type", type);

    const apiBaseUrl = getApiBaseUrl();
    const res = await fetchFileUpload<UploadResponse>({
      method: "POST",
      path: "/uploads",
      baseUrl: apiBaseUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    return { data: res };
  } catch (error) {
    return { err: error as Error };
  }
}

