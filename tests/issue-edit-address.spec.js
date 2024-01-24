// @ts-check
// [Bug](https://github.com/RomainMarques/Software-Testing-K/issues/2) : Edit address on an employee not work as intended.
const { test, expect } = require('@playwright/test');
const { PlaywrightHRPage } = require('./Page/PlaywrightHRPage');

test('address_line2 take address_line1 input after retry', async ({ page }) => {
    const playwrightHR = new PlaywrightHRPage(page);
    await playwrightHR.goToListEmployee();

    await page.click('text=Edit'); // go to a random employee detail page
    await page.click('text=Update address'); // go to update address page of the employee

    await expect(page.getByRole('heading')).toContainText('Edit Addres'); // insure that we are on the right page

    // Fill out the 2 address fields with two different values then submit
    await page.fill('[name="address_line1"]', "10 Rue des potiers");
    await page.fill('[name="address_line2"]', "Île de france");
    await page.click('button[type="submit"]');

    await expect(page.getByRole('heading')).toContainText('Edit Employee'); // insure that we went back to the previous page
    await page.click('text=Update address'); // Let's edit the address again

    await page.fill('[name="address_line1"]', "5 Rue des jardiniers"); // Change only the address_line1 this time
    await page.click('button[type="submit"]');

    await expect(page.getByRole('heading')).toContainText('Edit Employee');
    await page.click('text=Update address');

    // The bug should manifest here : the address_line2 field took the value of address_line1 two iterations before
    await expect(page.locator('[name="address_line2"]')).toHaveValue("10 Rue des potiers");
});