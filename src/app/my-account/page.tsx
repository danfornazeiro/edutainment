"use client";

import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Mascote from "@/components/common/Mascote";
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
    <div className="flex min-h-screen flex-col items-center px-4 pt-8">
      <div className="w-full max-w-5xl">
        <h1 className="mb-8 text-center text-2xl font-bold lg:text-left">
          Suas informações
        </h1>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Coluna esquerda */}
          <div className="flex flex-col items-center lg:items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage src={session.user.image ?? undefined} />
              <AvatarFallback>
                {session.user.name?.split(" ")?.[0]?.[0] || ""}
                {session.user.name?.split(" ")?.[1]?.[0] || ""}
              </AvatarFallback>
            </Avatar>

            <p className="mt-4 text-lg font-semibold">{session.user.name}</p>
            <p className="text-sm text-gray-600">{session.user.email}</p>

            <Button
              onClick={() => authClient.signOut()}
              className="mt-6 w-full lg:w-auto"
              variant={"outline"}
            >
              <LogOutIcon className="mr-2 h-4 w-4" /> Sair
            </Button>
          </div>

          {/* Coluna direita */}
          <Card className="w-full shadow-md">
            <CardHeader>
              <CardTitle>Sobre a sua conta</CardTitle>
              <CardDescription>Informações gerais e conquistas</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border p-4">
                <h3 className="font-semibold">Suas conquistas:</h3>
                <p className="text-sm text-gray-600">
                  🏆 Nenhuma conquista ainda
                </p>
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
        </div>
      </div>
      <Mascote image="/MacacoConquistaOk.png" />
    </div>
  );
};

export default PageAccount;
