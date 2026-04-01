const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
]);

const extractVideoIdFromPath = (hostname: string, pathname: string): string | null => {
  if (hostname === "youtu.be") {
    return pathname.split("/").filter(Boolean)[0] ?? null;
  }

  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "embed" && segments[1]) {
    return segments[1];
  }
  if (segments[0] === "shorts" && segments[1]) {
    return segments[1];
  }

  return null;
};

export const toYouTubeEmbedUrl = (input?: string): string | null => {
  if (!input) return null;

  try {
    const url = new URL(input);
    const hostname = url.hostname.toLowerCase();

    if (!YOUTUBE_HOSTS.has(hostname)) return null;

    const fromQuery = url.searchParams.get("v");
    const fromPath = extractVideoIdFromPath(hostname, url.pathname);
    const videoId = fromQuery ?? fromPath;

    if (!videoId) return null;

    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return null;
  }
};
