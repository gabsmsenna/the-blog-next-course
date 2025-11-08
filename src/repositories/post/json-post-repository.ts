import { PostModel } from "@/models/posts/post-model";
import {PostRepository} from "@/repositories/post/post-repository";
import {resolve} from "path";
import  { readFile } from 'fs/promises'

const ROOT_DIR: string = process.cwd();
const JSON_POST_FILE_PATH = resolve(ROOT_DIR, 'src', 'db', 'seed', 'posts.json');

export class JsonPostRepository implements PostRepository {

    async findById(id: string): Promise<PostModel> {
        const posts = await this.findAll();
        const post = posts.find(post => post.id === id);

        if (!post) throw new Error("No post found with id " + id);

        return post;

    }
    private async readFromDisk():  Promise<PostModel[]>{
        const jsonContent = await readFile(JSON_POST_FILE_PATH, 'utf8');
        const parsedJson = JSON.parse(jsonContent);
        const { posts } = parsedJson;
        return posts;
    }

    async findAll(): Promise<PostModel[]> {
        const posts = await this.readFromDisk();
        return posts;
    }

}

export const postRepository: PostRepository = new JsonPostRepository();