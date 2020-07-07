context("Search results tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000/products-showcase");
  });

  describe("Intro block", () => {
    it("Looking for intro title & description", () => {
      cy.get("main")
        .wait(500)
        .find("section.textblocktypea")
        .should("be.visible")
        .within(() => {
          cy.get("h1")
            .eq(0)
            .should("be.visible");
          cy.get("p")
            .eq(0)
            .should("be.visible");
        });
    });
  });
  describe("Search tests", () => {
    it("Looking for search results", () => {
      cy.get("main")
        .wait(500)
        .find("section.container-results")
        .should("be.visible")
        .within(() => {
          cy.get(".ais-InfiniteHits")
            .should("be.visible")
            .within(() => {
              cy.get(".ais-InfiniteHits-list")
                .should("be.visible")
                .within(() => {
                  cy.get(".ais-InfiniteHits-item")
                    .should("be.visible")
                    .within(() => {
                      cy.get(".hit-image-container")
                        .find("img")
                        .should("be.visible");
                    });
                });
            });
        });
    });
  });
  describe("Filter tests", () => {
    it("Looking for filters", () => {
      cy.get("main")
        .wait(500)
        .find("section.container-filters")
        .should("be.visible")
        .within(() => {
          cy.get(".ais-RefinementList")
            .should("be.visible")
            .within(() => {
              cy.get("ul")
                .should("be.visible")
                .within(() => {
                  cy.get(".ais-RefinementList-item")
                    .should("be.visible")
                    .within(() => {
                      cy.get(".ais-RefinementList-label")
                        .first()
                        .find("input")
                        .check();
                    });
                });
            });
        });
    });
  });
});
