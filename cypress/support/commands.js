// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "@testing-library/cypress/add-commands";

Cypress.Commands.add("hasNavBar", () => {
  cy.get("nav").should("exist");
  cy.get("nav img").should("have.css", "height", "50px");
  cy.get("nav img").should("have.css", "width", "50px");
  cy.get("nav")
    .contains(/Movies/)
    .then(($el) => {
      if ($el.get(0).nodeName === "A") {
        cy.wrap($el).should("have.attr", "href", "/movies");
      } else {
        cy.wrap($el).parent("a").should("have.attr", "href", "/movies");
      }
    });
  cy.get("nav")
    .contains(/People/)
    .then(($el) => {
      if ($el.get(0).nodeName === "A") {
        cy.wrap($el).should("have.attr", "href", "/people");
      } else {
        cy.wrap($el).parent("a").should("have.attr", "href", "/people");
      }
    });
  cy.get("nav")
    .contains(/Locations/)
    .then(($el) => {
      if ($el.get(0).nodeName === "A") {
        cy.wrap($el).should("have.attr", "href", "/locations");
      } else {
        cy.wrap($el).parent("a").should("have.attr", "href", "/locations");
      }
    });
});
