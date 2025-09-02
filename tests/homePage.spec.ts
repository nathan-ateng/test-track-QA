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
