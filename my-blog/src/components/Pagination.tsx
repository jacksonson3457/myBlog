import Link from "next/link";
import { range } from "@/utils/range";

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

  return (
    <ul className="pagination">
      {range(1, totalCount).map((number, index) => {
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
