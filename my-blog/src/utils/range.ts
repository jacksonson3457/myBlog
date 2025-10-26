// startからendまでの配列を生成

import { INITIAL_PER_PAGE } from "@/constants/Number";

// 例：range(1, 5) => [1, 2, 3, 4, 5]
export const range = (start: number, totalCount: number): number[] => {
  const end = Math.ceil(totalCount / INITIAL_PER_PAGE);
  const result = Array.from(
    { length: Math.max(0, end - start + 1) },
    (_, i) => start + i
  );
  return result;
};
