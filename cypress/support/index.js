// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
declare Cypress as {

}
Cypress.Commands.add('getByLabel', (label) => {
  // you can disable individual command logging
  // by passing {log: false} option to every
  // command inside "getByLabel"
  cy.log('**getByLabel**')
  cy.contains('label', label)
    .invoke('attr', 'for')
    .then((id) => {
      cy.get('#' + id)
    })
})