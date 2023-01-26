import userEvent from "@testing-library/user-event";

describe("Buy an item", () => {
    it("buys an item", () => {
        cy.visit("/");
        cy.findByRole("img", { name: /poco x4 gt, 8gb\/256gb, black/i }).should("be.visible");
    });
});
