context('Switch to an group chat which user doesnt belong and expect to see only old messages', () => {
  describe("Switchs and can't see participants, can't send message, has disabled in chatAreaContainer3", () => {
    it('Visit main page find testID chatAreaContainer3 click then el.contains disabled ', () => {
      cy.visit('')
      const disabledChatContent = cy.findByTestId('chatAreaContainer3')
      disabledChatContent.click()
      disabledChatContent.contains('disabled')
    })
    it('cant see users in the chat session', () => {
      cy.findByText("You can't see users in this chat session").should('exist')
    })
    it('cant send messages ', () => {
      cy.findByTestId("activeChatSessionActionBarBlocked").should('exist').should('have.css', 'background-color', 'rgba(128, 128, 128, 0.4)')
      cy.findByTestId("DefaultActionBar").should('not.exist')
    })
  })
})