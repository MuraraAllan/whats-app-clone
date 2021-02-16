context('Test take picture with cam and upload Interaction', () => {
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

  describe('Canceling taking', () => {
    it('Visit main page and click on webcam', () => {
      cy.visit('')
      cy.findByTestId('DefaultActionBarUploadPicture').click()
    })
    it('get takePictureWIthCamContainer click on cancel button and get defaultActionBar in the screen', () => {
      cy.findByTestId('takePictureWithCamContainer').should('exist')
      cy.findByTestId('takePictureWithCamClose').click()
      cy.wait(300)
      cy.findByTestId('ActiveChatSessionBodyMessages').should('exist')
      cy.findByTestId('DefaultActionBar').should('exist')
    })
  })

  describe('trying to switch between activeSessions while taking Picture or sending File', () => {
    it('Visit main page and click on webcam', () => {
      cy.visit('')
      cy.findByTestId('DefaultActionBarUploadPicture').click()
      // custom findAllByText for spans
    })
    it('find Sala de chat 1 and click then click on UploadPictureActionBarTakePicture', () => {
      cy.findByText('Sala de chat 1').click()
      cy.findByTestId('takePictureWithCamContainer').should('exist')
      cy.findByTestId('UploadPictureActionBarTakePicture').should('exist')
    })

    it('take the picture and try to switch sessions then find takePictureWithCamContainer', () => {
      cy.findByTestId('UploadPictureActionBarTakePicture').click()
      cy.findByText('Sala de chat 1').click()
      cy.findByTestId('FileViewerIsViewingWebcamFile').should('exist')
    })
  })
  // TakeScreenShotAgain
  // click on camera icon at DefaultActionBar
  // click on big camera icon at UploadPictureActionBar
  // get element that display isViewingWebcamFile at FileViewer
  // click on Tirar Foto Novamente at FileViewer
  // get big camera icon UploadPictureActionBar
  // get container at TakePictureWithCam

  // click(getByTestId("DefaultActionBarUploadPicture"))
  // click(getByTestId("UploadPictureActionBarTakePicture"))
  // getByTestId("FileViewerIsViewingWebcamFile")
  // click(getByTestId("FileViewerTakeScreenShot"))
  // getByTestId("UploadPictureActionBarTakePicture")
  // getByTestId("takePictureWithCamContainer")
  describe('try to take screen shot again', () => {
    it('Visit main page and click on webcam', () => {
      cy.visit('')
      cy.findByTestId('DefaultActionBarUploadPicture').click()
    })
    it('click webcam take picture and them click in Tentar novamente find takePictureWithCamContainer', () => {
      cy.findByTestId('UploadPictureActionBarTakePicture').click()
      cy.findByText('Tirar foto novamente').click()
      cy.findByTestId('takePictureWithCamContainer').should('exist')
      cy.findByTestId('UploadPictureActionBarTakePicture').should('exist')
    })
  })
  // CompleteUploadWithMessage
  // click on camera icon at DefaultActionBar
  // click on big camera icon at UploadPictureActionBar
  // get tire uma foto at FileViewer espere que seja igual a Tire uma foto
  // click on send icon at FileUploadLabelActionBar
  // add label "1234testeUploadPictureWithCam" for the picture at FileUploadLabelActionBar
  // get element that displays pictures at TextMessageDisplay
  // get element by text (label of picture)
  describe('take screen shot without sending a label', () => {
    it('Visit main page and click on webcam', () => {
      cy.visit('')
      cy.findByTestId('DefaultActionBarUploadPicture').click()
    })
    it('click webcam take picture and them click in Send Button', () => {
      cy.findByTestId('UploadPictureActionBarTakePicture').click()
      cy.findByTestId('FileViewerIsViewingWebcamFile').should('exist')
      cy.findByTestId('FileUploadLabelActionBarSend').click()
      cy.findByTestId('TextMessageDisplayPicture').should('exist')
    })
  })
  // CompleteUploadWithOutMessage
  // click on camera icon at DefaultActionBar
  // click on big camera icon at UploadPictureActionBar
  // get tire uma foto at FileViewer espere que seja igual a Tire uma foto
  // click on send icon at FileUploadLabelActionBar
  // add label "1234testeUploadPictureWithCam" for the picture at FileUploadLabelActionBar
  // get element that displays pictures at TextMessageDisplay
  // get element by text (label of picture)
  describe('take screen shot without sending a label', () => {
    it('Visit main page and click on webcam', () => {
      cy.visit('')
      cy.findByTestId('DefaultActionBarUploadPicture').click()
    })
    it('click webcam take picture add a label and them click in Send Button', () => {
      cy.findByTestId('UploadPictureActionBarTakePicture').click()
      cy.findByTestId('FileViewerIsViewingWebcamFile').should('exist')
      cy.findByTestId('FileUploadLabelActionBarInput').type('hello world testing')
      cy.findByTestId('FileUploadLabelActionBarSend').click()
      cy.findByTestId('TextMessageDisplayPicture').should('exist')
      cy.findByText('hello world testing').should('exist')
    })
  })
})






