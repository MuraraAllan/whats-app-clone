import { fireEvent, render } from "@testing-library/react";
import { MockProviders } from "shared/test-utils";
import ActiveChatSessionActionBar from "../ActiveChatSessionActionBar";

const mockAddMessage = jest.fn()
const mockSetIsTakingPicture = jest.fn()
const mockSetIsRecordingAudio = jest.fn()

jest.mock('pages/mainpage/hooks', () => {
  return ({
    useActiveChatSession: () => {
      const { useActiveChatSession } = jest.requireActual('pages/mainpage/hooks')
      return useActiveChatSession()
    },
    useUploadFileInput: () => {
      const { useUploadFileInput } = jest.requireActual('pages/mainpage/hooks')
      return useUploadFileInput()
    },
    useChatSessions: () => {
      const { useChatSessions } = jest.requireActual('pages/mainpage/hooks')
      return useChatSessions()
    },
    useUploadFile: () => ({
      addMessage: mockAddMessage,
      setIsTakingPicture: mockSetIsTakingPicture,
      setIsRecordingAudio: mockSetIsRecordingAudio
    })
  })
});

describe('DefaultActionBar', () => {
  test('expect to not send message when calling  DefaultActionBarSend with DefaultActionBarInput empty', () => {
    const { getByTestId } = render(
      <MockProviders>
        <ActiveChatSessionActionBar />
      </MockProviders>)

    fireEvent.click(getByTestId('DefaultActionBarSend'))
    expect(mockAddMessage).toBeCalledTimes(0)
  })
  test('should call mockAddMessage when DefaultActionBarSend is clicked', () => {
    const { getByTestId } = render(
      <MockProviders>
        <ActiveChatSessionActionBar />
      </MockProviders>)

    fireEvent.input(getByTestId('DefaultActionBarInput'), { target: { value: '1234teste' } })
    fireEvent.click(getByTestId('DefaultActionBarSend'))
    expect(mockAddMessage).toBeCalled()
  })
  test('should call mockSetIsTakingPicture when DefaultActionBarUploadPicture is clicked', () => {
    const { getByTestId } = render(
      <MockProviders>
        <ActiveChatSessionActionBar />
      </MockProviders>)
    fireEvent.click(getByTestId('DefaultActionBarUploadPicture'))
    expect(mockSetIsTakingPicture).toBeCalled()
  })
  test('should call mockSetIsRecordingAudio when DefaultActionBarRecordAudio is clicked', () => {
    const { getByTestId } = render(
      <MockProviders>
        <ActiveChatSessionActionBar />
      </MockProviders>)
    fireEvent.click(getByTestId('DefaultActionBarRecordAudio'))
    expect(mockSetIsRecordingAudio).toBeCalled()
  })
})