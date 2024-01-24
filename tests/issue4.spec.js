// [Bug](https://github.com/RomainMarques/Software-Testing-K/issues/4) : A manager can be promoted to manager again.

const { test, expect } = require('@playwright/test');
const { PlaywrightHRPage } = require('./Page/PlaywrightHRPage');

test('an employee can be promoted to manager', async ({ page }) => {
  const playwrightHR = new PlaywrightHRPage(page);

  await playwrightHR.addNewEmployee('issue4');

  await playwrightHR.goToListEmployee();

  await page.locator('tr:has-text("issue4")').first().locator('text=Edit').click();

  await page.click('text=Promote as manager');

  await page.click('text=Proceed');

  await expect(playwrightHR.gettingListEmployeeHeader).toBeVisible();

  await expect(page.locator('tr:has-text("issue4")').first()).toContainText('yes');
});

test('a manager can not be unpromoted', async ({ page }) => {
  const playwrightHR = new PlaywrightHRPage(page);

  await playwrightHR.goToListEmployee();

  await page.click('text=Edit');

  await page.click('text=Promote as manager');

  await page.click('text=Proceed');

  await expect(page.getByRole('insertion')).toBeDisabled();
});