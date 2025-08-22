"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "./ui/button";

interface CourseProps {
  id: string;
  link: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

const CardVideos = () => {
  const [courses, setCourses] = useState<CourseProps[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        const data: CourseProps[] = await response.json();
        setCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      {courses.map((course) => (
        <Card key={course.id} className="mx-auto w-full max-w-sm">
          <CardHeader>
            <CardTitle>{course.name}</CardTitle>
            <CardDescription>
              {course.description.length > 100
                ? course.description.slice(0, 100) + "..."
                : course.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src={
                course.image && course.image.startsWith("http")
                  ? course.image.trim() // Remove espaços no início/fim
                  : "/images/card-image.png"
              }
              alt={`Imagem do curso ${course.name}`}
              width={300}
              height={200}
              className="rounded-md"
            />
          </CardContent>
          <CardFooter>
            <Link href={`/course/${course.slug}`}>
              <Button variant="outline" className="w-full">
                Acessar curso
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default CardVideos;
