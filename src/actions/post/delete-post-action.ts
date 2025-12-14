"use server";

import { postRepository } from "@/repositories/post";
import { asyncDelay } from "@/utils/async-delay";
import { logColor } from "@/utils/log-color";
import { updateTag } from "next/cache";

export async function deletePostAction(id: string) {
  await asyncDelay(2000);
  logColor("" + id);

  if (!id || typeof id !== "string") {
    return {
      error: "Dados inválidos",
    };
  }

  let post;
  try {
    post = await postRepository.delete(id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }

    return {
      error: "Erro desconhecido",
    };
  }

  updateTag("posts");
  updateTag(`post-${post.slug}`);

  return {
    error: "",
  };
}
