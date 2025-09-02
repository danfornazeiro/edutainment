"use client";

import { Asterisk } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Footer = () => {
  const { data: session } = authClient.useSession();
  if (!session) {
    return (
      <footer className="bg-accent fixed bottom-0 left-0 z-50 flex w-full items-center justify-between gap-2 px-4 py-2 text-center shadow-md">
        <div>
          <Link href="/">
            <Image
              src={"/casinha_certa.svg"}
              width={45}
              height={45}
              alt="home"
            />
          </Link>
        </div>
        <div>
          <Link href="/">
            <Image src={"/lojinha.svg"} width={45} height={45} alt="store" />
          </Link>
        </div>
        <Link
          className="rounded-full border border-gray-400"
          href={"/my-account"}
        >
          <Avatar className="h-14 w-14">
            <AvatarFallback>
              <Asterisk />
            </AvatarFallback>
          </Avatar>
        </Link>
      </footer>
    );
  }
  return (
    <footer className="bg-accent fixed bottom-0 left-0 z-50 flex w-full items-center justify-between gap-2 px-4 py-2 text-center shadow-md">
      <div>
        <Link href="/">
          <div className="transition-transform duration-200 hover:scale-110 active:scale-95">
            <Image
              src={"/casinha_certa.svg"}
              width={45}
              height={45}
              alt="home"
            />
          </div>
        </Link>
      </div>
      <div>
        <Link href="/buy  ">
          <div className="transition-transform duration-200 hover:scale-110 active:scale-95">
            <Image src={"/lojinha.svg"} width={45} height={45} alt="store" />
          </div>
        </Link>
      </div>
      <Link href={"/my-account"}>
        <div className="rounded-full border border-gray-400 transition-transform duration-200 hover:scale-110 active:scale-95">
          <Avatar className="h-14 w-14">
            <AvatarImage src={session?.user?.image ?? undefined} />
            <AvatarFallback>
              {session?.user?.name?.split(" ")?.[0]?.[0] || ""}
              {session?.user?.name?.split(" ")?.[1]?.[0] || ""}
            </AvatarFallback>
          </Avatar>
        </div>
      </Link>
    </footer>
  );
};

export default Footer;
