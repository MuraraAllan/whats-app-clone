import { render } from "@testing-library/react"
import { act } from "react-dom/test-utils"

import { ChatContent, findLastMessageChatPreview } from "./ChatContent"
import { chatSessionsMock } from 'mocks/chatSessions'
import { MockProviders, useActiveChatSessionMock } from "shared/test-utils"

// expect to render a chat session with title, lastMessage and unreadMessagesAmount when user belong to chatSession
// expect to render chat with title, disabled  and unreadMessagesAmount when the user does not belong to chatSession
// expect to render with backgroundColor when current chat is the same as ActiveChatSession

describe('ChatContent.tsx', () => {
  test('should render session with title, lastMessage and unreadMessagesAmount when user belong to chatSession', () => {
    const { getByTestId } = render(
      <MockProviders>
        <ChatContent session_id="2" />
      </MockProviders>
    )

    const sessionToTest = chatSessionsMock[1]
    expect(getByTestId('chatAreaTitle').textContent).toEqual(sessionToTest.title)
    expect(getByTestId('chatAreaLastMessagePreview').textContent).toEqual(findLastMessageChatPreview(sessionToTest.lastMessage))
    // possible bug, remember to analise later in react-testing codebase
    expect(parseInt(getByTestId('chatAreaUnreadMessages').textContent ?? "0")).toEqual(sessionToTest.unreadMessages)
  })

  test('chat with title, disabled  and unreadMessagesAmount when the user does not belong to chatSession', () => {
    const { getByTestId } = render(
      <MockProviders>
        <ChatContent session_id="3" />
      </MockProviders>
    )

    const sessionToTest = chatSessionsMock[2]
    expect(getByTestId('chatAreaTitle').textContent).toEqual(sessionToTest.title)
    expect(getByTestId('chatAreaLastMessagePreview').textContent).toEqual("disabled")
    // possible bug, remember to analise later in react-testing codebase
    expect(parseInt(getByTestId('chatAreaUnreadMessages').textContent ?? "0")).toEqual(sessionToTest.unreadMessages)
  })

  test('render with backgroundColor when current chat is the same as ActiveChatSession', () => {
    const { mockSetactiveSession, getByTestId } = useActiveChatSessionMock(<ChatContent session_id="1" />)
    act(() => {
      mockSetactiveSession("1")
    })
    expect(getByTestId('chatAreaContainer1').style.backgroundColor).toEqual("rgba(128, 128, 128, 0.4)")
  })
})


describe('findLastMessageChatPreview', () => {
  test('expect that a text with \n gets cut on it and add ...', () => {
    const lastMessage = chatSessionsMock[1].lastMessage
    const foundMessage = findLastMessageChatPreview(lastMessage)
    expect(foundMessage).toEqual('Ola, quer ...')
  })

  test('expect that a text without \n renders 10 letters and add ...', () => {
    const chatSession = chatSessionsMock[2]
    chatSession.lastMessage.textMessage = "HELLO TEST MESSAGE 1234"
    const foundMessage = findLastMessageChatPreview(chatSession.lastMessage)
    expect(foundMessage).toEqual("HELLO TEST...")
  })

  test('expect that a message without text grabs first inlineButton label 10 letters  and add ...', () => {
    const chatSession = chatSessionsMock[0]
    const foundMessage = findLastMessageChatPreview(chatSession.lastMessage)
    expect(foundMessage).toEqual("Houve um c...")
  })
})