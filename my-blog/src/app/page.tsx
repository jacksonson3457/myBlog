import { Content, getCategoryList, getPageData } from "@/libs/client";
import { DateChange } from "./utils/DateChange";
import { INITIAL_PER_PAGE } from "@/constants/Number";
import { Pagination } from "@/components/Pagination";
import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Container,
} from "@mui/material";
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
    <div
      className="flex flex-col w-full min-h-screen items-center pb-10"
      style={{ paddingTop: "80px" }}
    >
      <CategoryTabs current="all" categories={categoryList}></CategoryTabs>
      {/* allの場合 */}
      <Box
        sx={{
          border: "1px solid #e0e0e0", // 枠線
          borderRadius: 2, // 角を少し丸く
          p: 4, // 内側の余白
          mb: 8, // 下の余白
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)", // ほんのり影（オプション）
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 3,
            fontWeight: 600,
          }}
        >
          最新の投稿
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 3,
            mb: 12,
          }}
        >
          {listData.slice(0, 3).map((post: Content) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </Box>
      </Box>
      {/* カテゴリー別の場合 */}
      {categoryList.map((cat) => (
        <Box
          key={cat.id}
          sx={{
            border: "1px solid #e0e0e0", // 枠線
            borderRadius: 2, // 角を少し丸く
            p: 4, // 内側の余白
            mb: 8, // 下の余白
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)", // ほんのり影（オプション）
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              mb: 3,
              fontWeight: 600,
            }}
          >
            {cat.name}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 3,
              mb: 12,
            }}
          >
            {listData
              .filter((p) => p.category.id === cat.id)
              .slice(0, 3)
              .map((post: Content) => (
                <BlogCard key={post.id} post={post} />
              ))}
          </Box>
        </Box>
      ))}
    </div>
  );
}
