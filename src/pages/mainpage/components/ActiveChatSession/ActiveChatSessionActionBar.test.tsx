import { act } from "react-dom/test-utils"

import ActiveChatSessionActionBar from "./ActiveChatSessionActionBar"
import { MockProviders, useActiveChatSessionMock } from "shared/test-utils"
import { fireEvent, render } from "@testing-library/react"


// expect that if a user don't belong to ActionBar, it renders blocked;
// expect that sendMessage is called, when the user try to send a message;
// should test if I try to send a message, take a photo or send a file the respective hook is called;
// hooks will be tested individually with forced uploads and not from the components which uses it;
// Capturing files relies on Browser APIs which are third partys and we don't test.

const mockAddMessage = jest.fn()

jest.mock('pages/mainpage/hooks', () => {
  return ({
    useActiveChatSession: () => {
      const { useActiveChatSession } = jest.requireActual('pages/mainpage/hooks')
      return useActiveChatSession()
    },
    useChatSessions: () => ({
      addMessage: mockAddMessage
    })
  })
});

describe('ActiveChatSessionActionBar', () => {
  test("should render blocked when the user doesn't belong to session", () => {
    const { mockSetactiveSession, getByTestId } = useActiveChatSessionMock(<ActiveChatSessionActionBar />)
    act(() => {
      mockSetactiveSession("3")
    })
    expect(getByTestId('activeChatSessionActionBarBlocked')).toBeDefined()
  })
  beforeEach(() => {

  })
  test('should call addMessage when activeChatSessionActionBarSendButton', () => {
    const { getByTestId } = render(
      <MockProviders>
        <ActiveChatSessionActionBar />
      </MockProviders>)
    fireEvent.click(getByTestId('activeChatSessionActionBarSendButton'))
    expect(mockAddMessage).toBeCalled()
  })
})