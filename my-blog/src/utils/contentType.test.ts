import { describe, expect, it } from "vitest";

import { isVideoContent, toContentType } from "./contentType";

describe("contentType", () => {
  it("defaults to article when value is missing", () => {
    expect(toContentType()).toBe("article");
    expect(toContentType("")).toBe("article");
  });

  it("detects video for normalized contentType values", () => {
    expect(isVideoContent("video")).toBe(true);
    expect(isVideoContent(" Video ")).toBe(true);
    expect(isVideoContent(["video"])).toBe(true);
    expect(isVideoContent([])).toBe(false);
    expect(isVideoContent("article")).toBe(false);
    expect(isVideoContent(undefined)).toBe(false);
  });

  it("treats post as video when youtubeUrl exists even without contentType", () => {
    expect(isVideoContent(undefined, "https://www.youtube.com/watch?v=test")).toBe(
      true
    );
  });
});
