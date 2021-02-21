import { act } from "react-dom/test-utils"
import { chatSessionsMock } from "mocks/chatSessions"
import { useActiveChatSessionMock } from "shared/test-utils"

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
    const withUserBelongChatSession = {
      ...chatSessionsMock[0],
      userBelongsToSession: true
    }
    expect(returnChatSession).toEqual(withUserBelongChatSession)
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

  test('useActiveChatSessionsMessages return exact values', () => {
    const { messages, mockSetactiveSession } = useActiveChatSessionMock()

    act(() => {
      mockSetactiveSession("3")
    })

    expect(messages).toEqual(chatSessionsMock[2].messages)
  })

  test('useActiveChatSessionID return exact values', () => {
    const { sessionID, mockSetactiveSession } = useActiveChatSessionMock()

    act(() => {
      mockSetactiveSession("3")
    })
    expect(sessionID?.sess_id).toEqual(chatSessionsMock[2].session_id)

  })
})