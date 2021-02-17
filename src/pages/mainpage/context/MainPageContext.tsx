import React, { ReactNode, useCallback, useEffect, useReducer } from 'react'

import { chatSessionsMock } from 'pages/../../mocks/chatSessions'
import { ChatSessionType, useChatSession, useGetChatSession } from 'pages/mainpage/hooks/ChatSessionsHooks'
import { useGetActiveChatSession } from '../hooks'

// export interface ChatSessionContextType {
//   chatSessions: ChatSessions | null,
//   addMessage: ({ session_id, textMessage, user }: AddMessageParams) => void,
//   addMessageWithFile: ({ session_id, textMessage, file, user }: AddMessageWithFileParams) => void
//   addMessageWithWebcamPicture: ({ session_id, textMessage, picture, user }: AddMessageWithWebcamPictureParams) => void
//   addAudioMessage: ({ session_id, audio, user }: AddAudioMessageParams) => void
// }

// type AddMessageParams = {
//   session_id: string,
//   textMessage: string | null,
//   user: User,
// }

// interface AddMessageWithFileParams extends AddMessageParams {
//   file: UploadingFileType
// }

// interface AddMessageWithWebcamPictureParams extends AddMessageParams {
//   picture: UploadingFileType
// }

// interface AddAudioMessageParams {
//   audio: UploadingFileType
//   session_id: string,
//   user: User
// }
interface MainPageReducerState {
  state: MainPageStates | null
  activeSessionId?: string
  activeChatSession?: ChatSessionType
}

interface MainPageDispatchers {
  setActiveChatSession: (sessionId: string) => void | null
  setMainPageState: (state: MainPageStates) => void | null
}

type ActionSetMainPageCurrentState = { type: 'set_mainpage_state', state: MainPageStates }
type MainPageActions = SetActiveSession | ActionSetMainPageCurrentState
type MainPageContext = MainPageReducerState & MainPageDispatchers

// view_message - defaultState - display all activeChatSession messages | can play audio | can download files | can attach files | can take picture | can send message | can switch active session
// view_message_picture - display UploadedFileViewer open at view_message | can send message | can view picture | can switch active session
// record_audio - display recording audio | all chat messages | can send audio | can switch active session
// preview_file_upload - can see file upload preview | can add a label to file upload | can switch active session
// take_webcam_picture - can take picture | can switch between sessions
// preview_uploading_webcam - can see file upload preview | can add a label to picture | can switch active session
// register_form - can use register form | can switch can switch active session
type MainPageStates = 'view_message' | 'view_message_picture' | 'record_audio' | 'preview_file_upload' | 'take_webcam_picture' | 'preview_uploading_webcam' | 'register_form'

type SetActiveSession = { type: 'set_active_session', sessionId: string, activeChatSession: ChatSessionType }

// MainPageContext hold a reducer that controls currentMainPageState, activeSession object and activeSessionID

// set_mainpage_state should update state property
// set_active_session should change sessionID set active session as useGetChatSession(context.activeSessionID) through a useEffect
// expose two dispatchers through ChatSessionReducer : 
// setActiveChatSession(session_id: string) and setMainPageState(state: MainPageStates)

export function MainPageReducer(reducerState: MainPageReducerState, action: MainPageActions) {
  switch (action.type) {
    case 'set_mainpage_state':
      return {
        ...reducerState,
        state: action.state
      }
    case 'set_active_session':
      return {
        ...reducerState,
        activeSessionID: action.sessionId,
        actrveSession: 
      }
    default: throw new Error('invalid action type on main page context')
  }
}

export const ChatSessionsContext = React.createContext<MainPageContext>({
  state: 'view_message',
  setActiveChatSession: () => null,
  setMainPageState: () => null
})


type ChatSessionProviderProps = { children: ReactNode }
// user context will not carry any reducer nor actions
// our backend will propagate all user's chat rooms
function ChatSessionsProvider({ children }: ChatSessionProviderProps) {

  const [mainPageReducer, dispatch] = useReducer(MainPageReducer, {
    state: 'view_message',
  })

  const { getChatSession } = useGetChatSession()

  const activeSessionId = mainPageReducer.activeSessionId

  const setActiveChatSession = useCallback((() => {
    console.log('trick to audit rerendering of useCallBack')
    return (sessionId: string) => {
      console.log('Rerendering setActiveChatSession')
      if (sessionId != null && sessionId !== activeSessionId) {
        const activeChatSession = getChatSession(sessionId)
        if (activeChatSession != null) {
          dispatch({ type: 'set_active_session', sessionId, activeChatSession })
        }
      }
    }
  })(), [mainPageReducer])
  // WIP: using IIF to control rerenders of useCB
  // just in order to put the context together
  // and ensure minimal rerendering

  const setMainPageState = useCallback((() => {
    console.log('trick to audit rerendering of useCallBack')
    return (state: MainPageStates) => {
      console.log('Rerendering setMainPageState')
      if (state != null) {
        dispatch({ type: 'set_mainpage_state', state })
      }
    }
  })(), [mainPageReducer])

  useEffect(() => {
    setActiveChatSession('2')
  }, [setActiveChatSession])

  console.log('active session changed', activeSessionId)
  return (
    <ChatSessionsContext.Provider value={{ state: mainPageReducer.state, activeSessionId, setActiveChatSession, setMainPageState }}>
      {children}
    </ChatSessionsContext.Provider >
  )
}

export { ChatSessionsProvider }