import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { useEffect } from 'react';

import { chatSessionsMock } from 'mocks/chatSessions'
import { LoggedUserProvider } from 'shared/context/LoggedUserContext';
import { useActiveChatSessionMock } from 'shared/test-utils';
import { useChatSession } from './ChatSessionsHooks'


// useChatSessions()
// LATER : expect that a dispatched message is included in the chatSessions object


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
    <LoggedUserProvider>
      <TestComponent />
    </LoggedUserProvider>
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

// useActiveChatSession 
// expect activeSession to be register chat (chat 2) by default 
// later : expect activeSession to be register chat (chat 2) by default for unregistered users
// later : expect activeSession to be null for registered users
// expect that after act setActiveSession

// expect userBelongsToActiveSession to be false when that user does not belong to chatSession participants



describe('useActiveChatSession', () => {
  test('hook returns chat 2 by default', () => {
    const { returnChatSession, userBelongs } = useActiveChatSessionMock()

    expect(returnChatSession.session_id).toEqual('2')
    expect(typeof userBelongs.belongs).toBe('boolean')
    expect(userBelongs.belongs).toBe(true)
  })

  test('hook returns active chat session data accuratelly', () => {
    const { returnChatSession, userBelongs, mockSetactiveSession } = useActiveChatSessionMock()

    act(() => {
      mockSetactiveSession("1")
    })

    expect(returnChatSession).toEqual(chatSessionsMock[0])
    expect(typeof userBelongs.belongs).toBe('boolean')
    expect(userBelongs.belongs).toEqual(true)
  })

  test('userBelongsToActiveSession should be false', () => {
    const { userBelongs, mockSetactiveSession } = useActiveChatSessionMock()

    act(() => {
      mockSetactiveSession("3")
    })

    expect(typeof userBelongs.belongs).toBe('boolean')
    expect(userBelongs.belongs).toEqual(false)
  })
})