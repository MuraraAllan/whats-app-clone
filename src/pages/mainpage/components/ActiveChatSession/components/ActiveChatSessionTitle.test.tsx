import { act } from "react-dom/test-utils"
import { render } from "@testing-library/react"

import ActiveChatSessionTitle from "./ActiveChatSessionTitle"
import { MockProviders, useActiveChatSessionMock } from "shared/test-utils"


// expect to find the names of participants and the ActiveChatSession title
// expect that a user which not belongs to this ActiveChatSession can't see user names

describe('ActiveChatSessionTitle', () => {
  test('expect to find the names of participants and the ActiveChatSession title', () => {
    const { getByTestId } = render(
      <MockProviders>
        <ActiveChatSessionTitle />
      </MockProviders>
    )
    expect(getByTestId('activeChatSessionTitleTitle').textContent).toEqual("Sala de chat 2")
    expect(getByTestId('activeChatSessionTitleUsers').textContent).toEqual("Eu, Karen")
  })
  test('expect that a user which not belongs to this ActiveChatSession cant see user names', () => {
    const { mockSetactiveSession, getByTestId } = useActiveChatSessionMock(<ActiveChatSessionTitle />)
    act(() => {
      mockSetactiveSession("3")
    })
    expect(getByTestId('activeChatSessionTitleUsers').textContent).toEqual("You can't see users in this chat session")
  })
})