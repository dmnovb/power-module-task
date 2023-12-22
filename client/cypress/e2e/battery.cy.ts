describe("Voltage Test", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/");
  });

  it("Checks to see if voltage is updating.", () => {
    const voltage = '[data-cy="voltage"]';

    cy.get(voltage)
      .should("be.visible")
      .invoke("text")
      .then(() => {
        const numIterations = 8;
        const intervalDuration = 1000;

        //iterates through all the amps to see if all values exist

        for (let i = 0; i < numIterations; i++) {
          cy.wait(intervalDuration);

          cy.get(voltage)
            .should("be.visible")
            .invoke("text")
            .then((currentValue) => {
              cy.log(`Iteration ${i + 1}: Current Voltage - ${currentValue}`);
            });
        }
      });
  });
});
