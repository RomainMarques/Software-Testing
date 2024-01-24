// @ts-check
// [Bug](https://github.com/RomainMarques/Software-Testing-K/issues/1) : When we want to edit the hiring date of an employee, the date is not editable.
const { test, expect } = require('@playwright/test');
const { PlaywrightHRPage } = require('./Page/PlaywrightHRPage');

test('has footer version 1.0.4', async ({ page }) => {
  const playwrightHR = new PlaywrightHRPage(page);

  await playwrightHR.verifyVersion('1.0.4');
});

test('employee is added', async ({ page }) => {
  const playwrightHR = new PlaywrightHRPage(page);

  await playwrightHR.addNewEmployee('John Doe', 'john.doe@email.fr', '32 avenue de la république', 'Adress Line 2', 'Paris', '75001', '2021-01-01', 'Software Engineer');

  await playwrightHR.goToListEmployee();
  await expect(page.getByRole('table')).toContainText('John Doe');
  await expect(page.getByRole('table')).toContainText('john.doe@dmerej.info');
});

test("employee's hired date is edited", async ({ page }) => {
  const playwrightHR = new PlaywrightHRPage(page);

  await playwrightHR.goToListEmployee();

  await page.click('text=Edit'); // there is no importance to choose the same employee because this bug is always present for all employees

  await page.click('text=Update contract');

  await expect(page.getByRole('insertion')).toBeEditable();
});