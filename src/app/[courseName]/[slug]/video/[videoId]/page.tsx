import YoutubeVideo from "@/components/common/YoutubeVideo";
import { db } from "@/db";

interface VideoPageProps {
  params: { slug: string; videoId: string; courseName: string };
}

const VideoPage = async ({ params }: VideoPageProps) => {
  const { slug, videoId, courseName } = params;

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

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">{video.title}</h1>
        <YoutubeVideo videoId={video.videoId} />
        <p className="mt-4 text-gray-600">{course.description}</p>
      </div>
    </div>
  );
};

export default VideoPage;
