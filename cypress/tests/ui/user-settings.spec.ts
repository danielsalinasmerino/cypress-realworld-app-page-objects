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

    ["first", "last"].forEach((field) => {
      cy.getBySelLike(`${field}Name-input`).type("Abc").clear().blur();
      cy.get(`#user-settings-${field}Name-input-helper-text`)
        .should("be.visible")
        .and("contain", `Enter a ${field} name`);
    });

    cy.getBySelLike("email-input").type("abc").clear().blur();
    cy.get("#user-settings-email-input-helper-text")
      .should("be.visible")
      .and("contain", "Enter an email address");

    //cy.getBySelLike("email-input").type("abc@bob.").blur();
    userSettingsPage.fillField(UserSettingsFormFields.email, "abc@bob.");
    cy.get("#user-settings-email-input-helper-text")
      .should("be.visible")
      .and("contain", "Must contain a valid email address");

    cy.getBySelLike("phoneNumber-input").type("abc").clear().blur();
    cy.get("#user-settings-phoneNumber-input-helper-text")
      .should("be.visible")
      .and("contain", "Enter a phone number");

    cy.getBySelLike("phoneNumber-input").type("615-555-").blur();
    cy.get("#user-settings-phoneNumber-input-helper-text")
      .should("be.visible")
      .and("contain", "Phone number is not valid");

    cy.getBySelLike("submit").should("be.disabled");
    cy.visualSnapshot("User Settings Form Errors and Submit Disabled");
  });

  it("updates first name, last name, email and phone number", function () {
    const userSettingsPage = new UserSettingsPage();

    userSettingsPage.fillField(UserSettingsFormFields.firstName, "New First Name");
    userSettingsPage.fillField(UserSettingsFormFields.lastName, "New Last Name");
    userSettingsPage.fillField(UserSettingsFormFields.email, "email@email.com");
    userSettingsPage.fillField(UserSettingsFormFields.phoneNumber, "6155551212");

    //cy.getBySelLike("submit").should("not.be.disabled");
    //cy.getBySelLike("submit").click();

    userSettingsPage.clickSaveButton();

    cy.wait("@updateUser").its("response.statusCode").should("equal", 204);

    if (isMobile()) {
      cy.getBySel("sidenav-toggle").click();
    }

    cy.getBySel("sidenav-user-full-name").should("contain", "New First Name");
    cy.visualSnapshot("User Settings Update Profile");
  });
});
