"use client";

import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { Content } from "@/libs/client";
import { DateChange } from "@/components/DateChange";
import { isVideoContent } from "@/utils/contentType";
import { toYouTubeEmbedUrl } from "@/utils/youtube";

type BlogCardProps = {
  post: Content;
  height?: number; // 高さを可変にしたい場合
  width?: string | number; // 横幅調整用
};

export default function BlogCard({
  post,
  height = 160,
  width = "100%",
}: BlogCardProps) {
  const isDev = process.env.NODE_ENV !== "production";
  const isVideo = isVideoContent(post.contentType, post.youtubeUrl);
  const embedUrl = isVideo ? toYouTubeEmbedUrl(post.youtubeUrl) : null;
  const thumbnailSrc = post.thumbnail?.url || "/next.svg";

  return (
    <Card
      key={post.id}
      sx={{
        width,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.14)",
        background:
          "linear-gradient(155deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
        backdropFilter: "blur(3px)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 35px rgba(0,0,0,0.34)",
        },
      }}
    >
      {isVideo ? (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardMedia
            sx={{
              height,
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              overflow: "hidden",
            }}
          >
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={post.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: 0 }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                  color: "rgba(255,255,255,0.72)",
                  background: "rgba(255,255,255,0.05)",
                  px: 2,
                  textAlign: "center",
                }}
              >
                YouTube URLが無効です
              </Box>
            )}
          </CardMedia>
          <CardContent sx={{ flexGrow: 1, width: "100%" }}>
            <DateChange date={post.publishedAt!} />
            <Typography
              variant="subtitle1"
              sx={{
                mt: 1.2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                color: "#f3f3ef",
                fontWeight: 600,
                letterSpacing: "0.01em",
              }}
            >
              {post.title}
            </Typography>
          </CardContent>
        </Box>
      ) : (
        <CardActionArea
          component={Link}
          href={`/blog/post/${post.id}`}
          prefetch={false}
          sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <CardMedia
            sx={{
              height,
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              overflow: "hidden",
            }}
          >
            <ExportedImage
              src={thumbnailSrc}
              alt={post.title}
              placeholder="empty"
              unoptimized={isDev}
              fill
              sizes="(max-width: 768px) 92vw, (max-width: 1200px) 48vw, 32vw"
              style={{
                objectFit: "cover",
                transform: "scale(1.01)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(13,14,15,0.66) 0%, transparent 70%)",
              }}
            />
          </CardMedia>
          <CardContent sx={{ flexGrow: 1, width: "100%" }}>
            <DateChange date={post.publishedAt!} />
            <Typography
              variant="subtitle1"
              sx={{
                mt: 1.2,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                color: "#f3f3ef",
                fontWeight: 600,
                letterSpacing: "0.01em",
              }}
            >
              {post.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      )}
    </Card>
  );
}
