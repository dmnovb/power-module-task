describe("Notifications Test", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
  });

  it("Checks if notifications are properly displayed based on voltage and amps.", () => {
    const notificationsContainer = '[data-cy="notifications"]';
    const voltageElement = '[data-cy="voltage"]';
    const ampsElement = '[data-cy="amps"]';

    cy.get(notificationsContainer).should("be.visible");

    cy.get(voltageElement).invoke("text");
    cy.get(ampsElement).invoke("text");

    cy.wait(5000);

    let updatedVoltage: any;
    let updatedAmps: any;
    cy.get(voltageElement).invoke("text");
    cy.get(ampsElement).invoke("text");

    if (updatedVoltage < 18) {
      cy.get(`${notificationsContainer} [style="ampDangerStyle]`).should(
        "be.visible"
      );
      cy.get(`${notificationsContainer} p`).contains("Low Voltage");
    } else {
      cy.get(`${notificationsContainer} [style="ampDangerStyle"]`).should(
        "not.exist"
      );
    }

    if (updatedAmps > 3) {
      cy.get(`${notificationsContainer} [style="ampDangerStyle"]`).should(
        "be.visible"
      );
    } else if (updatedAmps > 2) {
      cy.get(`${notificationsContainer} [style="ampDangerStyle]`).should(
        "be.visible"
      );
    } else {
      cy.get(`${notificationsContainer} [style="ampDangerStyle"]`).should(
        "not.exist"
      );
    }
    cy.wait(5000);

    cy.get(`${notificationsContainer} p`).contains("High Current Draw");

    cy.wait(1000);
    cy.get(`${notificationsContainer} p`).contains(
      "Extremely High Current Draw"
    );
  });
});
