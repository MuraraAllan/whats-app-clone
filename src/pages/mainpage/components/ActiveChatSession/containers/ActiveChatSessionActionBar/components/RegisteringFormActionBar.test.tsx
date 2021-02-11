import { fireEvent, render } from "@testing-library/react";
import { MockProviders } from "shared/test-utils";
import RegisteringFormActionBar from "./RegisteringFormActionBar";


const mockFinishRegistering = jest.fn()

jest.mock('pages/mainpage/hooks', () => {
  return ({
    useUploadFile: () => ({
      finishUploadingFile: mockFinishRegistering
    })
  })
});

describe('FileUploadLabelActionBar', () => {
  test('should call finishUploadingFile when FileUploadLabelActionBarSend is clicked', () => {
    const { getByTestId } = render(
      <MockProviders>
        <RegisteringFormActionBar />
      </MockProviders>)
    fireEvent.click(getByTestId('RegisteringFormActionBarSend'))
    expect(mockFinishRegistering).toBeCalled()
  })
})