import { INITIAL_PER_PAGE } from "@/constants/Number";
import Link from "next/link";
import { range } from "@/utils/range";

type PaginationProps = {
  totalCount: number;
};

// 1~総ページ数までの配列を生成
const contentsPerPage = (totalCount: number) => {
  return range(1, Math.ceil(totalCount / INITIAL_PER_PAGE));
};

// ページネーションを生成
export const Pagination = ({ totalCount }: PaginationProps) => {
  const pageNumbers = contentsPerPage(totalCount);
  return (
    <ul className="flex flex-wrap">
      {pageNumbers.map((number: number, index: number) => {
        return (
          <li key={index} className="mx-2">
            <Link href={`/${number}`} prefetch={false}>
              {number}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
