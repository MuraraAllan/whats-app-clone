context('Try to switch between a ChatSession', () => {
  describe('Switchs Successfully', () => {
    it('Visit main page find testID chatAreaContainer1 and click', () => {
      cy.visit('')
      cy.findByTestId('chatAreaContainer1').click()
    })
    it('find chatAreaContainer1 check for background and findByText participants', () => {
      cy.findByTestId('chatAreaContainer1').should('have.css', 'background-color', 'rgba(128, 128, 128, 0.4)')
      cy.findByText('Eu, Karen, KYC')
    })
  })
})