const { expect } = require('@playwright/test');

exports.PlaywrightHRPage = class PlaywrightHRPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getAddEmployeeLink = page.locator('a', { hasText: 'Add new employee' });
    this.gettingAddEmployeeHeader = page.locator('h2', { hasText: 'Add new employee' });
    this.getListEmployeeLink = page.locator('a', { hasText: 'List Employees' });
    this.gettingListEmployeeHeader = page.locator('h2', { hasText: 'Employees' });
    this.getListTeamsLink = page.locator('a', { hasText: 'List teams' });
    this.gettingListTeamsHeader = page.locator('h2', { hasText: 'Teams' });
    this.getAddNewTeamLink = page.locator('a', { hasText: 'Create new team' });
    this.gettingAddNewTeamHeader = page.locator('h2', { hasText: 'Create new team' });
    this.gettingResetDBLink = page.locator('a', { hasText: 'Reset database' });
    this.gettingResetDBHeader = page.locator('h2', { hasText: 'Reset Database' });
  }

  async goto() {
    await this.page.goto('https://k.hr.dmerej.info/');
  }

  async verifyVersion(version) {
    await this.goto();
    await expect(this.page.getByRole('contentinfo')).toBeVisible();
    const footerText = await this.page.getByRole('contentinfo').innerText();
    await expect(footerText).toContain(version);
  }

  async goToAddEmployee() {
    this.goto();
    await this.getAddEmployeeLink.first().click();
    await expect(this.gettingAddEmployeeHeader).toBeVisible();
  }

  async goToListEmployee() {
    await this.goto();
    await this.getListEmployeeLink.first().click();
    await expect(this.gettingListEmployeeHeader).toBeVisible();
  }

  async goToListTeams() {
    await this.goto();
    await this.getListTeamsLink.first().click();
    await expect(this.gettingListTeamsHeader).toBeVisible();
  }

  async goToAddNewTeam() {
    await this.goto();
    await this.getAddNewTeamLink.first().click();
    await expect(this.gettingAddNewTeamHeader).toBeVisible();
  }

  async addNewEmployee(name, email, address_line1, address_line2, city, zip_code, hiring_date, job_title) {
    await this.goToAddEmployee();
    await this.page.fill('[name="name"]', name);
    await this.page.fill('[name="email"]', email);
    await this.page.fill('[name="address_line1"]', address_line1);
    await this.page.fill('[name="address_line2"]', address_line2);
    await this.page.fill('[name="city"]', city);
    await this.page.fill('[name="zip_code"]', zip_code);
    await this.page.fill('[name="hiring_date"]', hiring_date);
    await this.page.fill('[name="job_title"]', job_title);

    await this.page.click('button[type="submit"]');
  }

  async addTeam(name) {
    await this.goToAddNewTeam();
    await this.page.fill('[name="name"]', name);
    await this.page.click('button[type="submit"]');
  }

  async resetDB() {
    await this.goto();
    await this.gettingResetDBLink.first().click();
    await expect(this.gettingResetDBHeader).toBeVisible();
    await this.page.click('button[type="submit"]');
  }

};