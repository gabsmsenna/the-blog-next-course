"use client";

import { logoutAction } from "@/actions/auth/logout-action";
import {
  CircleXIcon,
  FileTextIcon,
  HourglassIcon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathName]);

  const linkClasses =
    "px-4 flex items-center justify-start gap-2 transition hover:bg-slate-800 h-10 shrink-0 rounded-lg cursor-pointer";
  const openCloseBtnClasses = `${linkClasses} text-blue-200 italic sm:hidden`;

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();

    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    <nav
      className={`
    bg-slate-900 text-slate-100 rounded-lg 
    flex flex-col mb-5 
    sm:flex-row sm:flex-wrap 
    ${!isOpen ? "overflow-hidden h-10" : ""}
`}
    >
      <button
        className={openCloseBtnClasses}
        onClick={() => setIsOpen((s) => !s)}
      >
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}

        {isOpen && (
          <>
            <CircleXIcon />
            Fechar
          </>
        )}
      </button>

      <a href="/" target="_blank" className={linkClasses}>
        <HouseIcon size={16} />
        Home
      </a>

      <Link href={"/admin/post"} className={linkClasses}>
        <FileTextIcon size={16} />
        Posts
      </Link>

      <Link href={"/admin/post/new"} className={linkClasses}>
        <PlusIcon size={16} />
        Criar post
      </Link>

      <a onClick={handleLogout} href="#" className={linkClasses}>
        {isPending && (
          <>
            <HourglassIcon />
            Aguarde...
          </>
        )}

        {!isPending && (
          <>
            <LogOutIcon />
            Sair
          </>
        )}
      </a>
    </nav>
  );
}
