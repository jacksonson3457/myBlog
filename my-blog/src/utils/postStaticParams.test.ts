import { describe, expect, it } from "vitest";

import { buildDetailStaticParams } from "./postStaticParams";

describe("buildDetailStaticParams", () => {
  it("excludes video content IDs", () => {
    const params = buildDetailStaticParams([
      { id: "a1", contentType: "article" },
      { id: "v1", contentType: "video" },
      { id: "legacy-1" },
      { id: "v2", youtubeUrl: "https://www.youtube.com/watch?v=abc" },
    ]);

    expect(params).toEqual([{ postId: "a1" }, { postId: "legacy-1" }]);
  });
});
