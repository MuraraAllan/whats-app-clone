import { render } from "@testing-library/react"

import { chatSessionsMock } from "../mocks/chatSessions"
import InlineButtonsDisplay from "./InlineButtonsDisplay"
import { MockProviders } from "shared/test-utils"

describe('InlineButtonsDisplay', () => {
  test('expect that all inlineButtons are rendered correctly', () => {
    const toDisplayMessage = chatSessionsMock[1].lastMessage
    const { getByText } = render(
      <MockProviders>
        <InlineButtonsDisplay inlineButtons={toDisplayMessage.inlineButtons} isCurrentUserMessage={false} />
      </MockProviders>
    )
    toDisplayMessage.inlineButtons?.forEach((inlineButton) => {
      expect(getByText(inlineButton.label)).toBeDefined()
    })
  })
  test('expect that all inlineButtons from same user aligned to flex-end', () => {
    const toDisplayMessage = chatSessionsMock[1].lastMessage
    const { getByTestId } = render(
      <MockProviders>
        <InlineButtonsDisplay inlineButtons={toDisplayMessage.inlineButtons} isCurrentUserMessage={true} />
      </MockProviders>
    )
    expect(getByTestId("inlineButtonsGrid")).toHaveStyle('justify-content : flex-end')
  })
})