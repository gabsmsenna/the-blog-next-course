import { PostModel } from "@/models/posts/post-model";

export interface PostRepository {
    findAllPublished(): Promise<PostModel[]>;
    findById(id: string): Promise<PostModel>;
    findBySlugPublished(slug: string): Promise<PostModel>;
    findAll(): Promise<PostModel[]>;

    // Mutation
    create(post: PostModel): Promise<PostModel>;
    delete(id: string): Promise<PostModel>;
    update(
        id: string,
        newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
    ): Promise<PostModel>;
}