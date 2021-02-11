import { render } from "@testing-library/react"

import { MockProviders } from "shared/test-utils"
import { chatSessionsMock } from 'mocks/chatSessions'
import TextMessageDisplay from "./TextMessageDisplay"


// expect when a message textMessage is called we display the textMessage
// expect when a message with inline buttons is called we display the inline buttons
// expect when a message with file arrives it renders TextMessageDisplayFile 
// expect when a message with picture arrives it renders TextMessageDisplayPicture



describe('TextMessageDisplay', () => {
  test('expect when a message with textMessage is called we display the textMessage', () => {
    const toDisplayMessage = chatSessionsMock[1].lastMessage
    const { getByTestId } = render(
      <MockProviders>
        <TextMessageDisplay setFilePreview={() => null} message={toDisplayMessage} isCurrentUserMessage={false} />
      </MockProviders>)
    expect(getByTestId('textMessageDisplay').textContent).toEqual(toDisplayMessage.textMessage)
  })
  test('expect when a message with textMessage and inlineButtons is called we display the textMessage and inlineButtons', () => {
    const toDisplayMessage = chatSessionsMock[1].lastMessage
    const { getByTestId, getByText } = render(
      <MockProviders>
        <TextMessageDisplay setFilePreview={() => null} message={toDisplayMessage} isCurrentUserMessage={false} />
      </MockProviders>)
    expect(getByTestId('textMessageDisplay').textContent).toEqual(toDisplayMessage.textMessage)
    toDisplayMessage.inlineButtons?.forEach((inlineButton) => {
      expect(getByText(inlineButton.label)).toBeDefined()
    })
  })
  it('expect when a message with file arrives it renders TextMessageDisplayFile', () => {

    // create mockFile
    // add new message with file 
    // expect to find data-testid TextMessageDisplayFile
    throw Error('noop')
  })
  it('expect when a message with picture arrives it renders TextMessageDisplayPicture', () => {
    // create mockFile
    // add new message with picture 
    // expect to find data-testid TextMessageDisplayPicture
    throw Error('noop')
  })
  test('expect when a messagefrom mesage.user === user a flex-end alignment is found', () => {
    const toDisplayMessage = chatSessionsMock[1].lastMessage
    const { getByTestId } = render(
      <MockProviders>
        <TextMessageDisplay setFilePreview={() => null} message={toDisplayMessage} isCurrentUserMessage={true} />
      </MockProviders>)
    expect(getByTestId('textMessageDisplayGrid').style["alignItems"]).toContain("flex-end")

  })
})