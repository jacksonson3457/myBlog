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
    const path = `/blog/${newValue}/page/1`;
    router.push(path);
  };

  return (
    <Tabs
      value={current || "all"}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      indicatorColor="secondary"
      textColor="inherit"
      sx={{
        width: "100%",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: "999px",
        minHeight: "56px",
        px: 1,
        mb: 4,
        bgcolor: "rgba(255,255,255,0.04)",
        "& .MuiTabs-indicator": {
          height: "100%",
          borderRadius: "999px",
          backgroundColor: "rgba(233, 217, 181, 0.18)",
          zIndex: 0,
        },
      }}
    >
      <Tab
        label="すべて"
        value="all"
        sx={{
          textTransform: "none",
          fontWeight: !current || current === "all" ? "bold" : "normal",
          color: "rgba(255,255,255,0.74)",
          minHeight: "44px",
          zIndex: 1,
          "&.Mui-selected": {
            color: "#f6ebd4",
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
            fontWeight: current === cat.name ? "bold" : "normal",
            color: "rgba(255,255,255,0.6)",
            minHeight: "44px",
            zIndex: 1,
            "&.Mui-selected": {
              color: "#f6ebd4",
            },
          }}
        />
      ))}
    </Tabs>
  );
}
