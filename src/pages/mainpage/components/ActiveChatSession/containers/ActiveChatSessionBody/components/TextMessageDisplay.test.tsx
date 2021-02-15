import { render } from "@testing-library/react"

import { MockProviders } from "shared/test-utils"
import { chatSessionsMock } from 'mocks/chatSessions'
import TextMessageDisplay from "./TextMessageDisplay"


// expect when a message textMessage is called we display the textMessage
// expect when a message with inline buttons is called we display the inline buttons
// expect when a message with file arrives it renders TextMessageDisplayFile 
// expect when a message with picture arrives it renders TextMessageDisplayPicture
describe('TextMessageDisplay', () => {
  test('expect when a message with textMessage is called we display the textMessage', () => {
    const toDisplayMessage = chatSessionsMock[1].lastMessage
    const { getByTestId } = render(
      <MockProviders>
        <TextMessageDisplay setFileView={() => null} message={toDisplayMessage} isCurrentUserMessage={false} />
      </MockProviders>)
    expect(getByTestId('textMessageDisplay').textContent).toEqual(toDisplayMessage.textMessage)
  })
  test('expect when a message with textMessage and inlineButtons is called we display the textMessage and inlineButtons', () => {
    const toDisplayMessage = chatSessionsMock[1].lastMessage
    const { getByTestId, getByText } = render(
      <MockProviders>
        <TextMessageDisplay setFileView={() => null} message={toDisplayMessage} isCurrentUserMessage={false} />
      </MockProviders>)
    expect(getByTestId('textMessageDisplay').textContent).toEqual(toDisplayMessage.textMessage)
    toDisplayMessage.inlineButtons?.forEach((inlineButton) => {
      expect(getByText(inlineButton.label)).toBeDefined()
    })
  })
  it('expect when a message with file arrives it renders TextMessageDisplayFile', () => {
    // 
    // create mockFile
    // add new message with file 
    // expect to find data-testid TextMessageDisplayFile
    const toDisplayMessage = { ...chatSessionsMock[1].lastMessage } as any
    delete toDisplayMessage.textMessage
    const chunks = [] as Blob[]
    const blob = new Blob(chunks, { 'type': 'application/vnd.ms-excel' })
    toDisplayMessage.file = {
      content: blob,
      name: 'arquivoDeTesteExcel.xls'
    }
    global.URL.createObjectURL = jest.fn();
    const { getByTestId, getByText } = render(
      <MockProviders>
        <TextMessageDisplay setFileView={() => null} message={toDisplayMessage} isCurrentUserMessage={false} />
      </MockProviders>)
    expect(getByTestId('TextMessageDisplayFile')).toBeDefined()
    expect(getByText('arquivoDeTesteExcel.xls')).toBeDefined()
  })
  it('expect when a message with picture arrives it renders TextMessageDisplayPicture', () => {
    const toDisplayMessage = { ...chatSessionsMock[1].lastMessage } as any
    delete toDisplayMessage.textMessage
    const chunks = [] as Blob[]
    const blob = new Blob(chunks, { 'type': 'image/jpeg' })
    toDisplayMessage.picture = {
      content: blob,
      name: 'lalala'
    }
    global.URL.createObjectURL = jest.fn();
    const { getByTestId } = render(
      <MockProviders>
        <TextMessageDisplay setFileView={() => null} message={toDisplayMessage} isCurrentUserMessage={false} />
      </MockProviders>)
    expect(getByTestId('TextMessageDisplayPicture')).toBeDefined()
  })
  test('expect when a messagefrom mesage.user === user a flex-end alignment is found', () => {
    const toDisplayMessage = chatSessionsMock[1].lastMessage
    const { getByTestId } = render(
      <MockProviders>
        <TextMessageDisplay setFileView={() => null} message={toDisplayMessage} isCurrentUserMessage={true} />
      </MockProviders>)
    const sentMessage = getByTestId(`textMessageDisplayGrid${toDisplayMessage.message_id}`).className.includes('flex-end')
    expect(sentMessage).toBe(true)

  })
})