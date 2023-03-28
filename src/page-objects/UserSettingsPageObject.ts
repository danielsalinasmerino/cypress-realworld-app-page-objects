export enum UserSettingsFormFields {
  firstName = "firstName",
  lastName = "lastName",
  email = "email",
  phoneNumber = "phoneNumber",
}

export class UserSettingsPage {
  private pageTitle = cy.get("#user-settings-title");

  private firstNameInput = cy.get("#user-settings-firstName-input");
  private lastNameInput = cy.get("#user-settings-lastName-input");
  private emailInput = cy.get("#user-settings-email-input");
  private phoneNumberInput = cy.get("#user-settings-phoneNumber-input");

  private saveButton = cy.get("#user-settings-save-button");

  /**
   * Given a text, checks that that the page title (an element) has that same text.
   *
   *
   * @param text - The value that we want to check if the page title is
   * @returns Nothing
   *
   */
  public checkPageTitle(text: string) {
    // Why we use a regExp: https://stackoverflow.com/questions/56443963/click-an-exact-match-text-in-cypress
    const regExpText = new RegExp(`^${text}$`, "g");
    this.pageTitle.contains(regExpText);
  }

  /**
   * Types on a field from the form.
   *
   *
   * @param field - The field that we want to type on
   * @param text - The value that we want to type
   * @returns Nothing
   *
   */
  public type(field: UserSettingsFormFields, text: string) {
    this[`${field}Input`].type(text).blur();
  }

  /**
   * Clears a field from the form.
   *
   *
   * @param field - The field that we want to clear
   * @returns Nothing
   *
   */
  public clear(field: UserSettingsFormFields) {
    this[`${field}Input`].clear().blur();
  }

  /**
   * Clears a field from the form and fills it with new text.
   *
   *
   * @param field - The field that we want to clear and fill
   * @param text - The new value that we want for the field
   * @returns Nothing
   *
   */
  public fillField(field: UserSettingsFormFields, text: string) {
    this[`${field}Input`].clear();
    this[`${field}Input`].type(text).blur();
  }

  /**
   * Checks if the error text from a field is visible and is something particular.
   *
   *
   * @param field - The field that we want to get the error text
   * @param text - The text that we want to check (if it is the error text)
   * @returns Nothing
   *
   */
  public checkFieldError(field: UserSettingsFormFields, text: string) {
    // Why we use a regExp: https://stackoverflow.com/questions/56443963/click-an-exact-match-text-in-cypress
    const regExpText = new RegExp(`^${text}$`, "g");
    return cy.get(`#user-settings-${field}-input-helper-text`).should("exist").contains(regExpText);
  }

  /**
   * Clicks on the save button.
   *
   *
   * @params Nothing
   * @returns Nothing
   *
   */
  public clickSaveButton() {
    this.saveButton.click();
  }
}
