import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await fetch("http://localhost:8081/api/init");
  await page.goto("http://localhost:8080/");

  await page.getByPlaceholder("I am a placeholder...").click();
  await page.getByPlaceholder("I am a placeholder...").fill("Test task 1");
  await page.getByLabel("task-submit-button").click();
  await page.getByPlaceholder("I am a placeholder...").click();
  await page.getByPlaceholder("I am a placeholder...").fill("Test task 2");
  await page.getByLabel("task-submit-button").click();
  await page.getByLabel("complete-button").first().click();
  await page.getByLabel("complete-button").nth(1).click();
  await page.getByLabel("archive-completed-button").click();
  await page.getByRole("textbox").nth(1).click();
  await page.getByRole("textbox").nth(2).click();
  await page.getByPlaceholder("I am a placeholder...").click();
  await page.getByPlaceholder("I am a placeholder...").fill("Test task 3");
  await page.getByLabel("task-submit-button").click();
  await page.getByLabel("edit-button").first().click();
  await page.getByLabel("title-input").first().click();
  await page.getByLabel("title-input").first().fill("Test task 4");
  await page.getByLabel("cancel-button").first().click();
  await page.getByLabel("edit-button").first().click();
  await page.getByLabel("title-input").first().click();
  await page.getByLabel("title-input").first().fill("Test task 4");
  await page.getByLabel("rename-button").first().click();
  await page.getByLabel("archive-button").first().click();
  await page.getByPlaceholder("I am a placeholder...").click();
  await page.getByPlaceholder("I am a placeholder...").fill("Test task 5");
  await page.getByPlaceholder("I am a placeholder...").press("Enter");
  await page.getByLabel("complete-button").first().click();
});
