"use server";

import { makePartialPublicPost, makePublicPostFromDb as makeDtoPostFromDb, PublicPost } from "@/dto/post/dto";
import { verifyLoginSession } from "@/lib/post/login/manage-login";
import { PostUpdateSchema } from "@/lib/post/validations";
import { PostModel } from "@/models/posts/post-model";
import { postRepository } from "@/repositories/post";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { makeSlugFromText } from "@/utils/make-slug-from-text";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from 'uuid'


type UpdatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: true;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData
): Promise<UpdatePostActionState> {

  const isAuthenticated = await verifyLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  const id = formData.get('id')?.toString() || ''

  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      errors: ['ID inválido'],
    }
  }

  const formDataToObject = Object.fromEntries(formData.entries());
  const zodParsedObject = PostUpdateSchema.safeParse(formDataToObject);

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
  const newPost = {
    ...validPostData,
  };

  let post;
  try {
   post = await postRepository.update(id, newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataToObject),
        errors: [e.message],
      };
    }

    return {
      formState: makePartialPublicPost(formDataToObject),
      errors: ['Erro desconhecido!']
    }
  }

  updateTag('posts');
  updateTag(`post-${post.slug}`);

  return {
    formState: makeDtoPostFromDb(post),
    errors: [],
    success: true
  }
}
