import { drizzleDb } from "@/db/drizzle";
import { PostModel } from "@/models/posts/post-model";
import { PostRepository } from "./post-repository";
import { logColor } from "@/utils/log-color";
import { asyncDelay } from "@/utils/async-delay";
import { SIMULATE_WAIT_IN_MS } from "@/lib/post/constants";

export class DrizzlePostRepository implements PostRepository {
  async findAllPublished(): Promise<PostModel[]> {
    // --- UTILIZANDO QUERY BUILDER ---
    // const query = drizzleDb
    //     .select()
    //     .from(postsTable)
    //     .where(eq(postsTable.published, true))
    //     .orderBy(desc(postsTable.createdAt));
    // console.log(query.toSQL().sql);

    // const results = await query;
    // console.log(results);
    // --- UTILIZANDO QUERY BUILDER ---

    await asyncDelay(SIMULATE_WAIT_IN_MS, true);

    logColor('findAllPublished', Date.now());

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublished(slug: string): Promise<PostModel> {

    await asyncDelay(SIMULATE_WAIT_IN_MS, true);

    logColor('findBySlugPublished', Date.now());

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });

    if(!post) throw new Error("No published post found");

    return post;
  }

  async findAll(): Promise<PostModel[]> {

    await asyncDelay(SIMULATE_WAIT_IN_MS, true);

    logColor('findAll', Date.now());

    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
    // Cast the result to PostModel[] to satisfy the expected type (published may be boolean at runtime)
    return posts as unknown as PostModel[];
  }

  async findById(id: string): Promise<PostModel> {

    await asyncDelay(SIMULATE_WAIT_IN_MS, true);

    logColor('findById', Date.now());

    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) =>
         eq(posts.id, id),
    });

    if(!post) throw new Error("No post found");

    return post;
  }
}
