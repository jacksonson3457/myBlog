import { INITIAL_PER_PAGE } from "@/constants/Number";

/**
 * start から totalCount に基づいてページ数分の配列を生成します。
 *
 * @example
 * // INITIAL_PER_PAGE = 5 の場合
 * range(1, 10) // => [1, 2]
 * range(1, 25) // => [1, 2, 3, 4, 5]
 *
 * @param {number} start - 開始ページ番号（通常は1）
 * @param {number} totalCount - 全記事数（microCMSの totalCount）
 * @returns {number[]} ページ番号の配列
 */
export const range = (start: number, totalCount: number): number[] => {
  const end = Math.ceil(totalCount / INITIAL_PER_PAGE);
  const result = Array.from(
    { length: Math.max(0, end - start + 1) },
    (_, i) => start + i
  );
  return result;
};
