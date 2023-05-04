describe('Task2 add products', () => {
  beforeEach(() => {
    cy.visit('https://www.amazon.com');
    cy.get('#nav-link-accountList').click();
    cy.get('#ap_email').type('BBBNNN2023@YAHOO.COM');
    cy.get('#continue').click();
    cy.get('#ap_password').type('BBBNNN2023');
    cy.get('#signInSubmit').click().wait(2000);
  });

  afterEach(() => {
    cy.get('.nav-cart').click();
    cy.intercept(' /cart/ref*').as('deleteFromCart');

    cy.get('.sc-list-item-content').each(($element) => {
      // Assuming the delete button has the class 'delete-button'
      // Replace 'delete-button' with the appropriate class or selector for the delete button
      cy.wrap($element)
        .find('.sc-action-delete')
        .click()
        .wait('@deleteFromCart');
    });
  });

  it.only('Search and add Pencil Sharpener', () => {
    cy.visit('https://www.amazon.com');
    cy.get('.nav-search-field ').type(
      'Bostitch Personal Electric Pencil Sharpener, Powerful Stall-Free Motor, High Capacity Shavings Tray,Blue (EPS4-BLUE)'
    );
    cy.get('#nav-search-submit-button').click();
    cy.get('[data-asin="B000MFN1G8"]').click();

    cy.get('#add-to-cart-button').click().wait(3000);
    cy.get('#attach-added-to-cart-message').should('exist');
    cy.get('#attach-accessory-cart-total-string').should(
      'have.text',
      'Cart subtotal (1 item): '
    );

    //Search and add Scissors
    cy.visit(
      'https://www.amazon.com/Scissors-iBayam-Crafting-Scrapbooking-Knitting/dp/B07H3QKN2Z'
    );
    cy.get('#color_name_5').click();
    cy.get('#add-to-cart-button').click();
    cy.get('#attach-added-to-cart-message').should('exist');
    cy.get('#attach-accessory-cart-total-string').should('have.text', '2 item');

    //Check free shipping
    cy.get('.a-alert-content').should(
      'have.text',
      'Please note one or more items in your Cart are not eligible for FREE Shipping'
    );
    cy.get('.a-button-text').contains('Go to Cart').click();
    cy.get('button[data-asin="B000MFN1G8"]').click();
    cy.get('.a-popover-wrapper').find('li').eq(3).click();
    cy.get('.a-alert-content').should(
      'have.text',
      'Part of your order qualifies for FREE Shipping'
    );
  });
});
