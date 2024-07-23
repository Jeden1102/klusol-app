describe("Navigation", () => {
  it("should navigate to the report section", () => {
    cy.visit("http://localhost:3000/");

    cy.get('a[href*="#zglos"]').click({ multiple: true });

    cy.url().should("include", "#zglos");

    cy.get("h2").contains("Zgłoszenie kłusownika");
  });
});

describe("Report form", () => {
  it("should validate form", () => {
    cy.visit("http://localhost:3000/");

    cy.get("form button[type='submit']").click();

    cy.get(".error").should("exist");
  });

  it("should pass validation", () => {
    cy.visit("http://localhost:3000/");

    cy.get(".date-input").click();
    cy.get(".rdp-button_reset").last().click();
    cy.get("form select").select("net", { force: true });
    cy.get("form textarea").type("Testing...");
    cy.get(".autocomplete-container input").type("Warszawa");

    cy.get(".pac-container .pac-item").first().click();

    cy.wait(500);

    cy.get("form button[type='submit']").click();
    cy.get(".error").should("not.exist");
  });
});
