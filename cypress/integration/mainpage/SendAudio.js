
context('Test Microphone Interaction', () => {
  // click on Mic button
  // expect to have rendered RecordAudioActionBar data-test-id present
  // click on RecordAudioActionBarStop data-testid
  // expect to not have rendered AudioMessageDisplayObject data-test-id
  // expect to not have rendered RecordAudioActionBar
  describe('Canceling recording', () => {
    it('Visit main page and click on microphone', () => {
      cy.visit('')
      cy.get('[data-testid=DefaultActionBarRecordAudio]').click()
    })
    it('click on cancel button and get defaultActionBar in the screen', () => {
      cy.get('[data-testid=RecordAudioActionBarStop]').click()
      cy.get('[data-testid=AudioMessageDisplayObject]').should('not.exist')
      cy.get('[data-testid=RecordAudioActionBar').should('not.exist')
      cy.get('[data-testid=DefaultActionBar').should('exist')
    })
  })

  describe('try to switch activeSession while recording', () => {
    it('Visit main page and click on microphone and try to switch sessions then search for Eu, Karen', () => {
      cy.visit('')
      cy.get('[data-testid=DefaultActionBarRecordAudio]').click()
      // custom findAllByText for spans
      cy.findByText('Sala de chat 1').click()
      cy.findAllByText((content, node) => node?.textContent.includes('Meu nome é Karen'))
    })
  })
  // RecordAudio
  // click on DefaultActionBarRecordAudio data-testid
  // expect to have rendered RecordAudioActionBar data-test-id present
  // expect to have rendered AudioMessageDisplayObject data-testid
  // click on RecordAudioActionBarFinish data-testid
  // expect have rendered DefaultActionBar data-testid
  describe('Recording valid audio', () => {
    it('Visit main page and click on microphone', () => {
      cy.visit('')
      cy.get('[data-testid=DefaultActionBarRecordAudio]').click()
    })
    it('wait and click Send then get text 0:02 on screen and get AudioMessageDisplayObject on screen ', () => {
      cy.wait(2000)
      cy.get('[data-testid=RecordAudioActionBarSend]').click()
      cy.findByText('0:02').should('exist')
      cy.get('[data-testid=AudioMessageDisplayObject]').should('exist')
      cy.get('[data-testid=RecordAudioActionBar').should('not.exist')
      cy.get('[data-testid=DefaultActionBar').should('exist')
    })
  })
})


