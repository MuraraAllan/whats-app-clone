import { fireEvent, render } from "@testing-library/react";
import { MockProviders } from "shared/test-utils";
import ActiveChatSessionActionBar from "../ActiveChatSessionActionBar";

const mockFinishMainPageState = jest.fn()
const mocksetMainPageState = jest.fn()

jest.mock('pages/mainpage/hooks', () => {
  return ({
    useMainPageDispatchers: () => ({
      finishMainPageState: mockFinishMainPageState,
      setMainPageState: mocksetMainPageState,
    }),
    useMainPage: () => {
      const { useMainPage } = jest.requireActual('pages/mainpage/hooks')
      return useMainPage()
    },
    useGetMainPageState: () => {
      const { useGetMainPageState } = jest.requireActual('pages/mainpage/hooks')
      return useGetMainPageState()
    },
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

  })
});

describe('DefaultActionBar', () => {
  test('expect to not send message when calling  DefaultActionBarSend with DefaultActionBarInput empty', () => {
    const { getByTestId } = render(
      <MockProviders>
        <ActiveChatSessionActionBar />
      </MockProviders>)

    fireEvent.click(getByTestId('DefaultActionBarSend'))
    expect(mockFinishMainPageState).toBeCalledTimes(0)
  })
  test('should call mockAddMessage when DefaultActionBarSend is clicked', () => {
    const { getByTestId } = render(
      <MockProviders>
        <ActiveChatSessionActionBar />
      </MockProviders>)

    fireEvent.input(getByTestId('DefaultActionBarInput'), { target: { value: '1234teste' } })
    fireEvent.click(getByTestId('DefaultActionBarSend'))
    expect(mockFinishMainPageState).toBeCalled()
  })
  test('should call mockSetIsTakingPicture when DefaultActionBarUploadPicture is clicked', () => {
    const { getByTestId } = render(
      <MockProviders>
        <ActiveChatSessionActionBar />
      </MockProviders>)
    fireEvent.click(getByTestId('DefaultActionBarUploadPicture'))
    expect(mocksetMainPageState).toBeCalled()
  })
  test('should call mockSetIsRecordingAudio when DefaultActionBarRecordAudio is clicked', () => {
    const { getByTestId } = render(
      <MockProviders>
        <ActiveChatSessionActionBar />
      </MockProviders>)
    fireEvent.click(getByTestId('DefaultActionBarRecordAudio'))
    expect(mocksetMainPageState).toBeCalled()
  })
})