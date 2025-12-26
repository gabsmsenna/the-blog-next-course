'use server';

import { mkdir, writeFile } from "fs/promises";
import { extname, resolve } from "path";

type UploadImageResponse = {
    url: string;
    error: string;
}

export async function uploadImage(formData: FormData): Promise<UploadImageResponse> {
  
    const uploadMaxSize = Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_FILE_SIZE) || 921600;
    const uploadDir = process.env.IMAGE_UPLOAD_DIR || 'uploads';
    const imgServerUrl = process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads';

    const makeResult = ({url = '', error = ''}) => {
        return { url, error};
    }

    if (!(formData instanceof FormData)) {
      return makeResult({ error: "Invalid form data" });
    }

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return makeResult({ error: "Invalid file" });
    }

    if (file.size > uploadMaxSize) {
      return makeResult({ error: `File size exceeds the maximum limit` });
    }

    if (!file.type.startsWith("image/")) {
      return makeResult({ error: "Unsupported file type" });
    }

    const fileExtension = extname(file.name);
    const uniqueImageName = `${Date.now()}${fileExtension}`;

    const uploadFullPath = resolve(process.cwd(), 'public', uploadDir);

    await mkdir(uploadFullPath, { recursive: true });

    const fileArrayBuffer = await  file.arrayBuffer();
    const buffer = Buffer.from(fileArrayBuffer);

    const fileFullPath = resolve(uploadFullPath, uniqueImageName);

    await writeFile(fileFullPath, buffer);

    const url = `${imgServerUrl}/${uniqueImageName}`;
  
    return makeResult({url})
}