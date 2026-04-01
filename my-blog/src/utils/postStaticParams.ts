import type { Content } from "@/libs/client";
import { isVideoContent } from "@/utils/contentType";

export const buildDetailStaticParams = (
  contents: Pick<Content, "id" | "contentType" | "youtubeUrl">[]
): { postId: string }[] => {
  return contents
    .filter((post) => !isVideoContent(post.contentType, post.youtubeUrl))
    .map((post) => ({ postId: post.id }));
};
