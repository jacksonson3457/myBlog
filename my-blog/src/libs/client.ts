import { createClient, MicroCMSDate, MicroCMSQueries } from "microcms-js-sdk";

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

//全件取得
export const getAllContents = async (): Promise<ApiResponse> => {
  const all: ApiResponse = await client.get({
    endpoint: "blogs",
    queries: {
      orders: "-publishedAt",
    },
  });

  return all;
};

// ページデータ取得
export const getPageData = async (
  queries?: MicroCMSQueries
): Promise<ApiResponse> => {
  const pageData = await client.get({ endpoint: "blogs", queries: queries });
  return pageData;
};

// 詳細取得
export const getContentDetail = async (
  id: string,
  queries?: MicroCMSQueries
): Promise<Content> => {
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
