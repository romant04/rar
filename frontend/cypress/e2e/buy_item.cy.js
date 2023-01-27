describe("Buy an item", () => {
    it("buys an item", () => {
        cy.visit("/");
        // -- login --
        cy.findByRole("button", { name: /přihlásit se/i }).click();
        cy.findByLabelText("Email").type("x@y.cz");
        cy.findByLabelText("Heslo").type("1234");
        cy.findByRole("button", { name: /přihlásit/i }).click();

        // -- search for phone and add to cart --
        cy.findByRole("textbox").type("Iphone");
        cy.findByAltText(/apple iphone 13 mini, 512gb, red/i)
            .should("be.visible")
            .click();
        cy.findByRole("button", { name: /přidat do košíku/i }).click();

        // -- complete purchase --
        cy.findByTestId("ShoppingCartIcon").click();
        cy.findByRole("button", { name: /k pokladně/i }).click();
        cy.findByRole("radio", { name: /ppl - kurýr/i }).click();
        cy.findByRole("radio", { name: /dobírka/i }).click();
        cy.findByLabelText("Jméno a Přijmení").type("Cypress Tester");
        cy.findByLabelText("Email").type("roman.tarnai.04@gmail.com");
        cy.findByLabelText("Stát").type("Czech republic");
        cy.findByLabelText("Město").type("Hrádek nad Nisou");
        cy.findByLabelText("PSČ").type("463 34");
        cy.findByLabelText("Ulice a č.p.").type("Železná 293");
        cy.findByLabelText("Telefon").type("704181784");
        cy.findByRole("checkbox", { name: /Souhlasím s licenčními podmínkami/i }).click();
        cy.findByRole("button", { name: /objednat/i }).click();
    });
});
