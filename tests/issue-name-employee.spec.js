// @ts-check
// [Bug](https://github.com/RomainMarques/Software-Testing-K/issues/6) : When we want to edit the hiring date of an employee, the date is not editable.
const { test, expect } = require('@playwright/test');
const { PlaywrightHRPage } = require('./Page/PlaywrightHRPage');

test('create employee with numbers as name', async ({ page }) => {
  const playwrightHR = new PlaywrightHRPage(page);

  await playwrightHR.addNewEmployee('-10', 'john.doe@email.fr', '32 avenue de la république',
    'Adress Line 2', 'Paris', '75001', '2021-01-01', 'Software Engineer');
  await expect(page.locator('table')).not.toContainText('-10');
});
