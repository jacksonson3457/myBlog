type ContentType = "article" | "video";
type ContentTypeInput = string | string[] | undefined;

const toSingleString = (value?: ContentTypeInput): string => {
  if (Array.isArray(value)) {
    if (value.length > 0) {
      return value[0] ?? "";
    }
    return "";
  }
  return value ?? "";
};

export const toContentType = (contentType?: ContentTypeInput): ContentType => {
  const normalized = toSingleString(contentType).trim().toLowerCase();
  return normalized === "video" ? "video" : "article";
};

export const isVideoContent = (
  contentType?: ContentTypeInput,
  youtubeUrl?: string
): boolean => {
  if (toContentType(contentType) === "video") {
    return true;
  }

  return Boolean(youtubeUrl?.trim());
};
