import { createClient, MicroCMSDate, MicroCMSQueries } from "microcms-js-sdk";
import { E2E_CATEGORIES, E2E_CONTENTS } from "@/libs/e2eMockData";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY || "",
});

// microCMS から取得するデータの型定義
export type Content = {
  id: string;
  title: string;
  content: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  category: Category;
  author: string;
  evaluation: number;
} & MicroCMSDate;

type ApiResponse = {
  contents: Content[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type Category = {
  id: string;
  name: string;
} & MicroCMSDate;

const useE2EMock = process.env.E2E_MOCK === "true";

const sortByPublishedAtDesc = (contents: Content[]) =>
  [...contents].sort((a, b) => {
    return new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime();
  });

const filterContentsByQuery = (contents: Content[], queries?: MicroCMSQueries) => {
  let filtered = sortByPublishedAtDesc(contents);

  const filters = queries?.filters;
  if (filters) {
    const categoryEquals = filters.match(/^category\[equals\](.+)$/);
    if (categoryEquals?.[1]) {
      const categoryId = categoryEquals[1];
      filtered = filtered.filter((content) => content.category.id === categoryId);
    }
  }

  const offset = queries?.offset ?? 0;
  const limit = queries?.limit ?? filtered.length;
  return {
    totalCount: filtered.length,
    contents: filtered.slice(offset, offset + limit),
    offset,
    limit,
  };
};

//全件取得
export const getAllContents = async (): Promise<ApiResponse> => {
  if (useE2EMock) {
    return {
      contents: sortByPublishedAtDesc(E2E_CONTENTS).slice(0, 100),
      totalCount: E2E_CONTENTS.length,
      offset: 0,
      limit: 100,
    };
  }

  const all: ApiResponse = await client.get({
    endpoint: "blogs",
    queries: {
      orders: "-publishedAt",
      limit: 100,
    },
  });

  return all;
};

// ページデータ取得
export const getPageData = async (
  queries?: MicroCMSQueries
): Promise<ApiResponse> => {
  if (useE2EMock) {
    return filterContentsByQuery(E2E_CONTENTS, queries);
  }

  const pageData = await client.get({ endpoint: "blogs", queries: queries });
  return pageData;
};

// 詳細取得
export const getContentDetail = async (
  id: string,
  queries?: MicroCMSQueries
): Promise<Content> => {
  if (useE2EMock) {
    const post = E2E_CONTENTS.find((content) => content.id === id);
    if (!post) {
      throw new Error(`Content not found: ${id}`);
    }
    return post;
  }

  const detailData = await client.getListDetail<Content>({
    endpoint: "blogs",
    contentId: id,
    queries: queries,
  });
  return detailData;
};

//カテゴリーリストを取得
export const getCategoryList = async (): Promise<
  (Category & { count: number })[]
> => {
  if (useE2EMock) {
    return E2E_CATEGORIES.map((category) => ({
      ...category,
      count: E2E_CONTENTS.filter((content) => content.category.id === category.id).length,
    })).filter((category) => category.count > 0);
  }

  const categoryList = await client.get({ endpoint: "categories" });

  // 各カテゴリに紐づく記事数を取得
  const categoryWithCount = await Promise.all(
    categoryList.contents.map(async (cat: Category) => {
      const posts = await client.get({
        endpoint: "blogs",
        queries: {
          filters: `category[equals]${cat.id}`, // ← ここがポイント！
        },
      });

      return {
        ...cat,
        count: posts.totalCount, // microCMSは totalCount を返す
      };
    })
  );

  // 0件カテゴリを除外
  return categoryWithCount.filter((c) => c.count > 0);
};
