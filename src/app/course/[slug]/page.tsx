import Link from "next/link";

import YoutubeVideo from "@/components/common/YoutubeVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/db";

interface CoursePageProps {
  params: { slug: string };
}

interface Video {
  id: string;
  title: string;
  link: string;
}

const CoursePage = async ({ params }: CoursePageProps) => {
  const { slug } = params;

  // Buscar o curso
  const course = await db.query.coursesTable.findFirst({
    where: (coursesTable, { eq }) => eq(coursesTable.slug, slug),
  });

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600">
        Curso não encontrado.
      </div>
    );
  }

  // Buscar vídeos do curso
  const videos: Video[] = await db.query.courseVideosTable.findMany({
    where: (videosTable, { eq }) => eq(videosTable.courseId, course.id),
    orderBy: (videosTable, { asc }) => asc(videosTable.order),
  });

  return (
    <div className="flex min-h-screen flex-col items-center space-y-8 bg-gray-50 px-4 py-8">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 lg:text-left">
          {course.name}
        </h1>
        <p className="mb-6 text-center text-gray-600 lg:text-left">
          {course.description}
        </p>

        <div className="flex flex-col gap-8">
          {videos.map((video) => (
            <div key={video.id} className="w-full">
              <div className="relative aspect-video w-full">
                <Button>
                  <Link href={`course/${video.link}`}>Proximo</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
