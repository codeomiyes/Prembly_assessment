// We start by structuring our test suite
describe('Saucedemo Test', function() {

    // This block will run before all tests
    beforeEach(() => {
      // Visit the webpage
      cy.visit('https://www.saucedemo.com/')
    })
  
    it('logs into the site and verifies item sorting', function() {
      // Login process using an example username and password
      cy.get('[data-test=username]').type('standard_user')
      cy.get('[data-test=password]').type('secret_sauce')
      cy.get('.btn_action').click()
  
      // Verify that items are sorted by name A->Z
      cy.get('.product_sort_container').select('az')
      
      // We would iterate through the list of items and assert that they're in order.
      // The logic to implement this is dependent on your DOM structure, but here is a basic example
      cy.get('.inventory_item_name').then(($items) => {
        // Check that the items are sorted in ascending order
        let titles = $items.map((index, html) => Cypress.$(html).text()).get()
        expect(titles).to.deep.equal(titles.slice().sort())
      })
  
      // Change sorting to Z->A
      cy.get('.product_sort_container').select('za')
  
      cy.get('.inventory_item_name').then(($items) => {
        // Check that the items are sorted in descending order
        let titles = $items.map((index, html) => Cypress.$(html).text()).get()
        expect(titles).to.deep.equal(titles.slice().sort().reverse())
      })
    })
  })
  