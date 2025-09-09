import Link from "next/link";

import Mascote from "@/components/common/Mascote";
import YoutubeVideo from "@/components/common/YoutubeVideo";
import { db } from "@/db";

interface CoursePageProps {
  params: Promise<{ slug: string; courseName: string }>;
}

interface Video {
  id: string;
  title: string;
  link: string;
  videoId: string;
}

const CoursePage = async ({ params }: CoursePageProps) => {
  const { slug, courseName } = await params;

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

  const videos: Video[] = await db.query.courseVideosTable.findMany({
    where: (videosTable, { eq }) => eq(videosTable.courseId, course.id),
    orderBy: (videosTable, { asc }) => asc(videosTable.order),
  });

  return (
    <div className="flex min-h-screen flex-col items-center space-y-8 px-4 py-8 pb-20">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 lg:text-left">
          {course.name}
        </h1>
        <p className="mb-6 text-center text-gray-600 lg:text-left">
          {course.description}
        </p>

        {videos.length > 0 && <YoutubeVideo videoId={videos[0].videoId} />}

        <div className="mt-6 flex flex-col gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex items-center justify-between rounded bg-gray-100 p-4"
            >
              <span>{video.title}</span>
              <Link
                href={`/${courseName}/${slug}/video/${video.videoId}`}
                className="text-blue-600"
              >
                Assistir
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Mascote image="/MacacoVideos.png" />
    </div>
  );
};

export default CoursePage;
