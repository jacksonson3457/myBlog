import {
  Content,
  getAllContents,
  getCategoryList,
  getPageData,
} from "@/libs/client";
import { INITIAL_PER_PAGE } from "@/constants/Number";
import { Pagination } from "@/components/Pagination";
import { Box } from "@mui/material";
import { range } from "@/utils/range";
import CategoryTabs from "@/components/CategoryTabs";
import BlogCard from "@/components/BlogCard";

// 各ページのpathを作成
export const generateStaticParams = async () => {
  const repos = await getAllContents();
  const totalCount = repos.totalCount;

  //categoryリストをmicroCMSから取得
  const categoryList = await getCategoryList();

  // 「all」カテゴリを追加
  const allCategories = [{ id: "all", name: "all" }, ...categoryList];

  const paths: { category: string; page: string }[] = [];

  //カテゴリー * ページ数分のパスを作成
  // 例 { id: "a", name: "tech" }, ⇨ /blog/page/1?category=tech
  allCategories.forEach((category) => {
    range(1, totalCount).forEach((page) => {
      paths.push({ category: category.name, page: page.toString() });
    });
  });

  return paths;
};

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; page: string }>;
}) {
  //pathのparamを取得
  const { category, page } = await params;
  const pageNumber = Number(page);

  //category.name ⇨ category.id に変換（idをURLのパスにしない工夫）
  const categoryList = await getCategoryList();
  const categoryId =
    category === "all"
      ? undefined
      : categoryList.find((c) => c.name === category)?.id;

  const offset = (pageNumber - 1) * INITIAL_PER_PAGE;

  // カテゴリ指定があるときだけ filters を追加
  const query = categoryId
    ? {
        offset,
        limit: INITIAL_PER_PAGE,
        filters: `category[equals]${categoryId}`,
        orders: "-publishedAt",
      }
    : {
        offset,
        limit: INITIAL_PER_PAGE,
        orders: "-publishedAt",
      };

  //データ取得API実行
  const data = await getPageData(query);

  if (!data || !data.contents || data.contents.length === 0) {
    return <div>ブログがありません</div>;
  }
  const listData = data.contents;

  return (
    <div className="page-shell">
      <div className="content-wrap">
        <CategoryTabs current={category} categories={categoryList}></CategoryTabs>
      </div>
      <div className="content-wrap section-panel">
        <h2 className="section-heading">
          {category === "all" ? "All Posts" : `${category} Posts`}
        </h2>
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
      <div className="content-wrap mt-6">
        <Pagination
          totalCount={data.totalCount}
          currentPage={pageNumber}
          category={category}
        />
      </div>
    </div>
  );
}
