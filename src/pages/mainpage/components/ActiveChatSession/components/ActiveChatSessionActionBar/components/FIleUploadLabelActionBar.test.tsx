import { fireEvent, render } from "@testing-library/react";
import { MockProviders } from "shared/test-utils";
import FileUploadLabelActionBar from "./FileUploadLabelActionBar";


const mockFinishUploadingFile = jest.fn()

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
      finishUploadingFile: mockFinishUploadingFile
    })
  })
});

describe('FileUploadLabelActionBar', () => {
  test('should call finishUploadingFile when FileUploadLabelActionBarSend is clicked', () => {
    const { getByTestId } = render(
      <MockProviders>
        <FileUploadLabelActionBar />
      </MockProviders>)
    fireEvent.click(getByTestId('FileUploadLabelActionBarSend'))
    expect(mockFinishUploadingFile).toBeCalled()
  })
})