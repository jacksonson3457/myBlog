import Link from "next/link";
import { range } from "@/utils/range";
import { INITIAL_PER_PAGE } from "@/constants/Number";

type PaginationProps = {
  totalCount: number;
  currentPage?: number;
  category?: string;
};

// ページネーションを生成
export const Pagination = ({
  totalCount,
  currentPage = 1,
  category,
}: PaginationProps) => {
  const hrefBase = category ? `/blog/${category}/page` : "/blog/all/page";
  const totalPages = Math.max(1, Math.ceil(totalCount / INITIAL_PER_PAGE));

  return (
    <ul className="pagination">
      {range(1, totalPages).map((number, index) => {
        return (
          <li key={index}>
            <Link
              href={`${hrefBase}/${number}`}
              prefetch={false}
              className={number === currentPage ? "is-active" : ""}
            >
              {number}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
