export class NavDrawerPageComponent {
  private userFullName = cy.get("#sidenav-user-full-name");
  // We could also recover the balance to check it on the test

  private homeButton = cy.get("#sidenav-home");
  private myAccountButton = cy.get("#sidenav-user-settings");
  private bankAccountsButton = cy.get("#sidenav-bankaccounts");
  private notificationsButton = cy.get("#sidenav-notifications");
  private logOutButton = cy.get("#sidenav-logout");

  public fullNameContains(text: string) {
    this.userFullName.contains(text);
    return this;
  }

  public clickHomeButton() {
    this.homeButton.click();
    return this;
  }

  public clickMyAccountButton() {
    this.myAccountButton.click();
    return this;
  }

  public clickBankButton() {
    this.bankAccountsButton.click();
    return this;
  }

  public clickNotificationsButton() {
    this.notificationsButton.click();
    return this;
  }

  public clickLogOutButton() {
    this.logOutButton.click();
    return this;
  }
}
