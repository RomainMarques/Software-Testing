// @ts-check
// [Bug](https://github.com/RomainMarques/Software-Testing-K/issues/9) : When we want to edit the hiring date of an employee, the date is not editable.
const { test, expect } = require('@playwright/test');
const { PlaywrightHRPage } = require('./Page/PlaywrightHRPage');

test('create team with empty character', async ({ page }) => {
  const playwrightHR = new PlaywrightHRPage(page);

  await playwrightHR.addTeam("‎ ")
  await expect(page.locator('table')).not.toContainText("‎ ");
});

test('clear database', async ({ page }) => {
  const playwrightHR = new PlaywrightHRPage(page);

  await playwrightHR.resetDB();
});

test('create employee with empty character', async ({ page }) => {
  const playwrightHR = new PlaywrightHRPage(page);

  await playwrightHR.addNewEmployee('‎ ', 'john.doe@email.fr', '‎ ',
    '‎ ', '‎ ', '75001', '2021-01-01', '‎ ');
  await expect(page.locator('table')).not.toContainText('‎ ');
});
