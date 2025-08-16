"use client";

import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useUserCredit } from "@/hooks/queries/use-user-get-credit";
import { authClient } from "@/lib/auth-client";

import { Button } from "../ui/button";

const Header = () => {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;
  const { data: credit } = useUserCredit(userId);

  if (!session) {
    return (
      <header className="flex items-center justify-between p-3">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            width={85}
            height={85}
            alt="logo BrainCash"
          />
          <h1 className="text-xl font-bold">BrainCash</h1>
        </Link>
        <div className="flex items-center gap-3">
          <Button className="w-full" variant="outline" asChild>
            <Link href="/authentication">
              <LogIn /> Login
            </Link>
          </Button>
        </div>
      </header>
    );
  }
  return (
    <header className="flex items-center justify-between p-3">
      <Link href={"/"}>
        <Image src={"/logo.png"} width={85} height={85} alt="logo BrainCash" />
        <h1 className="text-xl font-bold">BrainCash</h1>
      </Link>
      <div className="flex items-center rounded-full bg-green-500 p-3">
        <p className="flex items-center text-2xl font-bold text-white">
          <Image
            src={"/dolares.png"}
            alt="Icon credits"
            width={40}
            height={40}
          />
          {credit}
        </p>
      </div>
    </header>
  );
};

export default Header;
