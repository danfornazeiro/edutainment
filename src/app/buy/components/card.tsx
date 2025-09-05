import { CircleCheck } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  onBuy?: () => void;
  image?: string;
  status: string;
}

const Card: React.FC<ProductCardProps> = ({
  title,
  description,
  price,
  onBuy,
  image,
  status,
}) => {
  const isPurchased = status === "purchased";

  return (
    <div className="flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-md">
      {image && (
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="h-48 w-full object-cover sm:h-56"
        />
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm font-medium text-gray-500 capitalize">{status}</p>
        <p className="flex-1 text-gray-600">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold">{price}</span>
          <Button onClick={onBuy} disabled={isPurchased} className="px-4 py-2">
            {isPurchased ? <CircleCheck /> : "Comprar"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
