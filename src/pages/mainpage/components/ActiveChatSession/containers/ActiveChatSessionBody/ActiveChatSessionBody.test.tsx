import { act } from 'react-dom/test-utils'
import { render } from '@testing-library/react'

import { ActiveChatSessionBody } from '.'
import { chatSessionsMock } from 'mocks/chatSessions'
import { MockProviders, useActiveChatSessionMock } from 'shared/test-utils'

// this is mostly an integration test,  this Container bases its behaviors on childrens
// although we are already testing children behaviors, it is good to test the logic on this Container
// lets make sure that both Container and Children does respect their behavior

// expect when ActiveChatSession has a textMessage it renders the textMesage
// expect when ActiveChatSession doesn't have a textMessage but does have inlineButtons they render
// LATER : expect when ActiveChatSession has a textMessage or a file it renders the textMesage
// LATER : expect when ActiveChatSession has an audio it renders the Audio

describe('ActiveChatSessionBody', () => {
  it('expect when ActiveChatSession has a textMessage it renders the textMesage', () => {
    const activeMessage = chatSessionsMock[1].lastMessage
    const { getAllByText } = render(
      <MockProviders>
        <ActiveChatSessionBody />
      </MockProviders>
    )
    // we have \n inside of span so iterate over all nodes and try to find it.
    // by simple finding it is enough, how we render and logical considerations are tested on children
    // we just want to be sure that this propagates as needed
    expect(getAllByText((content, node) => activeMessage.textMessage === node?.textContent)).toBeDefined()
  })
  it("expect when ActiveChatSession doesn't have a textMessage but does have inlineButtons they render", () => {
    const activeMessage = chatSessionsMock[0].lastMessage
    const { mockSetactiveSession, getByText } = useActiveChatSessionMock(<ActiveChatSessionBody />)
    act(() => {
      mockSetactiveSession("1")
    })
    const messageToFind = activeMessage.inlineButtons != null ? activeMessage.inlineButtons[0].label : ""
    expect(getByText(messageToFind)).toBeDefined()
  })
})