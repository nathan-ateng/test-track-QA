import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Verify Live clock is visible and accurate", async ({ page }) => {
  // Get the current time in UTC to match the website's clock.
  const now = new Date();
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();

  // Format minutes to always be two digits (e.g., '05' instead of '5').
  const formattedMinutes = String(utcMinutes).padStart(2, "0");

  // Create a regular expression to match the full string and the dynamic time.
  const expectedTimeRegex = new RegExp(`MISSION TIME: \\s*${utcHours}:${formattedMinutes}.*UTC`);

  // Use the CSS selector from the page. This is a good, stable locator.
  const liveClockElement = page.locator(".text-foreground.text-sm");

  // Assert that the live clock element is visible and contains the correct time.
  await expect(liveClockElement).toHaveText(expectedTimeRegex);
});

test("Verify Pressence Header Texts ", async ({ page }) => {
  // Console Text
  const consoleText = page.locator(".text-primary.text-sm");
  await expect(consoleText).toContainText("CONSOLE 001 READY");

  // Test Track Header Text
  const headerText = page.locator("h1[class='text-4xl sm:text-5xl lg:text-7xl font-black text-primary font-futura tracking-[0.15em] drop-shadow-lg mb-2']");
  await expect(headerText).toHaveText("TEST TRACK");

  //Tagline Text
  const taglineText = page.locator("div[class='text-xs sm:text-sm text-accent tracking-[0.2em] mb-4 font-futura']");
  await expect(taglineText).toHaveText("AUTONOMOUS AGENT TRAINING FACILITY");
});
