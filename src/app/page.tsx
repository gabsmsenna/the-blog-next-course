import {SpinLoader} from "@/components/SpinLoader";
import { Suspense } from "react";
import { PostsList } from "@/components/PostsList";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
    </div>
  );
}
