"use client";

import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { Content } from "@/libs/client";

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
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
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
          }}
        >
          <ExportedImage
            src={post.thumbnail.url}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </CardMedia>
        <CardContent sx={{ flexGrow: 1, width: "100%" }}>
          <Typography
            variant="subtitle1"
            sx={{
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
}
