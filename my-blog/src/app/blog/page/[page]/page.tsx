import { client, Content, getAllContents, getPageData } from "@/libs/client";
import { DateChange } from "../../../utils/DateChange";
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

// 各ページのpathを作成
export const generateStaticParams = async () => {
  const repos = await getAllContents();
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  //URLのパラメーターはstringで返す
  return range(1, Math.ceil(repos.totalCount / INITIAL_PER_PAGE)).map(
    (repo) => ({
      page: repo.toString(),
    })
  );
};

export default async function Page({ params }: { params: { page: string } }) {
  const page = Number(params.page);
  const data = await getPageData({
    offset: (page - 1) * INITIAL_PER_PAGE,
    limit: INITIAL_PER_PAGE,
  });
  if (!data || !data.contents || data.contents.length === 0) {
    return <div>ブログがありません</div>;
  }
  const listData = data.contents;

  return (
    <div
      className="flex flex-col w-full min-h-screen items-center pb-10"
      style={{ paddingTop: "80px" }}
    >
      <Typography variant="h3" component="h1" className="font-bold mb-8">
        ブログ一覧
      </Typography>
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
                  href={`/${post.id}`}
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
