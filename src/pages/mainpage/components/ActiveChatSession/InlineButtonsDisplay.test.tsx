import { render } from "@testing-library/react"
import { chatSessionsMock } from "mocks/chatSessions"
import { MockUserAndActiveSessionProvider } from "shared/test-utils"
import InlineButtonsDisplay from "./InlineButtonsDisplay"

describe('InlineButtonsDisplay', () => {
  test('expect that all inlineButtons are rendered correctly', () => {
    const toDisplayMessage = chatSessionsMock[1].lastMessage
    const { getByText } = render(
      <MockUserAndActiveSessionProvider>
        <InlineButtonsDisplay inlineButtons={toDisplayMessage.inlineButtons} />
      </MockUserAndActiveSessionProvider>
    )
    toDisplayMessage.inlineButtons?.forEach((inlineButton) => {
      expect(getByText(inlineButton.label)).toBeDefined()
    })
  })
})