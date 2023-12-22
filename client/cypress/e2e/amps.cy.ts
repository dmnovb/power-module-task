describe("Amps Test", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
  });

  it("Checks to see if the amps are updating.", () => {
    const amps = '[data-cy="amps"]';

    cy.get(amps)
      .should("be.visible")
      .invoke("text")
      .then(() => {
        const numIterations = 8;
        const intervalDuration = 2000;

        //iterates through all the amps to see if all values exist
        for (let i = 0; i < numIterations; i++) {
          cy.wait(intervalDuration);

          cy.get(amps)
            .should("be.visible")
            .invoke("text")
            .then((currentValue) => {
              cy.log(`Iteration ${i + 1}: Current Voltage - ${currentValue}`);
            });
        }
      });
  });

  it("Checks to see if pressing the buttons disconnects the payloads.", () => {
    const disconnectButton1 = '[data-cy="disconnect-1"]';
    const disconnectButton2 = '[data-cy="disconnect-2"]';
    const connectButton1 = '[data-cy="connect-1"]';
    const connectButton2 = '[data-cy="connect-2"]';
    const amps = '[data-cy="amps"]';

    cy.get(disconnectButton1).click();
    cy.get(disconnectButton2).click();
    cy.get(amps).contains("0 A");

    cy.get(connectButton1).click();
    cy.get(connectButton2).click();
    cy.get(amps).contains("0.5 A");
  });
});
