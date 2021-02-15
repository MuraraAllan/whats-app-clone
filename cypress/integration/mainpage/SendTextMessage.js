context('send TextMessages', () => {
  describe('send a text message and find it in screen', () => {
    it('Visit main page and fill DefaultActionBarInput', () => {
      cy.visit('')
      cy.findByTestId('DefaultActionBarInput').type('hello world message de teste')
    })
    it('send message', () => {
      cy.findByTestId('DefaultActionBarSend').click()
    })
    it('find message in the screen', () => {
      cy.findByText('hello world message de teste').should('exist')
    })
  })
})