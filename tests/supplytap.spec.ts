import {expect, test} from "@playwright/test";

test("creates and approves a fictional reorder", async ({page}) => {
  await page.goto("/");
  await expect(page.getByText("No requests waiting")).toBeVisible();
  await page.getByRole("button", {name:/Prepare/}).click();
  await expect(page.getByText("Awaiting approval")).toBeVisible();
  await page.getByRole("button", {name:"Approve demo order"}).click();
  await expect(page.getByText(/Request marked/)).toContainText("approved");
});

test("validates limits and prevents duplicate requests", async ({page}) => {
  await page.goto("/");
  await page.getByLabel("Packs to request").fill("99");
  await page.getByRole("button", {name:/Prepare/}).click();
  await expect(page.locator("p.error")).toContainText("at most");
  await page.getByLabel("Packs to request").fill("2");
  await page.getByRole("button", {name:/Prepare/}).click();
  await expect(page.getByText("Awaiting approval")).toBeVisible();
  await page.getByRole("button", {name:/Prepare/}).click();
  await expect(page.locator("p.error")).toContainText("already waiting");
});

test("mobile has no horizontal overflow and hold works", async ({page}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-only assertion");
  await page.goto("/");
  const widths = await page.evaluate(() => ({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
  expect(widths.scroll).toBeLessThanOrEqual(widths.client);
  await page.getByRole("button", {name:/Prepare/}).click();
  await page.getByRole("button", {name:"Hold"}).click();
  await expect(page.getByText(/Request marked/)).toContainText("held");
});
