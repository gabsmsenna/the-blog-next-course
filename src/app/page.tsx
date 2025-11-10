import { SpinLoader } from "@/components/SpinLoader";
import { Suspense } from "react";
import { PostsList } from "@/components/PostsList";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { PostHeading } from "@/components/PostHeading";
import { PostCoverImage } from "@/components/PostCoverImage";

export default function Home() {
  return (
    <Container>
      <Header />

      <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
        <PostCoverImage
          linkProps={{
            href: "/post/asdfas",
          }}
          imageProps={{
            width: 1200,
            height: 720,
            src: "/images/bryen_1.png",
            alt: "Capa do post",
            priority: true
          }}
        />

        <div className="flex flex-col gap-4 sm:justify-center">
          <time className="text-slate-600 text-sm/tight" dateTime="2025-04-20">
            20/04/2025 10:00
          </time>
          <PostHeading as="h1" url="#">
            Título do post
          </PostHeading>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum,
          libero suscipit, odio, aliquid laudantium incidunt beatae nulla nemo
          sunt tempora aliquam fugiat perspiciatis quasi quaerat voluptate
          animi. Incidunt, autem temporibus!
        </div>
      </section>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
    </Container>
  );
}
