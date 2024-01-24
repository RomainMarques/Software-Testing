// @ts-check
// [Bug](https://github.com/RomainMarques/Software-Testing-K/issues/7) :
//    When we want to add a doppeldanger employee, the employee is insert and list twice.
const { test, expect } = require('@playwright/test');
const { PlaywrightHRPage } = require('./Page/PlaywrightHRPage');

test('has footer version 1.0.4', async ({ page }) => {
  const playwrightHR = new PlaywrightHRPage(page);

  await playwrightHR.verifyVersion('1.0.4');
});

test('employee is added twice and is had doppeldanger', async ({ page }) => {
  const playwrightHR = new PlaywrightHRPage(page);

  for (let i = 0; i < 2; i++) {
    await playwrightHR.addNewEmployee(
      'John Doe',
      'john.doe@email.fr',
      '32 avenue de la république',
      'Adress Line 2',
      'Paris',
      '75001',
      '2021-01-01',
      'Software Engineer'
    );
  }

  await playwrightHR.goToListEmployee();
  await expect(page.getByRole('table')).toContainText('John Doe');
  await expect(page.getByRole('table')).toContainText('john.doe@dmerej.info');

  const tableRows = await page.$$('tbody tr');

  const rowCount = await page.evaluate(
    (rows) => {
      return rows.filter(row => {
        const textContent = row.textContent || '';
        return textContent.includes('John Doe') && textContent.includes('john.doe@dmerej.info');
      }).length;
    },
    tableRows
  );

  expect(rowCount).toBe(1);
});
