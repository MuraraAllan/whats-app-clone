import TestRenderer from 'react-test-renderer';

import { useMainPageMock } from 'shared/test-utils'
import ActiveChatSessionActionBar from './ActiveChatSessionActionBar';
import { DefaultActionBar, FileUploadLabelActionBar, RecordAudioActionBar, RegisteringFormActionBar, TakePictureActionBar } from './components';


global.URL.createObjectURL = jest.fn();


Object.defineProperty(window.navigator, 'mediaDevices', {
  writable: true,
  value: {
    getUserMedia: async () => {
      const stream = new MediaStream()
      return stream
    }
  },
});

const { act } = TestRenderer
describe('ActiveChatSessionBody', () => {
  it('MainPageState is "view_message" render DefaultActionBar', () => {
    const { dispatchers, root } = useMainPageMock({ useTestRenderer: true, Component: <ActiveChatSessionActionBar /> })
    act(() => {
      dispatchers.setMainPageState("view_message")
    })
    const element = root?.findAllByType(DefaultActionBar);
    expect(element?.length).toEqual(1)
  })
  it('MainPageState is "view_message_picture" render DefaultActionBar', () => {
    const { dispatchers, root } = useMainPageMock({ useTestRenderer: true, Component: <ActiveChatSessionActionBar /> })
    act(() => {
      dispatchers.setMainPageState("view_message_picture")
    })
    const element = root?.findAllByType(DefaultActionBar);
    expect(element?.length).toEqual(1)
  })
  it('MainPageState is "record_audio"  render RecordAudioActionBar', () => {
    const { dispatchers, root } = useMainPageMock({ useTestRenderer: true, Component: <ActiveChatSessionActionBar /> })
    act(() => {
      dispatchers.setMainPageState("record_audio")
    })
    const element = root?.findAllByType(RecordAudioActionBar);
    expect(element?.length).toEqual(1)
  })
  it('MainPageState is "preview_file_upload" render FileUploadLabelActionBar', () => {
    const { dispatchers, root } = useMainPageMock({ useTestRenderer: true, Component: <ActiveChatSessionActionBar /> })
    act(() => {
      dispatchers.setMainPageState("preview_file_upload")
    })
    const element = root?.findAllByType(FileUploadLabelActionBar);
    expect(element?.length).toEqual(1)
  })
  it('MainPageState is "take_webcam_picture" render TakePictureActionBar', () => {
    const { dispatchers, root } = useMainPageMock({ useTestRenderer: true, Component: <ActiveChatSessionActionBar /> })
    act(() => {
      dispatchers.setMainPageState("take_webcam_picture")
    })
    const element = root?.findAllByType(TakePictureActionBar);
    expect(element?.length).toEqual(1)
  })
  it('MainPageState is "preview_uploading_webcam" render FileUploadLabelActionBar', () => {
    const { dispatchers, root } = useMainPageMock({ useTestRenderer: true, Component: <ActiveChatSessionActionBar /> })
    act(() => {
      dispatchers.setMainPageState("preview_uploading_webcam")
    })
    const element = root?.findAllByType(FileUploadLabelActionBar);
    expect(element?.length).toEqual(1)
  })
  it('MainPageState is "register_form" render RegisteringFormActionBar', () => {
    const { dispatchers, root } = useMainPageMock({ useTestRenderer: true, Component: <ActiveChatSessionActionBar /> })
    act(() => {
      dispatchers.setMainPageState("register_form")
    })
    const element = root?.findAllByType(RegisteringFormActionBar);
    expect(element?.length).toEqual(1)
  })
})