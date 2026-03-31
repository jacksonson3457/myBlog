import { Content, getAllContents, getCategoryList } from "@/libs/client";
import { Box } from "@mui/material";
import CategoryTabs from "@/components/CategoryTabs";
import BlogCard from "@/components/BlogCard";

export default async function Home() {
  const data = await getAllContents();
  if (!data || !data.contents || data.contents.length === 0) {
    return <div>ブログがありません</div>;
  }
  const listData = data.contents;

  //categoryリストをmicroCMSから取得
  const categoryList = await getCategoryList();

  return (
    <div className="page-shell">
      <div className="content-wrap">
        <CategoryTabs current="all" categories={categoryList}></CategoryTabs>
      </div>
      <div className="content-wrap section-panel mb-8">
        <h2 className="section-heading">All Posts</h2>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {listData.map((post: Content) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </Box>
      </div>
    </div>
  );
}
