import TestRenderer from 'react-test-renderer';
import { MockUserAndActiveSessionProvider } from 'shared/test-utils'
import ChatsArea from './ChatsArea'

//expect to render x ChatContent being x the amount of userMessages

describe('ChatArea', () => {
  test('expect to render x ChatContent being x the amount of userMessages', () => {
    const root = TestRenderer.create(
      <MockUserAndActiveSessionProvider>
        <ChatsArea />
      </MockUserAndActiveSessionProvider>
    ).root;
    const element = root.findAllByType("div");
    expect(element.length).toBe(3)
  })
})