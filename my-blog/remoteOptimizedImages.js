const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || "";
const apiKey = process.env.MICROCMS_API_KEY || "";

const LIMIT = 100;

async function fetchBlogs(offset = 0) {
  // URLSearchParamsはグローバルクラス
  const query = new URLSearchParams({
    orders: "-publishedAt",
    limit: String(LIMIT),
    offset: String(offset),
    fields: "thumbnail",
  });

  const res = await fetch(
    `https://${serviceDomain}.microcms.io/api/v1/blogs?${query.toString()}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": apiKey,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`microCMS fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

module.exports = (async () => {
  const thumbnails = new Set();
  let offset = 0;
  let totalCount = 0;

  do {
    const data = await fetchBlogs(offset);
    totalCount = data.totalCount || 0;

    (data.contents || []).forEach((post) => {
      if (post?.thumbnail?.url) thumbnails.add(post.thumbnail.url);
    });

    offset += LIMIT;
  } while (offset < totalCount);

  return Array.from(thumbnails);
})();
