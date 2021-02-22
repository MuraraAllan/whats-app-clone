import React, { ReactNode, useCallback, useEffect, useReducer } from 'react'

import { ChatSessionType, Message, UploadingFileType, useChatSessionsDispatchers, useGetChatSession } from 'pages/mainpage/hooks/ChatSessionsHooks'
import { useUser } from 'shared/hooks'
import { User } from 'shared/context/LoggedUserContext'

interface MainPageActiveChatSession extends ChatSessionType {
  userBelongsToSession: boolean
}

interface MainPageReducerState {
  state: MainPageStates | null
  file?: UploadingFileType | null
  activeSessionId?: string | null
  activeChatSession?: MainPageActiveChatSession | null

}

export interface MainPageDispatchers {
  setActiveChatSession: (sessionId: string) => void | null
  setMainPageState: (state: MainPageStates) => void | null
  finishMainPageState: (params: Partial<Message>) => void
  resetMainPageState: () => void
  resetActiveChatSession: () => void
}

type ActionSetMainPageCurrentState = { type: 'set_mainpage_state', state: MainPageStates, file?: UploadingFileType }
type MainPageActions = SetActiveSession | ActionSetMainPageCurrentState | ResetActiveSession
type MainPageContextState = MainPageReducerState & MainPageDispatchers
type ResetActiveSession = { type: 'reset_active_session' }
type SetActiveSession = { type: 'set_active_session', sessionId: string, activeChatSession: MainPageActiveChatSession, state: MainPageStates }

// view_message - defaultState - display all activeChatSession messages | can play audio | can download files | can attach files | can take picture | can send message | can switch active session
// view_message_picture - display UploadedFileViewer open at view_message | can send message | can view picture | can switch active session
// record_audio - display recording audio | all chat messages | can send audio | can switch active session
// preview_file_upload - can see file upload preview | can add a label to file upload | can switch active session
// take_webcam_picture - can take picture | can switch between sessions
// preview_uploading_webcam - can see file upload preview | can add a label to picture | can switch active session
// register_form - can use register form | can switch can switch active session
type MainPageStates = 'view_message' | 'view_message_picture' | 'record_audio' | 'preview_file_upload' | 'take_webcam_picture' | 'preview_uploading_webcam' | 'register_form'



// MainPageContext hold a reducer that controls currentMainPageState, activeSession object and activeSessionID

// set_mainpage_state should update state property
// set_active_session should change sessionID set active session as useGetChatSession(context.activeSessionID) through a useEffect
// expose two dispatchers through ChatSessionReducer : 
// setActiveChatSession(session_id: string) and setMainPageState(state: MainPageStates)

export function MainPageReducer(reducerState: MainPageReducerState, action: MainPageActions) {
  switch (action.type) {
    case 'set_mainpage_state':
      if (action.file != null) {
        return {
          ...reducerState,
          state: action.state,
          file: action.file
        }
      }
      return {
        ...reducerState,
        state: action.state,
        file: null
      }
    case 'reset_active_session':
      return {
        ...reducerState,
        activeSessionId: null,
        activeChatSession: null
      }
    case 'set_active_session':
      return {
        ...reducerState,
        activeSessionId: action.sessionId,
        activeChatSession: { ...action.activeChatSession },
        state: action.state,
      }
    default: throw new Error('invalid action type on main page context')
  }
}

export const MainPageContext = React.createContext<MainPageContextState>({
  state: null,
  setActiveChatSession: () => null,
  setMainPageState: () => null,
  finishMainPageState: () => null,
  resetMainPageState: () => null,
  resetActiveChatSession: () => null
})


type ChatSessionProviderProps = { children: ReactNode }
// user context will not carry any reducer nor actions
// our backend will propagate all user's chat rooms
function MainPageProvider({ children }: ChatSessionProviderProps) {

  const [mainPageReducer, dispatch] = useReducer(MainPageReducer, {
    state: 'view_message',
    activeChatSession: null,
    activeSessionId: null,
    file: null
  })

  const { user } = useUser()
  const user_id = user?.user_id

  const { getChatSession } = useGetChatSession()
  const { addMessage, addMessageWithFile, addMessageWithWebcamPicture, addAudioMessage } = useChatSessionsDispatchers()


  const setActiveChatSession = (sessionId: string) => {
    if (sessionId != null && sessionId !== mainPageReducer.activeSessionId) {
      const activeChatSession = getChatSession(sessionId)
      const belongs = Object.values(activeChatSession?.participants ?? []).reduce<boolean>((prev: boolean, participant: User) => {
        if (participant.user_id === user_id) {
          return true
        }
        return prev
      }, false)

      const localActiveChatSession = {
        ...activeChatSession,
        userBelongsToSession: belongs
      } as MainPageActiveChatSession

      if (activeChatSession != null) {
        dispatch({ type: 'set_active_session', sessionId, activeChatSession: localActiveChatSession, state: 'view_message' })
      }
    }
  }

  const finishMainPageState = useCallback((params: Partial<Message>) => {

    if (user == null) {
      return
    }

    switch (mainPageReducer.state) {
      case 'view_message':
        // on view message, if the finishAction brings picture, it means viewing uploaded picture
        // or drag and droped picture which will not contain message_id
        if (params.picture != null) {
          if (params.message_id != null) {
            dispatch({ type: 'set_mainpage_state', state: 'view_message_picture', file: params.picture })
            return
          }
          dispatch({ type: 'set_mainpage_state', state: 'preview_uploading_webcam', file: params.picture })
        }

        // if it brings a file it means setting an file upload
        if (params.file != null) {
          dispatch({ type: 'set_mainpage_state', state: 'preview_file_upload', file: params.file })
          return
        }
        if (params.textMessage == null || mainPageReducer.activeSessionId == null) {
          return null
        }
        addMessage({
          session_id: mainPageReducer.activeSessionId,
          user,
          textMessage: params.textMessage
        })
        break;

      case 'view_message_picture':
        if (params.textMessage == null || mainPageReducer.activeSessionId == null) {
          return null
        }
        addMessage({
          session_id: mainPageReducer.activeSessionId,
          user,
          textMessage: params.textMessage
        })
        break;

      case 'preview_file_upload':
        if (mainPageReducer.file != null && mainPageReducer.activeSessionId != null) {
          addMessageWithFile({
            session_id: mainPageReducer.activeSessionId,
            textMessage: params.textMessage ?? null,
            file: mainPageReducer.file,
            user,
          })
          dispatch({ type: 'set_mainpage_state', state: 'view_message' })
        }
        break;

      case 'take_webcam_picture':
        if (params.picture == null) {
          dispatch({ type: 'set_mainpage_state', state: 'view_message' })
          return null
        }
        dispatch({ type: 'set_mainpage_state', state: 'preview_uploading_webcam', file: params.picture })
        break;

      case 'preview_uploading_webcam':
        if (mainPageReducer.file == null || mainPageReducer.activeSessionId == null) {
          dispatch({ type: 'set_mainpage_state', state: 'view_message' })
          return null
        }
        addMessageWithWebcamPicture({
          session_id: mainPageReducer.activeSessionId,
          user,
          textMessage: params.textMessage ?? null,
          picture: mainPageReducer.file
        })
        dispatch({ type: 'set_mainpage_state', state: 'view_message' })
        break;

      case 'record_audio':
        if (params.audio == null || mainPageReducer.activeSessionId == null) {
          dispatch({ type: 'set_mainpage_state', state: 'view_message' })
          return null
        }
        addAudioMessage({
          session_id: mainPageReducer.activeSessionId,
          user,
          audio: params.audio
        })
        dispatch({ type: 'set_mainpage_state', state: 'view_message' })
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainPageReducer])

  const resetMainPageState = () => dispatch({ type: 'set_mainpage_state', state: 'view_message' })
  const setMainPageState = (state: MainPageStates) => dispatch({ type: 'set_mainpage_state', state })
  const resetActiveChatSession = () => dispatch({ type: 'reset_active_session' })

  useEffect(() => {
    setActiveChatSession('2')
  }, [])

  return (
    <MainPageContext.Provider value={{ ...mainPageReducer, finishMainPageState, setActiveChatSession, setMainPageState, resetMainPageState, resetActiveChatSession }}>
      {children}
    </MainPageContext.Provider >
  )
}

export { MainPageProvider }