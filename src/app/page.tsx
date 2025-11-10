import {SpinLoader} from "@/components/SpinLoader";
import { Suspense } from "react";
import { PostsList } from "@/components/PostsList";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <Header />

      <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
        <Link 
        className="w-full h-full overflow-hidden rounded-2xl" 
        href="#">
          <Image 
          className="group-hover:scale-105 transition duration-300 "
          src='/images/bryen_0.png' 
          width={1200}
          height={720}
          alt="Título post"/>
        </Link>
        <div>
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
