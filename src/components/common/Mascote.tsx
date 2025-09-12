"use client";

import { XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "../ui/button";

interface MascoteProps {
  image: string;
}

const Mascote = ({ image }: MascoteProps) => {
  const [mascote, setMascote] = useState(true);
  if (!mascote) return null;
  return (
    <div className="fixed right-4 bottom-20 z-1000 cursor-pointer rounded-2xl transition-transform">
      <Button
        asChild
        size={"icon"}
        className="fixed right-4 rounded-full bg-green-400 p-1 shadow-lg"
        onClick={() => setMascote(false)}
      >
        <XIcon />
      </Button>
      <Image src={image} alt="Mascote do DolarKids" width={500} height={500} />
    </div>
  );
};

export default Mascote;
