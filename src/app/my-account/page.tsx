"use client";

import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

const PageAccount = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/authentication");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  const createdAt = session.user.createdAt
    ? new Date(session.user.createdAt)
    : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-6 pt-4">
      <h1 className="mb-4 text-xl font-bold">Suas informações</h1>

      <Avatar className="h-20 w-20">
        <AvatarImage src={session.user.image ?? undefined} />
        <AvatarFallback>
          {session.user.name?.split(" ")?.[0]?.[0] || ""}
          {session.user.name?.split(" ")?.[1]?.[0] || ""}
        </AvatarFallback>
      </Avatar>

      <p className="mt-4 text-lg">{session.user.name}</p>
      <p className="text-sm text-gray-600">{session.user.email}</p>

      <Card className="mt-6 w-full max-w-md p-4 shadow-md">
        <CardHeader>
          <CardTitle>Sobre a sua conta</CardTitle>
          <CardDescription>Informações gerais e conquistas</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border p-4">
            <h3 className="font-semibold">Suas conquistas:</h3>
            <p className="text-sm text-gray-600">🏆 Nenhuma conquista ainda</p>
          </div>
        </CardContent>

        <CardFooter>
          <p className="text-sm text-gray-500">
            Conta criada em:{" "}
            {createdAt
              ? createdAt.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "Data indisponível"}
          </p>
        </CardFooter>
      </Card>
      <div className="w-full py-6">
        <Button
          onClick={() => authClient.signOut()}
          className="p w-full"
          variant={"outline"}
        >
          <LogOutIcon /> Sair
        </Button>
      </div>
    </div>
  );
};

export default PageAccount;
