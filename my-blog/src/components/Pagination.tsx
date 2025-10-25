import { INITIAL_PER_PAGE } from "@/constants/Number";
import Link from "next/link";

type PaginationProps = {
  totalCount: number;
};

// ページネーションを生成
export const Pagination = ({ totalCount }: PaginationProps) => {
  // 1~総ページ数までの配列を生成
  const range = (start: number, end: number) => {
    return Array.from(
      { length: Math.max(0, end - start + 1) },
      (_, i) => start + i
    );
  };

  return (
    <ul className="flex flex-wrap">
      {range(1, Math.ceil(totalCount / INITIAL_PER_PAGE)).map(
        (number, index) => {
          return (
            <li key={index} className="mx-2">
              <Link href={`/blog/page/${number}`} prefetch={false}>
                {number}
              </Link>
            </li>
          );
        }
      )}
    </ul>
  );
};
