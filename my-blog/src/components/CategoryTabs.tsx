"use client";

import { Tabs, Tab } from "@mui/material";
import { useRouter } from "next/navigation";
import { Category } from "@/libs/client";

export default function CategoryTabs({
  current,
  categories,
}: {
  current?: string;
  categories: Category[];
}) {
  const router = useRouter();

  // タブクリック時のルーティング
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    const path = (newValue = `/blog/${newValue}/page/1`);
    router.push(path);
  };

  return (
    <Tabs
      value={current || "all"}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      indicatorColor="primary"
      textColor="inherit"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        mb: 4,
        // 背景をテーマに応じて切り替え
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "background.paper" : "grey.100",
      }}
    >
      <Tab
        label="すべて"
        value="all"
        sx={{
          textTransform: "none",
          fontWeight: !current ? "bold" : "normal",
          color: (theme) =>
            theme.palette.mode === "dark"
              ? theme.palette.grey[200]
              : theme.palette.text.primary,
          "&.Mui-selected": {
            color: (theme) => theme.palette.primary.main,
          },
        }}
      />
      {categories.map((cat) => (
        <Tab
          key={cat.id}
          label={cat.name}
          value={cat.name}
          sx={{
            textTransform: "none",
            fontWeight: current === cat.id ? "bold" : "normal",
            color: (theme) =>
              theme.palette.mode === "dark"
                ? theme.palette.grey[400]
                : theme.palette.text.secondary,
            "&.Mui-selected": {
              color: (theme) => theme.palette.primary.main,
            },
          }}
        />
      ))}
    </Tabs>
  );
}
