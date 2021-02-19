import React, { ReactNode, useCallback, useEffect, useMemo, useReducer } from 'react'

import { ChatSessionType, Message, UploadingFileType, useChatSessionsDispatchers, useGetChatSession } from 'pages/mainpage/hooks/ChatSessionsHooks'
import { useUser } from 'shared/hooks'
import { User } from 'shared/context/LoggedUserContext'

interface MainPageActiveChatSession extends ChatSessionType {
  userBelongsToSession: boolean
}

interface MainPageReducerState {
  state: MainPageStates | null
  file?: UploadingFileType | null
  activeSessionId?: string
  activeChatSession?: MainPageActiveChatSession | null

}

interface MainPageDispatchers {
  setActiveChatSession: (sessionId: string) => void | null
  setMainPageState: (state: MainPageStates) => void | null
  finishMainPageState: (params: Partial<Message>) => void
  resetMainPageState: () => void
}

type ActionSetMainPageCurrentState = { type: 'set_mainpage_state', state: MainPageStates, file?: UploadingFileType }
type MainPageActions = SetActiveSession | ActionSetMainPageCurrentState
type MainPageContextState = MainPageReducerState & MainPageDispatchers
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
        console.log('ACTION FILE IS ssOT NULL')
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
  resetMainPageState: () => null
})


type ChatSessionProviderProps = { children: ReactNode }
// user context will not carry any reducer nor actions
// our backend will propagate all user's chat rooms
function MainPageProvider({ children }: ChatSessionProviderProps) {

  const [mainPageReducer, dispatch] = useReducer(MainPageReducer, {
    state: 'view_message',
    activeChatSession: null,
    file: null
  })

  const { user } = useUser()
  const { user_id } = user
  const { getChatSession } = useGetChatSession()
  const { addMessage, addMessageWithFile, addMessageWithWebcamPicture, addAudioMessage } = useChatSessionsDispatchers()

  // maybe a callBack is not necessary here 
  const setActiveChatSession = useCallback((() => {
    console.log('trick to audit rerendering of useCallBasck', getChatSession)
    return (sessionId: string) => {
      console.log('UPDATING ACTIVE CHAT SESSION >>>', sessionId)
      if (sessionId != null && sessionId !== mainPageReducer.activeSessionId) {
        const activeChatSession = getChatSession(sessionId)
        console.log('THE ACTIVE CHAT SESSION', activeChatSession)
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
  })(), [mainPageReducer, getChatSession])

  const finishMainPageState = useCallback((() => {
    console.log('trick to audit rerender+ing of useCallBack finishMainPageState')

    return (params: Partial<Message>) => {
      console.log('called with ', params)
      console.log('APP STATE IS', mainPageReducer.state)
      console.log('APP STATE IS', mainPageReducer.activeSessionId)
      switch (mainPageReducer.state) {
        case 'view_message':
          // on view message, if the finishAction brings picture, it means viewing uploaded picture
          if (params.picture != null) {
            dispatch({ type: 'set_mainpage_state', state: 'view_message_picture', file: params.picture })
            return
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
        case 'preview_file_upload':
          if (mainPageReducer.file != null && mainPageReducer.activeSessionId != null) {
            console.log('HERE WE ARE ADD FILE')
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

    }
  })(), [mainPageReducer.state, mainPageReducer.activeSessionId])


  const resetMainPageState = useCallback((() => {
    console.log('trick to audit rerendering of useCallBack')
    return () => {
      dispatch({ type: 'set_mainpage_state', state: 'view_message' })
    }
  })(), [])


  // WIP: using IIF to control rerenders of useCB
  // just in order to put the context together
  // and ensure minimal rerendering
  const setMainPageState = useCallback((() => {
    console.log('trick to audit rerendering of useCallBack on useGetActiveChatSession')
    return (state: MainPageStates) => {
      console.log('Rerendering setMainPageState')
      if (state != null) {
        dispatch({ type: 'set_mainpage_state', state })
      }
    }
  })(), [])

  useEffect(() => {
    setActiveChatSession('2')
  }, [])

  console.log('active session changed SESSIONID>>>>', mainPageReducer.activeSessionId)
  console.log('active session changed', mainPageReducer.state)
  console.log('active session changed SESSION>>>>', mainPageReducer.activeChatSession)
  console.log('ACTIVE SESSION USER BELONGD |>>>', mainPageReducer.activeChatSession?.userBelongsToSession)
  return (
    <MainPageContext.Provider value={{ ...mainPageReducer, finishMainPageState, setActiveChatSession, setMainPageState, resetMainPageState }}>
      {children}
    </MainPageContext.Provider >
  )
}

export { MainPageProvider }