// import { DateChange } from "@/app/utils/DateChange";
// import { INITIAL_PER_PAGE } from "@/constants/Number";
// import { client, getAllContents, getContentDetail } from "@/libs/client";
// import { range } from "@/utils/range";
// import ExportedImage from "next-image-export-optimizer";
// import Link from "next/link";
// import { notFound } from "next/navigation";
// import styles from "../../page.module.scss";

// type StaticParams = { blog: string; blogId: string }[];
// type Params = {
//   params: Promise<{ blog: string; blogId: string }>;
// };

// export async function generateStaticParams(): Promise<StaticParams> {
//   const data = await getAllContents();
//   const paths = data.map((post: { id: string }, index: number) => ({
//     //何ページ目の
//     blog: `${Math.ceil((index + 1) / INITIAL_PER_PAGE)}`,
//     //どのブログか
//     blogId: post.id,
//   }));
//   return paths;
// }

// export default async function BlogIdPage({ params }: Params) {
//   const { blogId } = await params;
//   const post = await getContentDetail(blogId);
//   if (!post) {
//     return notFound();
//   }
//   // console.log(post);

//   return (
//     <>
//       <article className={styles.main}>
//         <h1 className={styles.title}>{post.title}</h1>
//         <p className={styles.publishedAt}>{post.publishedAt}</p>
//         <div
//           dangerouslySetInnerHTML={{ __html: `${post.content}` }}
//           className={styles.post}
//         />
//       </article>
//       <Link href="/1" prefetch={false}>
//           <p>＜ 一覧へ</p>
//       </Link>
//     </>
//   );
// }
