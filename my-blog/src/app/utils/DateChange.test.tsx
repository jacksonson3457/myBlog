import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { DateChange } from "./DateChange";

describe("DateChange", () => {
  // 日付が空文字なら何も描画しない（null 相当）ことを確認
  it("returns empty markup when date is empty", () => {
    const html = renderToStaticMarkup(<DateChange date="" />);

    expect(html).toBe("");
  });

  // ISO 形式の日付文字列を yyyy/m/d 形式で描画することを確認
  it("renders formatted date with class name", () => {
    const html = renderToStaticMarkup(
      <DateChange date="2025-01-15T12:00:00+09:00" />
    );

    expect(html).toBe('<p class="lux-date">2025/1/15</p>');
  });
});
