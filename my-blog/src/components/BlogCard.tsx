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
import { DateChange } from "@/app/utils/DateChange";

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
            src={post.thumbnail.url}
            alt={post.title}
            fill
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
    </Card>
  );
}
