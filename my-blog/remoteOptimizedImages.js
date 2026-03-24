const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || "";
const apiKey = process.env.MICROCMS_API_KEY || "";

module.exports = fetch(`https://${serviceDomain}.microcms.io/api/v1/blogs`, {
  headers: {
    "X-MICROCMS-API-KEY": apiKey,
  },
})
  .then((res) => {
    if (!res.ok) {
      throw new Error(`microCMS fetch failed: ${res.status} ${res.statusText}`);
    }
    return res.json();
  })
  .then((data) =>
    data.contents.map((post) => post.thumbnail?.url).filter(Boolean),
  );
