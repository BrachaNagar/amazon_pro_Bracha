function checkTextVisibility(text) {
  cy.contains(text).should('be.visible');
}

function checkPageLinks(href) {
  cy.get(`a[href=${href}]`).should('exist');
}

function checkSideBarLinks(text) {
  cy.contains('a', text).should('exist');
}

describe('Task1 customer service test', () => {
  beforeEach(() => {
    cy.visit('https://www.amazon.com');
    cy.get('#nav-link-accountList').click();
    cy.get('#ap_email').type('BBBNNN2023@YAHOO.COM');
    cy.get('#continue').click();
    cy.get('#ap_password').type('BBBNNN2023');
    cy.get('#signInSubmit').click();
  });

  it('Home page main manu', () => {
    //Check text visibility
    checkTextVisibility("Today's Deals");
    checkTextVisibility('Customer Service');
    checkTextVisibility('Gift Cards');
    cy.get('#nav-main').should('contain', 'Registry');
    checkTextVisibility('Sell');

    //Enter customer service section
    cy.get('#nav-hamburger-menu').click();
    cy.get('#hmenu-content').within(() => {
      cy.contains('Customer Service').click();
    });
    cy.url().should('include', '/gp/help/customer');

    //Enter track package section
    cy.get('.help-topics-list-wrapper').within(() => {
      cy.contains("Where's my stuff").click();
    });
    cy.get('.fs-match-card-detail')
      .contains('Track your package')
      .click({ force: true });
  });

  it('Track your package page', () => {
    cy.visit(
      'https://www.amazon.com/gp/help/customer/display.html/ref=hp_ais_gt_wms_typ?nodeId=GENAFPTNLHV7ZACW'
    );
    //Check the search
    cy.get('#helpsearch').type('orders');
    cy.get('#help_srch_sggst').should('not.have.css', 'display', 'none');
    //Check the 'YOUR ORDERS' link
    checkPageLinks('https://www.amazon.com/yourorders');
    //Check the video exist
    cy.get('.vidContainer').should('be.visible');
    //Check the  'Missing Tracking Information' link exist.
    checkPageLinks(
      'https://www.amazon.com/gp/help/customer/display.html?nodeId=G6ZFEB9ZDU7QHMER'
    );

    //Check the ' Late Deliveries' link exist
    checkPageLinks(
      'https://www.amazon.com/gp/help/customer/display.html?nodeId=GL669SSDXFCJ2ZA6'
    );

    //Check the 'Find a Missing Package That Shows as Delivered' link exist
    checkPageLinks(
      'https://www.amazon.com/gp/help/customer/display.html?nodeId=GCU8BWGTQNJKQEBS'
    );

    //Check the 'Carrier Contact Information' link exist
    checkPageLinks(
      'https://www.amazon.com/gp/help/customer/display.html?nodeId=GBPEXEXYULHB5WCH'
    );

    //Check the 'Was this information helpful?' component
    cy.get('#a-autoid-1 > .a-button-inner > .a-button-input')
      .click()
      .wait(3000);
    cy.contains('Thank you for your feedback.');
    cy.reload();
    cy.get('#a-autoid-2 > .a-button-inner > .a-button-input')
      .click()
      .wait(3000);
    cy.get('#hmd-ReasonBox > .a-box-inner').first().click();
    cy.get('#a-autoid-3').click();
    cy.contains(
      "Thanks! While we're unable to respond directly to your feedback, we'll use this information to improve our online Help."
    );
  });

  it("Where's My Stuff? sidebar links", () => {
    cy.visit(
      'https://www.amazon.com/gp/help/customer/display.html/ref=hp_ais_gt_wms_typ?nodeId=GENAFPTNLHV7ZACW'
    );
    //Ckeck 'Find a Missing Item from Your Package' link exist
    checkSideBarLinks('Find a Missing Item from Your Package');
    //Check 'Find a Missing Package That Shows As Delivered' link exist
    checkSideBarLinks('Missing Package That Shows As Delivered');
    //Check 'Carrier Contact Information' link exist
    checkSideBarLinks('Carrier Contact Information');
    //Check 'Tracking Doesn't Match Carrier's Website' link exist
    checkSideBarLinks("Tracking Doesn't Match Carrier's Website");
    //Check 'Missing Tracking Information' link exist
    checkSideBarLinks('Missing Tracking Information');
    //Check 'Undeliverable Packages' link exist
    checkSideBarLinks('Undeliverable Packages');
    //Check 'Late Deliveries' link exist
    checkSideBarLinks('Late Deliveries');
    //Check 'Sign Up for and Manage Shipment Updates via Text for All Orders' link exist
    checkSideBarLinks(
      'Sign Up for and Manage Shipment Updates via Text for All Orders'
    );
    //Check 'Turn Off Shipment Updates via Text for a Specific Package' link exist
    checkSideBarLinks(
      'Turn Off Shipment Updates via Text for a Specific Package'
    );
    //Check 'Amazon Shipment Updates via Text Updates Terms and Conditions' link exist
    checkSideBarLinks(
      'Amazon Shipment Updates via Text Updates Terms and Conditions'
    );
  });

  it('Quick solutions sidebar links', () => {
    cy.visit(
      'https://www.amazon.com/gp/help/customer/display.html/ref=hp_ais_gt_wms_typ?nodeId=GENAFPTNLHV7ZACW'
    );
    //Check 'Your orders' link exist
    checkSideBarLinks('Your Orders	');
    //Ckeck 'Returns & Refunds' link exist
    checkSideBarLinks('Returns & Refunds	');
    //Ckeck 'Manage Prime' link exist
    checkSideBarLinks('Manage Prime');
    //Ckeck 'Payment Settings' link exist
    checkSideBarLinks('Payment Settings');
    //Ckeck 'Carrier Info' link exist
    checkSideBarLinks('Carrier Info');
    //Ckeck 'Account Settings' link exist
    checkSideBarLinks('Account Settings');
  });
});
