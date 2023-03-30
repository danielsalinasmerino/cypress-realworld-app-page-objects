import { User } from "../../../src/models";
import { UserSettingsPage } from "../../../src/page-objects/UserSettingsPageObject";

describe("User Settings", function () {
  beforeEach(function () {
    cy.task("db:seed");

    cy.intercept("PATCH", "/users/*").as("updateUser");
    cy.intercept("GET", "/notifications*").as("getNotifications");

    cy.database("find", "users").then((user: User) => {
      cy.loginByXstate(user.username);
    });

    // TODO: Use this in another way, something like SidenavUserPage.click()
    cy.getBySel("sidenav-user-settings").click();
  });

  it("renders the correct page title", function () {
    const userSettingsPage = new UserSettingsPage();

    userSettingsPage.assertPageTitle("User Settings");
  });

  it("should display user setting form errors", function () {
    const userSettingsPage = new UserSettingsPage();

    // First name
    userSettingsPage
      .clearFirstName()
      .typeFirstName("Abc")
      .clearFirstName()
      .assertFirstNameError("Enter a first name");

    // Last name
    userSettingsPage
      .clearLastName()
      .typeLastName("Abc")
      .clearLastName()
      .assertLastNameError("Enter a last name");

    // Email
    userSettingsPage
      .clearEmail()
      .typeEmail("Abc")
      .clearEmail()
      .assertEmailError("Enter an email address")
      .clearEmail()
      .typeEmail("abc@bob.")
      .assertEmailError("Must contain a valid email address");

    // Phone number
    userSettingsPage
      .clearPhoneNumber()
      .typePhoneNumber("Abc")
      .clearPhoneNumber()
      .assertPhoneNumberError("Enter a phone number")
      .clearPhoneNumber()
      .typePhoneNumber("615-555-")
      .assertPhoneNumberError("Phone number is not valid");
  });

  it("updates first name, last name, email and phone number", function () {
    const userSettingsPage = new UserSettingsPage();

    userSettingsPage
      .clearFirstName()
      .typeFirstName("New First Name")
      .clearLastName()
      .typeLastName("New Last Name")
      .clearEmail()
      .typeEmail("email@email.com")
      .clearPhoneNumber()
      .typePhoneNumber("6155551212")
      .clickSaveButton();

    // TODO: Here we should use a SidenavPage, of something like that
    cy.getBySel("sidenav-user-full-name").should("contain", "New First Name");
  });
});
