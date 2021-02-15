// click on Mic button
// expect to have rendered RecordAudioActionBar data-test-id present
// click on RecordAudioActionBarStop data-testid
// expect to not have rendered AudioMessageDisplayObject data-test-id
// expect to not have rendered RecordAudioActionBar

context('Test Microphone Interaction', () => {
  describe('Canceling recording', () => {
    it('Visit main page and click on microphone', () => {
      cy.visit('')
      cy.get('[data-testid=DefaultActionBarRecordAudio]').click()
    })
    it('click on cancel button and expect to that the audio was canceled', () => {
      cy.getByTestID('RecordAudioActionBarStop').click()
      cy.get('AudioMessageDisplayObject').should('not.exist')
      cy.get('[data-testid=RecordAudioActionBar').should('not.exist')
      cy.get('')
    })
  })

})


