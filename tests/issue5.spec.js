// @ts-check
// [Bug](https://github.com/RomainMarques/Software-Testing-K/issues/5) : When you want to create a team, and in the name field you put just the character space " ", you encounter an internal error 500 when you submit the team name
const { test, expect } = require('@playwright/test');
const { PlaywrightHRPage } = require('./Page/PlaywrightHRPage');

test('team is added', async ({ page }) => {
  const playwrightHR = new PlaywrightHRPage(page);

  await playwrightHR.addTeam(' ');

  await expect(page.url()).toBe('https://k.hr.dmerej.info/teams');
});