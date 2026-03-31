import { describe, expect, it } from "vitest";

import { range } from "./range";

describe("range", () => {
  // 記事が 0 件のときはページ番号を生成しないことを確認
  it("returns an empty array when totalCount is 0", () => {
    expect(range(1, 0)).toEqual([]);
  });

  // 1ページ内に収まる件数では 1 ページ目のみ返すことを確認
  it("returns one page when totalCount is within one page size", () => {
    expect(range(1, 1)).toEqual([1]);
  });

  // 総件数から算出した最終ページまで連番が返ることを確認
  it("returns all page numbers from start to calculated end page", () => {
    expect(range(1, 21)).toEqual([1, 2, 3]);
  });

  // 開始ページを指定した場合、そのページから連番が始まることを確認
  it("respects start page and returns from that page", () => {
    expect(range(2, 25)).toEqual([2, 3]);
  });

  // 開始ページが最終ページを超えると空配列になることを確認
  it("returns an empty array when start is greater than end page", () => {
    expect(range(4, 25)).toEqual([]);
  });
});
