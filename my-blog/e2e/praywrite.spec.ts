import { expect, test } from "@playwright/test";

test.describe("praywrite E2E", () => {
  test("トップページで記事一覧が表示される", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "All Posts" })).toBeVisible();
    await expect(page.getByText("Tech モック記事 11")).toBeVisible();
  });

  test("カテゴリタブで絞り込みページへ遷移できる", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("tab", { name: "Tech" }).click();
    await expect(page).toHaveURL(/\/blog\/Tech\/page\/1$/);
    await expect(page.getByRole("heading", { name: "Tech Posts" })).toBeVisible();
    await expect(page.getByText("Tech モック記事 11")).toBeVisible();
    await expect(page.getByText("Diary モック記事 12")).toHaveCount(0);
  });

  test("ページネーションで2ページ目へ移動できる", async ({ page }) => {
    await page.goto("/blog/all/page/1");

    await page.locator("ul.pagination a", { hasText: "2" }).click();
    await expect(page).toHaveURL(/\/blog\/all\/page\/2$/);
    await expect(page.getByText("Diary モック記事 02")).toBeVisible();
  });

  test("記事詳細に遷移して一覧に戻れる", async ({ page }) => {
    await page.goto("/");

    await page.locator('a[href="/blog/post/post-11"]').first().click();
    await expect(page).toHaveURL(/\/blog\/post\/post-11$/);
    await expect(
      page.getByRole("heading", { name: "Tech モック記事 11" })
    ).toBeVisible();

    await page.getByRole("link", { name: "＜ 一覧へ" }).click();
    await expect(page).toHaveURL("/");
  });
});
