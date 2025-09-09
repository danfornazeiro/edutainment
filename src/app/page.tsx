"use client";

import CardVideos from "@/components/card-videos";
import Mascote from "@/components/common/Mascote";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  if (!session) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-green-200 via-green-300 to-green-200 p-6 text-center">
        {/* Bolhas decorativas */}
        <div className="absolute top-0 left-0 h-40 w-40 animate-ping rounded-full bg-green-300 opacity-30"></div>
        <div className="absolute right-0 bottom-0 h-56 w-56 animate-ping rounded-full bg-green-300 opacity-30"></div>

        <h1 className="mb-4 text-4xl font-extrabold text-green-800 drop-shadow-lg">
          💰 Bem-vindo ao DolarKids! 💰
        </h1>
        <p className="mb-8 max-w-md text-lg text-green-700 drop-shadow-sm">
          Aqui você vai aprender sobre finanças de um jeito divertido e fácil!
          <span className="font-bold"> Faça login para ver os conteúdos!</span>
        </p>

        {/* Botões de login */}
        <div className="flex flex-col gap-4"></div>
      </div>
    );
  }

  return (
    <div className="mb-20 flex flex-col items-center bg-gray-50 px-4 pt-6">
      <div className="grid w-full max-w-7xl gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CardVideos />
      </div>
      <Mascote image="/MacacoHome.png" />
    </div>
  );
}
