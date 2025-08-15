"use client";

import {
  BadgeDollarSignIcon,
  BaggageClaim,
  Loader2,
  LogIn,
  LogOutIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUserCredit } from "@/hooks/queries/use-user-get-credit";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const SheetHeaderMobile = () => {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;
  const { data: credit, isLoading, error } = useUserCredit(userId);

  if (isLoading)
    return (
      <p className="animate-spin">
        <Loader2 />
      </p>
    );
  if (error) return <p>Erro ao carregar créditos</p>;

  if (!session?.user) {
    return (
      <Button className="w-full" variant="outline" asChild>
        <Link href="/authentication">
          <LogIn /> Login
        </Link>
      </Button>
    );
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Avatar className="h-14 w-14">
            <AvatarImage src={session.user.image ?? undefined} />
            <AvatarFallback>
              {session.user.name?.split(" ")?.[0]?.[0] || ""}
              {session.user.name?.split(" ")?.[1]?.[0] || ""}
            </AvatarFallback>
          </Avatar>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Opções</SheetTitle>
          </SheetHeader>

          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={session.user.image ?? undefined} />
                <AvatarFallback>
                  {session.user.name?.split(" ")?.[0]?.[0] || ""}
                  {session.user.name?.split(" ")?.[1]?.[0] || ""}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center justify-between gap-4">
                <span className="max-w-[120px] truncate text-sm font-medium">
                  {session.user.name}
                </span>
                <p className="flex items-center gap-2 px-4">
                  <BadgeDollarSignIcon size={16} /> {credit}
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex items-center">
            <Button asChild variant={"ghost"}>
              <Link href={"/buy"}>
                <div className="flex items-center gap-2 font-semibold">
                  <ShoppingBasketIcon size={16} />
                  <span>Comprar</span>
                </div>
              </Link>
            </Button>
          </div>
          <Separator />
          <SheetFooter>
            <Button
              size="icon"
              variant="outline"
              className="w-full shrink-0"
              onClick={() => authClient.signOut()}
            >
              <LogOutIcon /> Sair da conta
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetHeaderMobile;
