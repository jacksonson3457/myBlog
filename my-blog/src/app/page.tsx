import { Content, getCategoryList, getPageData } from "@/libs/client";
import { INITIAL_PER_PAGE } from "@/constants/Number";
import { Pagination } from "@/components/Pagination";
import { Box } from "@mui/material";
import CategoryTabs from "@/components/CategoryTabs";
import BlogCard from "@/components/BlogCard";

export default async function Home() {
  const pageNumber = 1;
  const PER_PAGE_LIMIT = INITIAL_PER_PAGE * pageNumber;
  const PER_PAGE_OFFSET = PER_PAGE_LIMIT - INITIAL_PER_PAGE;
  const data = await getPageData({
    offset: PER_PAGE_OFFSET,
    limit: INITIAL_PER_PAGE,
  });
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
      {/* allの場合 */}
      <div className="content-wrap section-panel mb-8">
        <h2 className="section-heading">最新の投稿</h2>
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
          {listData.slice(0, 3).map((post: Content) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </Box>
      </div>
      {/* カテゴリー別の場合 */}
      {categoryList.map((cat) => (
        <div key={cat.id} className="content-wrap section-panel mb-8">
          <h2 className="section-heading">{cat.name}</h2>
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
            {listData
              .filter((p) => p.category.id === cat.id)
              .slice(0, 3)
              .map((post: Content) => (
                <BlogCard key={post.id} post={post} />
              ))}
          </Box>
        </div>
      ))}
      <div className="content-wrap">
        <Pagination totalCount={data.totalCount} currentPage={1} category="all" />
      </div>
    </div>
  );
}
