// @ts-check
// [Bug](https://github.com/RomainMarques/Software-Testing-K/issues/7) :
//    When we want to add a doppeldanger employee, the employee is insert and list twice.
const { test, expect } = require('@playwright/test');
const { PlaywrightHRPage } = require('./Page/PlaywrightHRPage');

// Fonction pour créer un employé de test avec des données aléatoires
function createTestEmployee() {
  const chars = '0123456789';
  let random = '';
  for (let i = 10; i > 0; --i) random += chars[Math.floor(Math.random() * chars.length)];
  random = random.substring(0, 10);

  return {
    name: 'bug07' + random,
    email: 'bug07' + random + '@email.fr',
    addressLine1: 'bug07' + random,
    addressLine2: 'bug07' + random,
    city: 'bug07' + random,
    zipCode: random,
    jobTitle: 'bug07' + random
  };
}

// Employé de test partagé entre les tests
const testEmployee = createTestEmployee();

test('employee is added twice and no doppledanger', async ({ page }) => {
  const playwrightHR = new PlaywrightHRPage(page);

  for (let i = 0; i < 2; i++) {
    await playwrightHR.addNewEmployee(
      testEmployee.name,
      testEmployee.email,
      testEmployee.addressLine1,
      testEmployee.addressLine2,
      testEmployee.city,
      testEmployee.zipCode,
      '2021-01-01',
      testEmployee.jobTitle
    );
  }

  await playwrightHR.goToListEmployee();
  await expect(page.getByRole('table')).toContainText(testEmployee.name);

  const tableRows = await page.$$('tbody tr');

  const rowCount = await page.evaluate(
    ({ rows, testName, testEmail }) => {
      return rows.filter(row => {
        const textContent = row.textContent || '';
        return textContent.includes(testName) && textContent.includes(testEmail);
      }).length;
    },
    { rows: tableRows, testName: testEmployee.name, testEmail: testEmployee.email }
  );

  expect(rowCount).toBe(1);
});
