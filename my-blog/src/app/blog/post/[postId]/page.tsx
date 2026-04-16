import { DateChange } from "@/components/DateChange";
import { getAllContents, getContentDetail } from "@/libs/client";
import { isVideoContent } from "@/utils/contentType";
import { buildDetailStaticParams } from "@/utils/postStaticParams";
import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";
import { notFound } from "next/navigation";

type StaticParams = { postId: string }[];
type Params = {
  params: { postId: string };
};

export async function generateStaticParams(): Promise<StaticParams> {
  const data = await getAllContents();
  return buildDetailStaticParams(data.contents);
}

export default async function BlogIdPage({ params }: Params) {
  const { postId } = await params;
  const post = await getContentDetail(postId);
  const isDev = process.env.NODE_ENV !== "production";

  if (!post) {
    return notFound();
  }

  if (isVideoContent(post.contentType, post.youtubeUrl)) {
    return notFound();
  }

  return (
    <div className="page-shell pb-16">
      <article className="content-wrap section-panel max-w-[820px]">
        <h1 className="mb-3 border-b border-white/15 pb-4 text-3xl font-semibold leading-tight text-stone-100">
          {post.title}
        </h1>
        <DateChange date={post.publishedAt!} />
        <div className="mb-8" />
        <ExportedImage
          src={post.thumbnail?.url || "/placeholder.jpg"}
          alt="blogimage"
          placeholder="empty"
          unoptimized={isDev}
          width={1000}
          height={560}
          sizes="(max-width: 840px) 92vw, 820px"
          style={{
            width: "100%",
            maxHeight: 420,
            objectFit: "cover",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        />
        <div
          className="prose prose-lg mt-8 mb-14 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <Link
          href="/"
          prefetch={false}
          className="inline-flex rounded-full border border-white/20 px-5 py-2 text-sm text-stone-300 hover:border-stone-300 hover:text-stone-100"
        >
          ＜ 一覧へ
        </Link>
      </article>
    </div>
  );
}
