import { client } from "@/libs/client";
import styles from "../../page.module.scss";

type Blog = { id: string; title: string; content: string };

export const revalidate = 60;

// ISR用に静的パスを事前生成
export async function generateStaticParams() {
  const { contents } = await client.getList<Blog>({ endpoint: "blogs" });
  return contents.map((c) => ({ id: c.id }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId: id,
  });

  return (
    <article className={styles.main}>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.publishedAt}>{post.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{ __html: `${post.content}` }}
        className={styles.post}
      />
    </article>
  );
}
