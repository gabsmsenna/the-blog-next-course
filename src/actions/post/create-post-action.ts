"use server";

import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { verifyLoginSession } from "@/lib/post/login/manage-login";
import { PostCreateSchema } from "@/lib/post/validations";
import { PostModel } from "@/models/posts/post-model";
import { postRepository } from "@/repositories/post";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { makeSlugFromText } from "@/utils/make-slug-from-text";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from 'uuid'


type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: true;
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData
): Promise<CreatePostActionState> {

  const isAuthenticated = await verifyLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  const formDataToObject = Object.fromEntries(formData.entries());
  const zodParsedObject = PostCreateSchema.safeParse(formDataToObject);

  if (!isAuthenticated) {
    return {
      formState: makePartialPublicPost(formDataToObject),
      errors: ['Faça login em outra aba antes de salvar.'],
    }
  }

  if (!zodParsedObject.success) {
    const errors = getZodErrorMessages(zodParsedObject.error);
    return {
      errors,
      formState: prevState.formState,
    };
  }

  const validPostData = zodParsedObject.data;
  const newPost: PostModel = {
    ...validPostData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuidv4(),
    slug: makeSlugFromText(validPostData.title)
  };

  try {
    await postRepository.create(newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: newPost,
        errors: [e.message],
      };
    }

    return {
      formState: newPost,
      errors: ['Erro desconhecido!']
    }
  }

  updateTag('posts');

  redirect(`/admin/post/${newPost.id}?created=1`);
}
