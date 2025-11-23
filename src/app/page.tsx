import { SpinLoader } from "@/components/SpinLoader";
import { Suspense } from "react";
import { PostsList } from "@/components/PostsList";
import { PostFeatured } from "@/components/PostFeatured";

export const dynamic = "force-static";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<SpinLoader className="min-h mb-16 " />}>
        <PostFeatured />
        <PostsList />
      </Suspense>
    </div>
  );
}
