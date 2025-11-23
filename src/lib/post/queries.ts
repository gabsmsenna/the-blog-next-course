import { postRepository } from "@/repositories/post/json-post-repository";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { cache } from "react";

export const findAllPublicPostsCached = unstable_cache(
  async () => await postRepository.findAllPublished(),
  ["posts"],
  {
    tags: ["posts"],
  }
);

export const findPostBySlugCached = (slug: string) =>
  unstable_cache(
    async (slug: string) => {
      const post = await postRepository
        .findBySlugPublished(slug)
        .catch(() => undefined);
      if (!post) notFound();
      return post;
    },
    ["posts"],
    {
      tags: [`post-${slug}`],
    }
  )(slug);

export const findPostByIdCached = cache(
  async (id: string) => await postRepository.findById(id)
);
