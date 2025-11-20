import { PostModel } from "@/models/posts/post-model";

export interface PostRepository {
    findAllPublished(): Promise<PostModel[]>;
    findById(id: string): Promise<PostModel>;
    findBySlugPublished(slug: string): Promise<PostModel>;
    findAll(): Promise<PostModel[]>;
}