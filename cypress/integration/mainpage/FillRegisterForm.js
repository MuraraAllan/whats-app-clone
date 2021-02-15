context('Fill register Form', () => {
  describe('try to register and close register screen', () => {
    it('Visit main page and click on Fazer meu cadastro', () => {
      cy.visit('')
      cy.findByText('Fazer meu cadastro').click()
    })
    it('try to register and close register screen', () => {
      cy.findByTestId('RegisteringFormVisualClose').click()
      cy.findByTestId('ActiveChatSessionBodyMessages').should('exist')
      cy.findByTestId('DefaultActionBar').should('exist')
    })
  })

  describe('try to submit form full empty and validate individually', () => {
    it('Visit main page and click on Fazer meu cadastro', () => {
      cy.visit('')
      cy.findByText('Fazer meu cadastro').click()
    })
    it('submit empty form', () => {
      cy.findByTestId('RegisteringFormActionBarSubmit').click()
    })
    it('find RegisteringFormFullname css border is 2px solid rgb(255, 0, 0)', () => {
      cy.findByTestId('RegisteringFormFullname').should('have.css', 'border', '2px solid rgb(255, 0, 0)')
    })
    it('find  RegisteringFormBirthdate css border is 2px solid rgb(255, 0, 0)', () => {
      cy.findByTestId('FormErrorHandlingbirth_date').should('have.css', 'border', '2px solid rgb(255, 0, 0)')
    })
    it('find  RegisteringFormMotherfullname css border is 2px solid rgb(255, 0, 0)', () => {
      cy.findByTestId('RegisteringFormMotherfullname').should('have.css', 'border', '2px solid rgb(255, 0, 0)')
    })
    it('find  RegisteringFormBirthCity css border is 2px solid rgb(255, 0, 0)', () => {
      cy.findByTestId('RegisteringFormBirthCity').should('have.css', 'border', '2px solid rgb(255, 0, 0)')
    })
  })

  describe('try to register with valid values', () => {
    it('Visit main page and click on Fazer meu cadastro', () => {
      cy.visit('')
      cy.findByText('Fazer meu cadastro').click()
    })
    it('fill all values with valid value', () => {
      cy.findByTestId('RegisteringFormCitizenship').select('Argentina')
      cy.findByTestId('RegisteringFormFullname').type('Quialquer nome de teste')
      cy.findByTestId('RegisteringFormMotherfullname').type('Mae qualquer de teste')
      cy.findByTestId('RegisteringFormBirthCity').type('Cidade que não existe')
      cy.findByTestId('RegisteringFormBirthdate').type('2020-01-12')
    })
    it('submit form', () => {
      cy.findByTestId('RegisteringFormActionBarSubmit').click()
    })
    it('find RegisteringFormFullname css border is not 2px solid rgb(255, 0, 0)', () => {
      cy.findByTestId('RegisteringFormFullname').should('not.have.css', 'border', '2px solid rgb(255, 0, 0)')
    })
    it('find  RegisteringFormBirthdate css border is not 2px solid rgb(255, 0, 0)', () => {
      cy.findByTestId('FormErrorHandlingbirth_date').should('not.have.css', 'border', '2px solid rgb(255, 0, 0)')
    })
    it('find  RegisteringFormMotherfullname css border is not 2px solid rgb(255, 0, 0)', () => {
      cy.findByTestId('RegisteringFormMotherfullname').should('not.have.css', 'border', '2px solid rgb(255, 0, 0)')
    })
    it('find  RegisteringFormBirthCity css border is not 2px solid rgb(255, 0, 0)', () => {
      cy.findByTestId('RegisteringFormBirthCity').should('not.have.css', 'border', '2px solid rgb(255, 0, 0)')
    })
  })
})