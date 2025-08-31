import { client } from "@/libs/client";
import Link from "next/link";

type Blog = { id: string; title: string };

export default async function Home() {
  const { contents } = await client.getList<Blog>({ endpoint: "blogs" });

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Blog</h1>
      <ul className="space-y-3">
        {contents.map((post) => (
          <li
            key={post.id}
            className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition"
          >
            <Link href={`post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
