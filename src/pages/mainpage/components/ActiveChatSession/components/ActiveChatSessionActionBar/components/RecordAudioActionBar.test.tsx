import { fireEvent, render } from "@testing-library/react";
import { MockProviders } from "shared/test-utils";
import { RecordAudioActionBar } from ".";


const mockFinishUploadingFile = jest.fn()

jest.mock('pages/mainpage/hooks', () => {
  return ({
    useRecordAudio: () => {
      const { useRecordAudio } = jest.requireActual('pages/mainpage/hooks')
      const obj = useRecordAudio()
      const localObj = {
        ...obj,
        finishRecordingAudio: mockFinishUploadingFile
      }
      return localObj
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
      finishUploadingFile: mockFinishUploadingFile
    })
  })
});

describe('RecordAudioActionBar', () => {
  test('should call finishRecordingAudio when RecordAudioActionBarSend is clicked', () => {
    const { getByTestId } = render(
      <MockProviders>
        <RecordAudioActionBar />
      </MockProviders>)
    fireEvent.click(getByTestId('RecordAudioActionBarSend'))
    expect(mockFinishUploadingFile).toBeCalled()
  })
})