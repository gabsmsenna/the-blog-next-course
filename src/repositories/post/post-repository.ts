import {PostModel} from "@/models/posts/post-model";

export interface PostRepository {
    findAll(): Promise<PostModel[]>;
    findById(id: string): Promise<PostModel>;
}