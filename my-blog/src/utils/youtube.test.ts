import { describe, expect, it } from "vitest";

import { toYouTubeEmbedUrl } from "./youtube";

describe("toYouTubeEmbedUrl", () => {
  it("converts watch URL to embed URL", () => {
    expect(toYouTubeEmbedUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    );
  });

  it("converts short URL to embed URL", () => {
    expect(toYouTubeEmbedUrl("https://youtu.be/dQw4w9WgXcQ")).toBe(
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    );
  });

  it("returns null for non-youtube URL or invalid input", () => {
    expect(toYouTubeEmbedUrl("https://example.com/watch?v=dQw4w9WgXcQ")).toBeNull();
    expect(toYouTubeEmbedUrl("not-a-url")).toBeNull();
  });
});
