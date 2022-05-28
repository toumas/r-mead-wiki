import { expect, Locator, Page, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test.describe("Search", () => {
  test("should open search modal", async ({ page }) => {
    await openSearchModal(page);
    const input = await getInput(page);
    expect(input).toBeTruthy();
    expect(await page.url()).toBe("http://localhost:3000/search");
  });
});

test.describe("search modal", () => {
  test("should search based on url search params", async ({ page }) => {
    await page.goto("http://localhost:3000/search/fruit/page/3");
    const firstResult = await page.locator("text='/process/back_sweeten'");
    expect(await firstResult.innerText()).toBe("/process/back_sweeten");
  });

  test("should show results for 'fruit'", async ({ page }) => {
    await openSearchModal(page);
    const input = await getInput(page);
    await input.type("fruit", { delay: 100 });
    const firstResult = await page.locator("text='/guides/fruit'");
    expect(await firstResult.innerText()).toBe("/guides/fruit");
    await page.waitForURL(/\/search\/fruit\/page\/1/);
    expect(page.url()).toBe("http://localhost:3000/search/fruit/page/1");
  });

  test("should show results for 'fruit' after searching again with the same query", async ({ page }) => {
    await openSearchModal(page);
    const input = await getInput(page);
    await input.type("fruit", { delay: 100 });
    const firstResult = await page.locator("text='/guides/fruit'");
    expect(await firstResult.innerText()).toBe("/guides/fruit");
    await page.waitForURL(/\/search\/fruit\/page\/1/);
    expect(page.url()).toBe("http://localhost:3000/search/fruit/page/1");
    await clearInput(page);
    await searchForFruit(page);
    const firstResult2 = await page.locator("text='/guides/fruit'");
    expect(await firstResult.innerText()).toBe("/guides/fruit");
  });

  test("should navigate to the next result page", async ({ page }) => {
    await searchForFruitAndNavigateToNextPage(page);
  });

  test("should show first page of results for 'ben' after searching for 'fruit'", async ({
    page,
  }) => {
    await searchTwoTimes(page);
  });

  test("should go back in history all the way to index", async ({ page }) => {
    await searchTwoTimes(page);
    await page.goBack();
    await page.waitForURL(/search\/fruit\/page\/2/);
    expect(page.url()).toBe("http://localhost:3000/search/fruit/page/2");
    await page.goBack();
    await page.waitForURL(/search\/fruit\/page\/1/);
    expect(page.url()).toBe("http://localhost:3000/search/fruit/page/1");
    await page.goBack();
    await page.waitForURL("http://localhost:3000/search");
    expect(page.url()).toBe("http://localhost:3000/search");
    await page.goBack();
    await page.waitForURL("http://localhost:3000/");
    expect(page.url()).toBe("http://localhost:3000/");
  });

  test("should remain in subpath after searching", async ({ page }) => {
    await page.goto("http://localhost:3000/guides/fruit");
    await openSearchModal(page);
    await searchForFruit(page);
    expect(page.url()).toBe("http://localhost:3000/search/fruit/page/1");
  });

  test("should remain in subpath after searching two times", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/guides/fruit");
    await openSearchModal(page);
    await searchFor(page, "fruit");
    expect(page.url()).toBe("http://localhost:3000/search/fruit/page/1");
    await clearInput(page);
    await searchFor(page, "ben");
    expect(page.url()).toBe("http://localhost:3000/search/ben/page/1");
  });

  test("should go to next page on subpath", async ({ page }) => {
    // Go to http://localhost:3000/
    await page.goto("http://localhost:3000/");
    // Go to http://localhost:3000/guides/fruit
    await page.goto("http://localhost:3000/guides/fruit");
    // Click text=Search
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:3000/search' }*/),
      page.locator("text=Search").click(),
    ]);
    // Fill [placeholder="Search for content"]
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:3000/search/ben/page/1' }*/),
      page.locator('[placeholder="Search for content"]').fill("ben"),
    ]);
    // Click #next
    await Promise.all([
      page.waitForNavigation(/*{ url: 'http://localhost:3000/search/ben/page=2' }*/),
      page.locator("#next").click(),
    ]);

    expect(page.url()).toBe("http://localhost:3000/search/ben/page/2");
  });
});

async function openSearchModal(page: Page) {
  const searchLink = await page.locator("a >> text=search");
  await searchLink.click();
  await page.waitForURL(/\/search/);
}

async function getInput(page: Page): Promise<Locator> {
  return page.locator("[placeholder='Search for content']");
}

async function clearInput(page: Page) {
  const input = await getInput(page);
  await input.click();
  await input.dblclick();
  await input.press("Backspace");
}

async function searchForFruit(page: Page) {
  return searchFor(page, "fruit");
}

async function searchFor(page: Page, query: string) {
  const input = await getInput(page);
  await input.type(query, { delay: 100 });
  await page.waitForURL(new RegExp(`/search/${query}`));
}

async function navigateToNextPage(page: Page) {
  const nextButton = await page.locator("id=next");
  await nextButton.click();
}

async function searchForFruitAndNavigateToNextPage(page: Page) {
  await openSearchModal(page);
  await searchForFruit(page);
  await navigateToNextPage(page);
  await page.waitForURL(/search\/fruit\/page\/2/);
  const firstResult = await page.locator("text='/recipes/other/0002'");
  expect(await firstResult.innerText()).toBe("/recipes/other/0002");
}

async function searchTwoTimes(page: Page) {
  await searchForFruitAndNavigateToNextPage(page);
  await clearInput(page);
  const input = await getInput(page);
  await input.type("ben", { delay: 100 });
  await page.waitForURL(/search\/ben\/page\/1/);
  expect(page.url()).toBe("http://localhost:3000/search/ben/page/1");
  const firstResult = await page.locator("text='/process/bench_trials'");
  expect(await firstResult.innerText()).toBe("/process/bench_trials");
}
