describe("Homepage Test", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
  });
  it("Checks to see if you all the components are visible.", () => {
    cy.get('[data-cy="power-module"]').children().should("be.visible");
  });
});
