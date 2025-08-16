"use client";

import { Home, Store } from "lucide-react";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Footer = () => {
  const { data: session } = authClient.useSession();
  if (!session) {
    return <p>voce nao tem uma sessão</p>;
  }
  return (
    <footer className="bg-accent flex w-full items-center justify-between gap-2 px-2 py-2 text-center">
      <div>
        <Home size={45} />
      </div>
      <div>
        <Store size={45} />
      </div>
      <Link href={"/my-account"}>
        <Avatar className="h-14 w-14">
          <AvatarImage src={session.user.image ?? undefined} />
          <AvatarFallback>
            {session.user.name?.split(" ")?.[0]?.[0] || ""}
            {session.user.name?.split(" ")?.[1]?.[0] || ""}
          </AvatarFallback>
        </Avatar>
      </Link>
    </footer>
  );
};

export default Footer;
