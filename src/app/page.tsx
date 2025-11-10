import {SpinLoader} from "@/components/SpinLoader";
import { Suspense } from "react";
import { PostsList } from "@/components/PostsList";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { PostHeading } from "@/components/PostHeading";

export default function Home() {
  return (
    <Container>
      <Header />

      <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
        <Link 
        className="w-full h-full overflow-hidden rounded-2xl" 
        href="#">
          <Image 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300 "
          src='/images/bryen_0.png' 
          width={1200}
          height={720}
          alt="Título post"
          priority={true}
          />
        </Link>
        
        <div className="flex flex-col gap-4 sm:justify-center">
          <time className="text-slate-600 text-sm/tight" dateTime="2025-04-20">20/04/2025 10:00</time>

          <PostHeading as="h1" url="#">Título do post</PostHeading>
          
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum, libero suscipit,
          odio, aliquid laudantium incidunt beatae nulla nemo sunt tempora aliquam 
          fugiat perspiciatis quasi quaerat voluptate animi. Incidunt, autem temporibus!
        </div>
      </section>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

    </Container>
  );
}
