import { postRepository } from "@/repositories/post";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

export const findAllPublicPostsCached = unstable_cache(
  async () => await postRepository.findAllPublished(),
  ["posts"],
  {
    tags: ["posts"],
  }
);

export const findPublicPostBySlugCached = (slug: string) =>
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


