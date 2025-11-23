import { postRepository } from "@/repositories/post/json-post-repository";
import { cache } from "react";

export const adminFindPostById = cache(async (id: string) => {
  return await postRepository.findById(id);
});

export const findAllPostAdmin = cache(async () => {
  return await postRepository.findAll();
});
