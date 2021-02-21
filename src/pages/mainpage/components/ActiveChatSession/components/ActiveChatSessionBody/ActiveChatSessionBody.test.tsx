import TestRenderer from 'react-test-renderer';

import { ActiveChatSessionBody } from '.'
import { useMainPageMock } from 'shared/test-utils'
import { CamPictureUploadPreview, DisplayMessages, FileUploadPreview, TakePictureWithCam, UploadedWebcamPictureView } from './components';
import { RegisteringFormVisual } from '../../../../forms';

global.URL.createObjectURL = jest.fn();

const { act } = TestRenderer
describe('ActiveChatSessionBody', () => {
  it('MainPageState is "view_message" render DisplayMessages', () => {
    const { dispatchers, root } = useMainPageMock({ useTestRenderer: true, Component: <ActiveChatSessionBody /> })
    act(() => {
      dispatchers.setMainPageState("view_message")
    })
    const element = root?.findAllByType(DisplayMessages);
    expect(element?.length).toEqual(1)
  })
  it('MainPageState is "view_message_picture" render UploadedWebcamPictureView', () => {
    const { dispatchers, root } = useMainPageMock({ useTestRenderer: true, Component: <ActiveChatSessionBody /> })
    act(() => {
      dispatchers.setMainPageState("view_message_picture")
    })
    const element = root?.findAllByType(UploadedWebcamPictureView);
    expect(element?.length).toEqual(1)
  })
  it('MainPageState is "record_audio"  render DisplayMessages', () => {
    const { dispatchers, root } = useMainPageMock({ useTestRenderer: true, Component: <ActiveChatSessionBody /> })
    act(() => {
      dispatchers.setMainPageState("record_audio")
    })
    const element = root?.findAllByType(DisplayMessages);
    expect(element?.length).toEqual(1)
  })
  it('MainPageState is "preview_file_upload" render FileUploadPreview', () => {
    const { dispatchers, root } = useMainPageMock({ useTestRenderer: true, Component: <ActiveChatSessionBody /> })
    act(() => {
      dispatchers.setMainPageState("preview_file_upload")
    })
    const element = root?.findAllByType(FileUploadPreview);
    expect(element?.length).toEqual(1)
  })
  it('MainPageState is "take_webcam_picture" render TakePictureWithCam', () => {
    const { dispatchers, root } = useMainPageMock({ useTestRenderer: true, Component: <ActiveChatSessionBody /> })
    act(() => {
      dispatchers.setMainPageState("take_webcam_picture")
    })
    const element = root?.findAllByType(TakePictureWithCam);
    expect(element?.length).toEqual(1)
  })
  it('MainPageState is "preview_uploading_webcam" render CamPictureUploadPreview', () => {
    const { dispatchers, root } = useMainPageMock({ useTestRenderer: true, Component: <ActiveChatSessionBody /> })
    act(() => {
      dispatchers.setMainPageState("preview_uploading_webcam")
    })
    const element = root?.findAllByType(CamPictureUploadPreview);
    expect(element?.length).toEqual(1)
  })
  it('MainPageState is "register_form" render RegisteringFormVisual', () => {
    const { dispatchers, root } = useMainPageMock({ useTestRenderer: true, Component: <ActiveChatSessionBody /> })
    act(() => {
      dispatchers.setMainPageState("register_form")
    })
    const element = root?.findAllByType(RegisteringFormVisual);
    expect(element?.length).toEqual(1)
  })
})