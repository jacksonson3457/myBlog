import {
  Content,
  getAllContents,
  getCategoryList,
  getPageData,
} from "@/libs/client";
import { DateChange } from "../../../../utils/DateChange";
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
import { range } from "@/utils/range";
import CategoryTabs from "@/components/CategoryTabs";

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
    <div
      className="flex flex-col w-full min-h-screen items-center pb-10"
      style={{ paddingTop: "80px" }}
    >
      <CategoryTabs current={category} categories={categoryList}></CategoryTabs>
      <Container maxWidth="lg">
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
          {listData.map((post: Content) => {
            return (
              <Card
                key={post.id}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardActionArea
                  component={Link}
                  href={`/blog/post/${post.id}`}
                  prefetch={false}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        pointerEvents: "none",
                        zIndex: 1,
                      },
                    },
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      width: "100%",
                      height: 200,
                      position: "relative",
                    }}
                  >
                    <ExportedImage
                      src={post.thumbnail.url}
                      alt="blogimage"
                      fill
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </CardMedia>
                  <CardContent sx={{ flexGrow: 1, width: "100%" }}>
                    <DateChange date={post.publishedAt!} />
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        mt: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {post.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>
      </Container>
      <Pagination totalCount={data.totalCount} />
    </div>
  );
}
