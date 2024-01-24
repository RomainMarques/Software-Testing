// @ts-check
// [Bug](https://github.com/RomainMarques/Software-Testing-K/issues/3) :
//      Zip code can be not a number or negative
const { test, expect } = require('@playwright/test');
const { PlaywrightHRPage } = require('./Page/PlaywrightHRPage');
const exp = require('constants');


// Fonction pour créer un employé de test avec des données aléatoires
function createTestEmployee() {
  const chars = '0123456789';
  let random = '';
  for (let i = 10; i > 0; --i) random += chars[Math.floor(Math.random() * chars.length)];
  random = random.substring(0, 10);

  return {
    name: 'bug03' + random,
    email: 'bug03' + random + '@email.fr',
    addressLine1: 'bug03' + random,
    addressLine2: 'bug03' + random,
    city: 'bug03' + random,
    zipCode: random,
    jobTitle: 'bug03' + random
  };
}

// Employé de test partagé entre les tests
const testEmployee1 = createTestEmployee();
const testEmployee2 = createTestEmployee();

test('zipCode could no be negative', async ({ page }) => {
  const playwrightHR = new PlaywrightHRPage(page);

  testEmployee1.zipCode = '-1';

  await playwrightHR.addNewEmployee(
    testEmployee1.name,
    testEmployee1.email,
    testEmployee1.addressLine1,
    testEmployee1.addressLine2,
    testEmployee1.city,
    testEmployee1.zipCode,
    '2021-01-01',
    testEmployee1.jobTitle
  );

  await playwrightHR.goToListEmployee();

  await expect(page.getByRole('table')).not.toContainText(testEmployee1.name);
});


test('zipcode with 20+more number should not had a 500 error page', async ({ page }) => {
  const playwrightHR = new PlaywrightHRPage(page);

  testEmployee2.zipCode = '99999999999999999999999999999999999999999999999999999999';

  await playwrightHR.addNewEmployee(
    testEmployee2.name,
    testEmployee2.email,
    testEmployee2.addressLine1,
    testEmployee2.addressLine2,
    testEmployee2.city,
    testEmployee2.zipCode,
    '2021-01-01',
    testEmployee2.jobTitle
  );

  await playwrightHR.goToListEmployee();

  await page.waitForSelector('tbody tr');

  const tableRows = await page.$$('tbody tr');

  const rowCount = await page.evaluate(
    ({ rows, testEmail }) => {
      return rows.filter(row => {
        const textContent = row.textContent || '';
        return textContent.includes(testEmail);
      }).length;
    },
    { rows: tableRows, testEmail: testEmployee2.email }
  );

  expect(rowCount).toBe(1);

});
