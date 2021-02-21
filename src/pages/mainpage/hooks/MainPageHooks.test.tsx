import { act } from "react-dom/test-utils"
import { useMainPageMock } from "shared/test-utils"
import { ActiveChatSessionBody } from "../components/ActiveChatSession"


// expect to find the names of participants and the ActiveChatSession title
// expect that a user which not belongs to this ActiveChatSession can't see user names


describe('MainPageHooks', () => {
  test('useGetMainPageState returns current MainPage state', () => {
    const { dispatchers: { setMainPageState }, returnObj } = useMainPageMock()
    act(() => {
      setMainPageState("preview_file_upload")
    })
    expect(returnObj.state).toEqual("preview_file_upload")
  })
  test('useActiveChatSessionID returns current Active session ID', () => {
    const { dispatchers: { setActiveChatSession }, returnObj } = useMainPageMock()
    act(() => {
      setActiveChatSession("3")
    })
    expect(returnObj.activeSessionID).toEqual("3")
  })
  test('useMainPageFile returns current File being operated on MainPage', () => {
    const { dispatchers: { finishMainPageState }, returnObj } = useMainPageMock()
    const file = {
      content: new Blob(),
      name: 'any name'
    }
    act(() => {
      finishMainPageState({ file })
    })
    expect(returnObj.state).toEqual("preview_file_upload")
    expect(returnObj.file).toEqual({ content: new Blob(), name: 'any name' })
  })
})


describe('mainPageState', () => {
  test('mainPageState become "view_message_picture" when finishMainPageState called with a picture and message_id and MainPageState is "view_message"', () => {
    const { dispatchers: { finishMainPageState }, returnObj } = useMainPageMock()
    const picture = {
      content: new Blob(),
      name: 'any name'
    }
    act(() => {
      finishMainPageState({ picture, message_id: 'distinguish we have a message' })
    })
    expect(returnObj.state).toEqual("view_message_picture")
    expect(returnObj.file).toEqual({ content: new Blob(), name: 'any name' })
  })

  test('mainPageState become "preview_uploading_webcam" when finishMainPageState called with a picture and no message_id and MainPageState is "view_message"', () => {
    const { dispatchers: { finishMainPageState }, returnObj } = useMainPageMock()
    const picture = {
      content: new Blob(),
      name: 'any name'
    }
    act(() => {
      finishMainPageState({ picture })
    })
    expect(returnObj.state).toEqual("preview_uploading_webcam")
    expect(returnObj.file).toEqual({ content: new Blob(), name: 'any name' })
  })

  test('mainPageState become "preview_file_upload" when finishMainPageState called with a file MainPageState is "view_message"', () => {
    const { dispatchers: { finishMainPageState }, returnObj } = useMainPageMock()
    const file = {
      content: new Blob(),
      name: 'any name'
    }
    act(() => {
      finishMainPageState({ file })
    })
    expect(returnObj.state).toEqual("preview_file_upload")
    expect(returnObj.file).toEqual({ content: new Blob(), name: 'any name' })
  })

  test('mainPageState stay "view_message" when finishMainPageState is called with textMessage and MainPageState is "view_message"', () => {
    const { dispatchers: { finishMainPageState }, returnObj } = useMainPageMock()
    act(() => {
      finishMainPageState({ textMessage: 'any text message to dispatch' })
    })
    expect(returnObj.state).toEqual("view_message")
  })

  test('mainPageState become "view_message" when finishMainPageState is called with file and MainPageState is "preview_file_upload"', () => {
    const { dispatchers, returnObj } = useMainPageMock()
    const file = {
      content: new Blob(),
      name: 'any name',
    }
    act(() => {
      dispatchers.finishMainPageState({ file })
    })
    expect(returnObj.state).toEqual("preview_file_upload")
    act(() => {
      dispatchers.finishMainPageState({ file })
    })
    expect(returnObj.state).toEqual("view_message")
    expect(returnObj.file).toBeNull()
  })

  test('mainPageState become "preview_uploading_webcam" when finishMainPageState is called with picture and MainPageState is "take_webcam_picture"', () => {
    const { dispatchers, returnObj } = useMainPageMock()
    const picture = {
      content: new Blob(),
      name: 'any name',
    }
    act(() => {
      dispatchers.setMainPageState('take_webcam_picture')
    })
    act(() => {
      dispatchers.finishMainPageState({ picture })
    })
    expect(returnObj.state).toEqual("preview_uploading_webcam")
    expect(returnObj.file).toEqual({ content: new Blob(), name: 'any name' })
  })

  test('mainPageState become "view_message" when finishMainPageState is called with audio and MainPageState is "record_audio"', () => {
    const { dispatchers, returnObj } = useMainPageMock()
    const audio = {
      content: new Blob(),
      name: 'any name',
    }
    act(() => {
      dispatchers.setMainPageState('record_audio')
    })
    act(() => {
      dispatchers.finishMainPageState({ audio })
    })
    expect(returnObj.state).toEqual("view_message")
    expect(returnObj.file).toBeNull()
  })

  test('resetMainPageState should set to view_message and file be nullified', () => {
    const { dispatchers, returnObj } = useMainPageMock()
    const file = {
      content: new Blob(),
      name: 'any name',
    }
    act(() => {
      dispatchers.finishMainPageState({ file })
    })
    act(() => {
      dispatchers.resetMainPageState()
    })
    expect(returnObj.state).toEqual("view_message")
    expect(returnObj.file).toBeNull()
  })
})