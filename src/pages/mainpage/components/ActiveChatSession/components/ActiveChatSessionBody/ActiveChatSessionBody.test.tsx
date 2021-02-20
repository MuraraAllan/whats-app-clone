import { render } from '@testing-library/react'

import { ActiveChatSessionBody } from '.'
import { chatSessionsMock } from 'mocks/chatSessions'
import { MockProviders } from 'shared/test-utils'

// this is mostly an integration test,  this Container bases its behaviors on childrens
// although we are already testing children behaviors, it is good to test the logic on this Container
// lets make sure that both Container and Children does respect their behavior

describe('ActiveChatSessionBody', () => {
  it('expect when defaultState and a textMessage it renders the textMesage', () => {
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
  it('expect when defaultState and an AudioMessage it renders the AudioMessage', () => {

  })

})