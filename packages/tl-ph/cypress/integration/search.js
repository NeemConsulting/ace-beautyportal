context("Search results tests", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.visit("http://localhost:8000/search-results");
  });

  describe("Search tests", () => {
    it("Looking for search field", () => {
      cy.get(".ais-SearchBox")
        .find("input")
        .type("hair{enter}");
    });
  });
});
