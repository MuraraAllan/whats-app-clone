import { render } from "@testing-library/react"

import { MockProviders } from "shared/test-utils"
import { chatSessionsMock } from 'mocks/chatSessions'
import TextMessageDisplay from "./TextMessageDisplay"


// expect when a message textMessage is called we display the textMessage
// expect when a message with inline buttons is called we display the inline buttons
// LATER : we should also use and adapt thi component to send TextMessages with attachments as photos and files
// LATER : expect that when a file arrives it is displayed before the textMessage in same container

describe('TextMessageDisplay', () => {
  test('expect when a message with textMessage is called we display the textMessage', () => {
    const toDisplayMessage = chatSessionsMock[1].lastMessage
    const { getByTestId } = render(
      <MockProviders>
        <TextMessageDisplay message={toDisplayMessage} isCurrentUserMessage={false} />
      </MockProviders>)
    expect(getByTestId('textMessageDisplay').textContent).toEqual(toDisplayMessage.textMessage)
  })
  test('expect when a message with textMessage and inlineButtons is called we display the textMessage and inlineButtons', () => {
    const toDisplayMessage = chatSessionsMock[1].lastMessage
    const { getByTestId, getByText } = render(
      <MockProviders>
        <TextMessageDisplay message={toDisplayMessage} isCurrentUserMessage={false} />
      </MockProviders>)
    expect(getByTestId('textMessageDisplay').textContent).toEqual(toDisplayMessage.textMessage)
    toDisplayMessage.inlineButtons?.forEach((inlineButton) => {
      expect(getByText(inlineButton.label)).toBeDefined()
    })
  })
  test('expect when a messagefrom mesage.user === user a flex-end alignment is found', () => {
    const toDisplayMessage = chatSessionsMock[1].lastMessage
    const { getByTestId } = render(
      <MockProviders>
        <TextMessageDisplay message={toDisplayMessage} isCurrentUserMessage={true} />
      </MockProviders>)
    expect(getByTestId('textMessageDisplayGrid').style["alignItems"]).toContain("flex-end")

  })
})