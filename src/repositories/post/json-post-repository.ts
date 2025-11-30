import { PostModel } from "@/models/posts/post-model";
import { PostRepository } from "@/repositories/post/post-repository";
import { resolve } from "path";
import { readFile } from "fs/promises";
import { SIMULATE_WAIT_IN_MS } from "@/lib/post/constants";

const ROOT_DIR: string = process.cwd();
const JSON_POST_FILE_PATH = resolve(
  ROOT_DIR,
  "src",
  "db",
  "seed",
  "posts.json"
);

export class JsonPostRepository implements PostRepository {

  private async simulateDelay() {
    if (SIMULATE_WAIT_IN_MS <= 0) return;

    await new Promise((resolve) => setTimeout(resolve, SIMULATE_WAIT_IN_MS));
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAllPublished();
    const post = posts.find((post) => post.id === id);

    if (!post) throw new Error("No post found with id " + id);

    return post;
  }

  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POST_FILE_PATH, "utf8");
    const parsedJson = JSON.parse(jsonContent);
    const { posts } = parsedJson;
    return posts;
  }

  async findAllPublished(): Promise<PostModel[]> {
    await this.simulateDelay();
    const posts = await this.readFromDisk();
    return posts.filter((post) => post.published === true);
  }

  async findBySlug(slug: string): Promise<PostModel> {
    const posts = await this.findAllPublished();
    const post = posts.find((post) => post.slug === slug);

    if (!post) throw new Error("No post found for the slug: " + slug);

    return post;
  }

  async findAll(): Promise<PostModel[]> {
    return await this.readFromDisk();
  }

  async findBySlugPublished(slug: string): Promise<PostModel> {
    const posts = await this.findAllPublished();
    const post = posts.find(post => post.slug === slug);

    if (!post) throw new Error('Post não encontrado para slug');

    return post;
  }
}