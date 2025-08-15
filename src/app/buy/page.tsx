import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BuyWithCreditPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recompensa por estudar!</CardTitle>
        <CardDescription>Gaste com sabedoria</CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={"/dolar.png"} alt="recompensa" width={100} height={100} />
      </CardContent>
      <CardFooter>
        <Button>Comprar</Button>
      </CardFooter>
    </Card>
  );
};

export default BuyWithCreditPage;
