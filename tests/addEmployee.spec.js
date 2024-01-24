// @ts-check
// [Bug](https://github.com/RomainMarques/Software-Testing-K/issues/1) : When we want to edit the hiring date of an employee, the date is not editable.
const { test, expect } = require('@playwright/test');

test('has footer version 1.0.4', async ({ page }) => {
  await page.goto('https://k.hr.dmerej.info/');

  await expect(page.getByRole('contentinfo')).toBeVisible();

  const footerText = await page.getByRole('contentinfo').innerText();

  await expect(footerText).toContain('1.0.4');
});

test('has the "Add new employee" link', async ({ page }) => {
  await page.goto('https://k.hr.dmerej.info/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Add new employee' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Add new employee' })).toBeVisible();
});

test('employee is added', async ({ page }) => {
  await page.goto('https://k.hr.dmerej.info/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Add new employee' }).click();

  await page.fill('[name="name"]', 'John Doe');
  await page.fill('[name="email"]', 'john.doe@dmerej.info');
  await page.fill('[name="address_line1"]', '1 rue de la paix');
  await page.fill('[name="address_line2"]', '75000 Paris');
  await page.fill('[name="city"]', 'Paris');
  await page.fill('[name="zip_code"]', '75000');
  await page.fill('[name="hiring_date"]', '2012-12-12');
  await page.fill('[name="job_title"]', 'Not an Engineer');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('https://k.hr.dmerej.info/employees');
  await expect(page.getByRole('table')).toContainText('John Doe');
  await expect(page.getByRole('table')).toContainText('john.doe@dmerej.info');
});

test("employee's hired date is edited", async ({ page }) => {
  await page.goto('https://k.hr.dmerej.info/employees');

  await page.click('text=Edit'); // there is no importance to choose the same employee because this bug is always present for all employees

  await page.click('text=Update contract');

  await expect(page.getByRole('insertion')).toBeEditable();
});