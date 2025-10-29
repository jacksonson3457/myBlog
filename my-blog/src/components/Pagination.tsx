import Link from "next/link";
import { range } from "@/utils/range";

type PaginationProps = {
  totalCount: number;
};

// ページネーションを生成
export const Pagination = ({ totalCount }: PaginationProps) => {
  return (
    <ul className="flex flex-wrap">
      {range(1, totalCount).map((number, index) => {
        return (
          <li key={index} className="mx-2">
            <Link href={`/blog/page/${number}`} prefetch={false}>
              {number}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
