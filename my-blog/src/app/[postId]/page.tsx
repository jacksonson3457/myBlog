import { DateChange } from "@/app/utils/DateChange";
import { getAllContents, getContentDetail } from "@/libs/client";
import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";
import { notFound } from "next/navigation";

type StaticParams = { postId: string }[];
type Params = {
  params: Promise<{ postId: string }>;
};

export async function generateStaticParams(): Promise<StaticParams> {
  const data = await getAllContents();
  const paths = data.map((post: { id: string }) => ({
    postId: post.id,
  }));
  return paths;
}

export default async function BlogIdPage({ params }: Params) {
  const { postId } = await params;
  const post = await getContentDetail(postId);
  if (!post) {
    return notFound();
  }

  return (
    <div className="flex flex-col w-full pb-16 min-h-screen items-center">
      <div className="flex flex-col w-full sm:max-w-[700px] px-5 pt-40 pb-20">
        <h1 className="text-3xl border-b border-black pb-2">{post.title}</h1>
        <DateChange date={post.publishedAt!} />
        <div className="mb-10" />
        <ExportedImage
          src={post.thumbnail?.url || "/placeholder.jpg"}
          alt="blogimage"
          placeholder="empty"
          width={300}
          height={300}
          style={{
            objectFit: "contain",
            borderRadius: 12,
          }}
        />
        <div
          className="prose prose-lg mt-8 mb-40 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <Link href="/" prefetch={false}>
          <p>＜ 一覧へ</p>
        </Link>
      </div>
    </div>
  );
}
