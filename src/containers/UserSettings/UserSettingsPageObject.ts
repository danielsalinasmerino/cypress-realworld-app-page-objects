// This is a class that represents the UserSettings page

export class UserSettingsPage {
  private pageTitle = cy.get("#user-settings-title");

  private firstNameInput = cy.get("#user-settings-firstName-input");
  private lastNameInput = cy.get("#user-settings-lastName-input");
  private emailInput = cy.get("#user-settings-email-input");
  private phoneNumberInput = cy.get("#user-settings-phoneNumber-input");

  private saveButton = cy.get("#user-settings-save-button");

  public assertPageTitle(text: string) {
    const regExpText = new RegExp(`^${text}$`, "g");
    this.pageTitle.contains(regExpText);
    return this;
  }

  public typeFirstName(text: string) {
    this.firstNameInput.type(text).blur();
    return this;
  }

  public clearFirstName() {
    this.firstNameInput.clear().blur();
    return this;
  }

  public assertFirstNameError(text: string) {
    const regExpText = new RegExp(`^${text}$`, "g");
    cy.get(`#user-settings-firstName-input-helper-text`).should("exist").contains(regExpText);
    return this;
  }

  public typeLastName(text: string) {
    this.lastNameInput.type(text).blur();
    return this;
  }

  public clearLastName() {
    this.lastNameInput.clear().blur();
    return this;
  }

  public assertLastNameError(text: string) {
    const regExpText = new RegExp(`^${text}$`, "g");
    cy.get(`#user-settings-lastName-input-helper-text`).should("exist").contains(regExpText);
    return this;
  }

  public typeEmail(text: string) {
    this.emailInput.type(text).blur();
    return this;
  }

  public clearEmail() {
    this.emailInput.clear().blur();
    return this;
  }

  public assertEmailError(text: string) {
    const regExpText = new RegExp(`^${text}$`, "g");
    cy.get(`#user-settings-email-input-helper-text`).should("exist").contains(regExpText);
    return this;
  }

  public typePhoneNumber(text: string) {
    this.phoneNumberInput.type(text).blur();
    return this;
  }

  public clearPhoneNumber() {
    this.phoneNumberInput.clear().blur();
    return this;
  }

  public assertPhoneNumberError(text: string) {
    const regExpText = new RegExp(`^${text}$`, "g");
    cy.get(`#user-settings-phoneNumber-input-helper-text`).should("exist").contains(regExpText);
    return this;
  }

  public clickSaveButton() {
    this.saveButton.click();
    return this;
  }
}
