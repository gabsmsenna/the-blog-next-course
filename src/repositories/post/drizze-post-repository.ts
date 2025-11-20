import { drizzleDb } from "@/db/drizzle";
import { PostModel } from "@/models/posts/post-model";
import { PostRepository } from "./post-repository";


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
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublished(slug: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });

    if(!post) throw new Error("No published post found");

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
    // Cast the result to PostModel[] to satisfy the expected type (published may be boolean at runtime)
    return posts as unknown as PostModel[];
  }

  async findById(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) =>
         eq(posts.id, id),
    });

    if(!post) throw new Error("No post found");

    return post;
  }
}

// (async () => {
//   const repo = new DrizzlePostRepository();
//   const posts = await repo.findAll();
//     console.log(posts);
// })();
