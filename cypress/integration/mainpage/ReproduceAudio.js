context('reproduce audio, pause and forward it', () => {
  describe('reproduce audio, pause it then forward it', () => {
    it('Visit main page and record 10 seconds audio', () => {
      cy.visit('')
      cy.findByTestId('DefaultActionBarRecordAudio').click()
    })
    it('wait for 4 seconds and press send', () => {
      cy.wait(4000)
      cy.findByTestId('RecordAudioActionBarSend').click()
    })
    it('reproduce the audio for 2 seconds and get current reproducing time status', () => {
      cy.findByTestId('AudioMessageStop').should('not.exist')
      cy.findByTestId('AudioMessagePlay').click()
      cy.wait(1000)
      cy.findByTestId('AudioMessageStop').click()
      cy.findByText('0:01 - 0:04').should('exist')
    })
    it('click on 200 px of AudioMessageTimeControl element and check reproducing time status', () => {
      cy.findByTestId('AudioMessageTimeControl').click(100, 100, { force: true })
      cy.findByText('0:02 - 0:04').should('exist')
    })
  })
})