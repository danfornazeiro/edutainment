import Link from "next/link";

import YoutubeVideo from "@/components/common/YoutubeVideo";
import { db } from "@/db";

interface VideoPageProps {
  params: Promise<{ slug: string; videoId: string; courseName: string }>;
}

interface Video {
  id: string;
  title: string;
  link: string;
  videoId: string;
}

const VideoPage = async ({ params }: VideoPageProps) => {
  const { slug, videoId, courseName } = await params;

  // Busca o curso pelo slug
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

  // Busca o vídeo pelo videoId
  const video = await db.query.courseVideosTable.findFirst({
    where: (videosTable, { eq }) => eq(videosTable.videoId, videoId),
  });

  if (!video) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600">
        Vídeo não encontrado.
      </div>
    );
  }

  const videos: Video[] = await db.query.courseVideosTable.findMany({
    where: (videosTable, { eq }) => eq(videosTable.courseId, course.id),
    orderBy: (videosTable, { asc }) => asc(videosTable.order),
  });

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">{video.title}</h1>
        <YoutubeVideo videoId={video.videoId} />
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
    </div>
  );
};

export default VideoPage;
