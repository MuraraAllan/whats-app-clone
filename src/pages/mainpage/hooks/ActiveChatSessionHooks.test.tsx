import { act } from "react-dom/test-utils"
import { chatSessionsMock } from "mocks/chatSessions"
import { useActiveChatSessionMock } from "shared/test-utils"



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