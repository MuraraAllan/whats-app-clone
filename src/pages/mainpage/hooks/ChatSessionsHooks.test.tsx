import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { useEffect } from 'react';

import { chatSessionsMock } from 'mocks/chatSessions'
import { MockProviders } from 'shared/test-utils'
import { ChatSessions, useChatSession } from './ChatSessionsHooks'
import { useChatSessions } from '.';
import { User } from 'shared/context/LoggedUserContext';

// useChatSessions()
// expect that a dispatched message is included in the chatSessions object
function useChatSessionsMock() {
  const returnChatSessions = {} as ChatSessions
  let addMessageMock = (session_id: string, textMessage: string, user: User) => null

  function TestComponent() {
    const { addMessage, chatSessions } = useChatSessions()

    useEffect(() => {
      Object.assign(returnChatSessions, chatSessions)
      addMessageMock = addMessage as any
    }, [chatSessions, addMessage])

    return null
  }

  render(
    <MockProviders>
      <TestComponent />
    </MockProviders>
  )

  return { returnChatSessions, addMessageMock }
}

describe('useChatSessions', () => {
  test('expect that a addMessage does not add invalid messages', () => {
    const { addMessageMock, returnChatSessions } = useChatSessionsMock()
    act(() => {
      addMessageMock("", "", { user_id: "3333", userName: 'test user' })
    })
    expect(returnChatSessions?.sessions[0].messages?.length ?? "0").toBe(2)
  })
  test('expect that addMessage adds a message', () => {
    const { addMessageMock, returnChatSessions } = useChatSessionsMock()
    act(() => {
      addMessageMock("1", "anything to test", { user_id: "3333", userName: 'test user' })
    })
    expect(returnChatSessions?.sessions[0].messages?.length ?? "0").toBe(3)
  })
})

// useChatSession 
// expect that a rendered component which uses useChatSessions receives the values same as mockSession of that session_id
// expect userBelongToChat to be false when that user does not belong to chatSession participants

function useChatSessionMock(session_id: string) {
  const returnChatSession = {}
  const userBelongs = {} as { belongs: null | boolean }
  function TestComponent() {
    const { chatSession, userBelongsToSession } = useChatSession(session_id)

    useEffect(() => {
      Object.assign(returnChatSession, chatSession)
      Object.assign(userBelongs, { belongs: userBelongsToSession })
    }, [chatSession, userBelongsToSession])

    return null
  }

  render(
    <MockProviders>
      <TestComponent />
    </MockProviders>
  )

  return { returnChatSession, userBelongs }
}

describe('useChatSession', () => {
  test('hook returns all chat session data accuratelly', () => {
    const { returnChatSession, userBelongs } = useChatSessionMock("1")

    expect(returnChatSession).toEqual(chatSessionsMock[0])

    expect(typeof userBelongs.belongs).toBe('boolean')
    expect(userBelongs.belongs).toEqual(true)
  })

  test('userBelongsToSession should be false', () => {
    const { userBelongs } = useChatSessionMock("3")

    expect(typeof userBelongs.belongs).toBe('boolean')
    expect(userBelongs.belongs).toEqual(false)
  })
})

