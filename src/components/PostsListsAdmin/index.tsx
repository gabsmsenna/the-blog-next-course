import { findAllPostAdmin } from "@/lib/post/queries/admin";
import Link from "next/link";
import { DeletePostButton } from "../admin/DeletePostButton";
import ErrorMessage from "../ErrorMessage";

export default async function PostsListAdmin() {
  const posts = await findAllPostAdmin();

  if (posts.length <= 0)
    return (
      <ErrorMessage
        contentTitle="Ops!"
        content="Você ainda não criou nenhum post"
      />
    );

  return (
    <div className="mb-16">
      {posts.map((post) => {
        return (
          <div
            className={`py-2 px-2 ${post.published ? "" : "bg-slate-300"}
            flex gap-2 items-center justify-between`}
            key={post.id}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

            {!post.published && (
              <span className="text-xs text-slate-600 italic">
                (Não publicado)
              </span>
            )}

            <DeletePostButton id={post.id} title={post.title} />
          </div>
        );
      })}
    </div>
  );
}
