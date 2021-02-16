import { fireEvent, render } from "@testing-library/react";
import { MockProviders } from "shared/test-utils";
import { UploadPictureActionBar } from ".";

const mockFinishTakingPicture = jest.fn()

jest.mock('pages/mainpage/hooks', () => {
  return ({
    useTakePicture: () => ({
      takePicture: mockFinishTakingPicture
    })
  })
});

describe('RecordAudioActionBar', () => {
  test('should call finishRecordingAudio when RecordAudioActionBarFinish is clicked', () => {
    const { getByTestId } = render(
      <MockProviders>
        <UploadPictureActionBar />
      </MockProviders>)
    fireEvent.click(getByTestId('UploadPictureActionBarTakePicture'))
    expect(mockFinishTakingPicture).toBeCalled()
  })
})