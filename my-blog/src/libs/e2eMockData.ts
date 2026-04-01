import type { Category, Content } from "@/libs/client";

const now = "2026-03-31T00:00:00.000Z";

const techCategory: Category = {
  id: "cat-tech",
  name: "Tech",
  createdAt: now,
  updatedAt: now,
  publishedAt: now,
  revisedAt: now,
};

const diaryCategory: Category = {
  id: "cat-diary",
  name: "Diary",
  createdAt: now,
  updatedAt: now,
  publishedAt: now,
  revisedAt: now,
};

const apexCategory: Category = {
  id: "cat-apex",
  name: "APEX",
  createdAt: now,
  updatedAt: now,
  publishedAt: now,
  revisedAt: now,
};

export const E2E_CATEGORIES: Category[] = [techCategory, diaryCategory, apexCategory];

export const E2E_CONTENTS: Content[] = Array.from({ length: 12 }).map(
  (_, index) => {
    const number = index + 1;
    const isApex = number === 12;
    const isTech = number % 2 === 1;
    const category = isApex ? apexCategory : isTech ? techCategory : diaryCategory;
    const suffix = String(number).padStart(2, "0");

    return {
      id: `post-${suffix}`,
      title: isApex ? `APEX キルクリップ ${suffix}` : `${category.name} モック記事 ${suffix}`,
      content: `<p>${category.name} の本文 ${suffix}</p>`,
      contentType: isApex ? "video" : "article",
      youtubeUrl: isApex ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ" : undefined,
      thumbnail: {
        url: "/next.svg",
        width: 512,
        height: 512,
      },
      category,
      author: "E2E Bot",
      evaluation: 5,
      createdAt: `2026-03-${String(number).padStart(2, "0")}T00:00:00.000Z`,
      updatedAt: `2026-03-${String(number).padStart(2, "0")}T00:00:00.000Z`,
      publishedAt: `2026-03-${String(number).padStart(2, "0")}T00:00:00.000Z`,
      revisedAt: `2026-03-${String(number).padStart(2, "0")}T00:00:00.000Z`,
    };
  }
);
