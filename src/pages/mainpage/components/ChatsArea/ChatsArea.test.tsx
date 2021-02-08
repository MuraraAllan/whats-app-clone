import TestRenderer from 'react-test-renderer';

import ChatsArea from './ChatsArea'
import { MockProviders } from 'shared/test-utils'


//expect to render x ChatContent being x the amount of userMessages

describe('ChatArea', () => {
  test('expect to render x ChatContent being x the amount of userMessages', () => {
    const root = TestRenderer.create(
      <MockProviders>
        <ChatsArea />
      </MockProviders>
    ).root;
    const element = root.findAllByType("div");
    expect(element.length).toBe(3)
  })
})