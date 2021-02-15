context('view a picture', () => {
  describe('take a picture and view the picture and close the screen', () => {
    it('Visit main page and click on webcam', () => {
      cy.visit('')
      cy.findByTestId('DefaultActionBarUploadPicture').click()
    })
    it('click webcam take picture add a label and them click in Send Button', () => {
      cy.findByTestId('UploadPictureActionBarTakePicture').click()
      cy.findByTestId('FileViewerIsViewingWebcamFile').should('exist')
      cy.findByTestId('FileUploadLabelActionBarInput').type('hello world testing')
      cy.findByTestId('FileUploadLabelActionBarSend').click()
    })
    it('click on picture and click on FileViewerClose ', () => {
      cy.findByTestId('TextMessageDisplayPicture').click()
      cy.findByTestId('DefaultActionBar').should('exist')
      cy.findByTestId('FileViewerClose').click()
      cy.findByTestId('ActiveChatSessionBodyMessages').should('exist')
      cy.findByTestId('DefaultActionBar').should('exist')
    })
  })
})