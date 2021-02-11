import { render } from "@testing-library/react"
import { chatSessionsMock } from "mocks/chatSessions"
import { MockProviders } from "shared/test-utils"
import AudioMessageDisplay from "./AudioMessageDisplay"

describe('AudioMessageDisplay', () => {
  it('expect to find AudioMessageDisplayObject when rendering AudioMessageDisplay with AudioMessage', () => {
    const toDisplayMessage = { ...chatSessionsMock[1].lastMessage } as any
    delete toDisplayMessage.textMessage
    const chunks = [] as Blob[]
    const blob = new Blob(chunks, { 'type': 'audio/ogg' })
    toDisplayMessage.audio = {
      content: blob,
      name: 'lalala'
    }
    global.URL.createObjectURL = jest.fn();
    const { getByTestId, debug } = render(
      <MockProviders>
        <AudioMessageDisplay message={toDisplayMessage} isCurrentUserMessage={true} />
      </MockProviders>)
    console.log('DEBUG', debug())
    expect(getByTestId('AudioMessageDisplayObject')).toBeDefined()

  })
})