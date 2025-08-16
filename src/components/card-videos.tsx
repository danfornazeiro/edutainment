"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "./ui/button";

interface CardVideoProps {
  cardTitle: string;
  cardDescription: string;
  cardContent: string;
}

const CardVideos = ({
  cardTitle,
  cardDescription,
  cardContent,
}: CardVideoProps) => {
  return (
    <>
      <Card className="mx-auto w-full max-w-md rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <CardHeader className="border-b border-gray-200 pb-2">
          <CardTitle className="text-xl font-bold text-gray-900">
            {cardTitle}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 px-6 py-4 text-gray-700">
          <p>{cardContent}</p>
          <CardDescription className="truncate text-sm text-gray-500">
            {cardDescription}
          </CardDescription>
        </CardContent>

        <CardFooter className="w-full border-t border-gray-200 px-6 pt-3">
          <Button className="w-full">Assistir curso</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardVideos;
