import { PostModel } from "@/models/posts/post-model";

export type PublicPost = Omit<PostModel, 'updatedAt'>;

export const makePublicPostFromDb = (post: PostModel): PublicPost => {
    return makePartialPublicPost(post);
};

export const makePartialPublicPost = (post?: Partial<PostModel>): PublicPost => {
    return {
        id: post?.id || '',
        slug: post?.slug || '',
        title: post?.title || '',
        excerpt: post?.excerpt || '',
        author: post?.author || '',
        content: post?.content || '',
        coverImageUrl: post?.coverImageUrl || '',
        createdAt: post?.createdAt || '',
        published: post?.published || false,
    }
};