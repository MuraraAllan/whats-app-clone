context('Test upload a file', () => {
  // WEBCAM TESTING
  // CloseUpload 
  // click on camera icon at DefaultActionBar
  // get container at TakePictureWithCam
  // click on x at TakePictureWithCam
  // get element that displays Messages at ActiveChatSessionBody
  // get DefaultActionBar

  // click(getByTestId("DefaultActionBarUploadPicture"))
  // getByTestId("takePictureWithCamContainer)
  // click(getByTestId("takePictureWithCamClose"))
  // getByTestId("ActiveChatSessionBodyMessages")
  // getByTestId("DefaultActionBar")
  describe('Try to upload a file and cancel', () => {
    it('Visit main page and mock file input', () => {
      cy.visit('')
      cy.fixture('testPicture.png').then(fileContent => {
        cy.findByTestId('DefaultActionBarHiddenInputFile').attachFile({
          fileContent: fileContent.toString(),
          fileName: 'testPicture.png',
          mimeType: 'image/png'
        });
      });
    })
    it('click cancel button', () => {
      cy.findByTestId('FileViewerClose').click()
      cy.findByTestId('ActiveChatSessionBodyMessages').should('exist')
      cy.findByTestId('DefaultActionBar').should('exist')
    })
  })

  describe('Finish uploading a file without label', () => {
    it('Visit main page and mock file input', () => {
      cy.visit('')
      cy.fixture('testPicture.png').then(fileContent => {
        cy.findByTestId('DefaultActionBarHiddenInputFile').attachFile({
          fileContent: fileContent.toString(),
          fileName: 'testPicture.png',
          mimeType: 'image/png'
        });
      });
    })
    it('getByText fileName and click on Send button', () => {
      cy.findByText('testPicture.png').should('exist')
      cy.findByTestId('FileUploadLabelActionBarSend').click()
    })

    it('get TextMessageDisplayFile and getByText fileName', () => {
      cy.findByTestId('TextMessageDisplayFile').should('exist')
      cy.findByText('testPicture.png').should('exist')
    })
  })

  describe('Finish uploading a file with label', () => {
    it('Visit main page and mock file input', () => {
      cy.visit('')
      cy.fixture('testPicture.png').then(fileContent => {
        cy.findByTestId('DefaultActionBarHiddenInputFile').attachFile({
          fileContent: fileContent.toString(),
          fileName: 'testPicture.png',
          mimeType: 'image/png'
        });
      });

    })
    it('getByText fileName and click on Send button', () => {
      cy.findByText('testPicture.png').should('exist')
      cy.findByTestId('FileUploadLabelActionBarInput').type('hello world teste 213')
      cy.findByTestId('FileUploadLabelActionBarSend').click()
    })

    it('get TextMessageDisplayFile getByText labelText getByText fileName', () => {
      cy.findByTestId('TextMessageDisplayFile').should('exist')
      cy.findByText('testPicture.png').should('exist')
      cy.findByText('hello world teste 213').should('exist')
    })
  })
})






