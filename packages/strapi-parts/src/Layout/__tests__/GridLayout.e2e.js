const { test } = require('@playwright/test');
const { checkA11y, injectAxe } = require('axe-playwright');

test.describe('GridLayout', () => {
  test('triggers axe on the document', async ({ page }) => {
    await page.goto('/iframe.html?id=design-system-components-gridlayout--base&viewMode=story');

    await injectAxe(page);
    await checkA11y(page);
  });
});
