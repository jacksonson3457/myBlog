// import { client, Content, getAllContents } from "@/libs/client";
// import { DateChange } from "../utils/DateChange";
// import { range } from "@/utils/range";
// import { INITIAL_PER_PAGE } from "@/constants/Number";
// import { Pagination } from "@/components/Pagination";
// import Link from "next/link";
// import ExportedImage from "next-image-export-optimizer";

// export async function generateStaticParams() {
//   const data = await getAllContents();
//   const paths = range(1, Math.ceil(data.length / INITIAL_PER_PAGE)).map(
//     (num) => ({ blog: `${num}` })
//   );
//   return paths;
// }

// type Props = {
//   params: { blog: string };
// };

// export default async function BlogPage({ params }: Props) {
//   const { blog } = params;
//   const pageNumber = parseInt(blog, 10);
//   const PER_PAGE_LIMIT = INITIAL_PER_PAGE * pageNumber;
//   const PER_PAGE_OFFSET = PER_PAGE_LIMIT - INITIAL_PER_PAGE;
//   const data = await getAllContents();
//   if (!data || data.length === 0) {
//     return <div>ブログがありません</div>;
//   }
//   const listData = data.slice(PER_PAGE_OFFSET, PER_PAGE_LIMIT);
//   // console.log(listData);

//   return (
//     <div className="flex flex-col w-full min-h-screen items-center justify-center">
//       <p className="text-3xl font-bold">ブログ一覧</p>
//       <ul className="flex flex-col w-full sm:max-w-[850px] mt-24">
//         {listData.map((post: Content) => {
//           return (
//             <li key={post.id} className="my-4 mx-4 border-b pb-5 pt-10">
//               <Link
//                 href={`/${post.id}`}
//                 prefetch={false}
//                 className="flex flex-col sm:flex-row items-center"
//               >
//                 <ExportedImage
//                   src={post.thumbnail.url}
//                   alt="blogimage"
//                   width={150}
//                   height={150}
//                   style={{
//                     objectFit: "contain",
//                     borderRadius: 12,
//                   }}
//                 />
//                 <div className="flex flex-col w-full max-w-[620px] sm:ml-5">
//                   <DateChange date={post.publishedAt!} />
//                   <p className="truncate mt-4 text-xl">{post.title}</p>
//                 </div>
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//       <Pagination totalCount={data.length} />
//     </div>
//   );
// }
