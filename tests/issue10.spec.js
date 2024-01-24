// @ts-check
// [Bug](https://github.com/RomainMarques/Software-Testing-K/issues/10) : When you delete a team, its employees are deleted too
const { test, expect } = require('@playwright/test');
const { PlaywrightHRPage } = require('./Page/PlaywrightHRPage');

// create an employee, add him to a team, delete the team, check if the employee is deleted

test('employee is added', async ({ page }) => {
    const playwrightHR = new PlaywrightHRPage(page);

    await playwrightHR.addNewEmployee('John Doe', 'john.doe@email.fr', '32 avenue de la république', 'Adress Line 2', 'Paris', '75001', '2021-01-01', 'Software Engineer');

    await playwrightHR.goToListEmployee();
    await expect(page.getByRole('table')).toContainText('John Doe');
    await expect(page.getByRole('table')).toContainText('john.doe@email.fr');
});

test('team is added', async ({ page }) => {
    const playwrightHR = new PlaywrightHRPage(page);

    await playwrightHR.addTeam('Team 1');

    await expect(page.url()).toBe('https://k.hr.dmerej.info/teams');
    await playwrightHR.goToListTeams();
    await expect(page.getByRole('table')).toContainText('Team 1');
});

test('employee is added to team', async ({ page }) => {
    const playwrightHR = new PlaywrightHRPage(page);

    const teamName = 'Team 1'

    await playwrightHR.addEmployeeToTeam('John Doe', teamName);

    await expect(page.locator('text=John Doe')).toBeVisible();
    await playwrightHR.goToListTeams();
    const test = await page.locator('tr:has-text("' + teamName + '")').first();
    await test.locator('text=View members').click();
    await expect(page.locator('text=John Doe')).toBeVisible();
});

/*test('team is deleted', async ({ page }) => {
    const playwrightHR = new PlaywrightHRPage(page);
  
    await playwrightHR.deleteTeam('Team 1');
    
    await expect(page.url()).toBe('https://k.hr.dmerej.info/teams');
    await playwrightHR.goToListTeams();
    await expect(page.getByRole('table')).not.toContainText('Team 1');
});

test('employee is not deleted', async ({ page }) => {
    const playwrightHR = new PlaywrightHRPage(page);
  
    await playwrightHR.goToListEmployee();
    await expect(page.getByRole('table')).toContainText('John Doe');
});*/
