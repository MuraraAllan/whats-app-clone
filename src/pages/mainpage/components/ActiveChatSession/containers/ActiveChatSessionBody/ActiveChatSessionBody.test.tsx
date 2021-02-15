import { render } from '@testing-library/react'

import { ActiveChatSessionBody } from '.'
import { chatSessionsMock } from 'mocks/chatSessions'
import { MockProviders } from 'shared/test-utils'

// this is mostly an integration test,  this Container bases its behaviors on childrens
// although we are already testing children behaviors, it is good to test the logic on this Container
// lets make sure that both Container and Children does respect their behavior

// expect when ActiveChatSession has a textMessage it renders the textMesage
// expect when ActiveChatSession doesn't have a textMessage but does have inlineButtons they render
// LATER : expect when ActiveChatSession has a textMessage or a file it renders the textMesage
// LATER : expect when ActiveChatSession has an audio it renders the Audio

// states :
// withFileView (fileView != null will render FileView in view mode)
// displayWebcamTakePicture (takingPicture and notUploadingFile will render TakePictureWithCam)
// uploadingFile (will render FilePreviewer in Send mode)
// displayingTextMessage (defaultState will render TextMessageDisplay)

describe('ActiveChatSessionBody', () => {
  it('expect that withFileView renders FileView', () => {
    // should render ActiveSessionBody and ActiveSessionActionBar and click on buttons to ensure
    //but this would be cover both for and e2e test and so decide between which
  })
  it('expect when displayWebcamTakePicture renders TakePictureWithCam', () => {

  })
  it('expect that when uploadingFile renders FilePreviewer', () => {

  })
  it('expect that when in defaulState renders TextMessageDisplay', () => {

  })
})

describe('ActiveChatSessionBody', () => {
  it('expect when defaultState and a textMessage it renders the textMesage', () => {
    const activeMessage = chatSessionsMock[1].lastMessage
    const { getAllByText } = render(
      <MockProviders>
        <ActiveChatSessionBody />
      </MockProviders>
    )
    // we have \n inside of span so iterate over all nodes and try to find it.
    // by simple finding it is enough, how we render and logical considerations are tested on children
    // we just want to be sure that this propagates as needed
    expect(getAllByText((content, node) => activeMessage.textMessage === node?.textContent)).toBeDefined()
  })
  it('expect when defaultState and an AudioMessage it renders the AudioMessage', () => {

  })

})