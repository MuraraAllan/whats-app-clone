import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { useEffect } from 'react';

import { chatSessionsMock } from 'mocks/chatSessions'
import { MockProviders } from 'shared/test-utils'
import { ChatSessions, ChatSessionType, useChatSession } from './ChatSessionsHooks'
import { useChatSessions } from '.';
import { User } from 'shared/context/LoggedUserContext';
import { ChatSessionContextType } from '../context/ChatSessionsContext';

// useChatSessions()
// expect that a dispatched message is included in the chatSessions object
function useChatSessionsMock() {
  const dispatchers = {} as ChatSessionContextType
  const state = {} as ChatSessions
  function TestComponent() {
    const {
      addMessage,
      addMessageWithFile,
      addMessageWithWebcamPicture,
      addAudioMessage,
      chatSessions
    } = useChatSessions()

    useEffect(() => {
      Object.assign(state, chatSessions)
      Object.assign(dispatchers, {
        addMessage,
        addMessageWithFile,
        addMessageWithWebcamPicture,
        addAudioMessage
      })
    }, [chatSessions, addMessage, addMessageWithFile, addMessageWithWebcamPicture, addAudioMessage])

    return null
  }

  render(
    <MockProviders>
      <TestComponent />
    </MockProviders>
  )

  return { dispatchers, state }
}

describe('useChatSessions', () => {
  test('expect that a addMessage does not add invalid messages', () => {
    const { dispatchers, state } = useChatSessionsMock()
    act(() => {
      dispatchers.addMessage({ session_id: "1", textMessage: null, user: { user_id: "3333", userName: 'test user' } })
    })
    expect(state?.sessions[0].messages?.length ?? "0").toBe(2)
  })
  test('expect that addMessage adds a message', () => {
    const { dispatchers, state } = useChatSessionsMock()
    act(() => {
      dispatchers.addMessage({ session_id: "1", textMessage: "anything to test", user: { user_id: "3333", userName: 'test user' } })
    })
    expect(state?.sessions[0].messages?.length ?? "0").toBe(3)
  })
  test('expect that addMessageWithFile adds a message with File', () => {
    const { dispatchers, state } = useChatSessionsMock()
    act(() => {
      const mockFile = { content: new Blob(), name: 'anymessagewithfiletest' }
      dispatchers.addMessageWithFile({ session_id: "1", textMessage: "anything to test", user: { user_id: "3333", userName: 'test user' }, file: mockFile })
    })
    const lengthOfTestedSessionMessagesArray = state?.sessions[0].messages?.length ?? "0"
    expect(lengthOfTestedSessionMessagesArray).toBe(4)
    const lastMessage = state?.sessions[0].lastMessage
    console.log('last message', lastMessage.file)
    expect(lastMessage).toHaveProperty("file")
  })

  test('expect that addMessageWithWebcamPicture adds a message with Picture', () => {
    const { dispatchers, state } = useChatSessionsMock()
    act(() => {
      const mockFile = { content: new Blob(), name: 'anyfilewebcamtestmessage' }
      dispatchers.addMessageWithWebcamPicture({
        session_id: "1",
        textMessage: "anything to test",
        user: { user_id: "3333", userName: 'test user' },
        picture: mockFile
      })
    })
    const lengthOfTestedSessionMessagesArray = state?.sessions[0].messages?.length ?? "0"
    expect(lengthOfTestedSessionMessagesArray).toBe(5)
    const lastMessage = state?.sessions[0].lastMessage
    expect(lastMessage).toHaveProperty("picture")
  })

  test('expect that addAudioMessage adds a message with Audio', () => {
    const { dispatchers, state } = useChatSessionsMock()
    act(() => {
      const mockFile = { content: new Blob(), name: 'anyaudiotestmessage1' }
      dispatchers.addAudioMessage({
        session_id: "1",
        user: { user_id: "3333", userName: 'test user' },
        audio: mockFile
      })
    })
    const lengthOfTestedSessionMessagesArray = state?.sessions[0].messages?.length ?? "0"
    expect(lengthOfTestedSessionMessagesArray).toBe(6)
    const lastMessage = state?.sessions[0].lastMessage
    expect(lastMessage).toHaveProperty("audio")
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

