import { User } from "../../../src/models";
import { isMobile } from "../../support/utils";
import {
  UserSettingsFormFields,
  UserSettingsPage,
} from "../../../src/page-objects/UserSettingsPageObject";

describe("User Settings", function () {
  beforeEach(function () {
    cy.task("db:seed");

    cy.intercept("PATCH", "/users/*").as("updateUser");
    cy.intercept("GET", "/notifications*").as("getNotifications");

    cy.database("find", "users").then((user: User) => {
      cy.loginByXstate(user.username);
    });

    if (isMobile()) {
      cy.getBySel("sidenav-toggle").click();
    }

    cy.getBySel("sidenav-user-settings").click();
  });

  it("renders the correct title", function () {
    const userSettingsPage = new UserSettingsPage();

    userSettingsPage.checkPageTitle("User Settings");
  });

  it("renders the user settings form", function () {
    cy.wait("@getNotifications");
    cy.getBySel("user-settings-form").should("be.visible");
    cy.location("pathname").should("include", "/user/settings");

    cy.visualSnapshot("User Settings Form");
  });

  it("should display user setting form errors", function () {
    const userSettingsPage = new UserSettingsPage();

    userSettingsPage.fillField(UserSettingsFormFields.firstName, "Abc");
    userSettingsPage.clear(UserSettingsFormFields.firstName);
    userSettingsPage.checkFieldError(UserSettingsFormFields.firstName, "Enter a first name");

    userSettingsPage.fillField(UserSettingsFormFields.lastName, "Abc");
    userSettingsPage.clear(UserSettingsFormFields.lastName);
    userSettingsPage.checkFieldError(UserSettingsFormFields.lastName, "Enter a last name");

    userSettingsPage.fillField(UserSettingsFormFields.email, "abc");
    userSettingsPage.clear(UserSettingsFormFields.email);
    userSettingsPage.checkFieldError(UserSettingsFormFields.email, "Enter an email address");

    userSettingsPage.fillField(UserSettingsFormFields.email, "abc@bob.");
    userSettingsPage.checkFieldError(
      UserSettingsFormFields.email,
      "Must contain a valid email address"
    );

    userSettingsPage.fillField(UserSettingsFormFields.phoneNumber, "abc");
    userSettingsPage.clear(UserSettingsFormFields.phoneNumber);
    userSettingsPage.checkFieldError(UserSettingsFormFields.phoneNumber, "Enter a phone number");

    userSettingsPage.fillField(UserSettingsFormFields.phoneNumber, "615-555-");
    userSettingsPage.checkFieldError(
      UserSettingsFormFields.phoneNumber,
      "Phone number is not valid"
    );
  });

  it("updates first name, last name, email and phone number", function () {
    const userSettingsPage = new UserSettingsPage();

    userSettingsPage.fillField(UserSettingsFormFields.firstName, "New First Name");
    userSettingsPage.fillField(UserSettingsFormFields.lastName, "New Last Name");
    userSettingsPage.fillField(UserSettingsFormFields.email, "email@email.com");
    userSettingsPage.fillField(UserSettingsFormFields.phoneNumber, "6155551212");

    userSettingsPage.clickSaveButton();

    cy.wait("@updateUser").its("response.statusCode").should("equal", 204);

    if (isMobile()) {
      cy.getBySel("sidenav-toggle").click();
    }

    cy.getBySel("sidenav-user-full-name").should("contain", "New First Name");
    cy.visualSnapshot("User Settings Update Profile");
  });
});
